import AppStorage from "./common/AppStorage";
import AppComponent from "./common/components/AppComponent";
import Featured from "./common/components/Dashboard/Featured";
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
                ComponentName: Featured,
                props: {
                    notes: AppStorage.getData().filter(i => i.featured)
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