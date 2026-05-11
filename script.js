// CALCULADORA DE IMPACTO DINÂMICA
const slider = document.getElementById('leiteInput');
const litrosLabel = document.getElementById('litrosLabel');
const economia = document.getElementById('ajudaEconomia');
const familias = document.getElementById('familiasApoiadas');

slider.oninput = function() {
    let valor = this.value;
    litrosLabel.innerHTML = valor + " Litros";
    // Lógica fictícia baseada em dados de agricultura familiar
    let totalInjetado = valor * 3.50; // Preço médio estimado local
    economia.innerHTML = "R$ " + totalInjetado.toFixed(2);
    familias.innerHTML = Math.ceil(valor / 15);
}

// JOGO MILK RUSH (Engine Melhorada)
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
let gameOn = false;
let score = 0;
let basket = { x: 350, y: 440, w: 100, h: 20 };
let drops = [];

function iniciarGame() {
    document.getElementById('start-overlay').style.display = 'none';
    gameOn = true;
    score = 0;
    loop();
}

function loop() {
    if (!gameOn) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar Balde Neon
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#4ade80";
    ctx.fillStyle = "#4ade80";
    ctx.fillRect(basket.x, basket.y, basket.w, basket.h);

    if (Math.random() < 0.05) {
        drops.push({ x: Math.random() * 750, y: 0, speed: 5 + Math.random() * 5, type: Math.random() > 0.15 ? '🥛' : '❌' });
    }

    drops.forEach((d, i) => {
        d.y += d.speed;
        ctx.font = "35px Arial";
        ctx.fillText(d.type, d.x, d.y);

        // Colisão Precisa
        if (d.y > 440 && d.x > basket.x && d.x < basket.x + basket.w) {
            d.type === '🥛' ? score += 20 : score -= 50;
            drops.splice(i, 1);
            document.getElementById('val').innerText = score;
        }
    });

    requestAnimationFrame(loop);
}

// Controle Suave
window.onmousemove = (e) => {
    let rect = canvas.getBoundingClientRect();
    basket.x = e.clientX - rect.left - basket.w/2;
};
