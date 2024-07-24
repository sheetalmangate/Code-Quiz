const btnStart = document.querySelector("#btn-start-quiz");

const renderQuiz = async function( ) {

    const quizError = document.querySelector("#quiz-error");
    const quizInfo = document.querySelector("#quiz-info");
    quizId = parseInt( localStorage.getItem("quizeId") );

    if( isNaN( quizId ) ) {

        quizInfo.classList.add("d-none");
        quizError.classList.remove("d-none");
       
    } else {

        quizInfo.classList.remove("d-none");
        quizError.classList.add("d-none");

        const quiz = await fetchQuizData(quizId);

        const quizName = document.querySelector("#quiz-name");
        const quizDesc = document.querySelector("#quiz-desc");
        const totalCount = document.querySelector("#quiz-ques");

        quizName.textContent = quiz.quizName;
        quizDesc.textContent = quiz.quizDesc;
        totalCount.textContent = quiz.questions.length;

    }
    
}

btnStart.addEventListener('click',function(){
    const url = window.location.origin+"/question.html";
    location.assign(url);
});

renderQuiz();
