const state = {
    view: {
        squares: document.querySelectorAll(".square"),//já que pode ser mais de 1 elemento utiliza-se o 'querySelectorAll'
        enemy: document.querySelector(".enemy"), //apenas 1 inimigo por vez então apenas 'querySelector'
        timeLeft: document.querySelector("#time-left"), // '#' pois é um id, se fosse classe como as outras anteriores seria '.'
        score: document.querySelector('#score'),
        life: document.querySelector('#life')
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
        hp: 3,
    },
    actions: {
        timerId: setInterval(randomSquare, 1000), // a cada x tempo (1000 milissegundos) ele chama a função randomSquare(),
        countDownTimerId: setInterval(countDown, 1000),
    },
};

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timerId)
        alert("FIM DE JOGO! O tempo acabou. Sua pontuação: " + state.values.result);
    }
}

function playSound() {
    let audio = new Audio("./src/audios/hit.m4a");
    audio.volume = 0.2;
    audio.play();
}

function playDamage() {
    let audioDano = new Audio("./src/audios/oof.mp3");
    audioDano.volume = 0.2;
    audioDano.play();
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");//está percorrendo todos os elementos da classe, e removendo quem possui o 'enemy'
    });

    let randomNumber = Math.floor(Math.random() * 9); // sorteia um número aleatório de 1 a 9 e pega a parte inteira dele
    let randomSquare = state.view.squares[randomNumber]; // pega um quadrado na posição do número aleatório.
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            if (square.id === state.values.hitPosition) {
                state.values.result++;
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null; // isso impede que o player "farme" pontos na mesma posição, ou seja, apenas 1 ponto por clique
                playSound();
            } else {
                playDamage();
                state.values.hp--;
                state.view.life.textContent = state.values.hp;
                if (state.values.hp <= 0) {
                    clearInterval(state.actions.countDownTimerId)
                    clearInterval(state.actions.timerId)
                    alert("GAME OVER! Acabaram suas vidas! Sua pontuação: " + state.values.result);
                }
            }
        })
    });
}


// função principal, alguns nomes que pode ter: initialize, main, init
function initialize() {
    addListenerHitBox();
};

initialize();