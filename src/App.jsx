import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ArtistPage from "./pages/ArtistPage";

import { PlayerProvider } from "./context/PlayerContext";
import MusicPlayer from "./components/MusicPlayer";

function App() {
  return (
    <PlayerProvider>
       <BrowserRouter basename="/react-music-player">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/artist/:id" element={<ArtistPage />} />
        </Routes>

        {/* پلیر ثابت پایین صفحه */}
        <MusicPlayer />
      </BrowserRouter>
    </PlayerProvider>
  );
}

export default App;