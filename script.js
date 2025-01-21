const player = document.getElementById('player');
const container = document.getElementById('game-container');

// Posisi awal karakter
let playerPosition = { x: 375, y: 540 };

// Fungsi untuk memindahkan karakter
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

// Fungsi untuk menembakkan peluru
function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = playerPosition.x + 35 + 'px'; // Posisi peluru di tengah karakter
    bullet.style.top = playerPosition.y + 'px';
    container.appendChild(bullet);

    // Gerakan peluru ke atas
    const interval = setInterval(() => {
        const bulletTop = parseInt(bullet.style.top);
        if (bulletTop < 0) {
            bullet.remove(); // Hapus peluru jika keluar layar
            clearInterval(interval);
        } else {
            bullet.style.top = bulletTop - 10 + 'px'; // Gerakan peluru ke atas
        }
    }, 30);
}

// Fungsi untuk membuat musuh
function createEnemy() {
    const enemy = document.createElement('div');
    enemy.classList.add('enemy');
    enemy.style.left = Math.random() * 720 + 'px'; // Posisi acak
    enemy.style.top = '0px';
    container.appendChild(enemy);

    // Gerakan musuh ke bawah
    const interval = setInterval(() => {
        const enemyTop = parseInt(enemy.style.top);
        if (enemyTop > 600) {
            enemy.remove(); // Hapus musuh jika keluar layar
            clearInterval(interval);
        } else {
            enemy.style.top = enemyTop + 5 + 'px';
        }
    }, 50);
}

// Event listener untuk tombol kontrol
document.getElementById('left').addEventListener('click', () => movePlayer(-10, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(10, 0));
document.getElementById('up').addEventListener('click', () => movePlayer(0, -10));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 10));
document.getElementById('shoot').addEventListener('click', shootBullet);

// Buat musuh secara berkala
setInterval(createEnemy, 2000); // Musuh baru setiap 2 detik