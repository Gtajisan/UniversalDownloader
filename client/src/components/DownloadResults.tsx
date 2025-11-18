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
      <Card className="w-full bg-destructive/10 border-destructive/30 backdrop-blur-md">
        <CardContent className="pt-6 pb-6">
          <div className="text-center space-y-3">
            <div className="w-12 h-12 rounded-full bg-destructive/20 mx-auto flex items-center justify-center">
              <svg className="w-6 h-6 text-destructive" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">Download Failed</h3>
              <p className="text-sm text-destructive" data-testid="text-error">{result.error}</p>
            </div>
            <p className="text-xs text-muted-foreground">
              Please verify the URL is correct and the platform is supported
            </p>
          </div>
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

        {downloadUrl ? (
          <Button
            className="w-full h-12 text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            size="lg"
            asChild
            data-testid="button-download"
          >
            <a href={downloadUrl} target="_blank" rel="noopener noreferrer" download>
              <Download className="mr-2 h-5 w-5" />
              Download Now
              <ExternalLink className="ml-2 h-4 w-4" />
            </a>
          </Button>
        ) : (
          <div className="text-center text-sm text-muted-foreground p-4 bg-muted/20 rounded-lg">
            No download URL available. Please try again with a different URL.
          </div>
        )}
      </CardContent>
    </Card>
  );
}
