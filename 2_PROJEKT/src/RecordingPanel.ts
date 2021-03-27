import { IAudioElements } from "./interfaces.js";
import RecordingPath from "./RecordingPath.js";
import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";

export default class RecordingPanel {

    /**
     * The number of paths to render.
     */
    readonly pathsCount: Number;

    /**
     * The instances of rendered recording paths.
     */
    readonly recordingPaths: Array<RecordingPath>;

    /**
     * Generated panel element.
     */
    readonly generatedPanel: HTMLDivElement;

    /**
     * The audio elements (audio library).
     */
    readonly audioElements: IAudioElements;

    /**
     * Play all button (the button that starts playing all paths).
     */
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

    /**
     * Initialises play all button.
     * 
     * @returns ToggleButton (play all) instance
     */
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

    /**
     * Handles playing all paths.
     */
    private handlePlayAll = () => {
        if (!this.playAllButton.status) {
            for (const path of this.recordingPaths) {
                path.player.stop();
            }
        } else {
            const promises = [];
            for (const path of this.recordingPaths) {
                promises.push(path.player.play(path.recorder.recording));
            }
            Promise.all(promises).then(() => this.playAllButton.status = false);
        }
    }

    /**
     * Generates panel element.
     * 
     * @returns generated panel element.
     */
    private generatePanel(): HTMLDivElement {
        const div = document.createElement("div");
        div.className = "d-flex flex-column align-items-center"
        return div;
    }

    /**
     * Initialises reocrding paths.
     * 
     * @returns recording paths.
     */
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

    /**
     * Renders recording panel into a container.
     */
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

    /**
     * Enabled recording paths
     */
    public get enabledRecordingPaths(): Array<RecordingPath> {
        return this.recordingPaths.filter(path => path.recorder.isRecording);
    }
}

