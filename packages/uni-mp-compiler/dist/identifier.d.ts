export default class IdentifierGenerator {
    private _chars;
    private _nextIds;
    next(): string;
    _increment(): void;
    [Symbol.iterator](): Generator<string, void, unknown>;
}
