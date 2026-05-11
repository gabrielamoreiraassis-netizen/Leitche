// Efeito de Carregamento
window.addEventListener('load', () => {
    document.getElementById('loader').style.display = 'none';
});

// NOVIDADE: Simulação de Rastreabilidade
function simularScan() {
    const status = document.getElementById('status-scan');
    const info = document.getElementById('info-lote');
    
    status.innerText = "Lendo QR Code...";
    status.style.color = "var(--accent)";

    setTimeout(() => {
        status.innerText = "Lote Localizado!";
        info.style.opacity = "1";
        info.style.transform = "translateY(0)";
    }, 1500);
}

// JOGO: Eco-Catch (Melhorado)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
canvas.width = 800; canvas.height = 500;

let player = { x: 375, y: 430, w: 70, h: 20 };
let score = 0;
let items = [];
let gameActive = false;

function startGame() {
    gameActive = true;
    score = 0;
    items = [];
    document.getElementById('start-btn').style.display = 'none';
    update();
}

function update() {
    if(!gameActive) return;
    ctx.clearRect(0,0,800,500);

    // Jogador (Balde Moderno)
    ctx.fillStyle = '#004d40';
    ctx.fillRect(player.x, player.y, player.w, player.h);

    if(Math.random() < 0.03) {
        items.push({ x: Math.random()*770, y: 0, type: Math.random() > 0.2 ? '🥛' : '🦠' });
    }

    items.forEach((item, i) => {
        item.y += 4;
        ctx.font = "30px Arial";
        ctx.fillText(item.type, item.x, item.y);

        // Colisão com o balde
        if(item.y > 430 && item.x > player.x && item.x < player.x + player.w) {
            item.type === '🥛' ? score += 10 : score -= 15;
            items.splice(i, 1);
            document.getElementById('score').innerText = "Pontos: " + score;
        }
    });

    requestAnimationFrame(update);
}

// Movimentação
window.addEventListener('mousemove', (e) => {
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = e.clientX - rect.left - root.scrollLeft;
    player.x = mouseX - player.w/2;
});
