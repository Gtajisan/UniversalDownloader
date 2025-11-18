import { useState } from "react";
import DownloadForm from "@/components/DownloadForm";
import DownloadResults from "@/components/DownloadResults";
import PlatformGrid from "@/components/PlatformGrid";
import MusicPlayer from "@/components/MusicPlayer";
import mikuImage from "@assets/generated_images/Miku_dancing_background_animation_e1c16e62.png";
import type { DownloadResult } from "@shared/schema";

export default function Home() {
  const [downloadResult, setDownloadResult] = useState<DownloadResult | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div
        className="fixed inset-0 z-0 flex items-center justify-center opacity-40"
        style={{
          backgroundImage: `url(${mikuImage})`,
          backgroundSize: 'contain',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      <div className="fixed inset-0 z-0 bg-gradient-to-b from-background/60 via-background/80 to-background/90" />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-4xl space-y-8">
          <div className="text-center space-y-4">
            <h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight"
              style={{
                fontFamily: 'Orbitron, sans-serif',
                textShadow: '0 0 30px rgba(0, 255, 255, 0.5), 0 0 60px rgba(255, 0, 255, 0.3)',
                background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
              data-testid="text-heading"
            >
              🎵 Universal Downloader
            </h1>
            <p className="text-lg text-muted-foreground">
              Download videos from 15+ platforms instantly
            </p>
          </div>

          <div 
            className="bg-card/60 backdrop-blur-xl border border-primary/30 rounded-lg p-6 md:p-8 lg:p-12 space-y-8"
            style={{ boxShadow: '0 0 40px rgba(0, 255, 255, 0.2), 0 0 80px rgba(255, 0, 255, 0.1)' }}
          >
            <DownloadForm onDownloadResult={setDownloadResult} />

            {downloadResult ? (
              <DownloadResults result={downloadResult} />
            ) : (
              <PlatformGrid />
            )}
          </div>
        </div>
      </div>

      <MusicPlayer />
    </div>
  );
}
