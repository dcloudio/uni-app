package uts.sdk.modules.utsSyntaxcase;

import io.dcloud.uts.console;

public class JavaUser {

    public String name;
    public int age;

    public JavaUser(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public String toString() {
        String ret = "Name: " + name + ", Age: " + age;
        console.log(ret);
        return ret;
    }
    

}
