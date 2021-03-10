export default function Quiz(question){
  this.question = question
  this.score = 0
  this.currentIndex = 0
}

Quiz.prototype.getCurrentQuestion = function(){
  return this.question[this.currentIndex]
}

Quiz.prototype.hasEnded = function(){
  return this.currentIndex === this.question.length
}

Quiz.prototype.nextIndex = function(){
  this.currentIndex++
}

Quiz.prototype.quess = function(userquess){
  const currentQuestion = this.question[this.currentIndex];
  if(currentQuestion.isCorrect(userquess)){
    this.score++
  }
  this.nextIndex()
}
