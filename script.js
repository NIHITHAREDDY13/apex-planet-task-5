/* ========================================
   STUDENTHUB - TASK 5
   Main JavaScript
======================================== */


/* ========================================
   1. MOBILE NAVIGATION
======================================== */

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* Close mobile menu after clicking a link */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(link => {
    link.addEventListener("click", () => {
        navLinks.classList.remove("active");
    });
});


/* ========================================
   2. TASK MANAGER
======================================== */

const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const emptyMessage = document.getElementById("emptyMessage");
const taskCount = document.getElementById("taskCount");
const clearTasksBtn = document.getElementById("clearTasksBtn");
const heroTaskCount = document.getElementById("heroTaskCount");


/* Get saved tasks from LocalStorage */

let tasks = JSON.parse(localStorage.getItem("studentHubTasks")) || [];


/* Save tasks */

function saveTasks() {
    localStorage.setItem("studentHubTasks", JSON.stringify(tasks));
}


/* Display tasks */

function displayTasks() {

    taskList.innerHTML = "";

    if (tasks.length === 0) {
        emptyMessage.style.display = "block";
    } else {
        emptyMessage.style.display = "none";
    }


    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        li.className = "task-item";

        if (task.completed) {
            li.classList.add("completed");
        }


        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.className = "task-checkbox";
        checkbox.checked = task.completed;


        checkbox.addEventListener("change", () => {

            tasks[index].completed = checkbox.checked;

            saveTasks();
            displayTasks();

        });


        const span = document.createElement("span");

        span.className = "task-text";
        span.textContent = task.text;


        const deleteButton = document.createElement("button");

        deleteButton.className = "delete-task";
        deleteButton.textContent = "Delete";


        deleteButton.addEventListener("click", () => {

            tasks.splice(index, 1);

            saveTasks();
            displayTasks();

        });


        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteButton);

        taskList.appendChild(li);

    });


    updateTaskCount();
}


/* Update task count */

function updateTaskCount() {

    const totalTasks = tasks.length;

    taskCount.textContent =
        `${totalTasks} ${totalTasks === 1 ? "Task" : "Tasks"}`;

    heroTaskCount.textContent = totalTasks;
}


/* Add new task */

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {

        alert("Please enter a task.");

        return;
    }


    const newTask = {

        text: taskText,

        completed: false

    };


    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskInput.value = "";

    taskInput.focus();
}


/* Add task button */

addTaskBtn.addEventListener("click", addTask);


/* Add task using Enter key */

taskInput.addEventListener("keydown", (event) => {

    if (event.key === "Enter") {

        addTask();

    }

});


/* Clear all tasks */

clearTasksBtn.addEventListener("click", () => {

    if (tasks.length === 0) {

        return;

    }


    const confirmation =
        confirm("Are you sure you want to delete all tasks?");


    if (confirmation) {

        tasks = [];

        saveTasks();

        displayTasks();

    }

});


/* Display saved tasks when page loads */

displayTasks();


/* ========================================
   3. RESOURCE SEARCH & FILTER
======================================== */

const searchInput = document.getElementById("searchInput");
const categoryFilter = document.getElementById("categoryFilter");
const sortSelect = document.getElementById("sortSelect");
const resourceGrid = document.getElementById("resourceGrid");
const noResults = document.getElementById("noResults");


function getResourceCards() {

    return Array.from(
        resourceGrid.querySelectorAll(".resource-card")
    );

}


/* Filter resources */

function filterResources() {

    const searchText =
        searchInput.value.toLowerCase().trim();

    const selectedCategory =
        categoryFilter.value;


    const cards = getResourceCards();

    let visibleCards = [];


    cards.forEach(card => {

        const name =
            card.dataset.name.toLowerCase();

        const category =
            card.dataset.category;


        const matchesSearch =
            name.includes(searchText);

        const matchesCategory =
            selectedCategory === "all" ||
            category === selectedCategory;


        if (matchesSearch && matchesCategory) {

            card.style.display = "block";

            visibleCards.push(card);

        } else {

            card.style.display = "none";

        }

    });


    sortResources(visibleCards);


    if (visibleCards.length === 0) {

        noResults.style.display = "block";

    } else {

        noResults.style.display = "none";

    }

}


/* Sort resources */

function sortResources(cards = getResourceCards()) {

    const sortValue = sortSelect.value;


    if (sortValue === "default") {

        return;

    }


    const sortedCards = [...cards].sort((a, b) => {

        if (sortValue === "name") {

            return a.dataset.name.localeCompare(
                b.dataset.name
            );

        }


        if (sortValue === "rating") {

            return (
                Number(b.dataset.rating) -
                Number(a.dataset.rating)
            );

        }

    });


    sortedCards.forEach(card => {

        resourceGrid.appendChild(card);

    });

}


/* Search */

searchInput.addEventListener(
    "input",
    filterResources
);


/* Category filter */

categoryFilter.addEventListener(
    "change",
    filterResources
);


/* Sorting */

sortSelect.addEventListener(
    "change",
    filterResources
);


/* ========================================
   4. CONTACT FORM
======================================== */

const contactForm =
    document.getElementById("contactForm");

const formMessage =
    document.getElementById("formMessage");


contactForm.addEventListener("submit", (event) => {

    event.preventDefault();


    const name =
        document.getElementById("name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const message =
        document.getElementById("message").value.trim();


    if (
        name === "" ||
        email === "" ||
        message === ""
    ) {

        formMessage.textContent =
            "Please fill in all fields.";

        formMessage.style.color = "#dc2626";

        return;

    }


    formMessage.textContent =
        `Thank you, ${name}! Your message has been received.`;

    formMessage.style.color = "#16a34a";


    contactForm.reset();

});


/* ========================================
   5. PROJECT BUTTONS
======================================== */

const projectButtons =
    document.querySelectorAll(".project-btn");


projectButtons.forEach(button => {

    button.addEventListener("click", () => {

        alert(
            "Project details will be added to the portfolio soon!"
        );

    });

});


/* ========================================
   6. INITIAL RESOURCE STATE
======================================== */

filterResources();