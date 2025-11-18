import DownloadResults from '../DownloadResults';

export default function DownloadResultsExample() {
  const mockResult = {
    success: true,
    data: {
      title: "Amazing Dance Video - Viral Trend 2024",
      thumbnail: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=800&h=450&fit=crop",
      duration: "2:34",
      author: "@coolcreator",
      platform: "TikTok",
      qualities: [
        { quality: "1080p", url: "https://example.com/1080p.mp4", size: "45MB" },
        { quality: "720p", url: "https://example.com/720p.mp4", size: "28MB" },
        { quality: "480p", url: "https://example.com/480p.mp4", size: "15MB" },
      ],
    },
  };

  return <DownloadResults result={mockResult} />;
}
