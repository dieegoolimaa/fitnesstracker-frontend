import React, { useEffect, useRef, useState } from "react";
import YouTube from "react-youtube";

function HomePage() {
  const youtubeId = "g031sw47JqA";
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=1&mute=1&start=30`;

  return (
    <div>
      {/* Other home component content */}
      <div>
        {/* <iframe
          width="100%"
          height="875px"
          src={youtubeUrl}
          frameBorder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe> */}
        <VideoPlayer></VideoPlayer>
      </div>
    </div>
  );
}

export default HomePage;

const VideoPlayer = () => {
  const playerRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlayerReady = (event) => {
    // Access the player instance when it's ready
    playerRef.current = event.target;
  };

  const handleRestartVideo = () => {
    console.log("Restarting video...");
    if (playerRef.current) {
      // Seek to the beginning and play the video
      playerRef.current.seekTo(0);
      playerRef.current.playVideo();
    }
  };

  const handlePlay = () => {
    if (!isVideoPlaying) {
      setIsVideoPlaying(true);
    }
  };

  useEffect(() => {
    handleRestartVideo();
    console.log("isVideoPlaying", isVideoPlaying);
  }, [isVideoPlaying]);

  return (
    <div>
      <YouTube
        videoId="g031sw47JqA"
        onReady={handlePlayerReady}
        onPlay={handlePlay}
        opts={{
          playerVars: {
            autoplay: 1,
            controls: 1,
            modestbranding: 1,
            showinfo: 0,
            loop: 0,
            mute: 1,
          },
        }}
      />
      <button onClick={handleRestartVideo}>Restart Video</button>
    </div>
  );
};
