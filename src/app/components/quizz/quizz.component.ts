import { Component, OnInit } from '@angular/core';
import data_quizz from "../../../assets/data/data_quizz.json";

@Component({
  selector: 'app-quizz',
  templateUrl: './quizz.component.html',
  styleUrls: ['./quizz.component.css']
})
export class QuizzComponent implements OnInit {

  title: string = "";
  
  questions: any;
  questionSelected: any;
  
  answers: string[] = [];
  answerSelected: string[] = [];
  answerSelectedImg: string[] = [];

  questionIndex: number = 0;
  questionMaxIndex: number = 0;

  finished: boolean = false;

  constructor() { }

  ngOnInit(): void {

    if (data_quizz) {
      this.finished = false;
      this.title = data_quizz.title;
      this.questions = data_quizz.questions;
      this.questionSelected = data_quizz.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }
  }

  playerChoose(value: string) {
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep() {
    this.questionIndex += 1;

    if (this.questionMaxIndex > this.questionIndex) {
      this.questionSelected = this.questions[this.questionIndex];
    } else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true;
      this.answerSelected = [data_quizz.results[finalAnswer as keyof typeof data_quizz.results].character];
      this.answerSelectedImg = [data_quizz.results[finalAnswer as keyof typeof data_quizz.results].uri];

      console.log(this.answerSelected);

    }
  }
  
  async checkResult(answers: string[]) {
    const result = answers.reduce((previous, current, index, arr) => {
      if (arr.filter(item => item === previous).length > arr.filter(item => item === current).length) {
        return previous;
      } else {
        return current;
      }
    });
    return result;
  }
}
