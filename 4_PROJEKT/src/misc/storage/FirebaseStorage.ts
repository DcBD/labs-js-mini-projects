import INoteEntity from "../../interfaces/INoteEntity";
import AppStorageBase from "./AppStorageBase";
import firebase from "firebase";
import ConfigService from "../ConfigService";
import { v4 as uuidv4 } from 'uuid';
export default class FirebaseStorage extends AppStorageBase {


    readonly db: firebase.firestore.Firestore;
    readonly firebase: firebase.app.App;

    constructor() {
        super();

        this.firebase = firebase.initializeApp(ConfigService.config.firebaseConfig);
        this.db = this.firebase.firestore();
    }

    save(note: INoteEntity, reload: boolean = true): void {
        if (note.id) {
            const id = note.id;
            delete (note.id);
            this.db.collection("notes").doc(id).update({ ...note }).then(() => {
                if (reload)
                    window.location.reload();
            })
        } else {
            this.db.collection("notes").add({
                title: note.title,
                color: note.color,
                text: note.text,
                featured: note.featured
            }).then(() => {
                if (reload)
                    window.location.reload();
            })
        }


    }

    async getAll(): Promise<INoteEntity[]> {
        const response = await this.db.collection('notes').get();

        const notes = response.docs.map<INoteEntity>(doc => {
            const note = doc.data() as INoteEntity;
            return {
                ...note,
                id: doc.id
            }
        });

        return notes;
    }

    async getAllFeatured(): Promise<INoteEntity[]> {
        const response = await this.db.collection("notes").where("featured", "==", true).get();

        const notes = response.docs.map<INoteEntity>(doc => {
            const note = doc.data() as INoteEntity;
            return {
                ...note,
                id: doc.id
            }
        });

        return notes
    }

    async getAllNotFeatured(): Promise<INoteEntity[]> {
        const response = await this.db.collection("notes").where("featured", "==", false).get();

        const notes = response.docs.map<INoteEntity>(doc => {
            const note = doc.data() as INoteEntity;
            return {
                ...note,
                id: doc.id
            }
        });

        return notes
    }


    public remove(id: string): void {

        this.db.collection("notes").doc(id).delete().then(() => window.location.reload())

    }

}