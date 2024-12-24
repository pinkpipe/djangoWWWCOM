let lastX = 0;
let lastY = 0;
let lastTranslateY = 0;
let lastTranslateX = 0;
let blurAmount = 0;
let timeoutId = null;


var btn_vk_js = document.getElementById('btn_vk')
var btn_tg_js = document.getElementById('btn_tg')
var btn_share_base = document.getElementById('btn_share')

function showBtn() {


    btn_tg_js.style.display = 'block';
    btn_vk_js.style.display = 'block';

    btn_share_base.classList.add('active');

    setTimeout(function() {
        btn_tg_js.classList.add("show");
    }, 10);
    setTimeout(function() {
        btn_vk_js.classList.add("show");
    }, 100);
}

function hideBtns() {
    // Удаляем класс "show" для плавного скрытия
    btn_tg_js.classList.remove("show");
    btn_vk_js.classList.remove("show");

    btn_share_base.classList.remove('active')

    // Скрываем кнопки после завершения анимации
    setTimeout(function () {
        btn_tg_js.style.display = "none";
        btn_vk_js.style.display = "none";
    }, 500); // Задержка соответствует длительности анимации
}

// Обработчик клика на всю страницу
document.addEventListener('click', function (event) {
    const btnShare = document.querySelector('.btn_share');

    // Проверяем, был ли клик на кнопке "Share" или на кнопках VK/Telegram
    if (!btnShare.contains(event.target) && !btn_tg_js.contains(event.target) && !btn_vk_js.contains(event.target)) {
        hideBtns();
    }
});



function updateBlur(amount) {
    blurAmount = Math.min(20, amount); // Ограничиваем максимальное размытие
    $('.-mouse-parallax__blur').css('backdrop-filter', `blur(${blurAmount}px)`);
}

function resetBlur() {
    $('.-mouse-parallax__blur').css('transition', 'backdrop-filter 0.3s ease-out');
    updateBlur(0);
}

$('body').on('mousemove', (e) => {
    const x = e.pageX / $(window).width();
    const y = e.pageY / $(window).height();

    // Вычисляем смещение фона
    const translateX = -x * 30;
    const translateY = -y * 30;

    // Обновляем положение фона
    $('.-mouse-parallax__background').css(
        'transform',
        `translate3d(${translateX}px, ${translateY}px, 0)`
    );

    // Вычисляем разницу в смещении фона
    const deltaTranslateY = translateY - lastTranslateY;
    const deltaTranslateX = translateX - lastTranslateX;

    // Обновляем размытие на основе смещения фона
    if (deltaTranslateY < 0) {
        // Фон смещается вверх, увеличиваем размытие
        blurAmount += Math.abs(deltaTranslateY) * 0.5; // Коэффициент 0.1 можно настроить
    } else if (deltaTranslateY > 0) {
        // Фон смещается вниз, уменьшаем размытие
        blurAmount += Math.abs(deltaTranslateY) * 0.5; // Коэффициент 0.1 можно настроить
    }

    if (deltaTranslateX < 0) {
        // Фон смещается вверх, увеличиваем размытие
        blurAmount += Math.abs(deltaTranslateX) * 0.1; // Коэффициент 0.1 можно настроить
    } else if (deltaTranslateX > 0) {
        // Фон смещается вниз, уменьшаем размытие
        blurAmount += Math.abs(deltaTranslateX) * 0.1; // Коэффициент 0.1 можно настроить
    }

    // Ограничиваем размытие в пределах 0 и 20
    blurAmount = Math.max(0, Math.min(10, blurAmount));

    updateBlur(blurAmount);

    // Обновляем последние значения
    lastX = x;
    lastY = y;
    lastTranslateY = translateY;

    // Очищаем предыдущий таймер и устанавливаем новый для сброса размытия
    clearTimeout(timeoutId);
    timeoutId = setTimeout(resetBlur, 100); // Возвращаем размытие к нулю через 100мс после остановки движения
});