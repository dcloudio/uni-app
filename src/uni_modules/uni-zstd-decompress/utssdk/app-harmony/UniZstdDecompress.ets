
export interface UniZstdDecompress {
    decompress(inputPath: string, outputPath: string, maxOutputSize: number): number
}
