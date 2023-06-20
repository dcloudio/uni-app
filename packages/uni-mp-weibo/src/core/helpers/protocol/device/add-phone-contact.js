export const addPhoneContact = {
  firstName: {
    type: String,
    required: true,
    validator (firstName) {
      if (!firstName) {
        return 'addPhoneContact:fail parameter error: parameter.firstName should not be empty String;'
      }
    }
  }
}
