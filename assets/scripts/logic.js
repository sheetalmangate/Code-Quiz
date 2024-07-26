/*
   This file contains common logic.
*/

//fetch JSON data 
async function fetchQuizData(quizId) {
    
    const requestURL = `./assets/json/quiz-${quizId}.json`;
  
    try {
      const response = await fetch(requestURL);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const quiz = await response.json();  
      return quiz;
    } catch (error) {
      console.error(`Failed to fetch quiz data: ${error}`);
    }
  }

//This function is use to render quiz when accessed from drop down menu
const quizList = document.querySelectorAll("#quiz-list > li > span");
const url = window.location.origin+"/quiz.html";

quizList.forEach((item) => { 
    
    let quizId = item.dataset.id;
    item.addEventListener("click", function(event) {
         localStorage.setItem("quizeId",quizId);
         location.assign(url);
    } );
});


  