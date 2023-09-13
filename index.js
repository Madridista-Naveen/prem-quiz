const quizForm = document.getElementById('quiz-form');
const questionText = document.getElementById('question-text');
const timeLeft = document.getElementById('time-left');
const timeTaken = document.getElementById('time-taken');
const questionNumber = document.getElementById('question-number');
let marks=0;



const questions = [
    {
        question: 'Who won the Premier League title in the 2020-2021 season?',
        options: ['Manchester City', 'Liverpool', 'Manchester United', 'Chelsea'],
        correctAnswer: 'Manchester City',
    },
    {
        question: 'Which team holds the record for the most Premier League titles won?',
        options: ['Manchester United', 'Liverpool', 'Arsenal', 'Chelsea'],
        correctAnswer: 'Manchester United',
    },
    {
        question: 'Who is the all-time top scorer in the Premier League?',
        options: ['Thierry Henry', 'Wayne Rooney', 'Alan Shearer', 'Frank Lampard'],
        correctAnswer: 'Alan Shearer',
    },
    {
        question: 'Which club famously won the Premier League with "The Invincibles" in the 2003-2004 season?',
        options: ['Manchester United', 'Arsenal', 'Chelsea', 'Liverpool'],
        correctAnswer: 'Arsenal',
    },
    {
        question: 'Who is the current manager of Liverpool FC in the Premier League as of 2023?',
        options: ['Jurgen Klopp', 'Pep Guardiola', 'Ole Gunnar Solskjaer', 'Thomas Tuchel'],
        correctAnswer: 'Jurgen Klopp',
    },
    {
        question: 'Which player holds the record for the most assists in a single Premier League season?',
        options: ['Kevin De Bruyne', 'Thierry Henry', 'Frank Lampard', 'Mesut Ozil'],
        correctAnswer: 'Kevin De Bruyne',
    },
    {
        question: 'Which stadium is the home ground of Manchester United in the Premier League?',
        options: ['Anfield', 'Old Trafford', 'Etihad Stadium', 'Stamford Bridge'],
        correctAnswer: 'Old Trafford',
    },
    {
        question: 'Who is the all-time top scorer for Chelsea FC in the Premier League?',
        options: ['Didier Drogba', 'Frank Lampard', 'Gianfranco Zola', 'Eden Hazard'],
        correctAnswer: 'Frank Lampard',
    },
    {
        question: 'Which player has won the Golden Boot award for being the top scorer in the Premier League the most times?',
        options: ['Sergio Aguero', 'Harry Kane', 'Thierry Henry', 'Alan Shearer'],
        correctAnswer: 'Alan Shearer',
    },
    {
        question: 'Which Premier League club is known as "The Citizens"?',
        options: ['Liverpool', 'Manchester United', 'Manchester City', 'Arsenal'],
        correctAnswer: 'Manchester City',
    },
    {
        question: 'Which manager famously led Leicester City to win the Premier League in the 2015-2016 season?',
        options: ['Pep Guardiola', 'Jurgen Klopp', 'Claudio Ranieri', 'Jose Mourinho'],
        correctAnswer: 'Claudio Ranieri',
    },
    {
        question: 'Which English striker was known as "The Beast" during his Premier League career?',
        options: ['Emile Heskey', 'Andy Carroll', 'Peter Crouch', 'Alan Shearer'],
        correctAnswer: 'Emile Heskey',
    },
    {
        question: 'In which season did Manchester City achieve a record-breaking 100 points in the Premier League?',
        options: ['2017-2018', '2016-2017', '2018-2019', '2015-2016'],
        correctAnswer: '2017-2018',
    },
    {
        question: 'Which club is nicknamed "The Gunners" in the Premier League?',
        options: ['Chelsea', 'Liverpool', 'Arsenal', 'Tottenham Hotspur'],
        correctAnswer: 'Arsenal',
    },
    {
        question: 'Who is the current captain of Manchester United in the Premier League as of 2023?',
        options: ['Bruno Fernandes', 'Paul Pogba', 'Harry Maguire', 'Jadon Sancho'],
        correctAnswer: 'Harry Maguire',
    },
    {
        question: 'Which team won the first-ever Premier League season in 1992-1993?',
        options: ['Manchester United', 'Liverpool', 'Arsenal', 'Leeds United'],
        correctAnswer: 'Manchester United',
    },
    {
        question: 'Which Premier League club is based in North London and shares its stadium with Arsenal?',
        options: ['Tottenham Hotspur', 'West Ham United', 'Crystal Palace', 'Fulham'],
        correctAnswer: 'Tottenham Hotspur',
    },
    {
        question: 'Which manager has won the most Premier League titles?',
        options: ['Sir Alex Ferguson', 'Arsene Wenger', 'Jose Mourinho', 'Pep Guardiola'],
        correctAnswer: 'Sir Alex Ferguson',
    },
    {
        question: 'Which player has scored the most hat-tricks in Premier League history?',
        options: ['Sergio Aguero', 'Thierry Henry', 'Harry Kane', 'Alan Shearer'],
        correctAnswer: 'Sergio Aguero',
    }
];


