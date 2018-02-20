module.exports = class Questions {
    constructor(question, format) {
        this.question = question;
        this.format = format;
        this.options = {};
        this.answer = "";
        
        this.questionData = {
            correctAttempts: 0,
            incorrectAttempts: 0,
        }
    }
}