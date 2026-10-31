import Contacts
import ContactsUI
import Foundation
import UIKit
import DCloudUTSFoundation

public class AddPhoneContactNative {
  private static var activeSession: ContactFlowSession?
  private static var activeChooseContactSession: ChooseContactSession?

  public static func requestPermission(_ callback: @escaping (Bool, String?) -> Void) {
    let store = CNContactStore()
    let status = CNContactStore.authorizationStatus(for: .contacts)
    switch status {
    case .authorized:
      callback(true, nil)
    case .notDetermined:
      store.requestAccess(for: .contacts) { granted, error in
        if granted {
          callback(true, nil)
          return
        }
        callback(false, error?.localizedDescription ?? "permission denied")
      }
    case .denied, .restricted:
      callback(false, nil)
    @unknown default:
      callback(false, "authorization status unavailable")
    }
  }

  public static func presentNewContactEditor(_ contact: UTSJSONObject, _ callback: @escaping (Bool, String?) -> Void) {
    DispatchQueue.main.async {
      guard let presenter = preparePresenter(callback) else {
        return
      }
      let session = ContactFlowSession(mode: .newContact, presenter: presenter, payload: contact, callback: callback) {
        activeSession = nil
      }
      activeSession = session
      session.start()
    }
  }

  public static func presentExistingContactEditor(_ contact: UTSJSONObject, _ callback: @escaping (Bool, String?) -> Void) {
    DispatchQueue.main.async {
      guard let presenter = preparePresenter(callback) else {
        return
      }
      let session = ContactFlowSession(mode: .existingContact, presenter: presenter, payload: contact, callback: callback) {
        activeSession = nil
      }
      activeSession = session
      session.start()
    }
  }

  public static func presentChooseContact(_ callback: @escaping (String?, String?, [String]?, String?) -> Void) {
    DispatchQueue.main.async {
      guard let presenter = prepareChooseContactPresenter(callback) else {
        return
      }
      let session = ChooseContactSession(presenter: presenter, callback: callback) {
        activeChooseContactSession = nil
      }
      activeChooseContactSession = session
      session.start()
    }
  }

  private static func preparePresenter(_ callback: @escaping (Bool, String?) -> Void) -> UIViewController? {
    if hasActivePresentation() {
      callback(false, "contact editor is already presented")
      return nil
    }
    guard let presenter = findTopViewController() else {
      callback(false, "view controller unavailable")
      return nil
    }
    return presenter
  }

  private static func prepareChooseContactPresenter(_ callback: @escaping (String?, String?, [String]?, String?) -> Void) -> UIViewController? {
    if hasActivePresentation() {
      callback(nil, nil, nil, "contact editor is already presented")
      return nil
    }
    guard let presenter = findTopViewController() else {
      callback(nil, nil, nil, "view controller unavailable")
      return nil
    }
    return presenter
  }

  private static func hasActivePresentation() -> Bool {
    return activeSession != nil || activeChooseContactSession != nil
  }

  fileprivate static func buildNewContact(_ contact: UTSJSONObject) -> CNMutableContact {
    let mutableContact = CNMutableContact()
    mutableContact.givenName = contact.getString("firstName") ?? ""
    mutableContact.middleName = contact.getString("middleName") ?? ""
    mutableContact.familyName = contact.getString("lastName") ?? ""
    mutableContact.nickname = contact.getString("nickName") ?? ""
    mutableContact.note = contact.getString("remark") ?? ""
    mutableContact.organizationName = contact.getString("organization") ?? ""
    mutableContact.jobTitle = contact.getString("title") ?? ""
    mutableContact.phoneNumbers = buildPhoneNumbers(contact)
    mutableContact.emailAddresses = buildEmailAddresses(contact)
    mutableContact.urlAddresses = buildUrlAddresses(contact)
    mutableContact.postalAddresses = buildPostalAddresses(contact)
    mutableContact.instantMessageAddresses = buildInstantMessageAddresses(contact)
    if let imageData = readImageData(path: contact.getString("photoFilePath")) {
      mutableContact.imageData = imageData
    }
    return mutableContact
  }

  fileprivate static func mergeContact(_ source: UTSJSONObject, into target: CNMutableContact) {
    applyString(source.getString("firstName")) { target.givenName = $0 }
    applyString(source.getString("middleName")) { target.middleName = $0 }
    applyString(source.getString("lastName")) { target.familyName = $0 }
    applyString(source.getString("nickName")) { target.nickname = $0 }
    applyString(source.getString("remark")) { target.note = $0 }
    applyString(source.getString("organization")) { target.organizationName = $0 }
    applyString(source.getString("title")) { target.jobTitle = $0 }

    target.phoneNumbers = mergeLabeledValues(target.phoneNumbers, updates: buildPhoneNumbers(source))
    target.emailAddresses = mergeLabeledValues(target.emailAddresses, updates: buildEmailAddresses(source))
    target.urlAddresses = mergeLabeledValues(target.urlAddresses, updates: buildUrlAddresses(source))
    target.postalAddresses = mergeLabeledValues(target.postalAddresses, updates: buildPostalAddresses(source))
    target.instantMessageAddresses = mergeLabeledValues(target.instantMessageAddresses, updates: buildInstantMessageAddresses(source))

    if let imageData = readImageData(path: source.getString("photoFilePath")) {
      target.imageData = imageData
    }
  }

