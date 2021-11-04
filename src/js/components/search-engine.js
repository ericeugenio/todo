export default class SearchEngine extends HTMLElement
{
    constructor()
    {
        super();

        let shadowRoot = this.attachShadow({mode: 'open'});
        shadowRoot.innerHTML = `
            <style>
                .search-container {
                    display: flex;
                    flex-direction: row;
                    justify-content: flex-start;
                    align-items: center;
                    
                    height: 52px;
                    padding: 0 24px;
                    border-radius: 12px;
                
                    background-color: rgb(171, 162, 200);
                }

                .search-container input {
                    height: calc(100% - 24px);
                    appearance: none;
                    border: none;
                    outline: none;
                    background: none;
                
                    font-size: 14px;
                    color: black; 
                }
                
                .search-container button {
                    border: none;

                    background-color: rgb(171, 162, 200);
                }
            </style>
            <form class="search-container" name="header-search">
                <input type="search" name="header-search-query">
                <button type="submit" name="header-search-submit">
                    <img src="media/img/icons/search-solid.svg" alt="search icon" width="24" height="24">
                </button>
            </form>
        `;
    }
}