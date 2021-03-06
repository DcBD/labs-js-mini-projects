/**
 * Useful tools methods.
 */
export default class Tools {
}
/**
 * Play icon (svg from bootstrap)
 */
Tools.PlayIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-play" viewBox="0 0 16 16"><path d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/></svg>`;
/**
 * Stop icon (svg from bootstrap)
 */
Tools.StopIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-stop" viewBox="0 0 16 16"><path d="M3.5 5A1.5 1.5 0 0 1 5 3.5h6A1.5 1.5 0 0 1 12.5 5v6a1.5 1.5 0 0 1-1.5 1.5H5A1.5 1.5 0 0 1 3.5 11V5zM5 4.5a.5.5 0 0 0-.5.5v6a.5.5 0 0 0 .5.5h6a.5.5 0 0 0 .5-.5V5a.5.5 0 0 0-.5-.5H5z"/></svg>`;
/**
 * Start recording icon (svg from bootstrap)
 */
Tools.StartRecordingIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-record-circle" viewBox="0 0 16 16"><path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/><path d="M11 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/></svg>';
/**
 * Stop recording (the indicator that someting is recording).
 */
Tools.StopRecordingIcon = '<span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>';
/**
 * Gets delay promise.
 *
 * @param time time in ms
 * @returns
 */
Tools.delay = (time) => {
    return new Promise(function (resolve) {
        setTimeout(resolve, time);
    });
};
