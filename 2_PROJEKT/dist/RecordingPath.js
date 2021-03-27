import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";
import Recorder from './Recorder.js';
import Player from "./Player.js";
export default class RecordingPath {
    constructor({ container, id, panel }) {
        this.recorder = new Recorder();
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
        this.handleToggleRecording = () => {
            this.recorder.toggle();
        };
        this.id = id;
        this.panel = panel;
        this.player = new Player(this.panel.audioElements);
        this.render(container);
    }
    generateElement() {
        const container = document.createElement("div");
        container.id = this.id;
        this.initTogglePlayButton(container);
        this.initToggleRecordingButton(container);
        return container;
    }
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
    render(container) {
        container.append(this.generateElement());
    }
}
