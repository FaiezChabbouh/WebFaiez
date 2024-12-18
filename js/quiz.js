let currentQuestionIndex = 0;
let score = 0;

const questions = [
    { question: "What is the capital of France?", options: ["Berlin", "Madrid", "Paris", "Lisbon"], correctAnswers: [2] },
    { question: "Which of these is a programming language?", options: ["Python", "Snake", "JavaScript", "Java"], correctAnswers: [0, 2, 3] },
    { question: "Who developed the theory of relativity?", options: ["Newton", "Einstein", "Tesla", "Curie"], correctAnswers: [1] },
    { question: "What is the largest planet in our Solar System?", options: ["Earth", "Mars", "Jupiter", "Venus"], correctAnswers: [2] },
    { question: "Which element has the chemical symbol 'O'?", options: ["Oxygen", "Gold", "Silver", "Hydrogen"], correctAnswers: [0] },
    { question: "What is the boiling point of water at sea level in Celsius?", options: ["100", "212", "37", "0"], correctAnswers: [0] },
    { question: "Which country is known as the Land of the Rising Sun?", options: ["China", "South Korea", "Japan", "Thailand"], correctAnswers: [2] },
    { question: "Who wrote 'Romeo and Juliet'?", options: ["Shakespeare", "Hemingway", "Dickens", "Austen"], correctAnswers: [0] },
    { question: "Which programming language is primarily used for web development?", options: ["C++", "JavaScript", "Swift", "Kotlin"], correctAnswers: [1] },
    { question: "What is the square root of 64?", options: ["6", "8", "10", "12"], correctAnswers: [1] }
];

const startQuizButton = document.getElementById('start-quiz-button');
const quizContainer = document.getElementById('quiz-container');
const questionContainer = document.getElementById('question-container');
const optionsContainer = document.getElementById('options');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreSpan = document.getElementById('score');
const emoji = document.getElementById('emoji');
const restartButton = document.getElementById('restart-button');
const viewAnswersButton = document.getElementById('view-answers');
const answersContainer = document.getElementById('answers');
const multiAnswerWarning = document.getElementById('multi-answer-warning');

startQuizButton.addEventListener('click', startQuiz);
nextButton.addEventListener('click', nextQuestion);
restartButton.addEventListener('click', restartQuiz);
viewAnswersButton.addEventListener('click', showAnswers);

function startQuiz() {
    startQuizButton.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    displayQuestion();
}

function displayQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionContainer.textContent = currentQuestion.question;
    optionsContainer.innerHTML = '';
    currentQuestion.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.textContent = option;
        optionButton.classList.add('option-button');
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionButton);
    });
    nextButton.disabled = true;
    multiAnswerWarning.classList.add('hidden');
}

function selectOption(index) {
    const currentQuestion = questions[currentQuestionIndex];
    const optionButtons = optionsContainer.querySelectorAll('.option-button');
    if (currentQuestion.correctAnswers.includes(index)) {
        optionButtons[index].classList.add('correct');
        score++;
    } else {
        optionButtons[index].classList.add('incorrect');
    }
    optionButtons.forEach(button => (button.disabled = true));
    nextButton.disabled = false;
    if (currentQuestion.correctAnswers.length > 1) {
        multiAnswerWarning.classList.remove('hidden');
    }
}

function nextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        displayQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizContainer.classList.add('hidden');
    scoreContainer.classList.remove('hidden');
    scoreSpan.textContent = score;
    emoji.textContent = score >= 7 ? '🎉 Success!' : '😐 Try Again';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreContainer.classList.add('hidden');
    startQuizButton.classList.remove('hidden');
    nextButton.disabled = true;
    optionsContainer.innerHTML = '';
}

function showAnswers() {
    answersContainer.classList.remove('hidden');
    answersContainer.innerHTML = '';
    questions.forEach((question, index) => {
        const questionAnswer = document.createElement('div');
        questionAnswer.textContent = `${question.question} - Correct Answers: ${question.correctAnswers.map(i => question.options[i]).join(', ')}`;
        answersContainer.appendChild(questionAnswer);
    });
}
