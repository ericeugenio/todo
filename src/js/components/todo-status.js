export default class TodoStatus extends HTMLElement
{
    constructor()
    {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="../../css/components/todo-status.css">
            <style>
                .status-text {
                    margin: 0;
                    
                    font-size: 14px;
                    color: black;
                }
            </style>
            <p class="status-text">x duties</p>
            <p class="status-text">x urgent</p>
        `;
    }
}
