const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let mouse = { x: 0, y: 0 };
let angle = 0;

// 1. Интерактивность: отслеживаем мышь
canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
});

// 6. Maple Leaf: Рисуем кленовый лист
function drawMapleLeaf(time) {
    ctx.save();
    ctx.translate(canvas.width * 0.75, canvas.height * 0.7);
    ctx.scale(-0.45, 0.45);
    ctx.rotate(Math.sin(time * 1.2) * 0.15);
    
    // Добавляем тень от листа
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = -8;
    
    // Черешок
    ctx.shadowColor = 'transparent';
    ctx.strokeStyle = 'rgba(40, 120, 40, 0.9)';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.quadraticCurveTo(-12, -25, -6, -50);
    ctx.stroke();
    
    // Темный кленовый лист - 7 лопастей
    ctx.fillStyle = 'rgba(20, 100, 20, 0.8)';
    ctx.strokeStyle = 'rgba(30, 150, 30, 0.9)';
    ctx.lineWidth = 2;
    
    // Центральная лопасть
    ctx.beginPath();
    ctx.moveTo(-6, -50);
    ctx.quadraticCurveTo(-15, -120, -6, -220);
    ctx.quadraticCurveTo(9, -120, -6, -50);
    ctx.fill();
    ctx.stroke();
    
    // Функция для рисования лопастей
    const drawLeaflet = (angle, length, width) => {
        ctx.save();
        ctx.translate(-6, -50);
        ctx.rotate(angle);
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(-width/2, -length/2, 0, -length);
        ctx.quadraticCurveTo(width/2, -length/2, 0, 0);
        ctx.fill();
        ctx.stroke();
        
        // Зазубренные края
        ctx.strokeStyle = 'rgba(25, 120, 25, 0.8)';
        ctx.lineWidth = 1.5;
        for(let i = 0; i < 4; i++) {
            const y = -length * (i + 1) / 5;
            const x = width * (1 - (i + 1) / 5) / 2;
            ctx.beginPath();
            ctx.moveTo(-x, y);
            ctx.lineTo(-x - 2, y - 3);
            ctx.moveTo(x, y);
            ctx.lineTo(x + 2, y - 3);
            ctx.stroke();
        }
        ctx.restore();
    };
    
    // 7 лопастей кленового листа
    drawLeaflet(-0.35, 180, 60);
    drawLeaflet(-0.18, 200, 66);
    drawLeaflet(0.18, 200, 66);
    drawLeaflet(0.35, 180, 60);
    drawLeaflet(-0.5, 150, 50);
    drawLeaflet(0.5, 150, 50);
    
    // Центральная прожилка
    ctx.strokeStyle = 'rgba(25, 120, 25, 0.9)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(-6, -50);
    ctx.lineTo(-6, -220);
    ctx.stroke();
    
    ctx.restore();
}

