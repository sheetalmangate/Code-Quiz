
function renderQuiz(quiz) {
  const header = document.querySelector("header");
  header.innerHTML = '';  // Clear previous content
  const myH1 = document.createElement("h1");
  myH1.textContent = quiz.quizName;
  header.appendChild(myH1);

  const section = document.querySelector("section");
  if (!section) {
    const newSection = document.createElement("section");
    document.body.appendChild(newSection);
    renderQuizContent(newSection, quiz);
  } else {
    section.innerHTML = '';  // Clear previous content
    renderQuizContent(section, quiz);
  }
}

function renderQuizContent(section, quiz) {
  quiz.questions.forEach((question, questionIndex) => {
    const h2Element = document.createElement('h2');
    h2Element.textContent = question.question;
    section.appendChild(h2Element);

    const formElement = document.createElement('form');
    formElement.className = 'quiz-form';

    question.options.forEach((option, optionIndex) => {
      const divElement = document.createElement('div');
      divElement.className = 'form-check';

      const inputElement = document.createElement('input');
      inputElement.type = 'radio';
      inputElement.name = `question-${questionIndex}`;
      inputElement.value = optionIndex;  // Store the index as the value
      inputElement.className = 'form-check-input';
      inputElement.id = `option-${questionIndex}-${optionIndex}`;

      const labelElement = document.createElement('label');
      labelElement.className = 'form-check-label';
      labelElement.htmlFor = inputElement.id;
      labelElement.textContent = option;

      divElement.appendChild(inputElement);
      divElement.appendChild(labelElement);
      formElement.appendChild(divElement);
    });

    section.appendChild(formElement);
  });

  const submitButton = document.createElement('button');
  submitButton.textContent = 'Submit';
  submitButton.className = 'btn btn-primary mt-3';
  submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    checkAnswers(quiz);
  });
  section.appendChild(submitButton);
}

function checkAnswers(quiz) {
  const forms = document.querySelectorAll('.quiz-form');
  forms.forEach((form, questionIndex) => {
    const selectedOption = form.querySelector('input[type="radio"]:checked');
    const resultElement = document.createElement('div');
    if (selectedOption) {
      const selectedAnswerIndex = parseInt(selectedOption.value, 10);
      if (selectedAnswerIndex === quiz.questions[questionIndex].answer) {
        resultElement.textContent = 'Correct!';
        resultElement.className = 'text-success';
      } else {
        resultElement.textContent = 'Incorrect!';
        resultElement.className = 'text-danger';
      }
    } else {
      resultElement.textContent = 'No answer selected!';
      resultElement.className = 'text-warning';
    }
    form.appendChild(resultElement);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const dropdownItems = document.querySelectorAll('.dropdown-item');
  dropdownItems.forEach(item => {
    item.addEventListener('click', async (event) => {
      const quizId = event.target.getAttribute('data-quiz');
      console.log(`Selected quiz: ${quizId}`);  // Debug log
      const quiz = await fetchQuizData(quizId);
      if (quiz) {
        console.log(`Fetched quiz data:`, quiz);  // Debug log
        renderQuiz(quiz);
      }
    });
  });
});
