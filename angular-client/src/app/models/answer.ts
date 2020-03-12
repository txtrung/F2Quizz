export class Answer {
    private _id: number;
    private _content: string;
    private _tag: string;

    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    get content(): string {
        return this._content;
    }
    set content(content: string) {
        this._content = content;
    }

    get tag(): string {
        return this._tag;
    }
    set tag(tag: string) {
        this._tag = tag;
    }
}