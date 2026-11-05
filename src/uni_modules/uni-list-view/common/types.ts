export type SectionState = {
    resolveKeyById: (id: string) => string | undefined;
    setScrollIntoViewKey: (key: string) => void;
}