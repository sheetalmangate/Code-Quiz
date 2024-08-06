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

const quizList = document.querySelectorAll("#quiz-list > li > span");
const url = window.location.origin+"/quiz.html";

quizList.forEach((item) => { 
  
  let quizId = item.dataset.id;
  item.addEventListener("click", function(event) {
       localStorage.setItem("quizeId",quizId);
       location.assign(url);
  } );
});


document.addEventListener('DOMContentLoaded', function () {
const elements = document.querySelectorAll('.card[data-id], .dropdown-item[data-id]');
elements.forEach(element => {
  element.addEventListener('click', function () {
    const quizId = this.getAttribute('data-id');
    // Update local storage with the selected quiz ID
    localStorage.setItem('quizeId', quizId);
    // Redirect to the quiz page based on the data-id
    window.location.href = `quiz.html?id=${quizId}`;
  });
});
});


function checkAnswers(quiz) {
  const username = prompt("Enter your username:");
  let score = 0;

  quiz.questions.forEach((question, questionIndex) => {
    const selectedOption = document.querySelector(`input[name="question-${questionIndex}"]:checked`);
    if (selectedOption && parseInt(selectedOption.value) === question.correctOption) {
      score++;
    }
  });

  const result = {
    username: username,
    score: score,
    total: quiz.questions.length
  };

  saveResult(result);
}

function saveResult(result) {
  let leaderboard = JSON.parse(localStorage.getItem("leaderboard")) || [];
  leaderboard.push(result);
  localStorage.setItem("leaderboard", JSON.stringify(leaderboard));
}