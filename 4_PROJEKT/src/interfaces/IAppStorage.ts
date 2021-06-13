import INoteEntity from "./INoteEntity";

export default interface IAppStorage {

    save(note: INoteEntity): void

    getAll(): Array<INoteEntity>

    getAllFeatured(): Array<INoteEntity>

    getAllNotFeatured(): Array<INoteEntity>


}