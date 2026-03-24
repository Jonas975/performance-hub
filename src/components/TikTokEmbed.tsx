"use client";

import { useEffect } from "react";

export default function TikTokEmbed({ videoId }: { videoId: string }) {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://www.tiktok.com/embed.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <blockquote
      className="tiktok-embed"
      cite={`https://www.tiktok.com/video/${videoId}`}
      data-video-id={videoId}
      style={{ maxWidth: "605px", minWidth: "325px", height: "100%" }}
    >
      <section>
        <a target="_blank" title="Loading..." href={`https://www.tiktok.com/video/${videoId}`}>
          Loading TikTok...
        </a>
      </section>
    </blockquote>
  );
}