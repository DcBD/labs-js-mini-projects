import { NotesList } from "../../AppStorage";
import { Component } from "../../framework/Component";
import NoteEditor from "../Note/NoteEditor";


export default class Featured extends Component {

    private notes: NotesList;

    constructor({ parentNode, notes }: { parentNode: HTMLElement, notes: NotesList }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })

        this.setNotes(notes);

        this.update(this.generateContent());

        console.log(notes);
    }


    public setNotes = (notes: NotesList) => {
        this.notes = notes;
    }


    private generateContent = (): HTMLElement => {


        const _root = document.createElement("div");
        _root.id = "featured";



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