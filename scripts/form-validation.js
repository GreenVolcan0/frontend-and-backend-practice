// Валидация форм на странице контактов
document.addEventListener('DOMContentLoaded', function() {
    initContactForm();
    initFormAnimations();
});

// Инициализация контактной формы
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', handleFormSubmit);
    
    // Валидация в реальном времени
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', clearFieldError);
    });
}

// Обработка отправки формы
function handleFormSubmit(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    // Валидация всех полей
    const isValid = validateAllFields(form);
    
    if (isValid) {
        submitForm(data, form);
    } else {
        showFormError('Пожалуйста, исправьте ошибки в форме');
    }
}

// Валидация отдельного поля
function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    const fieldName = field.getAttribute('name') || field.id;
    
    clearFieldError(field);
    
    let isValid = true;
    let errorMessage = '';
    
    switch (fieldName) {
        case 'name':
            isValid = value.length >= 2;
            errorMessage = isValid ? '' : 'Имя должно содержать минимум 2 символа';
            break;
            
        case 'email':
            isValid = isValidEmail(value);
            errorMessage = isValid ? '' : 'Введите корректный email адрес';
            break;
            
        case 'message':
            isValid = value.length >= 10;
            errorMessage = isValid ? '' : 'Сообщение должно содержать минимум 10 символов';
            break;
    }
    
    if (!isValid && value) {
        showFieldError(field, errorMessage);
    }
    
    updateFieldStatus(field, isValid);
    return isValid;
}

// Валидация всех полей формы
function validateAllFields(form) {
    const fields = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;
    
    fields.forEach(field => {
        const isValid = validateField({ target: field });
        if (!isValid) allValid = false;
    });
    
    return allValid;
}

// Проверка email
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Показать ошибку поля
function showFieldError(field, message) {
    // Удаляем существующую ошибку
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    
    // Создаем элемент ошибки
    const errorElement = document.createElement('div');
    errorElement.className = 'field-error';
    errorElement.textContent = message;
    errorElement.style.cssText = `
        color: #e74c3c;
        font-size: 0.8rem;
        margin-top: 4px;
        animation: fadeIn 0.3s ease;
    `;
    
    field.parentNode.appendChild(errorElement);
    field.classList.add('field-error');
}

// Очистка ошибки поля
function clearFieldError(e) {
    const field = e.target;
    field.classList.remove('field-error');
    
    const errorElement = field.parentNode.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

// Обновление статуса поля
function updateFieldStatus(field, isValid) {
    if (field.value.trim()) {
        field.classList.toggle('field-valid', isValid);
        field.classList.toggle('field-invalid', !isValid);
    }
}

// Отправка формы
function submitForm(data, form) {
    const submitBtn = form.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    // Показываем индикатор загрузки
    submitBtn.textContent = 'Отправка...';
    submitBtn.disabled = true;
    
    // Имитация отправки на сервер
    setTimeout(() => {
        // В реальном приложении здесь был бы fetch запрос
        console.log('Данные формы:', data);
        
        // Показываем успешное сообщение
        showFormSuccess('Сообщение успешно отправлено!');
        
        // Сбрасываем форму
        form.reset();
        
        // Восстанавливаем кнопку
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Сбрасываем статусы полей
        const fields = form.querySelectorAll('.field-valid, .field-invalid');
        fields.forEach(field => {
            field.classList.remove('field-valid', 'field-invalid');
        });
        
    }, 2000);
}

// Показать успешное сообщение формы
function showFormSuccess(message) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'success');
    } else {
        // Fallback уведомление
        alert(message);
    }
}

// Показать ошибку формы
function showFormError(message) {
    if (typeof showNotification === 'function') {
        showNotification(message, 'error');
    } else {
        alert(message);
    }
}

// Анимации для формы
function initFormAnimations() {
    const formElements = document.querySelectorAll('.form-group');
    
    formElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Валидация для других форм (если понадобятся)
const FormValidator = {
    // Валидация номера телефона
    validatePhone: function(phone) {
        const phoneRegex = /^[\+]?[0-9\s\-\(\)]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    },
    
    // Валидация URL
    validateURL: function(url) {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    },
    
    // Валидация пароля
    validatePassword: function(password) {
        return password.length >= 8 &&
               /[A-Z]/.test(password) &&
               /[a-z]/.test(password) &&
               /[0-9]/.test(password);
    }
};

// Добавление CSS для валидации
const validationStyles = `
    .field-valid {
        border-color: #27ae60 !important;
        background-color: #f8fff9;
    }
    
    .field-invalid {
        border-color: #e74c3c !important;
        background-color: #fff8f8;
    }
    
    .field-error {
        border-color: #e74c3c !important;
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;

// Добавляем стили в документ
if (!document.querySelector('#validation-styles')) {
    const styleElement = document.createElement('style');
    styleElement.id = 'validation-styles';
    styleElement.textContent = validationStyles;
    document.head.appendChild(styleElement);
}