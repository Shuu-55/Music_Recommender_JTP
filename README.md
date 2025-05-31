# Music Recommender System

A modern full-stack application that provides personalized music recommendations integrated with Spotify.

## 🎵 Features

- Smart song recommendations using machine learning
- Spotify integration for song links and artwork
- Clean, responsive user interface
- Docker containerization for easy deployment
- Real-time search functionality
- Up to 10 personalized recommendations per search

## 🛠️ Tech Stack

- **Frontend**: React + Vite
- **Backend**: FastAPI
- **ML Model**: KNN-based recommendation engine
- **Deployment**: Docker
- **External API**: Spotify Web API

## 🚀 Quick Start

### Using Docker (Recommended)

```bash
git clone <repository-url>
cd Music_Recommender_JTP
docker compose up
```

Access the application at:
- Frontend: http://localhost:80
- Backend API: http://localhost:8000


## 📖 Usage Guide

1. Enter a song name and artist; try to use the exact song and artist name
2. Choose number of recommendations (1-10)
3. Click "Get Recommendations"
4. View personalized suggestions with:
   - Song and artist details
   - Album artwork
   - Direct Spotify links

## 📁 Project Structure

```
Music_Recommender_JTP/
├── backend/
│   ├── main.py                # FastAPI server
│   ├── model.py               # ML model logic
│   ├── Music_data.csv         # Dataset
│   ├── music_recommender.joblib
│   ├── requirements.txt
│   └── backend.dockerfile
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx           # Main component
│   │   ├── utils/
│   │   └── assets/
│   ├── .env
│   ├── package.json
│   └── frontend.dockerfile
│
└── docker-compose.yaml        # Docker configuration
```
