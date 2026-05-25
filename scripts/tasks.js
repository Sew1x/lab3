function addTask() {
    const input = document.getElementById('new-task-input');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert("Будь ласка, введіть завдання!");
        return;
    }

    const list = document.querySelector('.tasks-list');
    const listItem = document.createElement('li');
    
    const textSpan = document.createElement('span');
    textSpan.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Видалити';
    deleteBtn.onclick = function() {
        list.removeChild(listItem);
    };

    listItem.appendChild(textSpan);
    listItem.appendChild(deleteBtn);
    list.appendChild(listItem);
    
    input.value = ""; // Очищаємо поле
}
