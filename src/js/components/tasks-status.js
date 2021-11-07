export default class TasksStatus extends HTMLElement
{
    constructor()
    {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="../../css/components/tasks-status.css">
            
            <p class="status-text">x duties</p>
            <p class="status-text">x urgent</p>
        `;
    }
}
