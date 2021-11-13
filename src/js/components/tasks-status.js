export default class TasksStatus extends HTMLElement
{
    static get observedAttributes() 
    {
        return ['d', 'u'];
    }

    constructor()
    {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.type = 'text/css';
        link.href = '../../css/components/tasks-status.css';

        let dutiesCount = document.createElement('p');
        dutiesCount.setAttribute('id', 'duties-count');
        dutiesCount.setAttribute('class', 'status-text');

        let urgentCount = document.createElement('p');
        urgentCount.setAttribute('id', 'urgent-count');
        urgentCount.setAttribute('class', 'status-text');

        shadowRoot.appendChild(link);
        shadowRoot.appendChild(dutiesCount);
        shadowRoot.appendChild(urgentCount);
    }

    connectedCallback() 
    {
        update(this);
    }

    attributeChangedCallback(name, oldValue, newValue) 
    {
        update(this);
    }
}

function update(element)
{
    let shadowRoot = element.shadowRoot;
    let dutiesCount = shadowRoot.getElementById('duties-count');
    dutiesCount.innerText = element.getAttribute('d') + ' duties';

    let urgentCount = shadowRoot.getElementById('urgent-count');
    urgentCount.innerText = element.getAttribute('u') + ' urgent';
}