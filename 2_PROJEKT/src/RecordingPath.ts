import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";
import Recorder from './Recorder.js'
import Player from "./Player.js";
import RecordingPanel from "./RecordingPanel.js";

/**
 * Recording path that manages Recording and playing.
 */
export default class RecordingPath {

    /**
     * The id attribute of a element.
     */
    readonly id: string;

    /**
     * Toggle play button.
     */
    togglePlayButton?: ToggleButton;

    /**
     * The recorder, that records notes.
     */
    readonly recorder: Recorder = new Recorder()

    /**
     * Player that plays notes.
     */
    readonly player: Player;

    /**
     * Recording panel (the parent of a Recording path).
     */
    readonly panel: RecordingPanel;
    constructor({
        container,
        id,
        panel
    }: {
        container: HTMLElement,
        id: string,
        panel: RecordingPanel
    }) {

        this.id = id;
        this.panel = panel;
        this.player = new Player(this.panel.audioElements)
        this.render(container);
    }

    /**
     * Generates panel container.
     * 
     * @returns generated panel container.
     */
    private generateElement(): HTMLElement {
        const container = document.createElement("div");
        container.id = this.id;

        this.initTogglePlayButton(container);
        this.initToggleRecordingButton(container);


        return container;
    }

    /**
     * Initialises toggle play button.
     * 
     * @param container the target container.
     */
    private initTogglePlayButton(container: HTMLElement): void {

        const toggleButton = new ToggleButton({
            onContent: Tools.StopIcon,
            offContent: Tools.PlayIcon,
            id: `toggle-play-${this.id}`,
            onClick: this.handleTogglePlay,
            className: "btn btn-success m-2"
        })

        toggleButton.render(container);

        this.togglePlayButton = toggleButton;
    }

    /**
     * Initialises toggle recording button.
     * 
     * @param container the target container.
     */
    private initToggleRecordingButton(container: HTMLElement): void {

        const toggleButton = new ToggleButton({
            onContent: Tools.StopRecordingIcon,
            offContent: Tools.StartRecordingIcon,
            id: `toggle-recording-${this.id}`,
            onClick: this.handleToggleRecording,
            className: "btn btn-danger",
        })

        toggleButton.render(container);
    }

    /**
     * Handler for toggling play.
     */
    private handleTogglePlay = () => {
        if (this.player.isPlaying) {
            if (this.togglePlayButton)
                this.togglePlayButton.status = false;
            this.player.stop();
        } else {
            this.player.play(this.recorder.recording).then(success => {
                if (this.togglePlayButton) {
                    this.togglePlayButton.status = false;
                }
            });
        }


    }

    /**
     * Handler for toggling recording.
     */
    private handleToggleRecording = () => {

        this.recorder.toggle();
    }

    /**
     * Renders element into target container.
     * 
     * @param container target container.
     */
    private render(container: HTMLElement) {

        container.append(this.generateElement());
    }
}