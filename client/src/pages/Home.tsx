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
              
              <div className="flex items-center gap-2" data-testid="badge-free-forever">
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
                { title: "No Registration", desc: "Start downloading immediately", testId: "no-registration" },
                { title: "HD Quality", desc: "Get videos in highest quality", testId: "hd-quality" },
                { title: "100% Free", desc: "No hidden costs or limits", testId: "free" },
              ].map((feature) => (
                <div
                  key={feature.testId}
                  className="bg-card/40 backdrop-blur-sm border border-border rounded-lg p-6 hover-elevate transition-all"
                  data-testid={`card-feature-${feature.testId}`}
                >
                  <h3 className="font-semibold text-lg mb-2" data-testid={`text-feature-title-${feature.testId}`}>{feature.title}</h3>
                  <p className="text-sm text-muted-foreground" data-testid={`text-feature-desc-${feature.testId}`}>{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-primary/20 bg-background/80 backdrop-blur-xl mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-2 text-sm">
                <span className="text-muted-foreground" data-testid="text-footer-credit">
                  Created by
                </span>
                <a 
                  href="https://github.com/Gtajisan" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-semibold text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1"
                  data-testid="link-github-profile"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  Gtajisan
                </a>
              </div>
              <p className="text-xs text-muted-foreground" data-testid="text-footer-info">
                Universal Downloader • Supporting 15+ platforms including TikTok, YouTube, Instagram & more
              </p>
              <p className="text-xs text-muted-foreground/70" data-testid="text-footer-disclaimer">
                For personal use only. Respect content creators and copyright laws.
              </p>
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
