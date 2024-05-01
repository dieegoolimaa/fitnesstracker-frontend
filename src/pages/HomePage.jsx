function HomePage() {
  const youtubeId = "g031sw47JqA";
  const youtubeUrl = `https://www.youtube.com/embed/${youtubeId}?autoplay=0`;

  return (
    <div className="home">
      {/* Other home component content */}
      <iframe
        width="1000"
        height="815"
        src={youtubeUrl}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        allowfullscreen
      ></iframe>
    </div>
  );
}

export default HomePage;
