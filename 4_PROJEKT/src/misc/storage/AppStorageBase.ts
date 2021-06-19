
import IAppStorage from '../../interfaces/IAppStorage';
import INoteEntity from '../../interfaces/INoteEntity';


export default abstract class AppStorageBase implements IAppStorage {

    async getAllFeatured(): Promise<INoteEntity[]> {
        const notes = await this.getAll();
        return notes.filter(note => note.featured);

    }
    abstract getAllNotFeatured(): Promise<INoteEntity[]>
    abstract remove(id: string): void
    abstract save(note: INoteEntity, reload?: boolean): void



    public async getAll(): Promise<INoteEntity[]> {
        const data = localStorage.getItem('Notes');

        if (data) {
            return JSON.parse(data) as INoteEntity[];
        } else {
            return [];
        }
    }


}