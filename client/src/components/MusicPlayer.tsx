import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(50);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className="flex flex-col gap-2 items-end">
        {showVolumeSlider && (
          <div className="bg-card/80 backdrop-blur-md border border-primary/30 rounded-md p-4 shadow-lg" style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
            <Slider
              value={[volume]}
              onValueChange={(val) => setVolume(val[0])}
              max={100}
              step={1}
              orientation="vertical"
              className="h-32"
              data-testid="slider-volume"
            />
          </div>
        )}
        
        <div className="flex gap-2 bg-card/80 backdrop-blur-md border border-primary/30 rounded-md p-2 shadow-lg" style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}>
          <Button
            size="icon"
            variant="ghost"
            onClick={togglePlay}
            className="hover-elevate active-elevate-2"
            data-testid="button-play-pause"
          >
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="hover-elevate active-elevate-2"
            data-testid="button-mute"
          >
            {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
            className="hover-elevate active-elevate-2"
            data-testid="button-volume-control"
          >
            <Volume2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
      
      <audio ref={audioRef} loop>
        <source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
