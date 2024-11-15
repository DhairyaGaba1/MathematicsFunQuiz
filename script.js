const questions = [
    {
        question: "What is the traditional attire for Gond women?",
        answers: [
            { text: "Jeans and T-shirts", correct: false },
            { text: "Sari and Choli", correct: true },
            { text: "Dhoti and Kurta", correct: false },
            { text: "None of the above", correct: false },

        ]
    },
    
    {
        question: "Which material is commonly used for Gond Jewellery?",
        answers: [
            { text: "Gold and Platinum", correct: false },
            { text: "Diamond and Gold", correct: false },
            { text: "Silver and Aluminum", correct: true },
            { text: "Pearls and Copper", correct: false },

        ]
    },
    
    {
        question: "What material are Gond toys typically made of?",
        answers: [
            { text: "Metal and Glass", correct: false },
            { text: "Plastic and Rubber", correct: false },
            { text: "Wood, Clay and Bamboo", correct: true },
            { text: "Paper and Cardboard", correct: false },

        ]
    },
    
    {
        question: "Which of the following is made by the Bhattada section of the Gond Tribe?",
        answers: [
            { text: "Dokra Jewellery", correct: true },
            { text: "Pearl Necklaces", correct: false },
            { text: "Colorful Bangles", correct: false },
            { text: "Gold Bracelets", correct: false },

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
