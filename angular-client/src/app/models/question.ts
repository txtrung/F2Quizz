import {Answer} from "./answer";

export class Question {
    question_id: number;
    title: string;
    correct_answer: number;
    answers: Answer[]
}