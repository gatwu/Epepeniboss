const player = document.getElementById('player');
const container = document.getElementById('game-container');
const playerHpBar = document.getElementById('player-hp');

let playerPosition = { x: 375, y: 540 };
let playerHp = 100;

// Fungsi untuk memperbarui HP bar
function updateHpBar(bar, hp, maxHp) {
    bar.style.width = `${(hp / maxHp) * 100}%`;
}

// Fungsi untuk memindahkan karakter
function movePlayer(dx, dy) {
    playerPosition.x += dx;
    playerPosition.y += dy;

    if (playerPosition.x < 0) playerPosition.x = 0;
    if (playerPosition.x > 720) playerPosition.x = 720;
    if (playerPosition.y < 0) playerPosition.y = 0;
    if (playerPosition.y > 540) playerPosition.y = 540;

    player.style.left = playerPosition.x + 'px';
    player.style.top = playerPosition.y + 'px';
}

// Fungsi untuk menembakkan peluru
function shootBullet() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = playerPosition.x + 35 + 'px';
    bullet.style.top = playerPosition.y + 'px';
    container.appendChild(bullet);

    const interval = setInterval(() => {
        bullet.style.top = parseInt(bullet.style.top) - 10 + 'px';
        if (parseInt(bullet.style.top) < 0) {
            bullet.remove();
            clearInterval(interval);
        }

        document.querySelectorAll('.enemy').forEach(enemy => {
            if (isColliding(bullet, enemy)) {
                let enemyHpBar = enemy.parentElement.querySelector('.hp-bar');
                enemyHpBar.dataset.hp -= 20;
                updateHpBar(enemyHpBar, enemyHpBar.dataset.hp, 100);

                if (enemyHpBar.dataset.hp <= 0) {
                    enemy.parentElement.remove();
                }

                bullet.remove();
                clearInterval(interval);
            }
        });
    }, 30);
}

// Fungsi untuk membuat musuh
function createEnemy() {
    const enemyContainer = document.createElement('div');
    enemyContainer.classList.add('enemy-container');

    const enemyHpBar = document.createElement('div');
    enemyHpBar.classList.add('hp-bar');
    enemyHpBar.dataset.hp = 100;

    const enemy = document.createElement('div');
    enemy.classList.add('enemy');

    enemyContainer.appendChild(enemyHpBar);
    enemyContainer.appendChild(enemy);
    container.appendChild(enemyContainer);

    enemyContainer.style.left = Math.random() * 720 + 'px';
    enemyContainer.style.top = '0px';

    const interval = setInterval(() => {
        enemyContainer.style.top = parseInt(enemyContainer.style.top) + 5 + 'px';

        if (parseInt(enemyContainer.style.top) > 600) {
            enemyContainer.remove();
            clearInterval(interval);
        }
    }, 50);

    setInterval(() => shootEnemyBullet(enemyContainer), 3000);
}

// Fungsi untuk musuh menembak
function shootEnemyBullet(enemy) {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.backgroundColor = 'blue';
    bullet.style.left = parseInt(enemy.style.left) + 20 + 'px';
    bullet.style.top = parseInt(enemy.style.top) + 'px';
    container.appendChild(bullet);

    const interval = setInterval(() => {
        bullet.style.top = parseInt(bullet.style.top) + 10 + 'px';
        if (parseInt(bullet.style.top) > 600) {
            bullet.remove();
            clearInterval(interval);
        }

        if (isColliding(bullet, player)) {
            playerHp -= 10;
            updateHpBar(playerHpBar, playerHp, 100);

            if (playerHp <= 0) {
                alert('Game Over!');
                location.reload();
            }

            bullet.remove();
            clearInterval(interval);
        }
    }, 30);
}

// Cek jika peluru kena target
function isColliding(obj1, obj2) {
    let rect1 = obj1.getBoundingClientRect();
    let rect2 = obj2.getBoundingClientRect();
    return !(rect1.right < rect2.left || rect1.left > rect2.right || rect1.bottom < rect2.top || rect1.top > rect2.bottom);
}

document.getElementById('left').addEventListener('click', () => movePlayer(-10, 0));
document.getElementById('right').addEventListener('click', () => movePlayer(10, 0));
document.getElementById('up').addEventListener('click', () => movePlayer(0, -10));
document.getElementById('down').addEventListener('click', () => movePlayer(0, 10));
document.getElementById('shoot').addEventListener('click', shootBullet);

setInterval(createEnemy, 2000);