document.addEventListener("DOMContentLoaded", () => {

    const gameArea = document.getElementById("gameArea");
    const startButton = document.getElementById("startButton");
    const gameMessage = document.getElementById("gameMessage");

    const roundDisplay = document.getElementById("round");
    const lastTimeDisplay = document.getElementById("lastTime");
    const bestTimeDisplay = document.getElementById("bestTime");
    const averageTimeDisplay = document.getElementById("averageTime");


    const TOTAL_ROUNDS = 5;

    let round = 0;
    let times = [];

    let waitingForPulse = false;
    let gameRunning = false;

    let pulseTimeout = null;
    let pulseStartTime = null;


    function updateStats() {

        roundDisplay.textContent =
            `${round} / ${TOTAL_ROUNDS}`;

        if (times.length === 0) {
            lastTimeDisplay.textContent = "—";
            bestTimeDisplay.textContent = "—";
            averageTimeDisplay.textContent = "—";
            return;
        }

        const last =
            times[times.length - 1];

        const best =
            Math.min(...times);

        const average =
            Math.round(
                times.reduce(
                    (sum, value) => sum + value,
                    0
                ) / times.length
            );

        lastTimeDisplay.textContent =
            `${last} ms`;

        bestTimeDisplay.textContent =
            `${best} ms`;

        averageTimeDisplay.textContent =
            `${average} ms`;
    }


    function resetGameArea() {

        gameArea.className = "game-area";

        gameMessage.textContent =
            "Get ready...";

    }


    function startRound() {

        waitingForPulse = true;

        gameArea.className =
            "game-area waiting";

        gameMessage.textContent =
            "Wait for the pulse...";


        const delay =
            Math.floor(
                Math.random() * 2500
            ) + 1500;


        pulseTimeout = setTimeout(() => {

            if (!gameRunning) {
                return;
            }

            waitingForPulse = false;

            gameArea.className =
                "game-area ready";

            gameMessage.textContent =
                "CLICK!";

            pulseStartTime =
                performance.now();

        }, delay);
    }


    function startGame() {

        clearTimeout(pulseTimeout);

        round = 0;
        times = [];

        gameRunning = true;

        startButton.textContent =
            "Restart Game";

        updateStats();

        startRound();
    }


    function finishGame() {

        gameRunning = false;
        waitingForPulse = false;

        clearTimeout(pulseTimeout);

        gameArea.className =
            "game-area ready";

        const best =
            Math.min(...times);

        const average =
            Math.round(
                times.reduce(
                    (sum, value) => sum + value,
                    0
                ) / times.length
            );

        gameMessage.textContent =
            `Complete! Best: ${best} ms • Average: ${average} ms`;

        startButton.textContent =
            "Play Again";
    }


    function handleGameAreaClick() {

        if (!gameRunning) {
            return;
        }


        if (waitingForPulse) {

            clearTimeout(pulseTimeout);

            gameArea.className =
                "game-area too-early";

            gameMessage.textContent =
                "Too early! Wait for the pulse.";

            waitingForPulse = false;

            setTimeout(() => {

                if (gameRunning) {
                    startRound();
                }

            }, 1000);

            return;
        }


        if (pulseStartTime === null) {
            return;
        }


        const reactionTime =
            Math.round(
                performance.now() -
                pulseStartTime
            );


        times.push(reactionTime);

        round++;

        pulseStartTime = null;

        updateStats();


        if (round >= TOTAL_ROUNDS) {

            finishGame();
            return;

        }


        gameArea.className =
            "game-area";

        gameMessage.textContent =
            `${reactionTime} ms — Next round...`;


        setTimeout(() => {

            if (gameRunning) {
                startRound();
            }

        }, 900);
    }


    startButton.addEventListener(
        "click",
        startGame
    );

    gameArea.addEventListener(
        "click",
        handleGameAreaClick
    );


    updateStats();

});
