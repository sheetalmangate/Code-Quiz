// This will handle displaying the leaderboard.
function saveQuizResult(username, quizType, score, totalQuestions) {
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    quizResults.push({ username, quizType, score, totalQuestions });
    localStorage.setItem('quizResults', JSON.stringify(quizResults));
}

document.addEventListener('DOMContentLoaded', () => {
    const quizResults = JSON.parse(localStorage.getItem('quizResults')) || [];
    const leaderboardBody = document.getElementById('leaderboard-body');

    // Group results by username and quiz type, and find the highest score for each
    const groupedResults = {};
    quizResults.forEach(result => {
        const key = `${result.username}-${result.quizType}`;
        if (!groupedResults[key] || groupedResults[key].score < result.score) {
            groupedResults[key] = result;
        }
    });

    // Convert grouped results to an array and sort by score in descending order
    const sortedResults = Object.values(groupedResults).sort((a, b) => b.score - a.score);

    // Display the sorted results with rank
    sortedResults.forEach((result, index) => {
        const row = document.createElement('tr');

        const rankCell = document.createElement('td');
        rankCell.textContent = index + 1;
        row.appendChild(rankCell);

        const usernameCell = document.createElement('td');
        usernameCell.textContent = result.username;
        row.appendChild(usernameCell);

        const quizTypeCell = document.createElement('td');
        quizTypeCell.textContent = result.quizType;
        row.appendChild(quizTypeCell);

        const scoreCell = document.createElement('td');
        scoreCell.textContent = result.score;
        row.appendChild(scoreCell);

        const totalQuestionsCell = document.createElement('td');
        totalQuestionsCell.textContent = result.totalQuestions;
        row.appendChild(totalQuestionsCell);

        leaderboardBody.appendChild(row);
    });
});