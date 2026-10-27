#ifndef UASM_TEST_SWIFT_BINDING_H_
#define UASM_TEST_SWIFT_BINDING_H_

#ifdef __cplusplus
extern "C" {
#endif

#if defined(__GNUC__)
#define UASM_TEST_SWIFT_API __attribute__((visibility("default")))
#else
#define UASM_TEST_SWIFT_API
#endif

UASM_TEST_SWIFT_API double uasm_test_add(double a, double b);
UASM_TEST_SWIFT_API const char *uasm_test_concat(const char *a, const char *b);
UASM_TEST_SWIFT_API void uasm_test_free_string(const char *value);

#ifdef __cplusplus
}
#endif

#endif
