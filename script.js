function openModal(name) {

    document.getElementById(
        name + "Modal"
    ).style.display = "flex";
}

function closeModal(name) {

    document.getElementById(
        name + "Modal"
    ).style.display = "none";
}

/* АНИМАЦИИ */

const observer =
    new IntersectionObserver(entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
            }

        });

    });

document
    .querySelectorAll("section")
    .forEach(section => {

        section.classList.add("hidden");

        observer.observe(section);

    });

/* ===== QUIZ ===== */

const quizData = [

    {
        question: "Где находится Башня Грифонов?",

        answers: [
            "Гороховая улица",
            "Васильевский остров",
            "Невский проспект"
        ],

        correct: 1
    },

    {
        question: "Кто, согласно легенде, охранял секреты Вильгельма Пеля?",

        answers: [
            "Грифоны",
            "Призраки",
            "Вороны"
        ],

        correct: 0
    },

    {
        question: "Кто появляется в Ротонде в полночь?",

        answers: [
            "Распутин",
            "Пётр I",
            "Люцифер"
        ],

        correct: 2
    },

    {
        question: "Какое существо прокляло Петербург?",

        answers: [
            "Кикимора",
            "Русалка",
            "Баба Яга"
        ],

        correct: 0
    }
];

let currentQuestion = 0;
let score = 0;

loadQuestion();

function loadQuestion() {

    const q = quizData[currentQuestion];

    document.getElementById("question")
        .innerText = q.question;

    const answers =
        document.getElementById("answers");

    answers.innerHTML = "";

    q.answers.forEach((answer, index) => {

        const btn =
            document.createElement("button");

        btn.classList.add("answer-btn");

        btn.innerText = answer;

        btn.onclick = () => checkAnswer(index);

        answers.appendChild(btn);

    });

    document.getElementById("nextBtn")
        .style.display = "none";
}

function checkAnswer(selected) {

    const buttons =
        document.querySelectorAll(".answer-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
    });

    if (selected === quizData[currentQuestion].correct) {

        buttons[selected]
            .classList.add("correct");

        score++;

    } else {

        buttons[selected]
            .classList.add("wrong");

        buttons[
            quizData[currentQuestion].correct
        ].classList.add("correct");
    }

    document.getElementById("nextBtn")
        .style.display = "inline-block";
}

function nextQuestion() {

    currentQuestion++;

    if (currentQuestion < quizData.length) {

        loadQuestion();

    } else {

        showResult();

    }
}

function showResult() {

    let text = "";

    if (score === 5) {

        text =
            "🏆 Хранитель легенд Петербурга";

    } else if (score >= 3) {

        text =
            "📚 Опытный исследователь";

    } else {

        text =
            "🚶 Турист, которому ещё многое предстоит узнать";
    }

    document.getElementById("question")
        .innerHTML = "";

    document.getElementById("answers")
        .innerHTML = "";

    document.getElementById("nextBtn")
        .style.display = "none";

    document.getElementById("result")
        .innerHTML = `
Ваш результат: ${score}/5
<br><br>
${text}
<br><br>

<button onclick="restartQuiz()"
class="restart-btn">
Пройти заново
</button>
`;
}
function restartQuiz() {

    currentQuestion = 0;
    score = 0;

    document.getElementById("result")
        .innerHTML = "";

    loadQuestion();

}
