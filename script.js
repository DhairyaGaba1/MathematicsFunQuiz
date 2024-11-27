const questions = [
    {
        question: "What is the other name of Exponential Form",
        answers: [
            { text: "Law of Exponent", correct: false },
            { text: "Notation of Exponent", correct: false },
            { text: "Exponents and Power Notation", correct: false },
            { text: "None of the above", correct: true },

        ]
    },
    
    {
        question: "Convert the following number into scientific notation/ exponential form - 694200000.",
        answers: [
            { text: "69420 x 10", correct: false },
            { text: "6.9 x 10^6", correct: false },
            { text: "6.9 x 10^8", correct: true },
            { text: "None of the above", correct: false },

        ]
    },
    
    {
        question: "Which of the following are in exponential form?",
        answers: [
            { text: "9000 = 9 x 10^3", correct: false },
            { text: "420690 = 4.2069 x 10^5", correct: false },
            { text: "666.690 = 6.6669 x 10^4", correct: false },
            { text: "Both Options (i) and (ii)", correct: true },

        ]
    },
    
    {
        question: "What is the number having 100 zeros called?",
        answers: [
            { text: "Googol", correct: true },
            { text: "Google", correct: false },
            { text: "Pi", correct: false },
            { text: "None of the above", correct: false },

        ]
    },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("Next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion(); 
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question; 

    currentQuestion.answers.forEach(answer => {
        const button= document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);  
        
    })
}

function resetState(){
    nextButton.style.display = "none";
    while (answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    })
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `<h1>Quiz Completed</h1><p>Your score is ${score} out of ${questions.length}</p>`;
    nextButton.innerHTML = "Play Again"
    nextButton.style.display = "block";
}
nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    } 
})

startQuiz();
