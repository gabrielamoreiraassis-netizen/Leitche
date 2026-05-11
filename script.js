// 1. Efeito do Cursor Customizado
const cursor = document.querySelector('.cursor');

document.addEventListener('mousemove', (e) => {
    // Garante que a bolinha apareça na posição do mouse
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

// 2. Lógica de Bio-Rastreio
function rastrearLote() {
    const input = document.getElementById('loteInput').value.toUpperCase();
    const resultado = document.getElementById('rastreio-resultado');
    
    if(input.length > 3) {
        document.getElementById('res-fazenda').innerText = "Fazenda Esperança - Goioxim";
        document.getElementById('res-produtor').innerText = "Família Oliveira";
        resultado.classList.remove('hidden');
        window.scrollTo({ top: resultado.offsetTop + 400, behavior: 'smooth' });
    } else {
        alert("Por favor, insira um código de lote válido (Ex: GOI-2026)");
    }
}

// 3. Calculadora de Impacto Dinâmica
const range = document.getElementById('rangeLeite');
const litrosVal = document.getElementById('litrosVal');
const ecoVal = document.getElementById('valorEconomia');
const carbVal = document.getElementById('valorCarbono');

range.addEventListener('input', (e) => {
    const v = e.target.value;
    litrosVal.innerText = v;
    ecoVal.innerText = "R$ " + (v * 4.25).toFixed(2);
    carbVal.innerText = "-" + (v * 0.6).toFixed(1) + "kg";
});

// 4. Jogo Milk Rush (Engine Avançada)
const canvas = document.getElementById('milkGame');
const ctx = canvas.getContext('2d');
let score = 0;
let gameOn = false;
let basket = { x: 350, y: 440, w: 120, h: 15 };
let items = [];

function initGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameOn = true;
    score = 0;
    items = [];
    document.getElementById('gameScore').innerText = "0";
    animate();
}

function animate() {
    if(!gameOn) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenhar "Cesta" Neon
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#4ade80";
    ctx.fillStyle = "#4ade80";
    ctx.beginPath();
    ctx.roundRect(basket.x, basket.y, basket.w, basket.h, 10);
    ctx.fill();

    // Spawn de Itens
    if(Math.random() < 0.06) {
        items.push({
            x: Math.random() * (canvas.width - 40),
            y: -50,
            speed: 5 + Math.random() * 5,
            char: Math.random() > 0.2 ? '🥛' : '🦠',
            isGood: Math.random() > 0.2
        });
    }

    items.forEach((item, index) => {
        item.y += item.speed;
        ctx.shadowBlur = 0;
        ctx.font = "40px Arial";
        ctx.fillText(item.char, item.x, item.y);

        // Colisão com o Balde
        if(item.y > basket.y && item.x > basket.x - 20 && item.x < basket.x + basket.w) {
            if(item.isGood) {
                score += 15;
            } else {
                score = Math.max(0, score - 50);
            }
            document.getElementById('gameScore').innerText = score;
            items.splice(index, 1);
        }
        
        // Remove itens que saíram da tela
        if(item.y > 600) items.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

// Controle de Mouse/Touch para o Jogo
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    basket.x = Math.max(0, Math.min(canvas.width - basket.w, x - basket.w/2));
});
