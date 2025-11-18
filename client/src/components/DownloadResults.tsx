import { useState } from "react";
import { Download, Clock, User, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { DownloadResult, VideoQuality } from "@shared/schema";

interface DownloadResultsProps {
  result: DownloadResult;
}

export default function DownloadResults({ result }: DownloadResultsProps) {
  const [selectedQuality, setSelectedQuality] = useState<VideoQuality | null>(
    result.data?.qualities?.[0] || null
  );

  if (!result.success) {
    return (
      <Card className="w-full bg-destructive/10 border-destructive/30">
        <CardContent className="pt-6">
          <p className="text-center text-destructive" data-testid="text-error">{result.error}</p>
        </CardContent>
      </Card>
    );
  }

  if (!result.data) {
    return null;
  }

  const downloadUrl = selectedQuality?.url || result.data.url || result.data.urls?.[0];

  return (
    <Card 
      className="w-full bg-gradient-to-br from-card/90 to-card/70 backdrop-blur-md border-primary/40 overflow-hidden" 
      style={{ boxShadow: '0 0 30px rgba(0, 255, 255, 0.3), 0 0 60px rgba(255, 0, 255, 0.1)' }}
    >
      <CardHeader className="space-y-3">
        <div className="flex items-start justify-between gap-4">
          <CardTitle className="text-xl md:text-2xl font-bold flex-1" data-testid="text-title">
            {result.data.title || "Download Ready"}
          </CardTitle>
          {result.data.platform && (
            <Badge 
              variant="secondary" 
              className="bg-primary/20 text-primary border-primary/30"
              data-testid="badge-platform"
            >
              {result.data.platform}
            </Badge>
          )}
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {result.data.thumbnail && (
          <div className="relative aspect-video w-full overflow-hidden rounded-md border border-primary/20">
            <img
              src={result.data.thumbnail}
              alt={result.data.title || "Video thumbnail"}
              className="w-full h-full object-cover"
              data-testid="img-thumbnail"
            />
          </div>
        )}

        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {result.data.duration && (
            <div className="flex items-center gap-1" data-testid="text-duration">
              <Clock className="h-4 w-4" />
              <span>{result.data.duration}</span>
            </div>
          )}
          {result.data.author && (
            <div className="flex items-center gap-1" data-testid="text-author">
              <User className="h-4 w-4" />
              <span>{result.data.author}</span>
            </div>
          )}
        </div>

        {result.data.qualities && result.data.qualities.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Select Quality:</p>
            <div className="flex flex-wrap gap-2">
              {result.data.qualities.map((quality, index) => (
                <Badge
                  key={index}
                  variant={selectedQuality === quality ? "default" : "outline"}
                  className="cursor-pointer hover-elevate active-elevate-2"
                  onClick={() => setSelectedQuality(quality)}
                  data-testid={`badge-quality-${quality.quality}`}
                >
                  {quality.quality}
                  {quality.size && ` (${quality.size})`}
                </Badge>
              ))}
            </div>
          </div>
        )}

        <Button
          className="w-full h-12 text-lg"
          size="lg"
          asChild
          data-testid="button-download"
        >
          <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
            <Download className="mr-2 h-5 w-5" />
            Download Now
            <ExternalLink className="ml-2 h-4 w-4" />
          </a>
        </Button>
      </CardContent>
    </Card>
  );
}
