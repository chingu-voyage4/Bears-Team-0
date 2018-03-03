const quizModel = require('../models/quiz/mongodb_quiz');
const Question = require('../models/quiz/Question');

const log   = require('debug')('api:controller-quiz');
const error = require('debug')('api:error');


/*
Reading a quiz
*/
module.exports.findQuiz = function(req, res, next){
    quizModel.read(req.params.id)
    .then(found => {
        log('Sending quiz ' + found);
        res.json({ data: found });
    })
    .catch(err => next(err));
};

module.exports.readAllQuizzes = function(req, res, next) {
    const user = quizModel.readAll();
    user.then(x => {
            res.json({data: x});
        })
        .catch(e => next(e));
}

/*
Creating a user
*/
module.exports.createQuiz = function(req, res, next) {
    quizModel.create(req.body.quiz)
    .then((quiz) => {
        // log('Sending new quiz: + util.inspect(quiz)');
        res.json({ quiz: quiz });
    }).catch(err => next(err));
}

module.exports.deleteQuiz = function(req, res, next) {
    /*
    This is hardcoded for initial testing. Use request param later
    */
    const user = quizModel.deleteQuiz("5a8eef4f4796351bcccb4d1d");

    user.then(() => {
        log('Deleting quiz ');
        quizModel.readAll();
        res.json({status: "quiz deleted"});
    })
    .catch(e => next(e))
}

module.exports.addQuestion = function(req, res, next) {
    /*
    Quiz is hardcoded for initial testing. Use request param later
    */
   const question = req.body.question;
   const format = req.body.format;

   const questionToPush = new Question(question, format);
   const user = quizModel.addQuestion("5a8db085ede1ae12a48d660e", questionToPush);

   user.then(() => {
       log('adding quiz');
       quizModel.read("5a8db085ede1ae12a48d660e")
            .then(x => {
                res.json({data: x});
            })
            .catch(e => next(e));
   }).catch(e => next(e))
}