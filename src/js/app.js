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

    // Кнопка завершить привычку
    const completeHabit = document.createElement('button');
    completeHabit.textContent = '✅';
    completeHabit.classList.add('complete-habit');

    // Выполняем по клику
    completeHabit.addEventListener('click', () => {
        text.classList.toggle('completed');
        console.log('Привычка успешно выполнена!');
        saveHabits(); // Сохраняем изменения в localStorage
    })

    // Текст привычки
    const text = document.createElement('span');
    text.textContent = `Цель: ${habitText}`;

    // Кнопка удалить привычку
    const deleteHabit = document.createElement('button');
    deleteHabit.textContent = '❌';
    deleteHabit.classList.add('delete-habit');

    // Удаляем по клику
    deleteHabit.addEventListener('click', () => {
        text.classList.toggle('uncompleted');
        habitItem.remove();
        console.log('Привычка успешно зачеркнута!');
        saveHabits(); // Сохраняем изменения в localStorage 
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