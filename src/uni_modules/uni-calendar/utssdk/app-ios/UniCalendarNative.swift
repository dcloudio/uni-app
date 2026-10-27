import Foundation
import EventKit
import EventKitUI
import UIKit
import DCloudUTSFoundation

public final class UniCalendarNative {

    fileprivate static let store = EKEventStore()
    private static var activeSession: CalendarEventEditSession?

    private static let resultSuccess = 0
    private static let resultCalendarUnavailable = 801
    private static let resultSaveFailed = 803
    private static let resultInvalidRecurrence = 804
    private static let resultUserCancelled = 805

    public static func requestPermission(_ callback: @escaping (Bool, String?) -> Void) {
        let status = EKEventStore.authorizationStatus(for: .event)
        switch status {
        case .authorized, .fullAccess, .writeOnly:
            callback(true, nil)
        case .notDetermined:
            if #available(iOS 17.0, *) {
                store.requestWriteOnlyAccessToEvents { granted, error in
                    callback(granted, error?.localizedDescription)
                }
            } else {
                store.requestAccess(to: .event) { granted, error in
                    callback(granted, error?.localizedDescription)
                }
            }
        case .denied, .restricted:
            callback(false, nil)
        @unknown default:
            callback(false, "authorization status unavailable")
        }
    }

    public static func addEvent(_ options: UTSJSONObject, _ callback: @escaping (NSNumber, String?) -> Void) {
        let status = EKEventStore.authorizationStatus(for: .event)
        switch status {
        case .authorized, .fullAccess, .writeOnly:
            callback(NSNumber(value:saveEventDirectly(options)), nil)
        case .notDetermined:
            requestPermission { granted, errorMessage in
                if granted {
                    callback(NSNumber(value:saveEventDirectly(options)), nil)
                    return
                }
                if let message = errorMessage, !message.isEmpty {
                    callback(NSNumber(value:resultSaveFailed), message)
                    return
                }
                presentEventEditor(options, callback)
            }
        case .denied, .restricted:
            presentEventEditor(options, callback)
        @unknown default:
            callback(NSNumber(value:resultSaveFailed), "authorization status unavailable")
        }
    }

    private static func saveEventDirectly(_ options: UTSJSONObject) -> Int {
        let calendar = store.defaultCalendarForNewEvents
        guard let writableCalendar = calendar else {
            return resultCalendarUnavailable
        }

        let event = EKEvent(eventStore: store)
        event.calendar = writableCalendar
        let applyResult = applyOptions(options, to: event)
        if applyResult != resultSuccess {
            return applyResult
        }

        do {
            try store.save(event, span: .futureEvents)
            return resultSuccess
        } catch {
            return resultSaveFailed
        }
    }

    private static func presentEventEditor(_ options: UTSJSONObject, _ callback: @escaping (NSNumber, String?) -> Void) {
        DispatchQueue.main.async {
            guard let presenter = preparePresenter(callback) else {
                return
            }
            let session = CalendarEventEditSession(presenter: presenter, payload: options, callback: callback) {
                activeSession = nil
            }
            activeSession = session
            session.start()
        }
    }

    private static func preparePresenter(_ callback: @escaping (NSNumber, String?) -> Void) -> UIViewController? {
        if activeSession != nil {
            callback(NSNumber(value:resultSaveFailed), "calendar editor is already presented")
            return nil
        }
        guard let presenter = findTopViewController() else {
            callback(NSNumber(value:resultSaveFailed), "view controller unavailable")
            return nil
        }
        return presenter
    }  

    fileprivate static func createEvent(_ options: UTSJSONObject, attachWritableCalendar: Bool) -> (EKEvent?, Int) {
        let event = EKEvent(eventStore: store)
        if attachWritableCalendar {
            guard let writableCalendar = store.defaultCalendarForNewEvents else {
                return (nil, resultCalendarUnavailable)
            }
            event.calendar = writableCalendar
        }
        let applyResult = applyOptions(options, to: event)
        if applyResult != resultSuccess {
            return (nil, applyResult)
        }
        return (event, resultSuccess)
    }

    private static func applyOptions(_ options: UTSJSONObject, to event: EKEvent) -> Int {
        event.title = options.getString("title") ?? ""
        event.startDate = Date(timeIntervalSince1970: Double(options.getNumber("startTime")?.doubleValue ?? 0) / 1000.0)
        event.endDate = Date(timeIntervalSince1970: Double(options.getNumber("endTime")?.doubleValue ?? 0) / 1000.0)
        event.isAllDay = options.getBoolean("allDay") == true
		event.notes = options.getString("notes")
        event.location = options.getString("location")

        if options.getBoolean("alarm") == true {
            let offsetSeconds = options.getNumber("alarmOffset")?.doubleValue ?? 0
            event.addAlarm(EKAlarm(relativeOffset: TimeInterval(-offsetSeconds)))
        }

        if let repeatInterval = options.getString("repeatInterval") {
            guard let rule = buildRecurrenceRule(interval: repeatInterval, startTime: options.getNumber("startTime")?.doubleValue ?? 0, repeatEndTime: options.getNumber("repeatEndTime")?.doubleValue) else {
                return resultInvalidRecurrence
            }
            event.recurrenceRules = [rule]
        }

        return resultSuccess
    }

    private static func buildRecurrenceRule(interval: String, startTime: Double, repeatEndTime: Double?) -> EKRecurrenceRule? {
        let frequency: EKRecurrenceFrequency
        switch interval {
        case "day":
            frequency = .daily
        case "week":
            frequency = .weekly
        case "month":
            frequency = .monthly
        case "year":
            frequency = .yearly
        default:
            return nil
        }
        let end: EKRecurrenceEnd?
        if let repeatEndTime = repeatEndTime {
            end = EKRecurrenceEnd(end: Date(timeIntervalSince1970: repeatEndTime / 1000.0))
        } else {
            end = nil
        }
        if frequency == .monthly {
            let date = Date(timeIntervalSince1970: startTime / 1000.0)
            let day = Calendar.current.component(.day, from: date)
            let monthDays = [NSNumber(value: day)]
            return EKRecurrenceRule(
                recurrenceWith: frequency,
                interval: 1,
                daysOfTheWeek: nil,
                daysOfTheMonth: monthDays,
                monthsOfTheYear: nil,
                weeksOfTheYear: nil,
                daysOfTheYear: nil,
                setPositions: nil,
                end: end
            )
        }
        return EKRecurrenceRule(recurrenceWith: frequency, interval: 1, end: end)
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

private final class CalendarEventEditSession: NSObject, EKEventEditViewDelegate {
    private weak var presenter: UIViewController?
    private let payload: UTSJSONObject
    private let callback: (NSNumber, String?) -> Void
    private let cleanup: () -> Void
    private var completed = false

    init(presenter: UIViewController, payload: UTSJSONObject, callback: @escaping (NSNumber, String?) -> Void, cleanup: @escaping () -> Void) {
        self.presenter = presenter
        self.payload = payload
        self.callback = callback
        self.cleanup = cleanup
    }

    func start() {
        guard let presenter = presenter else {
            finish(803, "view controller unavailable")
            return
        }
        let result = UniCalendarNative.createEvent(payload, attachWritableCalendar: false)
        guard let event = result.0 else {
            finish(result.1, nil)
            return
        }

        let editor = EKEventEditViewController()
        editor.eventStore = UniCalendarNative.store
        editor.event = event
        editor.editViewDelegate = self
        self.presenter = presenter
        presenter.present(editor, animated: true)
    }

    func eventEditViewController(_ controller: EKEventEditViewController, didCompleteWith action: EKEventEditViewAction) {
        controller.dismiss(animated: true) {
            switch action {
            case .saved:
                self.finish(0, nil)
            case .canceled, .deleted:
                self.finish(805, "user cancelled")
            @unknown default:
                self.finish(803, "calendar editor completed with unknown action")
            }
        }
    }

    private func finish(_ code: Int, _ message: String?) {
        if completed {
            return
        }
        completed = true
        cleanup()
        callback(NSNumber(value:code), message)
    }
}
