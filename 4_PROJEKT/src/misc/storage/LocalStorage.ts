import INoteEntity from "../../interfaces/INoteEntity";
import AppStorageBase from "./AppStorageBase";

export default class LocalStorage extends AppStorageBase {

    /**
     * Saves notes into local storage.
     * 
     * @param notes notes
     */
    public save = (notes: Array<INoteEntity>): void => {
        localStorage.setItem('KeepNote[Notes]', JSON.stringify(notes));
    }

    /**
     * Gets notes.
     * 
     * @returns notes
     */
    public getAll = (): Array<INoteEntity> => {
        const data = localStorage.getItem('KeepNote[Notes]');

        if (data) {
            return JSON.parse(data) as Array<INoteEntity>;
        } else {
            return [];
        }
    }

}