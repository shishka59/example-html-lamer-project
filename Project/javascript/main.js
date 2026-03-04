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

function draw() {
    // 2. Очистка и Анимация: перерисовываем каждый кадр
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 3. Трансформации: смайлик плавно покачивается
    angle = Math.sin(Date.now() / 500) * 0.1;
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(angle);

    // 4. Сложные эффекты: Градиент и Тень
    const gradient = ctx.createRadialGradient(-20, -20, 10, 0, 0, 70);
    gradient.addColorStop(0, "#fff700");
    gradient.addColorStop(1, "#ff8c00");

    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 10;

    // Голова
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(0, 0, 70, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Глаза, которые следят за мышью
    [1, -1].forEach(side => {
        ctx.save();
        ctx.translate(side * 25, -20);

        // Математика взгляда
        const dx = (mouse.x - (canvas.width/2 + side * 25));
        const dy = (mouse.y - (canvas.height/2 - 20));
        const dist = Math.min(Math.sqrt(dx*dx + dy*dy), 5);
        const a = Math.atan2(dy, dx);

        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(0, 0, 12, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "black";
        ctx.beginPath();
        ctx.arc(Math.cos(a) * dist, Math.sin(a) * dist, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    });

    // Улыбка
    ctx.beginPath();
    ctx.arc(0, 15, 35, 0.2 * Math.PI, 0.8 * Math.PI);
    ctx.lineWidth = 4;
    ctx.lineCap = "round";
    ctx.stroke();

    ctx.restore(); // Сброс трансформаций

    // 5. Манипуляция пикселями (Инверсия области при наведении)
    if (Math.hypot(mouse.x - canvas.width/2, mouse.y - canvas.height/2) < 70) {
        applyPixelEffect();
    }

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
