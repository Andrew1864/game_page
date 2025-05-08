"use client";

import { useRef } from "react";

const VideoPlayer = () => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  return (
    <div className="flex justify-center items-center px-4 py-8">
      <div className="relative w-[900px] h-[500px]">
        <iframe
          ref={iframeRef}
          src="https://drive.google.com/file/d/11QVSCXkcemfz4ySJlLZpqtZ-BrE2n8Rs/preview"
          allow="autoplay"
          className="w-full h-full rounded-lg shadow-lg border border-gray-300"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
