import { SiTiktok, SiYoutube, SiInstagram, SiFacebook, SiX, SiPinterest, SiSpotify, SiSoundcloud, SiSnapchat, SiReddit } from "react-icons/si";
import { Badge } from "@/components/ui/badge";

const platforms = [
  { name: "TikTok", icon: SiTiktok },
  { name: "YouTube", icon: SiYoutube },
  { name: "Instagram", icon: SiInstagram },
  { name: "Facebook", icon: SiFacebook },
  { name: "Twitter", icon: SiX },
  { name: "Pinterest", icon: SiPinterest },
  { name: "Spotify", icon: SiSpotify },
  { name: "SoundCloud", icon: SiSoundcloud },
  { name: "Snapchat", icon: SiSnapchat },
  { name: "Reddit", icon: SiReddit },
  { name: "Google Drive", icon: null },
  { name: "Douyin", icon: null },
  { name: "Xiaohongshu", icon: null },
  { name: "MediaFire", icon: null },
  { name: "CapCut", icon: null },
];

export default function PlatformGrid() {
  return (
    <div className="w-full">
      <div className="text-center mb-6">
        <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-widest mb-2">
          Supported Platforms
        </h3>
        <p className="text-xs text-muted-foreground/70">Click on any platform to see supported features</p>
      </div>
      <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-5 gap-3">
        {platforms.map((platform, index) => (
          <div
            key={platform.name}
            className="group relative bg-card/60 backdrop-blur-sm border border-primary/20 rounded-lg p-4 hover-elevate active-elevate-2 cursor-pointer transition-all"
            style={{
              animationDelay: `${index * 50}ms`,
              boxShadow: '0 0 10px rgba(0, 255, 255, 0.1)',
            }}
            data-testid={`badge-platform-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              {platform.icon ? (
                <platform.icon className="h-6 w-6 text-primary group-hover:scale-110 transition-transform" />
              ) : (
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-xs font-bold text-primary">
                  {platform.name.charAt(0)}
                </div>
              )}
              <span className="text-xs font-medium">{platform.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
