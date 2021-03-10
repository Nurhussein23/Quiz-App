import Question from './Questions.js';
import Quiz from "./Quiz.js";



const App = (() =>{
 
  // cache DOM

  const quizEl = document.querySelector('.jabquiz')
  const quizQuestionEL = document.querySelector('.jabquiz__question')
  const trackerEl = document.querySelector('.jabquiz__tracker')
  const taglineEL = document.querySelector('.jabquiz__tagline')
  const choicesEL = document.querySelector('.jabquiz__choices')
  const progressInnerEL = document.querySelector('.progress__inner')
  const nextButtonEL =document.querySelector('.next')
  const restartButtonEL =document.querySelector('.restart')


  const q1 = new Question('First president of US'
  ,['Barack Obama','George','Nur','Superman']
  ,1)
  const q2 = new Question('When was Javascript created?'
  ,['June 1995','May 1995','July 1885','Sep 1996']
  ,1)
  const q3 = new Question('What does CSS stand for'
  ,['County Sheriff Service','Cascading style smith','Cascading style sheet']
  ,2)
  const q4 = new Question('The full form of HTML is...'
  ,['Hyper text Markup Language','Hold The Mic','ERROR']
  ,0)
  const q5 = new Question('console.log(typeog []) would return what?'
  ,['Array','Object','String','Boolean']
  ,1)

 const quiz = new Quiz([q1, q2, q3, q4, q5])


  const listeners = _ =>{
    nextButtonEL.addEventListener('click',function(){
      const selectedRadioElem = document.querySelector('input[name="choice"]:checked')
      
      if(selectedRadioElem){
        const key = Number(selectedRadioElem.getAttribute('data-order'))
        quiz.quess(key)
        renderAll()
      }
    })
    restartButtonEL.addEventListener("click",function(){
      quiz.reset()
      renderAll()
      nextButtonEL.style.opacity = 1;
      changeText(taglineEL,'Pick and option below!')
    })
  }


const changeText = (elem,value)=>{
  elem.innerHTML = value;
}

 const renderQuestion = _ =>{
      const question = quiz.getCurrentQuestion().question;
      changeText(quizQuestionEL,question)
 } 
 
 
  const renderChoiceElements = _ =>{
    let markup ='';
     const currentChoice = quiz.getCurrentQuestion().choices;
     currentChoice.forEach((elem,index) => {
        markup+=`
        <li class="jabquiz__choice">
        <input type="radio" name="choice" class="jabquiz__input" data-order=${index} id="choice${index}" >
         <label for="choice${index}" class="jabquiz__label">
           <i></i>
           <span>${elem}</span>
         </label>
      </li>

        `
     });
     choicesEL.innerHTML = markup;
  }
  
   const renderTracker = _ =>{
     const index = quiz.currentIndex;
     changeText(trackerEl,`${index+1} of ${quiz.question.length}`)
   }

const getPercentage = (num1,num2) =>{
  return Math.round((num1/num2) * 100)
}
  const renderProgess = _ => {
    const currentWidth = getPercentage(quiz.currentIndex,quiz.question.length)
    launch(0,currentWidth)
  }
 

  const launch = (width, maxPercent) =>{
    let loadingBar = setInterval(function(){
      if(width > maxPercent){
        clearInterval(loadingBar)
      }else{
        width++
        progressInnerEL.style.width = width + "%"
      }
    },3)
  }
   

  const renderEndScreen = _ =>{
    changeText(quizQuestionEL,`Great Job!`)
    changeText(taglineEL,`Complete!`)
    changeText(trackerEl,`${getPercentage(quiz.score, quiz.question.length)}%`)
     nextButtonEL.style.opacity=0
    renderProgess()
  }
 
 const renderAll = _ =>{
   if (quiz.hasEnded()){
     renderEndScreen()
   }else{
    //  1. render the question
     renderQuestion()
    //  2. render choices elements
    renderChoiceElements()
    //  3. render Tracker
    renderTracker()
    //  4. render progress
    renderProgess()
   }
 }
 return{
   renderAll : renderAll,
   listeners:listeners
   
 }
})()

App.renderAll()
App.listeners()