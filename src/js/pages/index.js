import TasksStatus from "../components/tasks-status.js";
import SearchEngine from "../components/search-engine.js";
import TasksList from "../components/tasks-list.js";

// localStorage.clear();

/* define web components */
window.customElements.define("tasks-status", TasksStatus);
window.customElements.define("search-engine", SearchEngine);
window.customElements.define("tasks-list", TasksList);

const navNames = ['Today', 'All duties', 'Categories'];
const navIcons = ['calendar-day', 'list', 'shapes'];

let list;
let status;

let btnAll; 
let btnCompleted;
let btnDelete;
const navToday = document.getElementById('nav-today');
const navAll = document.getElementById('nav-all');
const navCategories = document.getElementById('nav-categories');

function initStatus() 
{
    status = document.createElement('tasks-status');
    status.setAttribute('d', getNumTasks());
    status.setAttribute('u', getNumUrgent());

    const statusParent = document.getElementById('sidenav-header');
    statusParent.appendChild(status);
}

function initList()
{
    list = document.createElement('tasks-list');
    list.setAttribute('class', 'list-component');

    const listParent = document.getElementById('main');
    listParent.appendChild(list);

    btnAll = list.shadowRoot.getElementById('select-all');
    btnCompleted = list.shadowRoot.getElementById('completed');
    btnDelete = list.shadowRoot.getElementById('delete');
}

function initComponents(params) {
    initStatus();
    initList();
}

function initListeners()
{
    btnAll.addEventListener('click', selectAll);
    btnCompleted.addEventListener('click', setCompleted);
    btnDelete.addEventListener('click', deleteTask);

    navToday.addEventListener('click', filterTasks);
    navToday.myParam = 0;
    navAll.addEventListener('click', filterTasks);
    navAll.myParam = 1;
    navCategories.addEventListener('click', filterTasks);
    navCategories.myParam = 2;
}

function run() {
    initComponents();
    initListeners();

    // Initial conditions
    navToday.style.color = 'rgb(98, 71, 170)';

    btnCompleted.disabled = true;
    btnDelete.disabled = true;
}

run();

/* Getters */

function getNumTasks()
{
    return JSON.parse(localStorage.getItem('todoList')).length;
}

function getNumUrgent()
{
    return localStorage.length;     // TODO: implement
}

/* Event listeners */

function selectAll()
{
    list.setAttribute('edit', 'select');
}

function setCompleted()
{
    list.setAttribute('edit', 'completed');
}

function deleteTask()
{
    list.setAttribute('edit', 'delete');

    status.setAttribute('d', getNumTasks());
    status.setAttribute('u', getNumUrgent());
}

function repaint()
{
    navToday.style.color = 'black';
    navAll.style.color = 'black';
    navCategories.style.color = 'black';
}

function filterTasks(filter)
{
    const option = filter.currentTarget.myParam;

    repaint();
    document.getElementById('main-title').innerText = navNames[option];
    document.getElementById('main-icon').src = 'media/img/icons/' + navIcons[option] + '-solid.svg';

    switch (option)
    {
        case 0:
            navToday.style.color = 'rgb(98, 71, 170)';
            list.setAttribute('edit', 'today');
            break;
        case 1:
            navAll.style.color = 'rgb(98, 71, 170)';
            list.setAttribute('edit', 'all');
            break;
        case 2:
            navCategories.style.color = 'rgb(98, 71, 170)';
            list.setAttribute('edit', 'categories');
            break;
    }
}