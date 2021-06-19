
import { Component } from "../../framework/Component";
import INoteEntity from "../../interfaces/INoteEntity";
import { configService } from "../../misc/ConfigService";
import Icons from "../../misc/Icons";
import Pallette from "../Palette/Palette";


interface Props extends INoteEntity {
    parentNode: HTMLElement
}
export default class NoteEditor extends Component {

    public getTitle = () => this.getAttributeElement<HTMLInputElement>("title").value
    public getText = () => this.getAttributeElement<HTMLTextAreaElement>("text").value
    public color: string;

    private props: INoteEntity;
    private isFeatured: boolean;

    constructor(props: Props) {

        super({
            node: document.createElement("div"),
            parentNode: props.parentNode,
        })
        this.props = props;
        this.color = props.color;
        this.isFeatured = !!props.featured;
        this.update(this.generateContent());


    }



    private handleColorChange = (color: string) => {
        const container = this.getNode().querySelector('.card') as HTMLDivElement;

        container.style.backgroundColor = color;
        this.color = color;
    }

    private save = () => {
        configService.storage.save({
            id: this.props.id,
            color: this.color,
            featured: this.isFeatured,
            text: this.getText(),
            title: this.getTitle()
        });
    }

    private generateContent = (): HTMLElement => {

        /* #region  ROOT */
        const _root = document.createElement("div");
        _root.className = "card";
        _root.setAttribute("style", "width:330px");
        if (this.props.color)
            _root.style.backgroundColor = this.props.color;
        /* #endregion */

        /* #region  HEADER */
        const _header = document.createElement("div");
        _header.className = "card-header";
        _root.append(_header);
        /* #endregion */

        /* #region  TITLE */
        const _title = document.createElement('input');
        _title.type = "text";
        _title.dataset.attribute = "title";
        _title.className = "editor-text";
        _title.placeholder = "Title";
        if (this.props.title)
            _title.value = this.props.title;
        _header.append(_title);
        /* #endregion */

        /* #region  TEXT */
        const _text = document.createElement("textarea");
        _text.className = "editor-text";
        _text.dataset.attribute = "text";
        if (this.props.text)
            _text.value = this.props.text;
        _header.append(_text);
        /* #endregion */

        const _footer = document.createElement("div");
        _footer.className = "footer";
        new Pallette({ parentNode: _footer, setColor: this.handleColorChange });

        _root.append(_footer);


        const _toggleFeatured = document.createElement("div");
        _toggleFeatured.className = "action-btn"
        _toggleFeatured.innerHTML = this.isFeatured ? Icons.bookmarkFilled() : Icons.bookmark();
        _toggleFeatured.addEventListener("click", () => {
            this.isFeatured = !this.isFeatured;
            _toggleFeatured.innerHTML = this.isFeatured ? Icons.bookmarkFilled() : Icons.bookmark();
            this.save()
        })

        _footer.append(_toggleFeatured);



        const _save = document.createElement("div");
        _save.className = "action-btn save"
        _save.innerHTML = Icons.check()
        _save.addEventListener("click", () => {

            this.save()

        })
        _footer.append(_save);


        if (this.props.id) {
            const _delete = document.createElement("div");
            _delete.className = "action-btn"
            _delete.innerHTML = Icons.trash()
            _delete.addEventListener("click", () => {

                configService.storage.remove(this.props.id);
            })
            _footer.append(_delete);
        }




        return _root;
    }




}