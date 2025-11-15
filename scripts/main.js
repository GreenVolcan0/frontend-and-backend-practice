// Основной скрипт для всего сайта
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация всех компонентов
    initNavigation();
    initAnimations();
    initProgressBars();
    
    // Проверяем, на какой странице находимся
    const currentPage = getCurrentPage();
    
    // Инициализируем специфичные для страницы функции
    switch(currentPage) {
        case 'index':
            initIndexPage();
            break;
        case 'diary':
            initDiaryPage();
            break;
        case 'projects':
            // Инициализация через filters.js и modal.js
            break;
        case 'contacts':
            // Инициализация через form-validation.js
            break;
    }
});

// Получение текущей страницы
function getCurrentPage() {
    const path = window.location.pathname;
    if (path.includes('projects.html')) return 'projects';
    if (path.includes('diary.html')) return 'diary';
    if (path.includes('contacts.html')) return 'contacts';
    return 'index';
}

// Инициализация навигации
function initNavigation() {
    const navLinks = document.querySelectorAll('.nav__link');
    const currentPage = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPage.split('/').pop() || 
            (currentPage.endsWith('/') && link.getAttribute('href') === 'index.html')) {
            link.parentElement.classList.add('nav__item--active');
        }
    });
}

// Инициализация анимаций
function initAnimations() {
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами с анимацией
    const animatedElements = document.querySelectorAll('.profile__card, .skills, .projects-preview, .diary-section, .contacts-section');
    animatedElements.forEach(el => observer.observe(el));
}

// Инициализация прогресс-баров
function initProgressBars() {
    const progressBars = document.querySelectorAll('.skill__progress, .course__progress-bar');
    
    progressBars.forEach(bar => {
        const width = bar.style.width;
        bar.style.width = '0%';
        
        setTimeout(() => {
            bar.style.transition = 'width 1s ease-in-out';
            bar.style.width = width;
        }, 300);
    });
}

// Функции для главной страницы
function initIndexPage() {
    // Обработка кнопки скачивания резюме
    const downloadBtn = document.querySelector('.profile__button');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            // Можно добавить аналитику или другие действия
            console.log('Резюме скачано');
        });
    }
    
    // Инициализация предпросмотра проектов
    initProjectPreviews();
}

// Предпросмотр проектов на главной
function initProjectPreviews() {
    const projectPreviews = document.querySelectorAll('.project-preview');
    
    projectPreviews.forEach((preview, index) => {
        preview.addEventListener('click', function() {
            // Перенаправление на страницу проектов
            window.location.href = 'pages/projects.html';
        });
    });
}

// Функции для страницы дневника
function initDiaryPage() {
    // Загрузка данных прогресса
    loadProgressData();
    
    // Инициализация кнопки добавления записи
    const addEntryBtn = document.getElementById('add-entry-btn');
    if (addEntryBtn) {
        addEntryBtn.addEventListener('click', showAddEntryModal);
    }
    
    // Инициализация модального окна
    initModal();
}

// Загрузка данных прогресса
function loadProgressData() {
    const progressData = [
        { date: '15 дек', text: 'Верстка макета сайта', status: 'completed' },
        { date: '10 дек', text: 'JavaScript основы', status: 'completed' },
        { date: '05 дек', text: 'Работа с формами', status: 'in-progress' },
        { date: '01 дек', text: 'Адаптивный дизайн', status: 'in-progress' }
    ];
    
    const progressList = document.getElementById('progress-list');
    if (progressList) {
        progressData.forEach(item => {
            const progressItem = createProgressItem(item);
            progressList.appendChild(progressItem);
        });
    }
}

// Создание элемента прогресса
function createProgressItem(data) {
    const item = document.createElement('div');
    item.className = `progress-item ${data.status}`;
    item.innerHTML = `
        <span class="progress-item__date">${data.date}</span>
        <span class="progress-item__text">${data.text}</span>
        <span class="progress-item__status">${data.status === 'completed' ? '✓' : '⏳'}</span>
    `;
    return item;
}

// Показать модальное окно добавления записи
function showAddEntryModal() {
    const modal = document.getElementById('add-entry-modal');
    if (modal) {
        modal.style.display = 'block';
        
        // Установка сегодняшней даты по умолчанию
        const today = new Date().toISOString().split('T')[0];
        const dateInput = document.getElementById('entry-date');
        if (dateInput) dateInput.value = today;
    }
}

// Инициализация модального окна
function initModal() {
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');
    
    // Закрытие модального окна
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) modal.style.display = 'none';
        });
    });
    
    // Закрытие при клике вне модального окна
    window.addEventListener('click', function(e) {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });
    
    // Обработка формы добавления записи
    const addEntryForm = document.getElementById('add-entry-form');
    if (addEntryForm) {
        addEntryForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNewEntry(this);
        });
    }
}

// Добавление новой записи
function addNewEntry(form) {
    const date = form.querySelector('#entry-date').value;
    const text = form.querySelector('#entry-text').value;
    const status = form.querySelector('#entry-status').value;
    
    // Форматирование даты
    const formattedDate = new Date(date).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'short'
    });
    
    // Создание новой записи
    const newEntry = {
        date: formattedDate,
        text: text,
        status: status
    };
    
    // Добавление в список
    const progressList = document.getElementById('progress-list');
    const progressItem = createProgressItem(newEntry);
    progressList.insertBefore(progressItem, progressList.firstChild);
    
    // Закрытие модального окна
    const modal = document.getElementById('add-entry-modal');
    if (modal) modal.style.display = 'none';
    
    // Очистка формы
    form.reset();
    
    // Показать уведомление
    showNotification('Запись успешно добавлена!', 'success');
}

// Универсальная функция показа уведомлений
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-text">${message}</span>
            <button class="close-notification">&times;</button>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Анимация появления
    setTimeout(() => notification.classList.add('notification--show'), 100);
    
    // Закрытие уведомления
    const closeBtn = notification.querySelector('.close-notification');
    closeBtn.addEventListener('click', () => {
        notification.classList.remove('notification--show');
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
    
    // Автоматическое закрытие
    setTimeout(() => {
        if (notification.parentNode) {
            notification.classList.remove('notification--show');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }
    }, 5000);
}

// Утилиты для работы с локальным хранилищем
const Storage = {
    set: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (e) {
            console.error('Ошибка сохранения в localStorage:', e);
            return false;
        }
    },
    
    get: function(key) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : null;
        } catch (e) {
            console.error('Ошибка чтения из localStorage:', e);
            return null;
        }
    },
    
    remove: function(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            console.error('Ошибка удаления из localStorage:', e);
            return false;
        }
    }
};