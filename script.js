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

// JOGO MILK RUNNER - VERSÃO FINAL ULTRA SENSÍVEL
const canvas = document.getElementById('milkGame');
const ctx = canvas.getContext('2d');
let score = 0;
let gameOn = false;
let gameSpeed = 2.5; // Começa bem tranquilo
let player = { x: 350, y: 400, w: 100, h: 40, color: '#4ade80' }; 
let items = [];

function initGame() {
    const startOverlay = document.getElementById('start-screen');
    if(startOverlay) startOverlay.style.display = 'none';
    
    gameOn = true;
    score = 0;
    gameSpeed = 2.5;
    items = [];
    document.getElementById('gameScore').innerText = "0";
    animate();
}

function animate() {
    if(!gameOn) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Desenha o Jogador (O Balde Neon)
    ctx.shadowBlur = 15;
    ctx.shadowColor = player.color;
    ctx.fillStyle = player.color;
    ctx.beginPath();
    ctx.roundRect(player.x, player.y, player.w, player.h, 8);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Criar novos itens (Leite ou Obstáculo)
    if(Math.random() < 0.03) {
        items.push({
            x: Math.random() * (canvas.width - 40),
            y: -50,
            type: Math.random() > 0.2 ? '🥛' : '🚧',
            isGood: Math.random() > 0.2
        });
    }

    // Movimentar e desenhar itens
    for (let i = items.length - 1; i >= 0; i--) {
        let item = items[i];
        item.y += gameSpeed;

        ctx.font = "40px Arial";
        ctx.fillText(item.type, item.x, item.y);

        // Lógica de Colisão Simples e Eficaz
        // Se a base do emoji encostar no topo do balde
        if (item.y > player.y && item.y < player.y + player.h &&
            item.x + 30 > player.x && item.x < player.x + player.w) {
            
            if (item.type === '🥛') {
                score += 10;
                gameSpeed += 0.05; // Fica um tiquinho mais rápido
                player.color = '#4ade80'; // Pisca Verde
            } else {
                score = Math.max(0, score - 25);
                player.color = '#ff4a4a'; // Pisca Vermelho
                setTimeout(() => player.color = '#4ade80', 200);
            }
            
            document.getElementById('gameScore').innerText = score;
            items.splice(i, 1); // Remove o item coletado
            continue;
        }

        // Remove se sair da tela
        if (item.y > canvas.height) {
            items.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

// Controle do mouse sem atraso
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    // Centraliza o balde no mouse e trava nas bordas
    player.x = Math.max(0, Math.min(canvas.width - player.w, mouseX - player.w/2));
});
