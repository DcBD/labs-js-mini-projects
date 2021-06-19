const puppeteer = require('puppeteer');
import config from './../bootstrap';

test('Creating a new note', async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const app = config.index;
    await page.goto('http://localhost:8080/');

    const noteTitle = 'Puppeter note title';
    const noteContent = "Puppeter...";
    await page.waitForSelector('#NoteCreator input.editor-text')
    await page.click('#NoteCreator input.editor-text');
    await page.type('#NoteCreator input.editor-text', noteTitle);
    await page.click('#NoteCreator textarea.editor-text');
    await page.type('#NoteCreator textarea.editor-text', noteContent);

    await page.click('#NoteCreator .save');
    await page.screenshot({ path: './image.jpg', type: 'jpeg' });
    await page.waitForSelector('div#notes')

    const container = await page.$('div#notes input.editor-text');
    const value = await page.evaluate((el: any) => el.value, container);
    const includeText = value.includes(noteTitle);

    expect(includeText).toBe(true)

    await browser.close();
}, 30030)