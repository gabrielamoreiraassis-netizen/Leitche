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

// NOVO JOGO: MILK RUNNER PRO
const canvas = document.getElementById('milkGame');
const ctx = canvas.getContext('2d');
let score = 0;
let gameOn = false;
let gameSpeed = 5;
let player = { x: 350, y: 420, w: 80, h: 40, color: '#4ade80' };
let obstacles = [];

function initGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameOn = true;
    score = 0;
    gameSpeed = 5;
    obstacles = [];
    animate();
}

function animate() {
    if(!gameOn) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Efeito de "Estrada" se movendo
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();

    // Desenhar Jogador (Caminhão de Coleta Neon)
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, player.w, player.h, 5);
    ctx.fill();

    // Spawn de Obstáculos e Itens
    if(Math.random() < 0.04) {
        let isGood = Math.random() > 0.3;
        obstacles.push({
            x: Math.random() * (canvas.width - 40),
            y: -50,
            w: 40,
            h: 40,
            type: isGood ? '🥛' : '🚧',
            good: isGood
        });
    }

    obstacles.forEach((obj, index) => {
        obj.y += gameSpeed;
        
        ctx.shadowBlur = 0;
        ctx.font = "30px Arial";
        ctx.fillText(obj.type, obj.x, obj.y);

        // Colisão Realista
        if(obj.y + 30 > player.y && obj.y < player.y + player.h &&
           obj.x + 30 > player.x && obj.x < player.x + player.w) {
            
            if(obj.good) {
                score += 10;
                gameSpeed += 0.1; // Fica mais difícil
                player.color = '#4ade80';
            } else {
                score = Math.max(0, score - 20);
                player.color = '#ff4a4a'; // Pisca vermelho ao bater
                setTimeout(() => player.color = '#4ade80', 200);
            }
            obstacles.splice(index, 1);
            document.getElementById('gameScore').innerText = score;
        }

        if(obj.y > 600) obstacles.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

// Controle Suave por Mouse/Touch
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const targetX = e.clientX - rect.left - player.w/2;
    // Interpolação para o movimento ser mais fluido (suave)
    player.x += (targetX - player.x) * 0.2;
});
