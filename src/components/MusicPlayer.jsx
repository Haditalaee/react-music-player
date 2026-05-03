import { usePlayer } from "../context/PlayerContext";
import { useEffect, useState } from "react";

const BASE_URL = "/react-music-player";

export default function MusicPlayer() {
  const {
    audioRef,
    currentSong,
    isPlaying,
    play,
    pause,
    next,
    prev,
    seek,
  } = usePlayer();

  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (!audioRef.current || !currentSong) return;

    const audio = audioRef.current;
    audio.src = BASE_URL + currentSong.file;

    if (isPlaying) {
      audio.play().catch((err) => console.log("Play error:", err));
    } else {
      audio.pause();
    }
  }, [currentSong, isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setProgress(audio.currentTime);
    };

    const handleLoaded = () => {
      setDuration(audio.duration);
    };

    const handleEnded = () => {
      next();
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("loadedmetadata", handleLoaded);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("loadedmetadata", handleLoaded);
      audio.removeEventListener("ended", handleEnded);
    };
  }, [currentSong, next]);

  const handleSeek = (e) => {
    const rect = e.target.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickedPercent = clickX / rect.width;
    const newTime = clickedPercent * duration;
    seek(newTime);
  };

  if (!currentSong) return null;

  return (
    <div className="music-player">
      <audio ref={audioRef} />

      <div className="progress-bar" onClick={handleSeek}>
        <div
          className="progress-fill"
          style={{
            width: duration > 0 ? `${(progress / duration) * 100}%` : "0%",
          }}
        ></div>
      </div>

      <div className="controls">
        <button onClick={prev}>⏮</button>

        {isPlaying ? (
          <button onClick={pause}>⏸</button>
        ) : (
          <button onClick={play}>▶</button>
        )}

        <button onClick={next}>⏭</button>
      </div>

      <div className="song-info">
        {currentSong.title} - {currentSong.artist}
      </div>
    </div>
  );
}