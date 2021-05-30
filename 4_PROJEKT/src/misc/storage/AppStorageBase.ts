
import IAppStorage from '../../interfaces/IAppStorage';
import INoteEntity from '../../interfaces/INoteEntity';


export default abstract class AppStorageBase implements IAppStorage {

    abstract save(notes: INoteEntity[]): void
    abstract getAll(): INoteEntity[]


}