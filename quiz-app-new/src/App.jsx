import { useState, useEffect } from 'react';
import './App.css';

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlink and Text Markup Language"],
    answer: 0
  },
  {
    question: "Which HTML tag is used to create a hyperlink?",
    options: ["<link>", "<a>", "<href>", "<url>"],
    answer: 1
  },
  {
    question: "What is the correct HTML element for the largest heading?",
    options: ["<h1>", "<heading>", "<h6>", "<head>"],
    answer: 0
  },
  {
    question: "Which CSS property is used to change the text color?",
    options: ["font-color", "text-color", "color", "background-color"],
    answer: 2
  },
  {
    question: "How do you select an element with id 'demo' in CSS?",
    options: [".demo", "#demo", "demo", "*demo"],
    answer: 1
  },
  {
    question: "What does CSS stand for?",
    options: ["Computer Style Sheets", "Creative Style Sheets", "Cascading Style Sheets", "Colorful Style Sheets"],
    answer: 2
  },
  {
    question: "Which JavaScript method is used to write HTML output?",
    options: ["document.write()", "console.log()", "alert()", "print()"],
    answer: 0
  },
  {
    question: "How do you declare a JavaScript variable?",
    options: ["var carName;", "variable carName;", "v carName;", "declare carName;"],
    answer: 0
  },
  {
    question: "Which operator is used to assign a value to a variable?",
    options: ["*", "-", "=", "+"],
    answer: 2
  },
  {
    question: "What is the correct way to write a JavaScript array?",
    options: ["var colors = 'red', 'green', 'blue'", "var colors = (1:'red', 2:'green', 3:'blue')", "var colors = ['red', 'green', 'blue']", "var colors = 1 = ('red'), 2 = ('green'), 3 = ('blue')"],
    answer: 2
  },
  {
    question: "Which HTML attribute specifies an alternate text for an image?",
    options: ["title", "src", "alt", "href"],
    answer: 2
  },
  {
    question: "What is the correct CSS syntax for making all the <p> elements bold?",
    options: ["p {font-weight: bold;}", "<p> {font-weight: bold;}", "p {text-size: bold;}", "p {bold: true;}"],
    answer: 0
  },
  {
    question: "How do you call a function named 'myFunction' in JavaScript?",
    options: ["call myFunction()", "myFunction()", "call function myFunction", "execute myFunction()"],
    answer: 1
  },
  {
    question: "Which HTML element defines the title of a document?",
    options: ["<meta>", "<title>", "<head>", "<body>"],
    answer: 1
  },
  {
    question: "What does the '===' operator do in JavaScript?",
    options: ["Assigns a value", "Compares values and types", "Compares values only", "Creates a new variable"],
    answer: 1
  },
  {
    question: "Which CSS property controls the text size?",
    options: ["font-style", "text-size", "font-size", "text-style"],
    answer: 2
  },
  {
    question: "How do you add a comment in JavaScript?",
    options: ["<!-- This is a comment -->", "// This is a comment", "/* This is a comment */", "' This is a comment"],
    answer: 1
  },
  {
    question: "Which HTML element is used to define important text?",
    options: ["<b>", "<important>", "<strong>", "<i>"],
    answer: 2
  },
  {
    question: "What is the purpose of the 'addEventListener' method in JavaScript?",
    options: ["To remove an event", "To add an event handler", "To create a new element", "To style an element"],
    answer: 1
  },
  {
    question: "Which CSS property is used to create space around elements?",
    options: ["spacing", "margin", "padding", "border"],
    answer: 1
  }
];

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  useEffect(() => {
    if (timeLeft > 0 && !showResult && !isAnswered) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isAnswered) {
      handleNextQuestion();
    }
  }, [timeLeft, showResult, isAnswered]);

  const handleAnswerClick = (index) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setTimeLeft(30);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setScore(0);
    setTimeLeft(30);
    setShowResult(false);
    setSelectedAnswer(null);
    setIsAnswered(false);
  };

  if (showResult) {
    return (
      <div className="quiz-container">
        <div className="result">
          <h2>Quiz Completed!</h2>
          <p>Your Score: {score} out of {questions.length}</p>
          <p>Percentage: {Math.round((score / questions.length) * 100)}%</p>
          <button onClick={restartQuiz} className="restart-btn">Restart Quiz</button>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <h1>HTML, CSS & JavaScript Quiz</h1>
        <div className="quiz-info">
          <span>Question {currentQuestion + 1} of {questions.length}</span>
          <span>Score: {score}</span>
          <span>Time: {timeLeft}s</span>
        </div>
      </div>
      <div className="question-section">
        <h2>{questions[currentQuestion].question}</h2>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(index)}
              className={`option-btn ${
                selectedAnswer === index
                  ? index === questions[currentQuestion].answer
                    ? 'correct'
                    : 'incorrect'
                  : ''
              }`}
              disabled={isAnswered}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
      {isAnswered && (
        <div className="next-section">
          <button onClick={handleNextQuestion} className="next-btn">
            {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
