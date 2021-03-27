var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import Tools from "./Tools.js";
var PlayerStatus;
(function (PlayerStatus) {
    PlayerStatus[PlayerStatus["PLAYING"] = 0] = "PLAYING";
    PlayerStatus[PlayerStatus["STOPPED"] = 1] = "STOPPED";
})(PlayerStatus || (PlayerStatus = {}));
export default class Player {
    constructor(audioElements) {
        this.status = PlayerStatus.STOPPED;
        this.stop = () => {
            this.status = PlayerStatus.STOPPED;
        };
        this.play = (path) => __awaiter(this, void 0, void 0, function* () {
            if (path)
                this.currentPath = path;
            if (!this.currentPath) {
                this.status = PlayerStatus.PLAYING;
                console.info("There is nothing to play..");
                return false;
            }
            else {
                this.status = PlayerStatus.PLAYING;
                return yield this.playNotes(this.currentPath);
            }
        });
        this.playNotes = (notes) => __awaiter(this, void 0, void 0, function* () {
            for (const [index, note] of notes.entries()) {
                if (!this.isPlaying) {
                    return false;
                }
                const delay = notes[index + 1] ? (+notes[index + 1].timeStamp - +note.timeStamp) : 0;
                note.play(this.audioElements);
                yield Tools.delay(delay);
            }
            this.stop();
            return true;
        });
        this.audioElements = audioElements;
    }
    get isPlaying() {
        return this.status === PlayerStatus.PLAYING;
    }
}
