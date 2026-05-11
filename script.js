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

// JOGO MILK RUNNER PRO - VERSÃO CALIBRADA
const canvas = document.getElementById('milkGame');
const ctx = canvas.getContext('2d');
let score = 0;
let gameOn = false;
let gameSpeed = 3; // Começa mais devagar para ser justo
let player = { x: 350, y: 420, w: 100, h: 40, color: '#4ade80' }; // Aumentei a largura
let obstacles = [];

function initGame() {
    document.getElementById('start-screen').style.display = 'none';
    gameOn = true;
    score = 0;
    gameSpeed = 3; // Reset da velocidade
    obstacles = [];
    document.getElementById('gameScore').innerText = "0";
    animate();
}

function animate() {
    if(!gameOn) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Estrada com movimento
    ctx.strokeStyle = "rgba(255,255,255,0.1)";
    ctx.setLineDash([20, 20]);
    ctx.beginPath();
    ctx.moveTo(canvas.width/2, 0);
    ctx.lineTo(canvas.width/2, canvas.height);
    ctx.stroke();

    // Desenhar Jogador (Balde/Caminhão Neon)
    ctx.shadowBlur = 20;
    ctx.shadowColor = player.color;
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, player.w, player.h, 10);
    ctx.fill();

    // Spawn controlado
    if(Math.random() < 0.03) {
        let isGood = Math.random() > 0.25;
        obstacles.push({
            x: Math.random() * (canvas.width - 50),
            y: -50,
            size: 40,
            type: isGood ? '🥛' : '🚧',
            good: isGood
        });
    }

    obstacles.forEach((obj, index) => {
        obj.y += gameSpeed;
        
        ctx.shadowBlur = 0;
        ctx.font = "35px Arial";
        ctx.fillText(obj.type, obj.x, obj.y);

        // COLISÃO MELHORADA (Área maior para facilitar a coleta)
        if(obj.y + 20 > player.y && obj.y < player.y + player.h &&
           obj.x + 35 > player.x && obj.x < player.x + player.w) {
            
            if(obj.good) {
                score += 10;
                gameSpeed += 0.05; // Aceleração bem sutil
                player.color = '#4ade80';
                // Efeito sonoro visual (opcional)
                ctx.fillStyle = "white";
                ctx.fillText("+10", player.x, player.y - 20);
            } else {
                score = Math.max(0, score - 30);
                player.color = '#ff4a4a'; 
                setTimeout(() => player.color = '#4ade80', 300);
            }
            obstacles.splice(index, 1);
            document.getElementById('gameScore').innerText = score;
        }

        // Limpeza de memória
        if(obj.y > canvas.height) obstacles.splice(index, 1);
    });

    requestAnimationFrame(animate);
}

// Controle Suave (ajustado para ser instantâneo mas fluido)
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const targetX = e.clientX - rect.left - player.w/2;
    // Movimento mais responsivo
    player.x = Math.max(0, Math.min(canvas.width - player.w, targetX));
});
