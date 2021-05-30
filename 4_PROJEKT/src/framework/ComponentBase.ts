export default interface ComponentBase {

    getElementTagName: () => keyof HTMLElementTagNameMap

    getNode: () => HTMLElement

    getDomNode: () => HTMLElement

    render: () => void

    destroy: () => void

}