import INoteEntity from "../../interfaces/INoteEntity";
import AppStorageBase from "./AppStorageBase";

import { v4 as uuidv4 } from 'uuid';
export default class LocalStorage extends AppStorageBase {

    async getAllNotFeatured(): Promise<INoteEntity[]> {
        const notes = await this.getAll();
        return notes.filter(note => !note.featured);
    }

    /**
     * Saves notes into local storage.
     * 
     * @param notes notes
     */
    public save = async (note: INoteEntity): Promise<void> => {
        const notes: INoteEntity[] = await this.getAll();

        const updated = notes.some((_note, index) => {

            if (_note.id == note.id) {
                notes[index] = note;
                return true;
            }

            return false;
        })

        if (!updated) {
            notes.push({ ...note, id: note.id ? note.id : uuidv4() });
        }

        localStorage.setItem('KeepNote', JSON.stringify(notes));

        window.location.reload();
    }

    /**
     * Gets notes.
     * 
     * @returns notes
     */
    public getAll = async (): Promise<Array<INoteEntity>> => {
        const data = localStorage.getItem('KeepNote');

        if (data) {
            return JSON.parse(data) as Array<INoteEntity>;
        } else {
            return [];
        }
    }

    public remove = async (id: string) => {
        const data = await this.getAll();

        localStorage.setItem('KeepNote', JSON.stringify(data.filter(note => note.id != id)));

        window.location.reload();

    }

}