function draw() {
    // 2. Очистка и создаем сверхяркий переливающийся фон
    const time = Date.now() / 1000;
    
    // Создаем экстремально яркий и динамичный психоделический градиентный фон
    const bgGradient = ctx.createRadialGradient(canvas.width/2, canvas.height/2, 0, canvas.width/2, canvas.height/2, Math.max(canvas.width, canvas.height));
    const hue1 = (time * 50) % 360;
    const hue2 = (time * 50 + 90) % 360;
    const hue3 = (time * 50 + 180) % 360;
    const hue4 = (time * 50 + 270) % 360;
    
    bgGradient.addColorStop(0, `hsl(${hue1}, 100%, 80%)`);
    bgGradient.addColorStop(0.25, `hsl(${hue2}, 100%, 75%)`);
    bgGradient.addColorStop(0.5, `hsl(${hue3}, 100%, 80%)`);
    bgGradient.addColorStop(0.75, `hsl(${hue4}, 100%, 75%)`);
    bgGradient.addColorStop(1, `hsl(${hue1}, 100%, 80%)`);
    
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 7. Проверяем наведение на лист
    const leafCenterX = canvas.width * 0.75;
    const leafCenterY = canvas.height * 0.7;
    const leafRadius = 120;
    
    const isMouseOnLeaf = Math.hypot(mouse.x - leafCenterX, mouse.y - leafCenterY) < leafRadius;
    
    if (isMouseOnLeaf) {
        // Рисуем сигарету вместо листа
        drawSmokingCigarette(time);
        // Применяем инверсию только в области листа (маленький квадрат вокруг курсора)
        applyPixelEffect();
    } else {
        // Рисуем лист только если курсор не на нем
        drawMapleLeaf(time);
    }

    // 3. Трансформации: смайлик плавно покачивается и смещен вверх для текста
    angle = Math.sin(Date.now() / 500) * 0.1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2 - 20); // Смещаем вверх на 20px
    ctx.rotate(angle);

    // 4. Сложные эффекты: Градиент и Тень
    const gradient = ctx.createRadialGradient(-15, -15, 8, 0, 0, 50); // Уменьшаем градиент
    gradient.addColorStop(0, "#fff700");
    gradient.addColorStop(1, "#ff8c00");

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 12; // Уменьшаем тень
    ctx.shadowOffsetY = 8;

    // Голова (уменьшенная)
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 50, 0, Math.PI * 2); // Уменьшаем радиус с 70 до 50
    ctx.fill();
    ctx.stroke();

    // Глаза, которые следят за мышью (адаптированы под новый размер)
    [1, -1].forEach(side => {
        ctx.save();
        ctx.translate(side * 18, -15); // Уменьшаем расстояние между глазами

        // Математика взгляда
        const dx = (mouse.x - (canvas.width/2 + side * 18));
        const dy = (mouse.y - (canvas.height/2 - 20 - 15));
        const dist = Math.min(Math.sqrt(dx*dx + dy*dy), 4); // Уменьшаем максимальное смещение
        const a = Math.atan2(dy, dx);

        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(0, 0, 8, 0, Math.PI * 2); // Уменьшаем глаза
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(Math.cos(a) * dist, Math.sin(a) * dist, 3, 0, Math.PI * 2); // Уменьшаем зрачки
        ctx.fill();
        ctx.restore();
    });

    // Улыбка (адаптирована)
    ctx.beginPath();
    ctx.arc(0, 10, 25, 0.2 * Math.PI, 0.8 * Math.PI); // Уменьшаем улыбку
    ctx.lineWidth = 3; // Уменьшаем толщину линии
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore(); // Сброс трансформаций

    // 5. Манипуляция пикселями (Инверсия области при наведении)
    if (Math.hypot(mouse.x - canvas.width/2, mouse.y - (canvas.height/2 - 20)) < 50) {
        applyPixelEffect();
    }

    // 6. Добавляем текст внизу с тонкой обводкой
    ctx.save();
    
    // Создаем радужный градиент для текста
    const textGradient = ctx.createLinearGradient(canvas.width/2 - 50, 0, canvas.width/2 + 50, 0);
    textGradient.addColorStop(0, '#ff00ff');
    textGradient.addColorStop(0.2, '#00ffff');
    textGradient.addColorStop(0.4, '#ffff00');
    textGradient.addColorStop(0.6, '#00ff00');
    textGradient.addColorStop(0.8, '#ff00ff');
    textGradient.addColorStop(1, '#ff0080');
    
    // Психоделический эффект с анимацией
    const hue = (Date.now() / 20) % 360;
    ctx.font = 'bold 20px "Comic Sans MS", cursive, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Добавляем легкое "дергание" текста
    const wobbleX = Math.sin(Date.now() / 100) * 2;
    const wobbleY = Math.cos(Date.now() / 150) * 1;
    
    // Рисуем тонкую обводку
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.6)';
    ctx.lineWidth = 1;
    ctx.strokeText('Павел', canvas.width / 2 + wobbleX, canvas.height - 20 + wobbleY);
    
    // Рисуем основной текст
    ctx.fillStyle = textGradient;
    ctx.shadowColor = `hsl(${hue}, 100%, 50%)`;
    ctx.shadowBlur = 10 + Math.sin(Date.now() / 200) * 5;
    ctx.fillText('Павел', canvas.width / 2 + wobbleX, canvas.height - 20 + wobbleY);
    ctx.restore();

    requestAnimationFrame(draw);
}

// 6. Pixel Manipulation: Инвертируем цвета в квадрате вокруг курсора
function applyPixelEffect() {
    try {
        const size = 40;
        const imageData = ctx.getImageData(mouse.x - size/2, mouse.y - size/2, size, size);
        const data = imageData.data;

        for (let i = 0; i < data.length; i += 4) {
            data[i]     = 255 - data[i];     // R
            data[i + 1] = 255 - data[i + 1]; // G
            data[i + 2] = 255 - data[i + 2]; // B
        }
        ctx.putImageData(imageData, mouse.x - size/2, mouse.y - size/2);
    } catch (e) {
        // Ошибка может возникнуть, если мышь вне границ холста
    }
}

