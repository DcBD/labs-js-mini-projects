import AppComponent from "./common/components/AppComponent";
import NoteEditor from "./common/components/Note/NoteEditor";

export class App {

    /**
     * Creates an instance of an app.
     */
    constructor() {
        this.render();
    }


    private render = () => {
        const root = document.getElementById("root");

        new AppComponent({
            parentNode: root,
        }, [
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