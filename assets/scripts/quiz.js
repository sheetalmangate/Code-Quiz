


const renderQuiz = async function( ) {

    const quizError = document.querySelector("#quiz-error");
    const quizInfo = document.querySelector("#quiz-info");
    quizId = parseInt( localStorage.getItem("quizeId") );

    console.log("---------loading quiz :----"+quizId); //debug code
    if( isNaN( quizId ) ) {

        quizInfo.classList.add("d-none");
        quizError.classList.remove("d-none");

        console.log("-----No quiz found to load ------------");
        
    } else {

        quizInfo.classList.remove("d-none");
        quizError.classList.add("d-none");

        const quiz = await fetchQuizData(quizId);
        console.log(quiz["quizName"]);

        const quizName = document.querySelector("#quiz-name");
        const quizDesc = document.querySelector("#quiz-desc");
        const totalCount = document.querySelector("#quiz-ques");

        quizName.textContent = quiz.quizName;
        quizDesc.textContent = quiz.quizDesc;
        totalCount.textContent = quiz.questions.length;

    }
    
}

renderQuiz();
