export default class TaskForm extends HTMLElement
{
    constructor()
    {
        super();

        let template = document.getElementById('task-form');
        let templateContent = template.content;

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.appendChild(templateContent.cloneNode(true));
    }
}