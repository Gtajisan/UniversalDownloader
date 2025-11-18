import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Download, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { downloadRequestSchema, type DownloadRequest, type DownloadResult } from "@shared/schema";

interface DownloadFormProps {
  onDownloadResult: (result: DownloadResult) => void;
}

export default function DownloadForm({ onDownloadResult }: DownloadFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [detectedPlatform, setDetectedPlatform] = useState<string | null>(null);
  const { toast } = useToast();

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
    
    toast({
      title: "Processing...",
      description: "Fetching download link from " + (detectedPlatform || "platform"),
    });
    
    try {
      const response = await fetch('/api/download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: data.url }),
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Success!",
          description: "Download link ready. Click the button below to download.",
        });
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to fetch download link",
          variant: "destructive",
        });
      }
      
      onDownloadResult(result);
    } catch (error) {
      const errorMessage = "Failed to fetch download link. Please check your URL and try again.";
      
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      
      onDownloadResult({
        success: false,
        error: errorMessage,
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
                      className="h-16 text-base bg-background/50 backdrop-blur-sm border-2 border-primary/30 focus:border-primary pr-20 rounded-xl"
                      style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.3)' }}
                      data-testid="input-url"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 h-12 w-12 rounded-xl bg-gradient-to-br from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg"
                      style={{ boxShadow: '0 0 20px rgba(0, 255, 255, 0.4)' }}
                      data-testid="button-submit"
                      title="Fetch Download Link"
                    >
                      {isLoading ? (
                        <Loader2 className="h-6 w-6 animate-spin" />
                      ) : (
                        <div className="relative">
                          <Download className="h-6 w-6" />
                        </div>
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
