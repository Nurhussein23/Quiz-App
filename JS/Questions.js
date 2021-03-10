export default function Question(question, choices,answerkey){
  this.question = question;
  this.choices = choices;
  this.answerkey = answerkey
}


Question.prototype.isCorrect = function(userquess){
  return userquess === this.answerkey
}