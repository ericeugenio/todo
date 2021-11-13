export default class SearchEngine extends HTMLElement
{
    constructor()
    {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <link rel="stylesheet" type="text/css" href="../../css/components/search-engine.css">
            
            <form class="search-container" name="header-search">
                <input type="search" id="search-input" name="header-search-query">
                <button type="button" id="search" name="header-search-submit">
                    <img src="media/img/icons/search-solid.svg" alt="search icon" width="24" height="24">
                </button>
            </form>
        `;
    }
}