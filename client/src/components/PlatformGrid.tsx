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
      <h3 className="text-lg font-semibold mb-4 text-center text-muted-foreground uppercase tracking-wide">
        Supported Platforms
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {platforms.map((platform) => (
          <Badge
            key={platform.name}
            variant="secondary"
            className="flex items-center gap-2 justify-center p-3 hover-elevate cursor-default"
            data-testid={`badge-platform-${platform.name.toLowerCase().replace(/\s+/g, '-')}`}
          >
            {platform.icon && <platform.icon className="h-4 w-4" />}
            <span className="text-xs">{platform.name}</span>
          </Badge>
        ))}
      </div>
    </div>
  );
}
