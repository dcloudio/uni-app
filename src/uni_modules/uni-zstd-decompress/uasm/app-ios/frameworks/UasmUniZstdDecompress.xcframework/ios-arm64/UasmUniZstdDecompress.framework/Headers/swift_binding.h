#ifndef UASM_ZSTD_SWIFT_BINDING_H_
#define UASM_ZSTD_SWIFT_BINDING_H_

#include <stddef.h>

#if defined(__GNUC__)
#define UASM_ZSTD_SWIFT_API __attribute__((visibility("default")))
#else
#define UASM_ZSTD_SWIFT_API
#endif

#ifdef __cplusplus
extern "C" {
#endif

typedef struct uasm_zstd_result uasm_zstd_result_t;

typedef enum uasm_zstd_error_kind {
    UASM_ZSTD_ERROR_NONE = 0,
    UASM_ZSTD_ERROR_INVALID_ARGUMENT = 1,
    UASM_ZSTD_ERROR_RANGE = 2,
    UASM_ZSTD_ERROR_RUNTIME = 3,
} uasm_zstd_error_kind_t;

/*
 * Decompresses directly between file-system paths. The output is created or
 * truncated and may contain partial data if decompression fails. The caller is
 * responsible for temporary-file and atomic-replacement behavior when needed.
 * Call uasm_zstd_result_destroy() after inspecting the returned result. A null
 * result means that the bridge could not allocate the result object.
 */
UASM_ZSTD_SWIFT_API uasm_zstd_result_t *uasm_zstd_decompress_file(
    const char *input_path,
    const char *output_path,
    size_t max_output_size);

UASM_ZSTD_SWIFT_API uasm_zstd_error_kind_t uasm_zstd_result_error_kind(
    const uasm_zstd_result_t *result);

UASM_ZSTD_SWIFT_API const char *uasm_zstd_result_error_message(
    const uasm_zstd_result_t *result);

UASM_ZSTD_SWIFT_API void uasm_zstd_result_destroy(uasm_zstd_result_t *result);

#ifdef __cplusplus
} // extern "C"
#endif

#endif // UASM_ZSTD_SWIFT_BINDING_H_
