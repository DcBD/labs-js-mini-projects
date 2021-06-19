
import { Component } from "../../framework/Component";
import INoteEntity from "../../interfaces/INoteEntity";
import NoteEditor from "../Note/NoteEditor";


export default class NoteCreator extends Component {



    constructor({ parentNode }: { parentNode: HTMLElement }) {

        super({
            node: document.createElement("div"),
            parentNode: parentNode,
        })



        this.update(this.generateContent());

    }



    private generateContent = (): HTMLElement => {


        const _root = document.createElement("div");
        _root.id = "NoteCreator";



        new Component({ parentNode: _root }, [

            {
                ComponentName: NoteEditor,
                props: {
                    title: "",
                    color: "white",
                    text: "",
                    featured: false,
                }
            }

        ])



        return _root;
    }




}