// Фильтрация проектов на странице projects.html
document.addEventListener('DOMContentLoaded', function() {
    initProjectsFilter();
    loadProjectsData();
});

// Инициализация фильтров
function initProjectsFilter() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Обновление активной кнопки
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Применение фильтра
            const filter = this.getAttribute('data-filter');
            applyProjectFilter(filter);
        });
    });
}

// Применение фильтра к проектам
function applyProjectFilter(filter) {
    const projects = document.querySelectorAll('.project-card');
    
    projects.forEach(card => {
        const categories = card.getAttribute('data-category').split(' ');
        
        if (filter === 'all' || categories.includes(filter)) {
            card.style.display = 'block';
            // Анимация появления
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'scale(1)';
            }, 100);
        } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.8)';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

// Загрузка данных проектов
function loadProjectsData() {
    const projectsData = [
        {
            id: 1,
            title: "Тайм-менеджмент приложение",
            description: "Инновационное приложение для управления временем и повышения продуктивности. Включает планировщик задач, таймер Pomodoro, статистику продуктивности и умные уведомления. Идеально подходит для студентов и профессионалов.",
            image: "../images/project3.png",
            technologies: ["JavaScript", "React", "LocalStorage", "CSS3"],
            demoLink: "#",
            githubLink: "#",
            category: "app js",
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
            category: "web js",
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
            category: "web js",
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
            category: "app js",
            features: [
                "Отслеживание маршрутов",
                "Статистика тренировок",
                "Социальные функции",
                "GPS интеграция"
            ]
        }
    ];
    
    renderProjects(projectsData);
}

// Отрисовка проектов
function renderProjects(projects) {
    const projectsGrid = document.querySelector('.projects-grid');
    if (!projectsGrid) return;
    
    projectsGrid.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = createProjectCard(project);
        projectsGrid.appendChild(projectCard);
    });
}

// Создание карточки проекта
function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    card.setAttribute('data-category', project.category);
    card.setAttribute('data-id', project.id);
    
    if (project.isExternal) {
        card.classList.add('external-project');
    }
    
    card.innerHTML = `
        <div class="project-card__image">
            <img src="${project.image}" alt="${project.title}" class="project-image">
            <div class="project-overlay">
                <button class="view-project-btn" data-id="${project.id}">
                    ${project.isExternal ? 'Открыть сайт →' : 'Посмотреть проект'}
                </button>
            </div>
            ${project.isExternal ? '<div class="external-badge">🌐 Внешний</div>' : ''}
        </div>
        <div class="project-card__content">
            <h3 class="project-card__title">${project.title}</h3>
            <p class="project-card__description">${project.description}</p>
            <div class="project-card__tech">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
            ${project.isExternal ? '<div class="external-hint">Нажмите для перехода на сайт</div>' : ''}
        </div>
    `;
    
    // Добавление обработчика клика
    const viewBtn = card.querySelector('.view-project-btn');
    viewBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        handleProjectClick(project);
    });
    
    // Клик по всей карточке
    card.addEventListener('click', function() {
        handleProjectClick(project);
    });
    
    return card;
}

// Обработка клика по проекту
function handleProjectClick(project) {
    if (project.isExternal && project.demoLink) {
        // Для внешних проектов открываем ссылку
        window.open(project.demoLink, '_blank');
    } else {
        // Для внутренних проектов открываем модальное окно
        if (typeof window.openProjectModal === 'function') {
            window.openProjectModal(project.id);
        } else {
            // Если модального окна нет, просто показываем alert
            alert(`Проект: ${project.title}\n\n${project.description}`);
        }
    }
}