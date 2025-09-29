// Получаем элементы
const habitInput = document.getElementById('habit-input');
const addHabitBtn = document.getElementById('add-habit');
const habitList = document.getElementById('habit-list');

// Загружаем привычки при запуске страницы
window.addEventListener('DOMContentLoaded', loadHabits);

// Функция создания DOM-элемента привычки
function createHabitElement(habitText) {
    // Контейнер для привычки
    const habitItem = document.createElement('div');
    habitItem.classList.add('habit-item');

    // Кнопка выполнить привычку
    const completeHabit = document.createElement('button');
    completeHabit.textContent = '✅';
    completeHabit.classList.add('complete-habit');

    // Выполняем по клику
    completeHabit.addEventListener('click', () => {
        // Убираем противоположный класс
        text.classList.remove('uncompleted');

        // Добавляем/убираем класс completed
        const isCompleted = text.classList.toggle('completed');
        console.log(
            isCompleted
            ? 'Привычка успешно выполнена!'
            : 'Привычка успешно зачеркнута!'
        );

        saveHabits(); // Сохраняем изменения в localStorage

        addToHistory(habitText, isCompleted);
    });

    // Текст привычки
    const text = document.createElement('span');
    text.textContent = `Цель: ${habitText}`;

    // Кнопка удалить привычку
    const deleteHabit = document.createElement('button');
    deleteHabit.textContent = '❌';
    deleteHabit.classList.add('delete-habit');

    // Удаляем по клику
    deleteHabit.addEventListener('click', () => {
        text.classList.remove('completed'); // убираем выполненный статус
        text.classList.add('uncompleted');  // ставим невыполненный статус

        habitItem.remove();
        console.log('Привычка успешно зачеркнута!');
        saveHabits(); // Сохраняем изменения в localStorage
        addToHistory(habitText, false);
    });

    // Собираем элементы
    habitItem.appendChild(completeHabit);
    habitItem.appendChild(text);
    habitItem.appendChild(deleteHabit);

    // Добавляем в список
    habitList.appendChild(habitItem);

    return habitItem;
}

// Функция сохранения привычек в localStorage
function saveHabits() {
    const habits = [];

    document.querySelectorAll('.habit-item').forEach(item => {
        const span = item.querySelector('span');

        const cleanText = span.textContent.replace(/^Цель:\s*/, '');

        habits.push({
            text: cleanText,
            completed: span.classList.contains('completed'), // true or false
            uncompleted: span.classList.contains('uncompleted') // true or false
        });
    });

    localStorage.setItem('habits', JSON.stringify(habits));
}

// Функция загрузки привычек из localStorage
function loadHabits() {
    const savedHabits = JSON.parse(localStorage.getItem('habits')) || [];

    savedHabits.forEach(habit => {
        const habitItem = createHabitElement(habit.text);

        const textElement = habitItem.querySelector('span');
        if (habit.completed) {
            textElement.classList.add('completed');
        }
    });

    console.log('Все созданные ранее привычки успешно загружены в список!');
}

// Функция добавления новой привычки
function addHabit() {
    const habitText = habitInput.value.trim();
    if (habitText === '') return;

    createHabitElement(habitText);
    saveHabits(); // // Сохраняем изменения в localStorage

    // Очищение input после добавления
    habitInput.value = '';
}

// Слушатель кнопки "Добавить"
addHabitBtn.addEventListener('click', addHabit);

/* Меню истории привычек */
const hamburgerMenu = document.getElementById('hamburger-menu');
const historyMenu = document.getElementById('history-menu');
const historyList = document.getElementById('history-list');

let habitHistory = JSON.parse(localStorage.getItem('habitHistory')) || [];

// Открытие/закрытие меню
hamburgerMenu.addEventListener('click', () => {
    historyMenu.classList.toggle('hidden');
    renderHistory();
});

// Закрыть меню при клике на любое пустое место
document.addEventListener('click', () => {
    const isClickInsideMenu = historyMenu.contains(event.target);
    const isClickonHamburger = hamburgerMenu.contains(event.target);

    if (!isClickInsideMenu && !isClickonHamburger) {
        historyMenu.classList.add('hidden');
    }
});

// Добавление привычки в историю
function addToHistory(habitText, isCompleted) {
    const record = {
        text: habitText,
        completed: isCompleted,
        date: new Date().toLocaleString()
    };

    habitHistory.push(record);
    console.log('Ваша привычка сохранена в историю!');
    localStorage.setItem('habitHistory', JSON.stringify(habitHistory));
}

// Отображение истории
function renderHistory() {
    historyList.innerHTML = '';

    if (habitHistory.length === 0) {
        historyList.innerHTML = '<li>История пуста..</li>';
        return;
    }

    habitHistory.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `${item.date} - ${item.text}`;
        li.classList.add(item.completed ? 'completed' : 'uncompleted');
        historyList.appendChild(li);
    });
}

// Удаление истории
const deleteHistory = document.getElementById('delete-history');

deleteHistory.addEventListener('click', () => {
    if (confirm('Вы уверены, что хотите полностью очистить историю привычек?')) {
        localStorage.removeItem('habitHistory');
        historyList.innerHTML = '';
        console.log('История привычек полностью очищена!');
    }
});