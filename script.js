const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

let playerPosition = { x: 375, y: 540 };
let enemyPosition = { x: 375, y: 10 };

// Move player
document.addEventListener('keydown', (e) => {
    const step = 10;
    if (e.key === 'ArrowLeft' && playerPosition.x > 0) {
        playerPosition.x -= step;
    } else if (e.key === 'ArrowRight' && playerPosition.x < 750) {
        playerPosition.x += step;
    } else if (e.key === 'ArrowUp' && playerPosition.y > 0) {
        playerPosition.y -= step;
    } else if (e.key === 'ArrowDown' && playerPosition.y < 550) {
        playerPosition.y += step;
    }
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
});

// Enemy movement
setInterval(() => {
    enemyPosition.y += 5;
    if (enemyPosition.y > 600) {
        enemyPosition.y = 0;
        enemyPosition.x = Math.random() * 750;
    }
    enemy.style.top = enemyPosition.y + 'px';
    enemy.style.left = enemyPosition.x + 'px';

    // Check collision
    if (
        playerPosition.x < enemyPosition.x + 50 &&
        playerPosition.x + 50 > enemyPosition.x &&
        playerPosition.y < enemyPosition.y + 50 &&
        playerPosition.y + 50 > enemyPosition.y
    ) {
        alert('Game Over!');
        enemyPosition.y = 0;
        enemyPosition.x = Math.random() * 750;
    }
}, 50);