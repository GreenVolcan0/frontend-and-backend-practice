// Управление модальными окнами для проектов
document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();
});

// Глобальная функция для открытия модального окна проекта
window.openProjectModal = function(projectId) {
    const projectsData = [
        {
            id: 1,
            title: "Личный сайт",
            description: "Современный адаптивный сайт-портфолио, разработанный с использованием HTML5 и CSS3. Сайт включает в себя разделы 'Обо мне', 'Навыки', 'Проекты' и 'Контакты'. Реализована адаптивная верстка для корректного отображения на всех устройствах. Проект демонстрирует навыки семантической верстки и работы с современными CSS-технологиями.",
            image: "../images/project1.jpg",
            technologies: ["HTML", "CSS"],
            demoLink: "https://example.com/demo1",
            githubLink: "https://github.com/username/project1",
            features: ["Адаптивный дизайн", "Семантическая верстка", "CSS Grid & Flexbox", "Оптимизация производительности"]
        },
        {
            id: 2,
            title: "Todo-приложение",
            description: "Интерактивное приложение для управления задачами с использованием JavaScript. Функционал включает добавление, удаление, редактирование и отметку выполненных задач. Данные сохраняются в локальном хранилище браузера. Приложение демонстрирует работу с DOM, обработку событий и использование Local Storage.",
            image: "../images/project2.jpg",
            technologies: ["HTML", "CSS", "JavaScript"],
            demoLink: "https://example.com/demo2",
            githubLink: "https://github.com/username/project2",
            features: ["Drag & Drop", "Local Storage", "Фильтрация задач", "Темная тема"]
        },
        {
            id: 3,
            title: "Интернет-магазин",
            description: "Полнофункциональный интернет-магазин с корзиной и системой заказов, разработанный на React. Включает каталог товаров, фильтрацию по категориям, поиск, корзину и оформление заказа. Использованы современные подходы к управлению состоянием приложения.",
            image: "../images/project3.jpg",
            technologies: ["React", "JavaScript", "CSS Modules"],
            demoLink: "https://example.com/demo3",
            githubLink: "https://github.com/username/project3",
            features: ["Корзина покупок", "Поиск товаров", "Фильтрация", "Адаптивный дизайн"]
        },
        {
            id: 4,
            title: "Портфолио на Bootstrap",
            description: "Адаптивное портфолио с использованием фреймворка Bootstrap 5. Включает современный дизайн, адаптивную сетку, навигацию и интерактивные элементы. Проект демонстрирует навыки работы с популярными CSS-фреймворками.",
            image: "../images/project4.jpg",
            technologies: ["Bootstrap", "HTML", "CSS"],
            demoLink: "https://example.com/demo4",
            githubLink: "https://github.com/username/project4",
            features: ["Bootstrap 5", "Адаптивная сетка", "Карусель проектов", "Модальные окна"]
        },
        {
            id: 5,
            title: "Игра 'Память'",
            description: "Классическая игра на запоминание карточек с подсчетом очков и таймером. Реализованы различные уровни сложности и система рекордов. Проект демонстрирует работу с таймерами, анимациями и игровой логикой.",
            image: "../images/project2.jpg",
            technologies: ["JavaScript", "HTML", "CSS"],
            demoLink: "https://example.com/demo5",
            githubLink: "https://github.com/username/project5",
            features: ["Таймер", "Уровни сложности", "Система очков", "Анимации"]
        },
        {
            id: 6,
            title: "Погодное приложение",
            description: "Приложение для просмотра погоды с использованием API и React. Отображает текущую погоду, прогноз на несколько дней, а также дополнительные метеоданные. Интегрировано с открытым Weather API.",
            image: "../images/project3.jpg",
            technologies: ["React", "JavaScript", "API", "CSS"],
            demoLink: "https://example.com/demo6",
            githubLink: "https://github.com/username/project6",
            features: ["Работа с API", "Геолокация", "Прогноз погоды", "Иконки погоды"]
        }
    ];
    
    const project = projectsData.find(p => p.id === parseInt(projectId));
    if (project) {
        showProjectModal(project);
    }
};

// Инициализация модальных окон
function initProjectModals() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // Закрытие модального окна
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', closeProjectModal);
    
    // Закрытие при клике вне модального окна
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeProjectModal();
        }
    });
    
    // Закрытие по ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            closeProjectModal();
        }
    });
}

// Показать модальное окно проекта
function showProjectModal(project) {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    // Заполнение данными
    modal.querySelector('.modal-title').textContent = project.title;
    modal.querySelector('.project-modal-image').src = project.image;
    modal.querySelector('.project-modal-image').alt = project.title;
    modal.querySelector('.modal-description').textContent = project.description;
    
    // Технологии
    const techContainer = modal.querySelector('.project-tech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="tech-tag ${tech.toLowerCase()}">${tech}</span>`
    ).join('');
    
    // Ссылки
    const demoLink = modal.querySelector('.modal-link.live');
    const githubLink = modal.querySelector('.modal-link.github');
    demoLink.href = project.demoLink;
    githubLink.href = project.githubLink;
    
    // Показать модальное окно
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Анимация появления
    setTimeout(() => {
        modal.classList.add('modal--show');
    }, 50);
}

// Закрыть модальное окно проекта
function closeProjectModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    
    modal.classList.remove('modal--show');
    
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }, 300);
}

// Управление галереей изображений в модальном окне
function initImageGallery() {
    const galleryImages = document.querySelectorAll('.gallery-image');
    const galleryModal = document.createElement('div');
    galleryModal.className = 'gallery-modal';
    galleryModal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-close">&times;</button>
            <button class="gallery-prev">‹</button>
            <img src="" alt="" class="gallery-main-image">
            <button class="gallery-next">›</button>
        </div>
    `;
    document.body.appendChild(galleryModal);
    
    let currentImageIndex = 0;
    const images = Array.from(galleryImages);
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            currentImageIndex = index;
            openGalleryModal();
        });
    });
    
    function openGalleryModal() {
        galleryModal.style.display = 'block';
        updateGalleryImage();
    }
    
    function updateGalleryImage() {
        const mainImage = galleryModal.querySelector('.gallery-main-image');
        mainImage.src = images[currentImageIndex].src;
        mainImage.alt = images[currentImageIndex].alt;
    }
    
    // Навигация по галерее
    galleryModal.querySelector('.gallery-prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        updateGalleryImage();
    });
    
    galleryModal.querySelector('.gallery-next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        updateGalleryImage();
    });
    
    galleryModal.querySelector('.gallery-close').addEventListener('click', () => {
        galleryModal.style.display = 'none';
    });
    
    galleryModal.addEventListener('click', (e) => {
        if (e.target === galleryModal) {
            galleryModal.style.display = 'none';
        }
    });
}