  private static func applyString(_ value: String?, setter: (String) -> Void) {
    guard let value = value, !value.isEmpty else {
      return
    }
    setter(value)
  }

  private static func mergeLabeledValues<Value>(_ current: [CNLabeledValue<Value>], updates: [CNLabeledValue<Value>]) -> [CNLabeledValue<Value>] {
    if updates.isEmpty {
      return current
    }
    var merged = current
    for update in updates {
      if let index = merged.firstIndex(where: { $0.label == update.label }) {
        merged[index] = update
      } else {
        merged.append(update)
      }
    }
    return merged
  }

  fileprivate static func contactFetchKeys() -> [CNKeyDescriptor] {
    return [
      CNContactIdentifierKey as CNKeyDescriptor,
      CNContactGivenNameKey as CNKeyDescriptor,
      CNContactMiddleNameKey as CNKeyDescriptor,
      CNContactFamilyNameKey as CNKeyDescriptor,
      CNContactNicknameKey as CNKeyDescriptor,
      CNContactNoteKey as CNKeyDescriptor,
      CNContactOrganizationNameKey as CNKeyDescriptor,
      CNContactJobTitleKey as CNKeyDescriptor,
      CNContactPhoneNumbersKey as CNKeyDescriptor,
      CNContactEmailAddressesKey as CNKeyDescriptor,
      CNContactUrlAddressesKey as CNKeyDescriptor,
      CNContactPostalAddressesKey as CNKeyDescriptor,
      CNContactInstantMessageAddressesKey as CNKeyDescriptor,
      CNContactImageDataKey as CNKeyDescriptor,
      CNContactViewController.descriptorForRequiredKeys()
    ]
  }

  fileprivate static func displayName(for contact: CNContact) -> String {
    if let formattedName = CNContactFormatter.string(from: contact, style: .fullName), !formattedName.isEmpty {
      return formattedName
    }
    let displayName = "\(contact.familyName)\(contact.middleName)\(contact.givenName)"
    if !displayName.isEmpty {
      return displayName
    }
    return contact.nickname
  }

  private static func buildPhoneNumbers(_ contact: UTSJSONObject) -> [CNLabeledValue<CNPhoneNumber>] {
    var phoneNumbers: [CNLabeledValue<CNPhoneNumber>] = []
    appendPhone(contact.getString("mobilePhoneNumber"), label: CNLabelPhoneNumberMobile, to: &phoneNumbers)
    appendPhone(contact.getString("workPhoneNumber"), label: CNLabelWork, to: &phoneNumbers)
    appendPhone(contact.getString("hostNumber"), label: CNLabelPhoneNumberMain, to: &phoneNumbers)
    appendPhone(contact.getString("homePhoneNumber"), label: CNLabelHome, to: &phoneNumbers)
    appendPhone(contact.getString("workFaxNumber"), label: CNLabelPhoneNumberWorkFax, to: &phoneNumbers)
    appendPhone(contact.getString("homeFaxNumber"), label: CNLabelPhoneNumberHomeFax, to: &phoneNumbers)
    return phoneNumbers
  }

  private static func buildEmailAddresses(_ contact: UTSJSONObject) -> [CNLabeledValue<NSString>] {
    guard let email = contact.getString("email"), !email.isEmpty else {
      return []
    }
    return [CNLabeledValue(label: CNLabelWork, value: email as NSString)]
  }

  private static func buildUrlAddresses(_ contact: UTSJSONObject) -> [CNLabeledValue<NSString>] {
    guard let url = contact.getString("url"), !url.isEmpty else {
      return []
    }
    return [CNLabeledValue(label: CNLabelURLAddressHomePage, value: url as NSString)]
  }

  private static func buildInstantMessageAddresses(_ contact: UTSJSONObject) -> [CNLabeledValue<CNInstantMessageAddress>] {
    guard let weChatNumber = contact.getString("weChatNumber"), !weChatNumber.isEmpty else {
      return []
    }
    let imAddress = CNInstantMessageAddress(username: weChatNumber, service: "InstantMessage")
    return [CNLabeledValue(label: CNLabelOther, value: imAddress)]
  }

