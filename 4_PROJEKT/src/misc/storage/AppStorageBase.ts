
import IAppStorage from '../../interfaces/IAppStorage';
import INoteEntity from '../../interfaces/INoteEntity';


export default abstract class AppStorageBase implements IAppStorage {

    getAllFeatured(): INoteEntity[] {
        return this.getAll().filter(note => note.featured);

    }
    getAllNotFeatured(): INoteEntity[] {
        return this.getAll().filter(note => !note.featured);
    }

    abstract save(note: INoteEntity): void



    public getAll(): INoteEntity[] {
        const data = localStorage.getItem('Notes');

        if (data) {
            return JSON.parse(data) as INoteEntity[];
        } else {
            return [];
        }
    }


}