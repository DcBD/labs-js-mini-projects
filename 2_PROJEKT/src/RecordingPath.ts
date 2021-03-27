import ToggleButton from "./ToggleButton.js";
import Tools from "./Tools.js";
import Recorder from './Recorder.js'
import Player from "./Player.js";
import RecordingPanel from "./RecordingPanel.js";

export default class RecordingPath {


    readonly id: string;
    togglePlayButton?: ToggleButton;

    readonly recorder: Recorder = new Recorder()
    readonly player: Player;
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


    private generateElement(): HTMLElement {
        const container = document.createElement("div");
        container.id = this.id;

        this.initTogglePlayButton(container);
        this.initToggleRecordingButton(container);


        return container;
    }

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

    private handleToggleRecording = () => {

        this.recorder.toggle();
    }

    private render(container: HTMLElement) {

        container.append(this.generateElement());
    }
}