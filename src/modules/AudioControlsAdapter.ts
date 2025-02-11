export class AudioControlsAdapter {
    private audioRef: React.RefObject<any>;

    constructor(audioRef: React.RefObject<any>) {
        this.audioRef = audioRef;
    }

    public play() {
        const audioElement: any = this.audioRef.current;
        audioElement.volume = 1;
        audioElement.play();
    }

    public stop() {
        const audioElement: any = this.audioRef.current;
        setTimeout(function fade() {
            if (audioElement.volume > 0) {
                audioElement.volume = (audioElement.volume - 0.05).toFixed(2);
                setTimeout(fade, 40);
            } else {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        }, 40)
    }
}