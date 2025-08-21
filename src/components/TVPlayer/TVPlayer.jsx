// TVPlayer.jsx

import React from "react";
import ReactPlayer from "react-player";

function TVPlayer({ streamUrl }) {
  if (!streamUrl) {
    return <div>No stream URL provided.</div>;
  }

  return (
    <div style={{ position: "relative", paddingTop: "56.25%" }}>
      <ReactPlayer
        className="react-player"
        src={streamUrl} // در نسخه‌های جدیدتر، بهتر است از url استفاده شود
        playing={true} // ✅ برای شروع خودکار پخش
        controls={true} // برای نمایش کنترل‌ها (از جمله دکمه unmute)
        muted={false} // ✅ **مهم‌ترین بخش برای کار کردن autoplay**
        width="100%"
        height="100%"
        style={{ position: "absolute", top: 0, left: 0 }}
      />
    </div>
  );
}

export default TVPlayer;
