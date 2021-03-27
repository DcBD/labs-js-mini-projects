import { IAudioElements } from "./interfaces.js";
import RecordingPath from "./RecordingPath.js";

export default class RecordingPanel {


    readonly pathsCount: Number;

    readonly recordingPaths: Array<RecordingPath>;

    readonly generatedPanel: HTMLDivElement;
    readonly audioElements: IAudioElements;
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
        this.recordingPaths = this.initRecordingPaths();

        this.render(container);
    }



    private generatePanel(): HTMLDivElement {
        const div = document.createElement("div");


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

