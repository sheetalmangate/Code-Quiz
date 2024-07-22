async function renderQuizQuestions() {

    const requestURL = "https://sheetalmangate.github.io/prework-study-guide/assets/json/quiz.json";
    const request = new Request(requestURL);
  
    const response = await fetch(request);
    const quiz = await response.json();
  
    populateQuize(quiz);
    populateQuestions(quiz);
    
  }


  function populateQuize(obj) {
   
    const header = document.querySelector("header");
    const myH1 = document.createElement("h1");
    myH1.textContent = obj.quizName;
    
    header.appendChild(myH1);
  
  }

  function populateQuestions(obj) {

    
    const questions = obj.questions;
    const section = document.querySelector("section");
    for( const question of  questions ) {

        const h2Element = document.createElement('h2');
        const ulElement = document.createElement('ul');

        h2Element.textContent = question.question;
        section.appendChild(h2Element);

        const options = question.options;
        
        // populate option for question
        for( const option of options ) {
            const liElement = document.createElement('li');
            const preElement = document.createElement('pre');
            preElement.textContent = option;
            liElement.appendChild(preElement);
            ulElement.appendChild( liElement );
        }
        section.appendChild(ulElement);
        
    }

  }

  //This function displays list of questions and options from JSON file
  renderQuizQuestions();

  