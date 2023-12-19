@file:Suppress("UNCHECKED_CAST")
package uts.sdk.testUts;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
fun test(): Number {
    return 1;
}
fun testByJs(): Number {
    return test();
}
