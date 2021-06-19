import { App } from "../../src/app"
import { configService } from "../../src/misc/ConfigService";
import FirebaseStorage from "../../src/misc/storage/FirebaseStorage";
import LocalStorage from "../../src/misc/storage/LocalStorage";


describe('Test Storage', () => {

    it('- Local storage', () => {
        const storage = configService.initStorage("LocalStorage");

        expect(storage instanceof LocalStorage).toBe(true)
    });

    it('- Firebase storage', () => {
        const storage = configService.initStorage("Firebase");

        expect(storage instanceof FirebaseStorage).toBe(true)
    });

})

describe('Test notes', () => {

    it('- Add note (not featured)', () => {
        const storage = configService.initStorage("LocalStorage");

        storage.save({
            id: "puppeteer",
            color: "white",
            featured: false,
            text: "test",
            title: "test"
        }, false);

        storage.getAll().then(notes => {
            expect(notes.length).toBe(1);

            storage.remove("puppeteer");

            storage.getAll().then(notes => {
                expect(notes.length).toBe(0);
            })

        })

    })

})