const gameField = document.querySelector('.game-field');
const paddle = document.querySelector('.paddle');
const ball = document.querySelector('.ball');
const bricks = document.querySelectorAll('.brick');
const randomBounceCheckbox = document.getElementById('randomBounce');

let ballX = 300, ballY = 200;
let dx = 3, dy = -3;
let paddleX = 250;
let isPlaying = true;

// Початкова позиція
paddle.style.left = paddleX + 'px';
ball.style.left = ballX + 'px';
ball.style.top = ballY + 'px';

// Рух платформи (мишка)
gameField.addEventListener('mousemove', (e) => {
    const rect = gameField.getBoundingClientRect();
    paddleX = e.clientX - rect.left - 50; // 50 = половина ширини платформи
    if (paddleX < 0) paddleX = 0;
    if (paddleX > 500) paddleX = 500; // 600 (поле) - 100 (платформа)
    paddle.style.left = paddleX + 'px';
});

function updateGame() {
    if (!isPlaying) return;

    ballX += dx;
    ballY += dy;

    // Зіткнення зі стінами (ліва/права)
    if (ballX <= 0 || ballX >= 585) dx = -dx;
    // Зіткнення зі стелею
    if (ballY <= 0) dy = -dy;

    // Зіткнення з підлогою (Кінець гри)
    if (ballY >= 385) {
        isPlaying = false;
        alert("Гру закінчено! Оновіть сторінку, щоб спробувати знову.");
        return;
    }

    // Зіткнення з платформою
    if (ballY >= 370 && ballY <= 385 && ballX + 15 >= paddleX && ballX <= paddleX + 100) {
        dy = -dy;
        ballY = 365; // Запобігає "залипанню" м'яча в платформі
        
        // Рандомізація кута відбиття (Завдання 3)
        if (randomBounceCheckbox && randomBounceCheckbox.checked) {
            dx += (Math.random() - 0.5) * 2;
        }
    }

    // Зіткнення з блоками (спрощена логіка)
    const ballRect = ball.getBoundingClientRect();
    for (let brick of bricks) {
        if (!brick.classList.contains('broken')) {
            const brickRect = brick.getBoundingClientRect();
            if (ballRect.left < brickRect.right && 
                ballRect.right > brickRect.left && 
                ballRect.top < brickRect.bottom && 
                ballRect.bottom > brickRect.top) {
                
                dy = -dy;
                brick.classList.add('broken');
                break; // Відбиваємось лише від одного блоку за раз
            }
        }
    }

    // Оновлення позиції на екрані
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(updateGame);
}

// Запуск циклу гри
requestAnimationFrame(updateGame);
