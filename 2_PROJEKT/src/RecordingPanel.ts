import { IAudioElements } from "./interfaces.js";
import RecordingPath from "./RecordingPath.js";
import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";

export default class RecordingPanel {


    readonly pathsCount: Number;

    readonly recordingPaths: Array<RecordingPath>;

    readonly generatedPanel: HTMLDivElement;
    readonly audioElements: IAudioElements;
    readonly playAllButton: ToggleButton;

    constructor({
        container,
        recordingPathsCount,
        audioElements
    }: {
        container: HTMLElement,
        recordingPathsCount: Number,
        audioElements: IAudioElements
    }) {

        this.audioElements = audioElements;
        this.pathsCount = recordingPathsCount;
        this.generatedPanel = this.generatePanel();
        this.playAllButton = this.initPlayAllButton();

        this.recordingPaths = this.initRecordingPaths();

        this.render(container);
    }


    private initPlayAllButton = (): ToggleButton => {
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
    }

    private handlePlayAll = () => {
        console.log(this.playAllButton.status);

        if (!this.playAllButton.status) {

            for (const path of this.recordingPaths) {
                path.player.stop();
            }

        } else {

            console.log("ads");

            const promises = [];

            for (const path of this.recordingPaths) {
                promises.push(path.player.play(path.recorder.recording));
            }

            Promise.all(promises).then(() => this.playAllButton.status = false);
        }


    }


    private generatePanel(): HTMLDivElement {
        const div = document.createElement("div");
        div.className = "d-flex flex-column align-items-center"
        return div;
    }

    private initRecordingPaths = (): Array<RecordingPath> => {
        const paths: Array<RecordingPath> = [];

        for (let i = 0; i < this.pathsCount; i++) {
            paths.push(new RecordingPath({
                container: this.generatedPanel,
                id: `recording-path-${i}`,
                panel: this
            }));
        }

        return paths;
    }


    private render = (container: HTMLElement): void => {

        container.append(this.generatedPanel);
    }


    /**
     * Triggers when the sound is played.
     * 
     * @param soundId id of a sound
     */
    public onSoundIsPlayed = async (soundId: string) => {
        const paths = this.enabledRecordingPaths;
        const timeStamp = Date.now();

        for (const path of paths) {

            path.recorder.pushNote({
                soundId: soundId,
                timeStamp: timeStamp
            });
        }
    }


    public get enabledRecordingPaths(): Array<RecordingPath> {
        return this.recordingPaths.filter(path => path.recorder.isRecording);
    }
}

