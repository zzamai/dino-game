const zino = document.querySelector('.zino');
const bg = document.querySelector('.bg');
let isJumping = false;
let position = 0;

let gameOver = false;
const pontuationDisplay = document.querySelector('.pontuation');
let pontuation = 0;

function handleKeyUp(event) {
    if(event.keyCode === 32) {
        if (!isJumping) {
            jumpea();
        }
    }
}

function jumpea() {
    isJumping = true;

    let upInterval = setInterval(() => {
        if(position >= 150) {
            clearInterval(upInterval);
            let downInterval = setInterval(() => {
                if(position <= 0) {
                    clearInterval(downInterval)
                    isJumping = false;
                } else {
                    position -= 20;
                    zino.style.bottom = position + 'px';
                }
            }, 20);
        } else {
            position += 20;
            zino.style.bottom = position + 'px';
        }
    }, 20);
}

function createCactus() {
    const cactus = document.createElement('div');
    let cactusPosition = 1000;
    let randomTime = Math.random() * 3000;

    cactus.classList.add('cactus');
    cactus.style.left = cactusPosition + 'px';
    bg.appendChild(cactus);

    let leftInterval = setInterval(() => {
        if (cactusPosition < -60) {
            clearInterval(leftInterval);
            bg.removeChild(cactus);
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60) {
            gameOver = true;
            clearInterval(leftInterval);
            document.body.innerHTML = '<h1 class="game-over"> Fim de Jogo: '+ pontuation +'</h1>';
        } else if(!gameOver) {
            cactusPosition -= 10;
            pontuation += 1;

            cactus.style.left = cactusPosition + 'px';
            pontuationDisplay.innerHTML = pontuation;
        }
    }, 20);

    if(!gameOver) {
        console.log(gameOver);
        setTimeout(createCactus, randomTime);
    } 
}

createCactus();

document.addEventListener('keyup', handleKeyUp);