const express         = require("express");
const quizRouter      = express.Router();
const quizController  = require("../controllers/quiz_controller");

/*
GET quiz count
*/
quizRouter.get('/count', quizController.getQuizCount);
/*
GET all quizzes
(for testing)
*/
quizRouter.get("/all", quizController.findAllQuizzes);
/*
GET 6 most popular quizzes
*/
quizRouter.get("/popular", quizController.findPopularQuizzes);

/*
GET all user's quizzes
*/
quizRouter.post("/userQuizzes", quizController.findUserQuizzes);

/*
QUIZ CRUD Routes
*/

/*
POST create quiz
*/
quizRouter.post("/", quizController.createQuiz);
/*
GET quiz by id
*/
quizRouter.get("/:id", quizController.findQuiz);
/*
PUT quiz
*/
quizRouter.put("/:id", quizController.updateQuiz);
/*
DELETE quiz by id
*/
quizRouter.delete("/:id", quizController.deleteQuiz);

module.exports = quizRouter