import { createContext, useContext, useRef, useState } from "react";

const PlayerContext = createContext();

export function PlayerProvider({ children }) {
  const audioRef = useRef(null);

  const [playlist, setPlaylist] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentSong = playlist[currentIndex] || null;

  const playSong = (songs, index) => {
    setPlaylist(songs);
    setCurrentIndex(index);
    setIsPlaying(true);
  };

  const play = () => {
    if (!audioRef.current) return;
    setIsPlaying(true);
    audioRef.current.play();
  };

  const pause = () => {
    if (!audioRef.current) return;
    setIsPlaying(false);
    audioRef.current.pause();
  };

  const next = () => {
    setCurrentIndex((prev) => {
      if (prev < playlist.length - 1) {
        setIsPlaying(true);
        return prev + 1;
      }
      return prev;
    });
  };

  const prev = () => {
    setCurrentIndex((prev) => {
      if (prev > 0) {
        setIsPlaying(true);
        return prev - 1;
      }
      return prev;
    });
  };

  const seek = (time) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = time;
  };

  return (
    <PlayerContext.Provider
      value={{
        audioRef,
        currentSong,
        isPlaying,
        playSong,
        play,
        pause,
        next,
        prev,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export function usePlayer() {
  return useContext(PlayerContext);
}