  private static func buildPostalAddresses(_ contact: UTSJSONObject) -> [CNLabeledValue<CNPostalAddress>] {
    var addresses: [CNLabeledValue<CNPostalAddress>] = []
    appendPostalAddress(
      label: CNLabelOther,
      country: contact.getString("addressCountry"),
      state: contact.getString("addressState"),
      city: contact.getString("addressCity"),
      street: contact.getString("addressStreet"),
      postalCode: contact.getString("addressPostalCode"),
      to: &addresses
    )
    appendPostalAddress(
      label: CNLabelWork,
      country: contact.getString("workAddressCountry"),
      state: contact.getString("workAddressState"),
      city: contact.getString("workAddressCity"),
      street: contact.getString("workAddressStreet"),
      postalCode: contact.getString("workAddressPostalCode"),
      to: &addresses
    )
    appendPostalAddress(
      label: CNLabelHome,
      country: contact.getString("homeAddressCountry"),
      state: contact.getString("homeAddressState"),
      city: contact.getString("homeAddressCity"),
      street: contact.getString("homeAddressStreet"),
      postalCode: contact.getString("homeAddressPostalCode"),
      to: &addresses
    )
    return addresses
  }

  private static func appendPhone(_ number: String?, label: String, to phoneNumbers: inout [CNLabeledValue<CNPhoneNumber>]) {
    guard let number = number, !number.isEmpty else {
      return
    }
    phoneNumbers.append(CNLabeledValue(label: label, value: CNPhoneNumber(stringValue: number)))
  }

  private static func appendPostalAddress(
    label: String,
    country: String?,
    state: String?,
    city: String?,
    street: String?,
    postalCode: String?,
    to addresses: inout [CNLabeledValue<CNPostalAddress>]
  ) {
    let hasValue = [country, state, city, street, postalCode].contains { value in
      if let value = value {
        return !value.isEmpty
      }
      return false
    }
    if !hasValue {
      return
    }
    let address = CNMutablePostalAddress()
    address.country = country ?? ""
    address.state = state ?? ""
    address.city = city ?? ""
    address.street = street ?? ""
    address.postalCode = postalCode ?? ""
    addresses.append(CNLabeledValue(label: label, value: address.copy() as! CNPostalAddress))
  }

  private static func readImageData(path: String?) -> Data? {
    guard let path = path, !path.isEmpty else {
      return nil
    }
    let url: URL?
    if path.hasPrefix("file://") || path.hasPrefix("http://") || path.hasPrefix("https://") {
      url = URL(string: path)
    } else {
      url = URL(fileURLWithPath: path)
    }
    guard let resolvedUrl = url else {
      return nil
    }
    return try? Data(contentsOf: resolvedUrl)
  }

  fileprivate static func findTopViewController() -> UIViewController? {
    if #available(iOS 13.0, *) {
      let scenes = UIApplication.shared.connectedScenes
      for scene in scenes {
        guard let windowScene = scene as? UIWindowScene else {
          continue
        }
        let windows = windowScene.windows
        var keyWindow: UIWindow?
        for window in windows {
          if window.isKeyWindow {
            keyWindow = window
            break
          }
        }
        if let rootViewController = keyWindow?.rootViewController {
          return topViewController(from: rootViewController)
        }
      }
      return nil
    }
    if let rootViewController = UIApplication.shared.keyWindow?.rootViewController {
        return topViewController(from: rootViewController)
    }
    return nil
  }

  fileprivate static func topViewController(from root: UIViewController) -> UIViewController {
    if let navigationController = root as? UINavigationController,
       let visibleViewController = navigationController.visibleViewController {
      return topViewController(from: visibleViewController)
    }
    if let tabBarController = root as? UITabBarController,
       let selectedViewController = tabBarController.selectedViewController {
      return topViewController(from: selectedViewController)
    }
    if let presentedViewController = root.presentedViewController {
      return topViewController(from: presentedViewController)
    }
    return root
  }
}

private final class ChooseContactSession: NSObject, CNContactPickerDelegate {
  private weak var presenter: UIViewController?
  private let callback: (String?, String?, [String]?, String?) -> Void
  private let cleanup: () -> Void
  private var completed = false

  init(presenter: UIViewController, callback: @escaping (String?, String?, [String]?, String?) -> Void, cleanup: @escaping () -> Void) {
    self.presenter = presenter
    self.callback = callback
    self.cleanup = cleanup
  }

  func start() {
    guard let presenter = presenter else {
      finish(nil, nil, nil, "view controller unavailable")
      return
    }
    let picker = CNContactPickerViewController()
    picker.delegate = self
    picker.displayedPropertyKeys = [CNContactPhoneNumbersKey]
    picker.predicateForEnablingContact = NSPredicate(format: "phoneNumbers.@count > 0")
    presenter.present(picker, animated: true)
  }

