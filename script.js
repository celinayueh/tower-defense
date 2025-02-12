// awesome sauce

// variables
let timeRemaining = 124; // default time in seconds
let timerReady = true; // debounce for start button
let interval; // id for setInterval
let switchSoundsEnabled = false;
//audio
let startSound = new Audio("audio/VEX IQ countdown.mp3");
let endSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-end-sound.mp3");
let switchSound = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Match-driver-switch-sound.mp3");
switchSound.volume = 0.7; // volume
let shortBeep = new Audio("https://www.studentroboticseducation.com/wp-content/uploads/2022/07/Short-beep.mp3");
let lastCount = new Audio("audio/final countdown.mp3");

// functions

//Match timer
function timerCount() {
    if ((timeRemaining == 56 || timeRemaining == 66) && switchSoundsEnabled) {
        switchSound.play(); // Play switch side sounds
    }
    if (timeRemaining <= 1) { // Regular countdown
        timerStop();
        timerText.innerHTML = "TIME UP";
        timerReady = true;
    }

    timeRemaining -= 1;
    if (timeRemaining <= 120) {
        if (!(timerReady)) {
            timerText.innerHTML = timeRemaining.toString() + " seconds";
        }
    }
    if (timeRemaining == 10) {
        lastCount.play(); // Play end countdown
    }
}

function timerStart() {
    if (timerReady) {
        startSound.play();
        timerReady = false;
        timerCount();
        interval = setInterval(timerCount, 1000); // Run timerCount() every second
    }
}

function timerStop() {
    if (!(timerReady)) {
        timerReady = true;
        clearInterval(interval); // stop calling timerCount
    }
}

function timerReset() {
    timerReady = true;
    clearInterval(interval);
    timeRemaining = 124;
    if (timeRemaining <= 120) {
        timerText.innerHTML = timeRemaining.toString() + " seconds";
    } else if (timeRemaining >= 120) {
        timerText.innerHTML = "120 seconds";
    }
}

function switchCountdown() {
    if (timerReady) {
        switchSoundsEnabled = switchSoundsEnabled ? false : true;
        if (switchSoundsEnabled) {
            countdownSwitch.innerHTML = "Disable Switch Sounds"
        } else {
            countdownSwitch.innerHTML = "Enable Switch Sounds"
        }
    }
}

function showScore() {
    timerContainer.style.display = "none";
    scoreContainer.style.display = "flex";
}

//Score calculator

function calculateScores(inputRef) {
    if (inputRef) {
        const minVal = inputRef.getAttribute("min");
        const maxVal = inputRef.getAttribute("max");
        const defVal = inputRef.getAttribute("placeholder");

        var minNum = parseInt(minVal);
        var maxNum = parseInt(maxVal);

        if (parseInt(inputRef.value) > maxNum || parseInt(inputRef.value) < minNum) {
            inputRef.value = defVal;
        }
    }

    let score1 = 0;
    let score2 = 0;

    const shiftedTowers1 = parseInt(document.getElementById("shifted-towers-t1").value) || 0;
    const purple1 = parseInt(document.getElementById("purple-t1").value) || 0;
    const orange1 = parseInt(document.getElementById("orange-t1").value) || 0;
    const teal1 = parseInt(document.getElementById("teal-t1").value) || 0;
    const fullTower1 = parseInt(document.getElementById("full-tower-t1").value) || 0;
    const partialTower1 = (document.getElementById("partial-tower-t1").value) || 0;
    const singleTower1 = (document.getElementById("single-tower-t1").value) || 0;

    const shiftedTowers2 = parseInt(document.getElementById("shifted-towers-t2").value) || 0;
    const purple2 = parseInt(document.getElementById("purple-t2").value) || 0;
    const orange2 = parseInt(document.getElementById("orange-t2").value) || 0;
    const teal2 = parseInt(document.getElementById("teal-t2").value) || 0;
    const fullTower2 = parseInt(document.getElementById("full-tower-t2").value) || 0;
    const partialTower2 = (document.getElementById("partial-tower-t2").value) || 0;
    const singleTower2 = (document.getElementById("single-tower-t2").value) || 0;

    const scoreKey = [1, 5, 6, 9, 5, 3, 2];

    let matchData1 = [
        shiftedTowers1,
        purple1,
        orange1,
        teal1,
        fullTower1,
        partialTower1,
        singleTower1
    ];

    let matchData2 = [
        shiftedTowers2,
        purple2,
        orange2,
        teal2,
        fullTower2,
        partialTower2,
        singleTower2
    ];
    
    for (let i = 0; i < scoreKey.length; i++) {
            score1 += matchData1[i] * scoreKey[i];
            score2 += matchData2[i] * scoreKey[i];

    }
    document.getElementById("score-t1").style.color = "black";
    document.getElementById("score-t1").innerHTML = "Score: " + score1.toString();

    document.getElementById("score-t2").style.color = "black";
    document.getElementById("score-t2").innerHTML = "Score: " + score2.toString();
}

