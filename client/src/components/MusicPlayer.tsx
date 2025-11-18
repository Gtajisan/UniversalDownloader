import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, Play, Pause, Music } from "lucide-react";
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

  const togglePlay = async () => {
    if (audioRef.current) {
      try {
        if (isPlaying) {
          audioRef.current.pause();
          setIsPlaying(false);
        } else {
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (error) {
        console.error("Error playing audio:", error);
        setIsPlaying(false);
      }
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleVolumeChange = (val: number[]) => {
    const newVolume = val[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="flex flex-col gap-3 items-end">
        {showVolumeSlider && (
          <div 
            className="bg-card/90 backdrop-blur-md border border-primary/30 rounded-lg p-4 shadow-2xl animate-in slide-in-from-bottom duration-200" 
            style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.4)' }}
            onMouseEnter={() => setShowVolumeSlider(true)}
            onMouseLeave={() => setShowVolumeSlider(false)}
          >
            <Slider
              value={[volume]}
              onValueChange={handleVolumeChange}
              max={100}
              step={1}
              orientation="vertical"
              className="h-32"
              data-testid="slider-volume"
            />
            <div className="text-xs text-center mt-2 text-muted-foreground" data-testid="text-volume-value">
              {volume}%
            </div>
          </div>
        )}
        
        <div 
          className="flex gap-2 bg-gradient-to-br from-card/90 to-card/80 backdrop-blur-xl border border-primary/40 rounded-lg p-3 shadow-2xl" 
          style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.4), 0 0 60px rgba(255, 0, 255, 0.2)' }}
        >
          <Button
            size="icon"
            variant="ghost"
            onClick={togglePlay}
            className="hover-elevate active-elevate-2 relative"
            data-testid="button-play-pause"
            title={isPlaying ? "Pause music" : "Play music"}
          >
            {isPlaying ? (
              <Pause className="h-5 w-5 text-primary" />
            ) : (
              <Play className="h-5 w-5 text-primary" />
            )}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="hover-elevate active-elevate-2"
            data-testid="button-mute"
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="h-5 w-5 text-destructive" />
            ) : (
              <Volume2 className="h-5 w-5 text-primary" />
            )}
          </Button>
          
          <Button
            size="icon"
            variant="ghost"
            onMouseEnter={() => setShowVolumeSlider(true)}
            className="hover-elevate active-elevate-2"
            data-testid="button-volume-control"
            title="Volume control"
          >
            <Music className="h-5 w-5 text-accent" />
          </Button>
        </div>
      </div>
      
      <audio ref={audioRef} loop preload="auto">
        <source src="https://assets.mixkit.co/music/preview/mixkit-tech-house-vibes-130.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
