import INoteEntity from "./INoteEntity";

export default interface IAppStorage {

    save(notes: Array<INoteEntity>): void

    getAll(): Array<INoteEntity>


}