export class UserAnswerQuizz {
    private _id: number;
    private _questionAnsweredResult: boolean;

    get id(): number {
        return this._id;
    }
    set id(id: number) {
        this._id = id;
    }

    get questionAnsweredResult(): boolean {
        return this._questionAnsweredResult;
    }
    set questionAnsweredResult(questionAnsweredResult: boolean) {
        this._questionAnsweredResult = questionAnsweredResult;
    }
}