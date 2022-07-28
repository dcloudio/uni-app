fun login(name: String, pwd: String): UtsJSONObject {
    return object : UtsJSONObject() {
        var name = name
        var pwd = pwd
    };
}
open class User {
    open fun async login(name: String, pwd: String) {
        login(name, pwd);
    }
}
