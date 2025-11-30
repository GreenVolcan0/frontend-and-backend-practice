// Управление модальными окнами для проектов
document.addEventListener('DOMContentLoaded', function() {
    initProjectModals();
});

// Глобальная функция для открытия модального окна проекта
window.openProjectModal = function(projectId) {
    const projectsData = [
        {
            id: 1,
            title: "Тайм-менеджмент приложение",
            description: "Инновационное приложение для управления временем и повышения продуктивности. Включает планировщик задач, таймер Pomodoro, статистику продуктивности и умные уведомления. Идеально подходит для студентов и профессионалов.",
            image: "../images/project3.png",
            technologies: ["JavaScript", "React", "LocalStorage", "CSS3"],
            demoLink: "#",
            githubLink: "#",
            features: [
                "Техника Pomodoro",
                "Статистика продуктивности",
                "Умные уведомления",
                "Экспорт данных"
            ]
        },
        {
            id: 2,
            title: "Личный сайт-портфолио",
            description: "Современный адаптивный веб-сайт портфолио с акцентом на пользовательский опыт. Чистый дизайн, оптимизированная производительность и семантическая верстка. Полностью адаптирован под мобильные устройства.",
            image: "../images/project1.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "Responsive"],
            demoLink: "#",
            githubLink: "#",
            features: [
                "Адаптивный дизайн",
                "Оптимизация производительности",
                "Семантическая верстка",
                "PWA готовность"
            ]
        },
        {
            id: 3,
            title: "Сайт-прикол",
            description: "Интерактивный развлекательный веб-сайт с юмористическим контентом. Создан для поднятия настроения с использованием современных веб-технологий и креативных анимаций.",
            image: "../images/project2.png",
            technologies: ["HTML5", "CSS3", "JavaScript", "Canvas"],
            demoLink: "https://greenvolcan0.github.io/meow-web/",
            githubLink: "#",
            features: [
                "Интерактивные анимации",
                "Мини-игры",
                "Адаптивный дизайн",
                "Веселые эффекты"
            ],
            isExternal: true
        },
        {
            id: 4,
            title: "Приложение для вело-спортсменов",
            description: "Специализированное приложение для велосипедистов с отслеживанием маршрутов, статистикой тренировок и социальными функциями. Интеграция с GPS и датчиками для точных измерений.",
            image: "../images/project4.jpg",
            technologies: ["React", "JavaScript", "GPS API", "Chart.js"],
            demoLink: "#",
            githubLink: "#",
            features: [
                "Отслеживание маршрутов",
                "Статистика тренировок",
                "Социальные функции",
                "GPS интеграция"
            ]
        }
    ];
    
    const project = projectsData.find(p => p.id === parseInt(projectId));
    if (project) {
        showProjectModal(project);
    }
};

// Инициализация модальных окон
function initProjectModals() {
    // Создаем модальное окно для проектов, если его нет
    if (!document.getElementById('project-modal')) {
        createProjectModal();
    }
    
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

// Создание модального окна для проектов
function createProjectModal() {
    const modalHTML = `
        <div id="project-modal" class="modal">
            <div class="modal-content">
                <div class="modal-header">
                    <h3 class="modal-title">Проект</h3>
                    <button class="close-modal">&times;</button>
                </div>
                <div class="modal-body">
                    <img src="" alt="" class="project-modal-image" style="width: 100%; height: 200px; object-fit: cover; border-radius: var(--radius-md); margin-bottom: var(--space-md);">
                    <p class="modal-description" style="margin-bottom: var(--space-md);"></p>
                    <div class="project-tech" style="display: flex; flex-wrap: wrap; gap: var(--space-xs); margin-bottom: var(--space-md);"></div>
                    <div class="modal-links" style="display: flex; gap: var(--space-md);">
                        <a href="#" class="button button--primary modal-link live" target="_blank">Посмотреть демо</a>
                        <a href="#" class="button button--outline modal-link github" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
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
        `<span class="tech-tag">${tech}</span>`
    ).join('');
    
    // Ссылки
    const demoLink = modal.querySelector('.modal-link.live');
    const githubLink = modal.querySelector('.modal-link.github');
    
    if (project.demoLink && project.demoLink !== '#') {
        demoLink.href = project.demoLink;
        demoLink.style.display = 'inline-block';
    } else {
        demoLink.style.display = 'none';
    }
    
    if (project.githubLink && project.githubLink !== '#') {
        githubLink.href = project.githubLink;
        githubLink.style.display = 'inline-block';
    } else {
        githubLink.style.display = 'none';
    }
    
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