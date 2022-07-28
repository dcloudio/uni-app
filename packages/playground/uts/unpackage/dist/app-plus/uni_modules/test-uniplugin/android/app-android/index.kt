package index;
fun login(name: String, pwd: String): UtsJSONObject {
    return object : () {
        var name = name
        var pwd = pwd
    };
}
open class User {
    open fun async login(name: String, pwd: String) {
        return object : () {
            var name = name
            var pwd = pwd
        };
    }
}
