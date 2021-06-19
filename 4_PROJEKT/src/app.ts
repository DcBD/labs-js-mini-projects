
import AppComponent from "./components/AppComponent";
import Featured from "./components/Dashboard/Featured";
import NoteEditor from "./components/Note/NoteEditor";
import firebase from "firebase";
import { configService } from "./misc/ConfigService";
import Notes from "./components/Dashboard/Notes";
import NoteCreator from "./components/Dashboard/NoteCreator";



export class App {

    public appComponent: AppComponent;
    /**
     * Creates an instance of an app.
     */
    constructor() {
        this.render();

    }


    private render = () => {

        const root = document.getElementById("root");


        this.appComponent = new AppComponent({
            parentNode: root,
        }, [
            {
                ComponentName: NoteCreator,
                props: {}
            },
            {
                ComponentName: Featured,
                props: {
                    notes: configService.storage.getAllFeatured()
                }
            },
            {
                ComponentName: Notes,
                props: {
                    notes: configService.storage.getAllNotFeatured()
                }
            },
        ]);
    }


}