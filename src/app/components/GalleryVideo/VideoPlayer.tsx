"use client";

import { useRef } from "react";

interface VideoPlayerProps {
  videos: string[]; // Массив ссылок на видео
}

const VideoPlayer = ({ videos }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null); // Ссылка на iframe

  return (
    <div className="flex justify-center items-center px-4">
      <div className="relative w-[1050px] h-[500px]">
        <iframe
          ref={iframeRef}
          src={videos[0]} // Отображение первого видео из массива
          allow="autoplay"
          className="w-full h-full rounded-lg shadow-lg border border-gray-300"
        ></iframe>
      </div>
    </div>
  );
};

export default VideoPlayer;
