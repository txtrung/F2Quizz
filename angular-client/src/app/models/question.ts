import {Answer} from "./answer";

export class Question {
    private _id: number;
    private _content: string;
    private _answers: Answer[];
    private _correct_answer: number;

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

    get answers(): Answer[] {
        return this._answers;
    }
    set answers(answers: Answer[]) {
        this._answers = answers;
    }

    get correctAnswer(): number {
        return this._correct_answer;
    }
    set correctAnswer(correctAnswer: number) {
        this._correct_answer = correctAnswer;
    }
}