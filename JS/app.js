import Question from './Questions.js';
import Quiz from "./Quiz.js";



const q1 = new Question('What is 1+1?',
[2,4,6,8]
,0)

const q2 = new Question('First president of US',
['AL','George','Barack','Nur']
,1)


const qArray = [q1,q1]

const myQuiz = new Quiz(qArray)
