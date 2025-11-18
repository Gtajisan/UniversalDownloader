import { useState } from "react";
import DownloadForm from "@/components/DownloadForm";
import DownloadResults from "@/components/DownloadResults";
import PlatformGrid from "@/components/PlatformGrid";
import MusicPlayer from "@/components/MusicPlayer";
import mikuImage from "@assets/generated_images/Miku_dancing_background_animation_e1c16e62.png";
import type { DownloadResult } from "@shared/schema";
import { Sparkles, Zap } from "lucide-react";

export default function Home() {
  const [downloadResult, setDownloadResult] = useState<DownloadResult | null>(null);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Animated background with Miku */}
      <div className="fixed inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30 animate-pulse"
          style={{
            backgroundImage: `url(${mikuImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            filter: 'blur(2px)',
          }}
        />
        
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-primary/20 bg-background/80 backdrop-blur-xl">
          <div className="container mx-auto px-4 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div 
                  className="w-12 h-12 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center"
                  style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                >
                  <Zap className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h1 
                    className="text-2xl font-bold tracking-tight"
                    style={{
                      fontFamily: 'Orbitron, sans-serif',
                      background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    UNIVERSAL DOWNLOADER
                  </h1>
                  <p className="text-sm text-muted-foreground">Powered by AI • 15+ Platforms</p>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary animate-pulse" />
                <span className="text-sm font-medium text-muted-foreground">Free Forever</span>
              </div>
            </div>
          </div>
        </header>

        {/* Hero section */}
        <section className="container mx-auto px-4 py-12 md:py-20">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Title */}
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 mb-4">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                <span className="text-sm font-medium text-primary">Lightning Fast Downloads</span>
              </div>
              
              <h2 
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tight"
                style={{
                  fontFamily: 'Orbitron, sans-serif',
                  textShadow: '0 0 40px rgba(0, 255, 255, 0.6), 0 0 80px rgba(255, 0, 255, 0.4)',
                  background: 'linear-gradient(135deg, #00ffff 0%, #ff00ff 50%, #00ffff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  backgroundSize: '200% auto',
                  animation: 'gradient 3s linear infinite',
                }}
              >
                Download Anything
                <br />
                From Anywhere
              </h2>
              
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Paste any video URL and get instant downloads from TikTok, YouTube, Instagram, and 12+ more platforms
              </p>
            </div>

            {/* Download form container */}
            <div 
              className="relative bg-card/60 backdrop-blur-2xl border border-primary/30 rounded-2xl p-6 md:p-10 shadow-2xl"
              style={{ 
                boxShadow: '0 0 60px rgba(0, 255, 255, 0.3), 0 0 120px rgba(255, 0, 255, 0.15)',
              }}
            >
              {/* Glow effects */}
              <div 
                className="absolute -top-20 -left-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '4s' }}
              />
              <div 
                className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl animate-pulse"
                style={{ animationDuration: '3s', animationDelay: '1s' }}
              />
              
              <div className="relative z-10 space-y-8">
                <DownloadForm onDownloadResult={setDownloadResult} />

                {downloadResult ? (
                  <div className="animate-in slide-in-from-bottom duration-500">
                    <DownloadResults result={downloadResult} />
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-500">
                    <PlatformGrid />
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8">
              {[
                { title: "No Registration", desc: "Start downloading immediately" },
                { title: "HD Quality", desc: "Get videos in highest quality" },
                { title: "100% Free", desc: "No hidden costs or limits" },
              ].map((feature, i) => (
                <div
                  key={i}
                  className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-6 hover-elevate transition-all"
                >
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-primary/20 bg-background/80 backdrop-blur-xl mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center text-sm text-muted-foreground">
              <p>Made with 💜 by Universal Downloader • Supporting 15+ platforms</p>
              <p className="mt-2 text-xs">For personal use only. Respect content creators and copyright laws.</p>
            </div>
          </div>
        </footer>
      </div>

      <MusicPlayer />

      <style>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}
