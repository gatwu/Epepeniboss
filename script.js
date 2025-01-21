const player = document.getElementById('player');
const container = document.getElementById('game-container');

// Posisi awal player
let playerPosition = { x: 375, y: 540 };

// Gerakan tombol
document.getElementById('left').addEventListener('click', () => movePlayer(-10, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(10, 0));
document.getElementById('up').addEventListener('click', () => movePlayer(0, -10));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 10));
document.getElementById('shoot').addEventListener('click', shootBullet);

function movePlayer(dx, dy) {
    playerPosition.x += dx;
    playerPosition.y += dy;

    // Batasi agar tidak keluar dari layar
    if (playerPosition.x < 0) playerPosition.x = 0;
    if (playerPosition.x > 720) playerPosition.x = 720;
    if (playerPosition.y < 0) playerPosition.y = 0;
    if (playerPosition.y > 540) playerPosition.y = 540;

    // Update posisi karakter
    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
}

function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = playerPosition.x + 35 + 'px';
    bullet.style.top = playerPosition.y + 'px';
    container.appendChild(bullet);

    // Gerakan peluru
    const interval = setInterval(() => {
        const bulletPosition = parseInt(bullet.style.top);
        if (bulletPosition < 0) {
            bullet.remove();
            clearInterval(interval);
        } else {
            bullet.style.top = bulletPosition - 10 + 'px';
        }
    }, 30);
}