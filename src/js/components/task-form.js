let inTitle;
let imgSelected;
let inDeadline;
let inCategory;
let inDescription;
let inCompleted;
let outError;

export default class TaskForm extends HTMLElement
{
    constructor()
    {
        super();

        let template = document.getElementById('task-form').content;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(template.cloneNode(true));

        this.initImagePicker(shadowRoot);
        this.initButtons(shadowRoot);
        this.initInOut(shadowRoot);
    }

    initImagePicker(shadowRoot)
    {
        /* Init images */
        imgSelected = shadowRoot.getElementById('selected');
        let imgDefault1 = shadowRoot.getElementById('default1');
        let imgDefault2 = shadowRoot.getElementById('default2');
        let imgDefault3 = shadowRoot.getElementById('default3');
        let imgDefault4 = shadowRoot.getElementById('default4');
        let imgDefault5 = shadowRoot.getElementById('default5');
        let imgDefault6 = shadowRoot.getElementById('default6');

        /* Register handlers */
        imgDefault1.addEventListener('click', changeImage);
        imgDefault1.myParam = imgDefault1.src;
        imgDefault2.addEventListener('click', changeImage);
        imgDefault2.myParam = imgDefault2.src;
        imgDefault3.addEventListener('click', changeImage);
        imgDefault3.myParam = imgDefault3.src;
        imgDefault4.addEventListener('click', changeImage);
        imgDefault4.myParam = imgDefault4.src;
        imgDefault5.addEventListener('click', changeImage);
        imgDefault5.myParam = imgDefault5.src;
        imgDefault6.addEventListener('click', changeImage);
        imgDefault6.myParam = imgDefault6.src;

        /* Default value */
        imgSelected.src = imgDefault1.src;
    }
    
    initButtons(shadowRoot)
    {
        let btnAccpet = shadowRoot.getElementById('accept');
        let btnCancel = shadowRoot.getElementById('cancel');

        btnAccpet.addEventListener('click', addTask);
        btnCancel.addEventListener('click', cancelTask);
    }

    initInOut(shadowRoot)
    {
        inTitle = shadowRoot.getElementById('title');
        inDeadline = shadowRoot.getElementById('deadline');
        inCategory = shadowRoot.getElementById('category');
        inDescription = shadowRoot.getElementById('description');
        inCompleted = shadowRoot.getElementById('completed');
        outError = shadowRoot.getElementById('error');

        let today = new Date();
        inDeadline.value = formatDate(today);
        inDeadline.min = formatDate(today);
    }
}

function changeImage(img)
{
    imgSelected.src = img.currentTarget.myParam;
}

function validateData() 
{
    // Validate title
    if (inTitle.value === '')
    {
        outError.innerText = 'Title required. Maximum 100 characters length';
        return false;
    }

    // Validate category
    if (inCategory.value === 'default') 
    {
        outError.innerText = 'Category required. Select at least one category';
        return false;
    }

    // Validate description
    if (inDescription.value === '')
    {
        outError.innerText = 'Description required. Maximum 1000 characters length';
        return false;
    }

    return true;
}

function addTask() 
{
    let todoList = JSON.parse(localStorage.getItem('todoList'));
    if (!todoList)
    {
        todoList = new Array();
    }

    if (validateData()) 
    {
        let todo = {
            id: todoList.length,
            title: inTitle.value,
            image: imgSelected.src,
            deadline: inDeadline.value,
            cateogries: inCategory.value,
            description: inDescription.value,
            completed: inCompleted.checked,
            urgent: false,
            checked: false,
        };      

        todoList.push(todo);
        localStorage.setItem('todoList', JSON.stringify(todoList));

        cancelTask();
    }    
}

function cancelTask() {
    window.location.href = 'index.html';
}

/* Utility functions */ 

function formatDate(date) 
{
    let dd = String(date.getDate()).padStart(2, '0');
    let mm = String(date.getMonth() + 1).padStart(2, '0');
    let yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
}