require("./Question");

module.exports = class Quiz {
  constructor(title) {
    this.title = title;
    this.questions = [];

    //metadata
    if (!this.createdDate) {
      this.createdDate = generateCurrentDate();
    }
    this.updatedDate = generateCurrentDate();

    //data
    this.quizData = {
      favorites: 0,
      totalAttempts: 0,
      correctAttempts: 0,
      incorrectAttempts: 0,
      datesUsed: [],
      datesUpdated: [],
    };
  }
  
  addQuestion(question) {
    if (question instanceof Question) {
      this.questions.push(quesetion);
    }
  }

}

function generateCurrentDate() {
    let date = new Date;
    Object.freeze(date);
    const currentDate = date.toUTCString();
    return currentDate;
}