function clearFields() {
    document.getElementById("shifted-towers-t1").value = "";
    document.getElementById("purple-t1").value = "";
    document.getElementById("orange-t1").value = "";
    document.getElementById("teal-t1").value = "";
    document.getElementById("full-tower-t1").value = "";
    document.getElementById("partial-tower-t1").value = "";
    document.getElementById("single-tower-t1").value = "";

    document.getElementById("shifted-towers-t2").value = "";
    document.getElementById("purple-t2").value = "";
    document.getElementById("orange-t2").value = "";
    document.getElementById("teal-t2").value = "";
    document.getElementById("full-tower-t2").value = "";
    document.getElementById("partial-tower-t2").value = "";
    document.getElementById("single-tower-t2").value = "";

    calculateScores();
}

function showTimer() {
    scoreContainer.style.display = "none";
    timerContainer.style.display = "flex";
}

// button events
window.addEventListener("DOMContentLoaded", function () {
    // timer variables
    const startBtn = document.getElementById("startBtn");
    const stopBtn = document.getElementById("stopBtn");
    const resetBtn = document.getElementById("resetBtn");
    const countdownSwitch = document.getElementById("countdownSwitch");
    const scoreSwitch = document.getElementById("scoreSwitch");
    const timerText = this.document.getElementById("timerText");

    // score variables
    const shiftedTowers1 = document.getElementById("shifted-towers-t1");
    const purple1 = document.getElementById("purple-t1");
    const orange1 = document.getElementById("orange-t1");
    const teal1 = document.getElementById("teal-t1");
    const fullTower1 = document.getElementById("full-tower-t1");
    const partialTower1 = document.getElementById("partial-tower-t1");
    const singleTower1 = document.getElementById("single-tower-t1");

    const shiftedTowers2 = document.getElementById("shifted-towers-t2");
    const purple2 = document.getElementById("purple-t2");
    const orange2 = document.getElementById("orange-t2");
    const teal2 = document.getElementById("teal-t2");
    const fullTower2 = document.getElementById("full-tower-t2");
    const partialTower2 = document.getElementById("partial-tower-t2");
    const singleTower2 = document.getElementById("single-tower-t2");

    const clearBtn = document.getElementById("clearBtn");
    const timerSwitch = document.getElementById("timerSwitch");

    if (startBtn) { // Check if buttons loaded on browser
        // timer events
        startBtn.addEventListener("click", timerStart);
        stopBtn.addEventListener("click", timerStop);
        resetBtn.addEventListener("click", timerReset);
        countdownSwitch.addEventListener("click", switchCountdown);
        scoreSwitch.addEventListener("click", showScore);
        // score events
        const elements = [
            { elem: shiftedTowers1, type: '' },
            { elem: purple1, type: '' },
            { elem: orange1, type: '' },
            { elem: teal1, type: '' },
            { elem: fullTower1, type: '' },
            { elem: partialTower1, type: '' },
            { elem: singleTower1, type: '' },
            { elem: shiftedTowers2, type: '' },
            { elem: purple2, type: '' },
            { elem: orange2, type: '' },
            { elem: teal2, type: '' },
            { elem: fullTower2, type: '' },
            { elem: partialTower2, type: '' },
            { elem: singleTower2, type: '' },
        ];

        elements.forEach(item => {
            const { elem, type } = item;
            if (type === "checkbox") {
                elem.addEventListener("change", () => calculateScores(elem));
            } else {
                elem.addEventListener("keyup", () => calculateScores(elem));
                elem.addEventListener("change", () => calculateScores(elem));
            }
        });

        // score buttons
        clearBtn.addEventListener("click", clearFields);
        timerSwitch.addEventListener("click", showTimer);
    }
});