let currentQuestion = 0;
let timer;

function displayQuestion() {

    questionText.textContent = questions[currentQuestion].question;
    questionNumber.innerHTML =  ` ${currentQuestion + 1}`;
    const optionsHTML = questions[currentQuestion].options.map(option => `
        <label>
            <input type="radio" name="answer" value="${option}"> ${option}
        </label>
    `).join('');
 
    quizForm.innerHTML = optionsHTML;
    quizForm.innerHTML += '<button type="submit" id="submit-button">Submit</button>';
 }


 function startTimer() {
    let secondsLeft = 30;
    timer = setInterval(function() {
        timeLeft.textContent = secondsLeft;
        secondsLeft--;

        if (secondsLeft < 0) {
            clearInterval(timer);
            submitAnswer();
        }
    }, 1000);
}

const timeTakenArray = []; 
let totalTimeTaken = 0; 


function submitAnswer() {
    clearInterval(timer);
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    const correctAnswer = questions[currentQuestion].correctAnswer;

    let timeSpent = 30 - parseInt(timeLeft.textContent);
    timeTakenArray.push(timeSpent);
    totalTimeTaken += timeSpent;

    if (selectedAnswer && selectedAnswer.value === correctAnswer) {
        timeTaken.textContent = 'Correct';
        marks++;
    } else {
        timeTaken.textContent = 'Incorrect';
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        displayQuestion();
        startTimer();
    } else {
        quizForm.style.display = 'none';
        questionText.textContent = 'Quiz Completed!';
        displayTimeTakenForQuestions();
    }
}

function displayTimeTakenForQuestions() {
    const timeTakenContainer = document.createElement('div');
    timeTakenContainer.classList.add('time-taken-container');
    timeTakenContainer.innerHTML = '<h2>Time Taken for Each Question:</h2>';

    for (let i = 0; i < questions.length; i++) {
        const questionTime = document.createElement('p');
        questionTime.textContent = `Question ${i + 1}: ${timeTakenArray[i]} seconds`;
        timeTakenContainer.appendChild(questionTime);
    }

    const totalQuestionTime = document.createElement('p');
    totalQuestionTime.textContent = `Total Time Taken: ${totalTimeTaken} seconds`;

    marks = Math.max(marks, 0); 
    const totalMarksDisplay = document.createElement('p');
    totalMarksDisplay.textContent = `Total Marks: ${marks} Marks`;

    timeTakenContainer.appendChild(totalQuestionTime);
    timeTakenContainer.appendChild(totalMarksDisplay);
    document.body.appendChild(timeTakenContainer);
}



displayQuestion();
startTimer();
quizForm.addEventListener('submit', function(e) {
    e.preventDefault();
    submitAnswer();
});