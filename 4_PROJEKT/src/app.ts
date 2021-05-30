
import AppComponent from "./components/AppComponent";
import Featured from "./components/Dashboard/Featured";
import NoteEditor from "./components/Note/NoteEditor";
import firebase from "firebase";
import { configService } from "./misc/ConfigService";



export class App {

    /**
     * Creates an instance of an app.
     */
    constructor() {
        this.render();
        console.log(configService);
    }


    private render = () => {

        const root = document.getElementById("root");

        new AppComponent({
            parentNode: root,
        }, [
            {
                ComponentName: Featured,
                props: {
                    notes: []
                }
            },
            {
                ComponentName: NoteEditor,
                props: {}
            },
            {
                ComponentName: NoteEditor,
                props: {}
            }
        ]);
    }


}