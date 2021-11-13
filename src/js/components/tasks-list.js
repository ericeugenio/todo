let todoList;   
let component;  
let search;

export default class TasksList extends HTMLElement
{

    static get observedAttributes() 
    {
        return ['edit'];
    }

    constructor()
    {
        super();

        let template = document.getElementById('tasks-list').content;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.cloneNode(true));
        component = this;

        search = shadowRoot.getElementById('search-engine');

        todoList = JSON.parse(localStorage.getItem('todoList'));
        if (!todoList)
        {
            todoList = new Array();
        }
    }

    connectedCallback() 
    {
        filterToday();
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
        switch(newValue)
        {
            case 'today':
                filterToday();
                break;
            case 'all':
                updateView(todoList);
                break;
            case 'categories':
                break;
            case 'select':
                selectAll();
                break; 
            case 'delete':
                getSelected(true);
                break;
            case 'completed':
                getSelected(false);
                break;
            case 'search':
                break;
             
        }
    }
}

function clearTodos()
{
    let listWrapper = component.shadowRoot.getElementById('list-wrapper');
    while (listWrapper.firstChild)
    {
        listWrapper.removeChild(listWrapper.firstChild);
    }
}

function addTodo(todo)
{
    let template = document.getElementById('task-template');

    // Set image
    let element = template.content.getElementById('image');
    element.src = todo.image;

    // Set title
    element = template.content.getElementById('title');
    element.innerText = todo.title;

    // Set description
    element = template.content.getElementById('description');
    element.innerText = todo.description;

    // Set deadline
    let dd = todo.deadline.slice(8, 10);
    let mm = todo.deadline.slice(5, 7);
    let yyyy = todo.deadline.slice(0, 4);
    element = template.content.getElementById('deadline');
    element.innerText = dd + '/' + mm + '/' + yyyy;

    // Set category
    element = template.content.getElementById('category');
    element.innerText = todo.cateogries;

    let listWrapper = component.shadowRoot.getElementById('list-wrapper');
    listWrapper.appendChild(template.content.cloneNode(true));
}

function addListener(todo)
{
    let todoWrapper = component.shadowRoot.getElementById('todo-wrapper');
    todoWrapper.setAttribute('id', todo.title + todo.id);
    let checkWrapper = component.shadowRoot.getElementById('todo-check');
    checkWrapper.setAttribute('id', todo.title + todo.id + 'c');
    let dataWrapper = component.shadowRoot.getElementById('todo-data');
    dataWrapper.setAttribute('id', todo.title + todo.id + 'd');

    let check = component.shadowRoot.getElementById('check');
    check.setAttribute('id', todo.title + todo.id + 'i');
    check.addEventListener('click', function(element)
    {
        for (let i = 0; i < todoList.length; i++)
        {
            let id = todoList[i].title + todoList[i].id + 'i';
            if (id === element.currentTarget.myParam)
            {
                todoList[i].checked = !todoList[i].checked;
                break;
            }
        }

        enableButtons();
    });
    check.myParam = todo.title + todo.id + 'i';
}

function repaintTodo(todo) 
{
    let id = todo.title + todo.id + 'c';
    let element = component.shadowRoot.getElementById(id);
    let color = (todo.completed) ? 'rgba(170, 161, 200, 1)' : 'white';
    element.style.background = color;

    id = todo.title + todo.id + 'd';
    element = component.shadowRoot.getElementById(id);
    color = (todo.completed) ? 'rgba(170, 161, 200, 0.25)' : 'white';
    element.style.background = color;
}

function updateView(list)
{
    clearTodos();

    // TODO: sort list

    for (let i = 0; i < list.length; i++)
    {
        addTodo(list[i]);
        addListener(list[i]);

        if (list[i].completed)
        {
            repaintTodo(list[i]);
        }
    }
}

function isToday(date)
{
    let today = new Date();
    let dd = date.slice(8, 10);
    let mm = date.slice(5, 7);
    let yyyy = date.slice(0, 4);

    return yyyy == today.getFullYear()
        && mm === String(today.getMonth() + 1).padStart(2, '0')
        && dd === String(today.getDate()).padStart(2, '0');
}

function filterToday()
{
    let todayList = new Array();
    
    for (let i = 0; i < todoList.length; i++) 
    {
        if (isToday(todoList[i].deadline))
        {
            todayList.push(todoList[i]);
        }
    }

    updateView(todayList);
}

function filterCategories()
{
}

function enableButtons()
{
    let isDisabled = true;

    for (let i = 0; i < todoList.length; i++)
    {
        if (todoList[i].checked)
        {
            isDisabled = false;
            break;
        }
    }

    component.shadowRoot.getElementById('completed').disabled = isDisabled;
    component.shadowRoot.getElementById('delete').disabled = isDisabled;        
}

function selectAll()
{
    for (let i = 0; i < todoList.length; i++)
    {
        let id = todoList[i].title + todoList[i].id + 'i';
        let check = component.shadowRoot.getElementById(id);            
        if (check) 
        {
            todoList[i].checked = !todoList[i].checked;
            check.checked = !check.checked;
        }
    }

    enableButtons();
}

function deleteSelected(todo)
{
    let id = todo.title + todo.id;
    let element = component.shadowRoot.getElementById(id);

    element.remove();
    todoList.splice(todoList.indexOf(todo), 1);

    localStorage.clear();
    localStorage.setItem('todoList', JSON.stringify(todoList));
}

function getSelected(del) 
{
    for (let i = 0; i < todoList.length; i++)
    {
        if (todoList[i].checked)
        {
            if (del)
            {
                deleteSelected(todoList[i]);
            }
            else 
            {
                todoList[i].completed = !todoList[i].completed; 
                repaintTodo(todoList[i]);
            }
        }
    }
}

function filterSearch()
{
}