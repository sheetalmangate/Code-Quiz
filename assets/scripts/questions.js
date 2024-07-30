function renderQuizStartButton(quiz) {
  const section = document.querySelector("section");
  section.innerHTML = ""; // Clear previous content

  const startButton = document.createElement("button");
  startButton.textContent = "Start Quiz";
  startButton.className = "btn btn-primary mt-3";
  startButton.addEventListener("click", () => {
    renderQuiz(quiz);
  });

  section.appendChild(startButton);
}

function renderQuiz(quiz) {
  /*const header = document.querySelector("header");
  header.innerHTML = '';  // Clear previous content
  const myH1 = document.createElement("h1");
  myH1.textContent = quiz.quizName;
  header.appendChild(myH1);*/

  const section = document.querySelector("section");
  section.innerHTML = "";

  renderQuizContent(section, quiz);
}

function renderQuizContent(section, quiz) {
  quiz.questions.forEach((question, questionIndex) => {
    const h2Element = document.createElement("h2");
    h2Element.textContent = question.question;
    section.appendChild(h2Element);

    const formElement = document.createElement("form");
    formElement.className = "quiz-form";

    question.options.forEach((option, optionIndex) => {
      const divElement = document.createElement("div");
      divElement.className = "form-check";

      const inputElement = document.createElement("input");
      inputElement.type = "radio";
      inputElement.name = `question-${questionIndex}`;
      inputElement.value = optionIndex; // Store the index as the value
      inputElement.className = "form-check-input";
      inputElement.id = `option-${questionIndex}-${optionIndex}`;

      const labelElement = document.createElement("label");
      labelElement.className = "form-check-label";
      labelElement.htmlFor = inputElement.id;
      labelElement.textContent = option;

      divElement.appendChild(inputElement);
      divElement.appendChild(labelElement);
      formElement.appendChild(divElement);
    });

    section.appendChild(formElement);
  });

  const submitButton = document.createElement("button");
  submitButton.textContent = "Submit";
  submitButton.className = "btn btn-primary mt-3";
  submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    checkAnswers(quiz);
  });
  section.appendChild(submitButton);
}

document.addEventListener("DOMContentLoaded", () => {
  const dropdownItems = document.querySelectorAll(".dropdown-item");
  dropdownItems.forEach((item) => {
    item.addEventListener("click", async (event) => {
      const quizId = event.target.getAttribute("data-quiz");
      console.log(`Selected quiz: ${quizId}`);
      const quiz = await fetchQuizData(quizId);
      if (quiz) {
        console.log(`Fetched quiz data:`, quiz);
        renderQuizStartButton(quiz);
      }
    });
  });
});

const init = async function () {
  const quizId = parseInt(localStorage.getItem("quizeId"));
  const quiz = await fetchQuizData(quizId);
  renderQuiz(quiz);
};

init();
function saveQuizResult(quizName, correctAnswers, totalQuestions) {
  if (typeof localStorage !== "undefined") {
    const quizResult = {
      quizName: quizName,
      correctAnswers: correctAnswers,
      totalQuestions: totalQuestions,
    };

    localStorage.setItem("quizResult", JSON.stringify(quizResult));
  } else {
    console.error("localStorage is not available.");
  }
}

function checkAnswers(quiz) {
  const forms = document.querySelectorAll('.quiz-form');
  let correctAnswers = 0;
  let totalQuestions = 0;

  forms.forEach((form, questionIndex) => {
    const selectedOption = form.querySelector('input[type="radio"]:checked');
    let resultElement = form.querySelector('.result');
    if (!resultElement) {
      resultElement = document.createElement('div');
      resultElement.className = 'result';
      form.appendChild(resultElement);
    }

    if (selectedOption) {
      const selectedAnswerIndex = parseInt(selectedOption.value, 10);
      if (selectedAnswerIndex === quiz.questions[questionIndex].answer) {
        resultElement.textContent = 'Correct!';
        resultElement.className = 'text-success result';
        correctAnswers++;
      } else {
        resultElement.textContent = 'Incorrect!';
        resultElement.className = 'text-danger result';
      }
      totalQuestions++;
    } else {
      resultElement.textContent = 'No answer selected!';
      resultElement.className = 'text-warning result';
    }
  });

  saveQuizResult(quiz.quizName, correctAnswers, totalQuestions);
}
