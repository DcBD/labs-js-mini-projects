var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import RecordingPath from "./RecordingPath.js";
import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";
export default class RecordingPanel {
    constructor({ container, recordingPathsCount, audioElements }) {
        /**
         * Initialises play all button.
         *
         * @returns ToggleButton (play all) instance
         */
        this.initPlayAllButton = () => {
            const btn = new ToggleButton({
                onContent: Tools.StopIcon + " Stop",
                offContent: Tools.PlayIcon + " Play All",
                id: "toggle-play-all-btn",
                onClick: this.handlePlayAll,
                className: "btn btn-success p-1",
                status: false
            });
            btn.render(this.generatedPanel);
            return btn;
        };
        /**
         * Handles playing all paths.
         */
        this.handlePlayAll = () => {
            if (!this.playAllButton.status) {
                for (const path of this.recordingPaths) {
                    path.player.stop();
                }
            }
            else {
                const promises = [];
                for (const path of this.recordingPaths) {
                    promises.push(path.player.play(path.recorder.recording));
                }
                Promise.all(promises).then(() => this.playAllButton.status = false);
            }
        };
        /**
         * Initialises reocrding paths.
         *
         * @returns recording paths.
         */
        this.initRecordingPaths = () => {
            const paths = [];
            for (let i = 0; i < this.pathsCount; i++) {
                paths.push(new RecordingPath({
                    container: this.generatedPanel,
                    id: `recording-path-${i}`,
                    panel: this
                }));
            }
            return paths;
        };
        /**
         * Renders recording panel into a container.
         */
        this.render = (container) => {
            container.append(this.generatedPanel);
        };
        /**
         * Triggers when the sound is played.
         *
         * @param soundId id of a sound
         */
        this.onSoundIsPlayed = (soundId) => __awaiter(this, void 0, void 0, function* () {
            const paths = this.enabledRecordingPaths;
            const timeStamp = Date.now();
            for (const path of paths) {
                path.recorder.pushNote({
                    soundId: soundId,
                    timeStamp: timeStamp
                });
            }
        });
        this.audioElements = audioElements;
        this.pathsCount = recordingPathsCount;
        this.generatedPanel = this.generatePanel();
        this.playAllButton = this.initPlayAllButton();
        this.recordingPaths = this.initRecordingPaths();
        this.render(container);
    }
    /**
     * Generates panel element.
     *
     * @returns generated panel element.
     */
    generatePanel() {
        const div = document.createElement("div");
        div.className = "d-flex flex-column align-items-center";
        return div;
    }
    /**
     * Enabled recording paths
     */
    get enabledRecordingPaths() {
        return this.recordingPaths.filter(path => path.recorder.isRecording);
    }
}
