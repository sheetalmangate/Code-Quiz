/*
   This file contains comman logic.
*/

async function fetchQuizData(quizId) {
    
    const requestURL = `./assets/json/quiz-${quizId}.json`;
    //const requestURL = `https://sheetalmangate.github.io/prework-study-guide/assets/json/quiz-${quizId}.json`;
    console.log(`Fetching data from: ${requestURL}`);  // Debug log
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

//This function is use to render quiz when clicked from drop down
const quizList = document.querySelectorAll("#quiz-list > li > span");

quizList.forEach((item) => { 
    
    let quizId = item.dataset.id;

    item.addEventListener("click", function(event) {
         localStorage.setItem("quizeId",quizId);
         location.reload();
    } );
});


  