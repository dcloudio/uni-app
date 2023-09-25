package uts.sdk.testUts;
import io.dcloud.uts.*;
import io.dcloud.uts.Map;
import kotlinx.coroutines.CoroutineScope;
import kotlinx.coroutines.Deferred;
import kotlinx.coroutines.Dispatchers;
import kotlinx.coroutines.async;
fun test(): Number {
    return 1;
}
fun testByJs(): Number {
    return test();
}
