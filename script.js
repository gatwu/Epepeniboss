 const player = document.getElementById('player');
const enemy = document.getElementById('enemy');

// Posisi awal player
let playerPosition = { x: 375, y: 540 };

// Menggerakkan player dengan sentuhan layar
let touchStartX = 0;
let touchStartY = 0;

// Menyimpan posisi awal sentuhan
document.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

// Menggerakkan player berdasarkan gerakan sentuhan
document.addEventListener('touchmove', (e) => {
    const moveX = e.touches[0].clientX - touchStartX;
    const moveY = e.touches[0].clientY - touchStartY;

    playerPosition.x += moveX;
    playerPosition.y += moveY;

    // Batasi pergerakan agar tidak keluar dari area game
    if (playerPosition.x < 0) playerPosition.x = 0;
    if (playerPosition.x > 750) playerPosition.x = 750;
    if (playerPosition.y < 0) playerPosition.y = 0;
    if (playerPosition.y > 550) playerPosition.y = 550;

    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';

    // Update posisi sentuhan untuk gerakan berikutnya
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
});

// Fungsi untuk menggerakkan musuh secara otomatis
let enemyPosition = { x: 375, y: 10 };
setInterval(() => {
    enemyPosition.y += 5;
    if (enemyPosition.y > 600) {
        enemyPosition.y = 0;
        enemyPosition.x = Math.random() * 750;
    }
    enemy.style.top = enemyPosition.y + 'px';
    enemy.style.left = enemyPosition.x + 'px';

    // Cek apakah player bertabrakan dengan musuh
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