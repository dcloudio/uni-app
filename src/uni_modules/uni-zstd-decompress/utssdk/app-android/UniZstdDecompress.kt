package uts.sdk.modules.uniZstdDecompress

object UniZstdDecompress {
    const val DEFAULT_MAX_DECOMPRESSED_SIZE: Long = 1L * 1024L * 1024L * 1024L * 1024L

    /**
     * Decompresses between files without accumulating the output in managed or native memory.
     * The output is created or truncated and may contain partial data if decompression fails.
     */
    @JvmOverloads
    fun decompress(
        inputPath: String,
        outputPath: String,
        maxOutputSize: Long = DEFAULT_MAX_DECOMPRESSED_SIZE,
    ): Int =
        nativeDecompressFile(
            inputPath.toByteArray(Charsets.UTF_8),
            outputPath.toByteArray(Charsets.UTF_8),
            maxOutputSize,
        )

    private external fun nativeDecompressFile(
        inputPath: ByteArray,
        outputPath: ByteArray,
        maxOutputSize: Long,
    ): Int
}
