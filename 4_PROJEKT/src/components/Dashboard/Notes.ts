
import { Component } from "../../framework/Component";
import INoteEntity from "../../interfaces/INoteEntity";
import NoteEditor from "../Note/NoteEditor";


export default class Notes extends Component {

    private notes: Array<INoteEntity>;

    constructor({ parentNode, notes }: { parentNode: HTMLElement, notes: Array<INoteEntity> }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })

        this.setNotes(notes);

        this.update(this.generateContent());
    }


    public setNotes = (notes: Array<INoteEntity>) => {
        this.notes = notes;
    }


    private generateContent = (): HTMLElement => {


        const _root = document.createElement("div");
        _root.id = "notes";



        new Component({ parentNode: _root }, [
            ...this.notes.map(note => {
                return {
                    ComponentName: NoteEditor,
                    props: note
                }
            })
        ])



        return _root;
    }




}