// 7. Smoking Cigarette: Полноценная дымящаяся сигарета
function drawSmokingCigarette(time) {
    ctx.save();
    // ТОЧНО ТАКАЯ ЖЕ позиция и трансформация как у листа
    ctx.translate(canvas.width * 0.75, canvas.height * 0.7);
    ctx.scale(-0.45, 0.45); // Возвращаем зеркальный масштаб как у листа
    ctx.rotate(Math.sin(time * 1.2) * 0.15); // Такое же качание как у листа
    
    // Тень как у листа
    ctx.shadowColor = 'rgba(0, 0, 0, 0.4)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetX = 8;
    ctx.shadowOffsetY = -8;
    
    // Тело сигареты (белая бумага) - длина как у центральной лопасти листа (220px)
    ctx.fillStyle = '#f5f5dc';
    ctx.strokeStyle = '#d3d3d3';
    ctx.lineWidth = 1;
    ctx.fillRect(-110, -8, 220, 16);
    ctx.strokeRect(-110, -8, 220, 16);
    
    // Фильтр (оранжевый)
    ctx.fillStyle = '#d2691e';
    ctx.fillRect(-110, -8, 40, 16);
    
    // Текстура на фильтре
    ctx.strokeStyle = '#8b4513';
    ctx.lineWidth = 0.5;
    for(let i = 0; i < 10; i++) {
        ctx.beginPath();
        ctx.moveTo(-105 + i * 4, -8);
        ctx.lineTo(-105 + i * 4, 8);
        ctx.stroke();
    }
    
    // Тлеющий конец (направлен как лист - к правому верхнему углу)
    ctx.fillStyle = '#ff4500';
    ctx.beginPath();
    ctx.arc(110, 0, 8, 0, Math.PI * 2);
    ctx.fill();
    
    // Яркий тлеющий кончик
    const glowSize = 10 + Math.sin(time * 10) * 3;
    ctx.fillStyle = `rgba(255, 69, 0, ${0.8 + Math.sin(time * 8) * 0.2})`;
    ctx.beginPath();
    ctx.arc(110, 0, glowSize, 0, Math.PI * 2);
    ctx.fill();
    
    // Дым (идет к правому верхнему углу как у листа)
    for (let i = 0; i < 10; i++) {
        const smokeX = 120 + Math.sin(time * 2 + i * 0.8) * 20;
        const smokeY = -20 - i * 15 - Math.sin(time * 3 + i) * 10;
        const smokeSize = 5 + i * 3 + Math.sin(time * 4 + i) * 3;
        const smokeOpacity = Math.max(0.1, 0.7 - i * 0.08);
        
        // Серый дым
        ctx.fillStyle = `rgba(169, 169, 169, ${smokeOpacity})`;
        ctx.beginPath();
        ctx.arc(smokeX, smokeY, smokeSize, 0, Math.PI * 2);
        ctx.fill();
        
        // Беловатый центр дыма
        if (i < 5) {
            ctx.fillStyle = `rgba(220, 220, 220, ${smokeOpacity * 0.5})`;
            ctx.beginPath();
            ctx.arc(smokeX - 2, smokeY - 2, smokeSize * 0.6, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Искры от тлеющего конца
    for (let i = 0; i < 4; i++) {
        const sparkX = 110 + Math.random() * 16 - 8;
        const sparkY = Math.random() * 16 - 8;
        const sparkSize = Math.random() * 3 + 1;
        
        ctx.fillStyle = '#ff6347';
        ctx.beginPath();
        ctx.arc(sparkX, sparkY, sparkSize, 0, Math.PI * 2);
        ctx.fill();
    }
    
    // Пепел
    ctx.fillStyle = '#696969';
    ctx.fillRect(108, -2, 4, 4);
    
    ctx.restore();
}

// Запуск
draw();

document.addEventListener("DOMContentLoaded", function() {
    (function() {
        // 1. Получаем ссылку на элемент canvas по его ID
        const canvas = document.getElementById("simple");

        // Если элемент не найден – выходим (защита от ошибок)
        if (!canvas) return;

        // 2. Получаем контекст рисования. '2d' означает двумерную графику.
        // Через ctx вызываются все методы рисования.
        const ctx = canvas.getContext("2d");

        // 3. Очищаем прямоугольную область холста (на случай перерисовки)
        // clearRect(x, y, ширина, высота) стирает пиксели.
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // -------------------- Рисуем голову (жёлтый круг) --------------------
        // fillStyle задаёт цвет заливки (можно использовать имена, HEX, RGB)
        ctx.fillStyle = "#FFD700";  // золотистый

        // beginPath() начинает новый контур (чтобы не соединять с предыдущими линиями)
        ctx.beginPath();

        // arc(x, y, радиус, начальныйУгол, конечныйУгол) – рисует дугу/окружность.
        // Углы в радианах: 0 до Math.PI*2 – полный круг.
        ctx.arc(150, 100, 50, 0, Math.PI * 2);

        // fill() закрашивает текущий контур цветом fillStyle.
        ctx.fill();

        // Меняем настройки для обводки (контура)
        ctx.strokeStyle = "#000";    // чёрный
        ctx.lineWidth = 2;           // толщина линии 2 пикселя

        // stroke() обводит текущий контур
        ctx.stroke();

        // -------------------- Рисуем глаза (два чёрных кружка) --------------------
        ctx.fillStyle = "#000";      // цвет заливки для глаз

        // Левый глаз
        ctx.beginPath();
        ctx.arc(130, 85, 5, 0, Math.PI * 2);
        ctx.fill();

        // Правый глаз
        ctx.beginPath();
        ctx.arc(170, 85, 5, 0, Math.PI * 2);
        ctx.fill();

        // -------------------- Рисуем улыбку (дуга) --------------------
        ctx.beginPath();
        // Дугa от 0 до Math.PI (половина круга) – это улыбка
        ctx.arc(150, 115, 20, 0, Math.PI);
        ctx.stroke();                // обводим дугу (заливка не нужна)

        /*
          Примечание: все координаты подобраны вручную под размер холста (300x200).
          Если менять размер, придётся пересчитывать положение фигур.
          Для динамической адаптации можно использовать относительные расчёты,
          но для простого примера оставим так.
        */
    })();
});
