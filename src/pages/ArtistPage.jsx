import { useParams } from "react-router-dom";
import { usePlayer } from "../context/PlayerContext";
import artists from "../data/artists.json";

export default function ArtistPage() {
  const { id } = useParams();
  const { playSong } = usePlayer();

  const artist = artists.find(
    (a) => a.id.toLowerCase() === id.toLowerCase()
  );

  if (!artist) return <h2>هنرمند پیدا نشد</h2>;

  // ✅ ساخت playlist یک بار
  const playlist = artist.songs.map((s) => ({
    title: s.title,
    file: s.file,
    artist: artist.name,
  }));

  return (
    <div className="artist-page">
      <img src={artist.image} alt={artist.name} width="300" />
      <h1>{artist.name}</h1>
      <p>{artist.bio}</p>

      <h2>آهنگ‌ها</h2>

      <ul>
        {artist.songs.map((song, index) => (
          <li key={song.title}>
            <p>{song.title}</p>

            <button onClick={() => playSong(playlist, index)}>
              ▶ پخش
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
