// Matthew Rozendaal
// Module 11.2

// Array to store items
let myArray = [];
let completedArray = [];

// Function to add an element to the array
function addElement(item) {
    if (item && item.trim() !== '') {
        const trimmedItem = item.trim();

        // Check for duplicates in both arrays (case-insensitive)
        const isDuplicateInActive = myArray.some(existingItem =>
            existingItem.toLowerCase() === trimmedItem.toLowerCase()
        );
        const isDuplicateInCompleted = completedArray.some(existingItem =>
            existingItem.toLowerCase() === trimmedItem.toLowerCase()
        );

        if (isDuplicateInActive || isDuplicateInCompleted) {
            return 'duplicate';
        }

        myArray.push(trimmedItem);
        return true;
    }
    return false;
}

// Function to delete the last element from the array
function deleteLastElement() {
    if (myArray.length > 0) {
        return myArray.pop();
    }
    return null;
}

// Function to delete a specific element by index
function deleteElementByIndex(index) {
    if (index >= 0 && index < myArray.length) {
        return myArray.splice(index, 1)[0];
    }
    return null;
}

// Function to move item to completed list
function moveToCompleted(index) {
    if (index >= 0 && index < myArray.length) {
        const item = myArray.splice(index, 1)[0];
        completedArray.push(item);
        return item;
    }
    return null;
}

// Function to move item back to active list
function moveToActive(index) {
    if (index >= 0 && index < completedArray.length) {
        const item = completedArray.splice(index, 1)[0];
        myArray.push(item);
        return item;
    }
    return null;
}

// Function to display the contents of the array
function displayArray() {
    // Display active items
    const listElement = document.getElementById('myList');
    listElement.innerHTML = ''; // Clear current list

    myArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'active-item';

        // Create span for item text
        const itemText = document.createElement('span');
        itemText.textContent = item;
        itemText.className = 'item-text';

        // Add click handler to move to completed
        itemText.addEventListener('click', function () {
            const completedItem = moveToCompleted(index);
            if (completedItem !== null) {
                displayArray();
            }
        });

        li.appendChild(itemText);

        // Create delete button for this item
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-item-btn';
        deleteBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const deletedItem = deleteElementByIndex(index);
            if (deletedItem !== null) {
                alert('Deleted: ' + deletedItem);
                displayArray();
            }
        });

        li.appendChild(deleteBtn);
        listElement.appendChild(li);
    });

    // Display completed items
    const completedListElement = document.getElementById('completedList');
    completedListElement.innerHTML = ''; // Clear current list

    completedArray.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'completed-item';

        // Create span for item text
        const itemText = document.createElement('span');
        itemText.textContent = item;
        itemText.className = 'item-text';

        // Add click handler to move back to active
        itemText.addEventListener('click', function () {
            const activeItem = moveToActive(index);
            if (activeItem !== null) {
                displayArray();
            }
        });

        li.appendChild(itemText);
        completedListElement.appendChild(li);
    });
}

// Function to sort the array
function sortArray() {
    myArray.sort();
}

// Function to expand the TODO list
function expandTodoList() {
    const list = document.getElementById('myList');
    const button = document.getElementById('toggleTodo');

    if (list.classList.contains('collapsed')) {
        list.classList.remove('collapsed');
        button.textContent = '▼';
    }
}

// Wait for DOM to load before attaching event listeners
document.addEventListener('DOMContentLoaded', function () {
    // Toggle TODO list
    document.getElementById('toggleTodo').addEventListener('click', function () {
        const list = document.getElementById('myList');
        const button = document.getElementById('toggleTodo');

        if (list.classList.contains('collapsed')) {
            list.classList.remove('collapsed');
            button.textContent = '▼';
        } else {
            list.classList.add('collapsed');
            button.textContent = '►';
        }
    });

    // Toggle Completed list
    document.getElementById('toggleCompleted').addEventListener('click', function () {
        const list = document.getElementById('completedList');
        const button = document.getElementById('toggleCompleted');

        if (list.classList.contains('collapsed')) {
            list.classList.remove('collapsed');
            button.textContent = '▼';
        } else {
            list.classList.add('collapsed');
            button.textContent = '►';
        }
    });

    // Add button event listener
    document.getElementById('addButton').addEventListener('click', function () {
        const inputField = document.getElementById('myInput');
        const inputValue = inputField.value;

        const result = addElement(inputValue);

        if (result === true) {
            alert('Added: ' + inputValue);
            inputField.value = ''; // Clear input field
            expandTodoList(); // Expand TODO list when adding new item
            displayArray();
        } else if (result === 'duplicate') {
            alert('This item already exists in your lists!');
        } else {
            alert('Please enter a valid item.');
        }
    });

    // Delete button event listener
    document.getElementById('deleteButton').addEventListener('click', function () {
        const deletedItem = deleteLastElement();

        if (deletedItem !== null) {
            alert('Deleted: ' + deletedItem);
            displayArray();
        } else {
            alert('No items to delete.');
        }
    });

    // Sort button event listener
    document.getElementById('sortButton').addEventListener('click', function () {
        if (myArray.length > 0) {
            sortArray();
            displayArray();
            alert('List has been sorted alphabetically.');
        } else {
            alert('No items to sort.');
        }
    });

    // Allow Enter key to add item
    document.getElementById('myInput').addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            document.getElementById('addButton').click();
        }
    });
});
