import INoteEntity from "../../interfaces/INoteEntity";
import AppStorageBase from "./AppStorageBase";

import { v4 as uuidv4 } from 'uuid';
export default class LocalStorage extends AppStorageBase {

    getAllNotFeatured(): INoteEntity[] {
        return this.getAll().filter(note => !note.featured);
    }

    /**
     * Saves notes into local storage.
     * 
     * @param notes notes
     */
    public save = (note: INoteEntity): void => {
        const notes: INoteEntity[] = this.getAll();

        const updated = notes.some((_note, index) => {

            if (_note.id == note.id) {
                notes[index] = note;
            }

            return false;
        })

        if (!updated) {
            notes.push({ ...note, id: note.id ? note.id : uuidv4() });
        }

        localStorage.setItem('KeepNote', JSON.stringify(notes));
    }

    /**
     * Gets notes.
     * 
     * @returns notes
     */
    public getAll = (): Array<INoteEntity> => {
        const data = localStorage.getItem('KeepNote');

        if (data) {
            return JSON.parse(data) as Array<INoteEntity>;
        } else {
            return [];
        }
    }

}