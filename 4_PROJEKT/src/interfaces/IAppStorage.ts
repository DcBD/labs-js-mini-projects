import INoteEntity from "./INoteEntity";

export default interface IAppStorage {

    save(note: INoteEntity, reload?: boolean): void

    getAll(): Promise<INoteEntity[]>

    getAllFeatured(): Promise<INoteEntity[]>

    getAllNotFeatured(): Promise<INoteEntity[]>



    remove(id: string): void
}