  func contactPickerDidCancel(_ picker: CNContactPickerViewController) {
    finish(nil, nil, nil, "user cancelled")
  }

  func contactPicker(_ picker: CNContactPickerViewController, didSelect contact: CNContact) {
    let allPhoneNumbers = contact.phoneNumbers.map { $0.value.stringValue }.filter { !$0.isEmpty }
    let selectedPhoneNumber = allPhoneNumbers.first
    if let phoneNumber = selectedPhoneNumber {
      finish(AddPhoneContactNative.displayName(for: contact), phoneNumber, allPhoneNumbers, nil)
      return
    }
    finish(nil, nil, nil, "selected contact has no phone number")
  }

  func contactPicker(_ picker: CNContactPickerViewController, didSelect contactProperty: CNContactProperty) {
    let contact = contactProperty.contact
    let allPhoneNumbers = contact.phoneNumbers.map { $0.value.stringValue }.filter { !$0.isEmpty }
    let selectedPhoneNumber = (contactProperty.value as? CNPhoneNumber)?.stringValue ?? allPhoneNumbers.first
    if let phoneNumber = selectedPhoneNumber {
      finish(AddPhoneContactNative.displayName(for: contact), phoneNumber, allPhoneNumbers, nil)
      return
    }
    finish(nil, nil, nil, "selected contact has no phone number")
  }

  private func finish(_ displayName: String?, _ phoneNumber: String?, _ phoneNumberList: [String]?, _ message: String?) {
    if completed {
      return
    }
    completed = true
    cleanup()
    callback(displayName, phoneNumber, phoneNumberList, message)
  }
}

private final class ContactFlowSession: NSObject, CNContactPickerDelegate, CNContactViewControllerDelegate {
  enum Mode {
    case newContact
    case existingContact
  }

  private let mode: Mode
  private weak var presenter: UIViewController?
  private let payload: UTSJSONObject
  private let callback: (Bool, String?) -> Void
  private let cleanup: () -> Void
  private let contactStore = CNContactStore()
  private var completed = false

  init(mode: Mode, presenter: UIViewController, payload: UTSJSONObject, callback: @escaping (Bool, String?) -> Void, cleanup: @escaping () -> Void) {
    self.mode = mode
    self.presenter = presenter
    self.payload = payload
    self.callback = callback
    self.cleanup = cleanup
  }

  func start() {
    switch mode {
    case .newContact:
      presentEditor(with: AddPhoneContactNative.buildNewContact(payload), isNew: true)
    case .existingContact:
      presentPicker()
    }
  }

  func contactPickerDidCancel(_ picker: CNContactPickerViewController) {
    finish(false, "user cancelled")
  }

  func contactPicker(_ picker: CNContactPickerViewController, didSelect contact: CNContact) {
    let presenter = self.presenter
    picker.dismiss(animated: true) {
      guard let presenter = presenter else {
        self.finish(false, "view controller unavailable")
        return
      }
      do {
        let fetchedContact = try self.contactStore.unifiedContact(withIdentifier: contact.identifier, keysToFetch: AddPhoneContactNative.contactFetchKeys())
        guard let mutableContact = fetchedContact.mutableCopy() as? CNMutableContact else {
          self.finish(false, "failed to load contact")
          return
        }
        AddPhoneContactNative.mergeContact(self.payload, into: mutableContact)
        self.presenter = presenter
        self.presentEditor(with: mutableContact, isNew: false)
      } catch {
        self.finish(false, error.localizedDescription)
      }
    }
  }

  func contactViewController(_ viewController: CNContactViewController, didCompleteWith contact: CNContact?) {
    viewController.dismiss(animated: true) {
      if let _ = contact {
        self.finish(true, nil)
      } else {
        self.finish(false, "user cancelled")
      }
    }
  }

  private func presentPicker() {
    guard let presenter = presenter else {
      finish(false, "view controller unavailable")
      return
    }
    let picker = CNContactPickerViewController()
    picker.delegate = self
    presenter.present(picker, animated: true)
  }

  private func presentEditor(with contact: CNMutableContact, isNew: Bool) {
    guard let presenter = presenter ?? AddPhoneContactNative.findTopViewController() else {
      finish(false, "view controller unavailable")
      return
    }
    let editor = isNew ? CNContactViewController(forNewContact: contact) : CNContactViewController(for: contact)
    editor.contactStore = contactStore
    editor.delegate = self
    editor.allowsActions = false
    editor.allowsEditing = true

    let navigationController = UINavigationController(rootViewController: editor)
    navigationController.modalPresentationStyle = .formSheet
    self.presenter = presenter
    presenter.present(navigationController, animated: true)
  }

  private func finish(_ success: Bool, _ message: String?) {
    if completed {
      return
    }
    completed = true
    cleanup()
    callback(success, message)
  }
}
