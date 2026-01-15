// Мобильное меню
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Закрытие меню при клике на ссылку
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Фильтрация мероприятий
const filterButtons = document.querySelectorAll('.filter-btn');
const eventsGrid = document.querySelector('.events-grid');

// Данные мероприятий
const eventsData = [
    {
        id: 1,
        title: "D&D: Кампания 'Потерянные руины'",
        date: "15 ОКТ, 19:00",
        type: "dnd",
        desc: "Новая кампания для начинающих и опытных игроков. Мастер с 5-летним опытом.",
        seats: "Осталось 3 места",
        room: "Комната Актеров"
    },
    {
        id: 2,
        title: "Кинопоказ: фэнтези-ночь",
        date: "16 ОКТ, 20:00",
        type: "cinema",
        desc: "Просмотр классики фэнтези с обсуждением и тематическими закусками.",
        seats: "Места есть",
        room: "Комната Зрителей"
    },
    {
        id: 3,
        title: "Мастер-класс по оригами",
        date: "17 ОКТ, 18:00",
        type: "workshop",
        desc: "Учимся создавать бумажных драконов и других мифических существ.",
        seats: "Осталось 5 мест",
        room: "Комната Зрителей"
    },
    {
        id: 4,
        title: "Турнир по настольным играм",
        date: "18 ОКТ, 17:00",
        type: "tournament",
        desc: "Еженедельный турнир с призами. Настолки на выбор.",
        seats: "Регистрация открыта",
        room: "Комната Актеров"
    },
    {
        id: 5,
        title: "D&D для новичков",
        date: "19 ОКТ, 19:00",
        type: "dnd",
        desc: "Специальная сессия для тех, кто только начинает свой путь в D&D.",
        seats: "Осталось 2 места",
        room: "Комната Актеров"
    },
    {
        id: 6,
        title: "Вечер покера",
        date: "20 ОКТ, 20:00",
        type: "tournament",
        desc: "Дружеский покер-вечер без ставок, только для удовольствия.",
        seats: "Места есть",
        room: "Комната Зрителей"
    }
];

// Иконки для типов мероприятий
const typeIcons = {
    dnd: '⚔️',
    cinema: '🎬',
    workshop: '✂️',
    tournament: '🏆'
};

// Типы мероприятий (русские названия)
const typeNames = {
    dnd: 'D&D',
    cinema: 'Кино',
    workshop: 'Мастер-класс',
    tournament: 'Турнир'
};

// Функция для отрисовки карточек мероприятий
function renderEvents(events) {
    eventsGrid.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.setAttribute('data-type', event.type);
        
        eventCard.innerHTML = `
            <div class="event-header">
                <div class="event-date">${event.date}</div>
                <div class="event-type">${typeIcons[event.type]} ${typeNames[event.type]}</div>
            </div>
            <div class="event-body">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-desc">${event.desc}</p>
                <div class="event-meta">
                    <span><i class="fas fa-users"></i> ${event.seats}</span>
                    <span><i class="fas fa-door-open"></i> ${event.room}</span>
                </div>
            </div>
            <div class="event-footer">
                <button class="btn btn-primary btn-block" onclick="bookEvent(${event.id})">Спасти себе место</button>
            </div>
        `;
        
        eventsGrid.appendChild(eventCard);
    });
}

// Инициализация мероприятий
renderEvents(eventsData);

// Фильтрация
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Убираем активный класс у всех кнопок
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Добавляем активный класс текущей кнопке
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        if (filter === 'all') {
            renderEvents(eventsData);
        } else {
            const filteredEvents = eventsData.filter(event => event.type === filter);
            renderEvents(filteredEvents);
        }
    });
});

// Функция бронирования
function bookEvent(eventId) {
    const event = eventsData.find(e => e.id === eventId);
    if (event) {
        document.getElementById('booking').scrollIntoView({ behavior: 'smooth' });
        
        // Можно добавить заполнение формы данными мероприятия
        setTimeout(() => {
            alert(`Вы выбрали: "${event.title}". Заполните форму бронирования ниже.`);
        }, 500);
    }
}

// Обработка формы бронирования
const bookingForm = document.getElementById('bookingForm');

bookingForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const date = document.getElementById('date').value;
    const guests = document.getElementById('guests').value;
    
    // Здесь обычно отправка данных на сервер
    // Для демо просто показываем сообщение
    
    // Создаем сообщение об успехе
    const successMessage = document.createElement('div');
    successMessage.className = 'success-message';
    successMessage.innerHTML = `
        <div style="background: #4CAF50; color: white; padding: 20px; border-radius: 10px; margin-top: 20px; text-align: center;">
            <h3><i class="fas fa-check-circle"></i> Заявка отправлена!</h3>
            <p>Спасибо, ${name}! Мы перезвоним на номер ${phone} в течение часа для подтверждения брони на ${date}.</p>
            <p>Ждем вас в Выручай-комнате!</p>
        </div>
    `;
    
    // Вставляем сообщение после формы
    bookingForm.parentNode.insertBefore(successMessage, bookingForm.nextSibling);
    
    // Очищаем форму
    bookingForm.reset();
    
    // Убираем сообщение через 5 секунд
    setTimeout(() => {
        successMessage.remove();
    }, 5000);
});

// Анимация появления элементов при скролле
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Наблюдаем за секциями
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Добавляем стиль для видимых элементов
const style = document.createElement('style');
style.textContent = `
    section {
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.6s ease, transform 0.6s ease;
    }
    
    section.visible {
        opacity: 1;
        transform: translateY(0);
    }
`;
document.head.appendChild(style);

// Устанавливаем минимальную дату в форме (сегодня)
const today = new Date().toISOString().split('T')[0];
document.getElementById('date').min = today;

// Инициализация видимости для первой секции
window.addEventListener('load', () => {
    document.querySelector('section').classList.add('visible');
});
