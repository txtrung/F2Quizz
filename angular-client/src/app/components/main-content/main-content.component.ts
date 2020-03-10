import { Component, OnInit } from '@angular/core';
import {Quizz} from "../../models/quizz";
import {Question} from "../../models/question";
import {Answer} from "../../models/answer";
import {MatDialog} from "@angular/material";
import {ResultsComponent} from "../results/results.component";

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  categoryTitle: string;
  categoryDescription: string;
  answers: Answer[];
  questionsOrder: any;
  quizzsOrder: any;
  questions: Question;

  quizz: Quizz[] = [
    {
      category_id: 1,
      title: "Đi đố",
      description: "đi để bị đố, đố để bị đi",
      questions: [
        {
          question_id: 1,
          title: "Câu đố X1: Bạn biết câu hỏi đang hỏi gì không?",
          answers: [
            {
              answer_id: 1,
              content: 'Winter I have a radio group with a fixed width and I would like the button labels to wrap. I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it. How can I make it work?'
            },
            {
              answer_id: 2,
              content: 'Spring Winter I have a radio group with a fixed width and I would like the button labels to wrap. I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it. How can I make it work?'
            },
            {
              answer_id: 3,
              content: 'Summer Winter I have a radio group with a fixed width and I would like the button labels to wrap. I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it. How can I make it work?'
            },
            {
              answer_id: 4,
              content: 'Autumn Winter I have a radio group with a fixed width and I would like the button labels to wrap. I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it. How can I make it work?'
            }
          ],
          correct_answer: 1
        },{
          question_id: 2,
          title: "Câu đố X2: Bạn biết câu hỏi đang hỏi gì khônggggggggggggg?",
          answers: [
            {
              answer_id: 1,
              content: 'Winter I have a radio group with a fixed width and I would like the button labels to wrap. I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it. How can I make it work?'
            },
            {
              answer_id: 2,
              content: 'I have tried adding classes to every part of the html and adding "white-space: normal" to the elements but it just ignores it.'
            },
            {
              answer_id: 3,
              content: 'Summer Winter I have a radio group with a fixed width and I would like the button labels to wrap.'
            },
            {
              answer_id: 4,
              content: 'Autumn Winter'
            }
          ],
          correct_answer: 2
        }
      ]
    }
  ];


  constructor(
      public dialog: MatDialog
  ) {
  }

  ngOnInit() {
    if (this.quizz.length > 0) {
      this.quizzsOrder = 0;
      this.questionsOrder = 0;
      this.setContentPage(this.quizzsOrder,this.questionsOrder);
    }
  }

  /**
   *
   * @param quizzsOrder
   * @param questionsOrder
   */
  setContentPage(quizzsOrder,questionsOrder): void {
    this.categoryTitle = this.quizz[quizzsOrder].title;
    this.categoryDescription = this.quizz[quizzsOrder].description;

    this.questions = this.quizz[quizzsOrder].questions[questionsOrder];
    this.answers = this.questions.answers;
  }

  /**
   *
   */
  goPriviousQuestion(): void {
    if (this.questionsOrder !== undefined && this.questionsOrder) {
      this.questionsOrder -= 1;
      this.setContentPage(this.quizzsOrder,this.questionsOrder);
    }
  }

  /**
   *
   */
  goNextQuestion(): void {
    if (this.questionsOrder !== undefined && this.questionsOrder < this.quizz[this.quizzsOrder].questions.length - 1) {
      this.questionsOrder += 1;
      this.setContentPage(this.quizzsOrder,this.questionsOrder);
    }
  }

  animal: string;
  name: string;

  openDialog(): void {
    const dialogRef = this.dialog.open(ResultsComponent, {
      width: '250px',
      data: {name: this.name, animal: this.animal}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.animal = result;
    });
  }

  /**
   *
   */
  checkAllQuestions(): void {
    this.openDialog();
  }

}
