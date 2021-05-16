import { Component } from "../../framework/Component";
import { v4 as uuidv4 } from 'uuid';

export default class AppComponent extends Component {

    constructor() {
        super("div", {
            key: uuidv4(),
            parentNode: null,
            className: "note-editor",
            content: "TEST"
        })
    }
}