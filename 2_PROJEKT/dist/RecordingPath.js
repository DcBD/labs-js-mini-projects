import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";
import Recorder from './Recorder.js';
import Player from "./Player.js";
/**
 * Recording path that manages Recording and playing.
 */
export default class RecordingPath {
    constructor({ container, id, panel }) {
        /**
         * The recorder, that records notes.
         */
        this.recorder = new Recorder();
        /**
         * Handler for toggling play.
         */
        this.handleTogglePlay = () => {
            if (this.player.isPlaying) {
                if (this.togglePlayButton)
                    this.togglePlayButton.status = false;
                this.player.stop();
            }
            else {
                this.player.play(this.recorder.recording).then(success => {
                    if (this.togglePlayButton) {
                        this.togglePlayButton.status = false;
                    }
                });
            }
        };
        /**
         * Handler for toggling recording.
         */
        this.handleToggleRecording = () => {
            this.recorder.toggle();
        };
        this.id = id;
        this.panel = panel;
        this.player = new Player(this.panel.audioElements);
        this.render(container);
    }
    /**
     * Generates panel container.
     *
     * @returns generated panel container.
     */
    generateElement() {
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
    initTogglePlayButton(container) {
        const toggleButton = new ToggleButton({
            onContent: Tools.StopIcon,
            offContent: Tools.PlayIcon,
            id: `toggle-play-${this.id}`,
            onClick: this.handleTogglePlay,
            className: "btn btn-success m-2"
        });
        toggleButton.render(container);
        this.togglePlayButton = toggleButton;
    }
    /**
     * Initialises toggle recording button.
     *
     * @param container the target container.
     */
    initToggleRecordingButton(container) {
        const toggleButton = new ToggleButton({
            onContent: Tools.StopRecordingIcon,
            offContent: Tools.StartRecordingIcon,
            id: `toggle-recording-${this.id}`,
            onClick: this.handleToggleRecording,
            className: "btn btn-danger",
        });
        toggleButton.render(container);
    }
    /**
     * Renders element into target container.
     *
     * @param container target container.
     */
    render(container) {
        container.append(this.generateElement());
    }
}
