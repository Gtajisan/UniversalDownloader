import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { downloadRequestSchema, type DownloadRequest, type DownloadResult } from "@shared/schema";

interface DownloadFormProps {
  onDownloadResult: (result: DownloadResult) => void;
}

export default function DownloadForm({ onDownloadResult }: DownloadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);

  const form = useForm<DownloadRequest>({
    resolver: zodResolver(downloadRequestSchema),
    defaultValues: {
      url: "",
    },
  });

  const detectPlatform = (url: string) => {
    const platforms = [
      { name: "TikTok", pattern: /tiktok\.com/i },
      { name: "YouTube", pattern: /youtube\.com|youtu\.be/i },
      { name: "Instagram", pattern: /instagram\.com/i },
      { name: "Facebook", pattern: /facebook\.com|fb\.com/i },
      { name: "Twitter", pattern: /twitter\.com|x\.com/i },
      { name: "Pinterest", pattern: /pinterest\.com/i },
      { name: "Spotify", pattern: /spotify\.com/i },
      { name: "SoundCloud", pattern: /soundcloud\.com/i },
      { name: "Reddit", pattern: /reddit\.com/i },
      { name: "Google Drive", pattern: /drive\.google\.com/i },
      { name: "Douyin", pattern: /douyin\.com/i },
      { name: "MediaFire", pattern: /mediafire\.com/i },
    ];

    for (const platform of platforms) {
      if (platform.pattern.test(url)) {
        return platform.name;
      }
    }
    return null;
  };

  const handleUrlChange = (url: string) => {
    form.setValue("url", url);
    const platform = detectPlatform(url);
    setDetectedPlatform(platform);
  };

  const onSubmit = async (data: DownloadRequest) => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.url }),
      });
      
      const result = await response.json();
      onDownloadResult(result);
    } catch (error) {
      onDownloadResult({
        success: false,
        error: "Failed to fetch download link. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full space-y-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      onChange={(e) => {
                        field.onChange(e);
                        handleUrlChange(e.target.value);
                      }}
                      placeholder="Paste video URL from TikTok, YouTube, Instagram..."
                      className="pr-12 h-12 text-base bg-background/50 backdrop-blur-sm border-primary/30 focus:border-primary"
                      style={{ boxShadow: '0 0 15px rgba(0, 255, 255, 0.2)' }}
                      data-testid="input-url"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading}
                      className="absolute right-1 top-1 h-10 w-10"
                      data-testid="button-submit"
                    >
                      {isLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Download className="h-5 w-5" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>

      {detectedPlatform && (
        <div className="flex justify-center">
          <Badge variant="outline" className="border-primary/50" data-testid="badge-detected-platform">
            Detected: {detectedPlatform}
          </Badge>
        </div>
      )}
    </div>
  );
}
