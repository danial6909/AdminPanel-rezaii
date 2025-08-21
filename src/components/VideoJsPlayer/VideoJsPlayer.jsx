import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

const VideoJsPlayer = ({ src }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (!src) return;

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(videoRef.current);

      hls.on(Hls.Events.ERROR, function (event, data) {
        console.error("HLS error:", data);
      });
    } else if (videoRef.current.canPlayType("application/vnd.apple.mpegurl")) {
      // برای Safari
      videoRef.current.src = src;
    }
  }, [src]);

  return (
    <video
      ref={videoRef}
      controls
      autoPlay
      style={{ width: "100%", maxHeight: "500px", borderRadius: "12px" }}
    />
  );
};

export default VideoJsPlayer;
