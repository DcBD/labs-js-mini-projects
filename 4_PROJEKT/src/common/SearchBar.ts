/**
 * Search bar component. Manages adding the weather widgets.
 */
export default class SearchBar {

    private readonly element: HTMLDivElement;
    private readonly id = "search-bar";
    private readonly handleSearch: (q: string) => void;

    /**
     * Creates an instance of a SearchBar.
     * 
     * @param parent the parent to append this component to.
     * @param handleSearch handler for adding component.
     */
    constructor(parent: HTMLElement, handleSearch: (q: string) => void) {
        this.handleSearch = handleSearch;
        this.element = this.generateElement();
        this.init(parent);

    }

    /**
     * Generates element. (The whole container DOM).
     * 
     * @returns generated element
     */
    private generateElement = (): HTMLDivElement => {
        const element = document.createElement('div');
        element.id = this.id;

        const searchBar = document.createElement('input');
        searchBar.type = "text";

        const addButton = document.createElement("input");

        addButton.type = "button";
        addButton.value = "Add";
        addButton.addEventListener("click", (e) => {
            const target = e.currentTarget as HTMLInputElement;

            const input = target.parentElement.querySelector(`input[type=text]`) as HTMLInputElement;
            const value = input.value;

            if (!!value) {
                this.handleSearch(value);
            }

        })

        const group = document.createElement("div");

        group.append(searchBar);
        group.append(addButton);

        element.append(group);

        return element;
    }


    /**
     * Initializes component.
     * @param parent 
     */
    private init(parent: HTMLElement) {
        this.render(parent);
    }

    /**
     * Appends component into parent element.
     * @param parent 
     */
    private render(parent: HTMLElement) {
        parent.prepend(this.element);
    }
}