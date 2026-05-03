import { Link } from "react-router-dom";

const BASE_URL = "/react-music-player";

function ArtistCard({ artist }) {
  return (
    <Link to={`/artist/${artist.id}`} className="artist-card">
        <img src={`${BASE_URL}${artist.image}`} alt={artist.name} />
        <h3>{artist.name}</h3>
    </Link>
  );
}

export default ArtistCard;