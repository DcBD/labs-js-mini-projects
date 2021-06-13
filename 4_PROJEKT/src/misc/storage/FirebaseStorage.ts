import INoteEntity from "../../interfaces/INoteEntity";
import AppStorageBase from "./AppStorageBase";
import firebase from "firebase";
import ConfigService from "../ConfigService";
export default class FirebaseStorage extends AppStorageBase {

    readonly db: firebase.firestore.Firestore;
    readonly firebase: firebase.app.App;

    constructor() {
        super();

        this.firebase = firebase.initializeApp(ConfigService.config.firebaseConfig);
        this.db = this.firebase.firestore();
    }

    save(notes: INoteEntity): void {
        console.log("saving");
        this.db.collection("notes").add({
            first: "Alan",
            middle: "Mathison",
            last: "Turing",
            born: 1912
        })
    }
    getAll(): INoteEntity[] {
        console.log(this.db.collection("notes").get())
        return []
    }

}