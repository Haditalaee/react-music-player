import artists from "../data/artists.json";
import ArtistCard from "../components/ArtistCard";

function Home() {
  return (
    <div className="home">
      <h1>Artists</h1>

      {/* از همین کلاس artists-grid توی CSS استفاده می‌کنیم */}
      <div className="artists-grid">
        {artists.map((artist) => (
          <ArtistCard key={artist.id} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Home;
