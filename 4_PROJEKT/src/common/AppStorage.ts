


export interface Note { title: string, color: string, text: string, featured: boolean }

export interface NotesList extends Array<Note> { }

export default class AppStorage {


    public static getData = (): NotesList => {
        return [
            {
                title: "Test123",
                color: "white",
                text: "PO CO CI",
                featured: false
            },
            {
                title: "Test1234",
                color: "white",
                text: "PO CO CI 2",
                featured: false
            },
            {
                title: "Featured 1",
                color: "red",
                text: "PO CO CI",
                featured: true
            },
            {
                title: "Featured 2",
                color: "blue",
                text: "PO CO CI",
                featured: true
            }
        ]
    }




}