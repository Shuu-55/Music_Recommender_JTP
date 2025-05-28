import { useState } from 'react'
import './App.css'; // Import your CSS styles

function App() {
  const [formData, setFormData] = useState({
    song: '',
    artist: '',
    num: 5
  });
  const [results, setResults] = useState([]);
  const [status, setStatus] = useState('idle'); // 'idle' | 'loading' | 'error'
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch("http://127.0.0.1:8000/recommend", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          song_name: formData.song,
          artist_name: formData.artist,
          n_recommendations: formData.num
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResults(data);
      setStatus('idle');
      setError(null);
    } catch (err) {
      setStatus('error');
      setError(err.message);
      console.error("Fetch error:", err);
    }
  };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`app ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="title-section">
            <span className="music-icon">🎵</span>
            <h1>Music Discovery</h1>
          </div>
          <button className="theme-toggle" onClick={toggleDarkMode}>
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>

        {/* Input Form */}
        <div className="form-card">
          <div className="input-group">
            <label htmlFor="song">Song Name</label>
            <input
              type="text"
              id="song"
              placeholder="Enter a song you love"
              required
              value={formData.song}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              id="artist"
              placeholder="Artist or band name"
              required
              value={formData.artist}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="num">Number of Recommendations</label>
            <input
              type="number"
              id="num"
              placeholder="5"
              min="1"
              max="10"
              required
              value={formData.num}
              onChange={handleInputChange}
            />
          </div>
          
          <button 
            className="submit-btn" 
            onClick={handleSubmit}
            disabled={status === 'loading'}
          >
            {status === 'loading' ? (
              <span className="loading-text">
                <span className="spinner"></span>
                Finding Music...
              </span>
            ) : (
              'Get Recommendations'
            )}
          </button>
        </div>

        {/* Last Search Card */}
        {formData.song && formData.artist && (
          <div className="last-search-card">
            <h3>Last Search:</h3>
            <p>"{formData.song}" by {formData.artist}</p>
          </div>
        )}

        {/* Results Section */}
        {(results.length > 0 || status === 'error' || (status === 'idle' && results.length === 0 && formData.song)) && (
          <div className="results-section">
            <h2>
              {status === 'error' ? 'Error' : 'Recommended Songs'}
            </h2>
            
            {status === 'error' && (
              <div className="message-card error">
                <span className="icon">⚠️</span>
                <p>{error}</p>
              </div>
            )}
            
            {status === 'idle' && results.length === 0 && formData.song && (
              <div className="message-card empty">
                <span className="icon">🔍</span>
                <p>No recommendations found. Try a different song!</p>
              </div>
            )}
            
            {results.map((track, index) => (
  <div key={index} className="track-card">
    <div className="track-number">{index + 1}</div>
    <div className="track-info">
      <h3>{track.track_name}</h3>
      <p>{track.artists}</p>
    </div>
  </div>
))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App