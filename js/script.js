// Ждем полной загрузки DOM
document.addEventListener('DOMContentLoaded', function() {
    // Обработчик для кнопки CTA
    const ctaButton = document.getElementById('cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            alert('Спасибо за интерес к нашему сайту!');
            // Анимация кнопки
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    }

    // Плавная прокрутка для якорных ссылок (если они есть)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Добавляем текущий год в футер
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('footer p');
    if (yearElement) {
        // Заменяем '2024' на текущий год, если он изменился, или просто убеждаемся, что год правильный
        yearElement.innerHTML = yearElement.innerHTML.replace('2024', currentYear);
    }

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1, // Элемент считается видимым, когда 10% его области входит в viewport
        rootMargin: '0px 0px -50px 0px' // Отступ снизу, чтобы элементы появлялись чуть раньше
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Можно остановить наблюдение после первого появления, если анимация одноразовая
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с классом '.feature'
    document.querySelectorAll('.feature').forEach(el => {
        el.style.opacity = '0'; // Изначально делаем их невидимыми
        el.style.transform = 'translateY(20px)'; // Сдвигаем их вниз
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease'; // Добавляем плавный переход
        observer.observe(el); // Начинаем наблюдение
    });
});