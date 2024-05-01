function HomePage() {
  const youtubeId = "g031sw47JqA";
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=0`;

  return (
    <div>
      {/* Other home component content */}
      <div>
        <iframe
          width="100%"
          height="875px"
          src={youtubeUrl}
          frameBorder="0"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        ></iframe>
      </div>
    </div>
  );
}

export default HomePage;
