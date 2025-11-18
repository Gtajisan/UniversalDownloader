import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { downloadRequestSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  app.post("/api/download", async (req, res) => {
    try {
      const validationResult = downloadRequestSchema.safeParse(req.body);
      
      if (!validationResult.success) {
        return res.status(400).json({
          success: false,
          error: "Invalid URL provided. Please enter a valid video URL.",
        });
      }

      const { url } = validationResult.data;
      
      const apiUrl = `https://neoaz.is-a.dev/api/alldl?url=${encodeURIComponent(url)}`;
      const response = await fetch(apiUrl);
      
      if (!response.ok) {
        throw new Error(`API returned ${response.status}`);
      }

      const data = await response.json();
      
      return res.json(data);
    } catch (error) {
      console.error("Download error:", error);
      return res.status(500).json({
        success: false,
        error: "Failed to fetch download link. Please check the URL and try again.",
      });
    }
  });

  app.get("/api/health", (req, res) => {
    res.json({
      success: true,
      message: "Universal Downloader API is running",
      timestamp: new Date().toISOString(),
    });
  });

  const httpServer = createServer(app);

  return httpServer;
}
