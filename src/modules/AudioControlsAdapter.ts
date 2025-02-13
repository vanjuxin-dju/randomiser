export class AudioControlsAdapter {
    private audioRef: React.RefObject<HTMLAudioElement|null>;

    constructor(audioRef: React.RefObject<HTMLAudioElement|null>) {
        this.audioRef = audioRef;
    }

    public play() {
        const audioElement: HTMLAudioElement|null = this.audioRef.current;
        if (audioElement == null) {
            return;
        }

        audioElement.volume = 1;
        audioElement.play();
    }

    public stop() {
        const audioElement: HTMLAudioElement|null = this.audioRef.current;
        if (audioElement == null) {
            return;
        }

        setTimeout(function fade() {
            if (audioElement.volume > 0) {
                audioElement.volume = parseFloat((audioElement.volume - 0.05).toFixed(2));
                setTimeout(fade, 40);
            } else {
                audioElement.pause();
                audioElement.currentTime = 0;
            }
        }, 40)
    }
}