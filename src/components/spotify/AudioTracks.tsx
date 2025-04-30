import { useContext, useState } from "react";
import { ITrack } from "../../models/spotify/ITrack";
import { PlaylistContext } from "../../contexts/PlaylistContext";

const AudioTracks = () => {
  const [songs] = useState<ITrack[]>([
    {
      id: 132456,
      title: "Calm down",
      artist: "Selena Gomez",
      duration: "3:30",
    },
    {
      id: 324567,
      title: "Love Story",
      artist: "Taylor Swift",
      duration: "4:00",
    },
    {
      id: 9876543,
      title: "Roar",
      artist: "Katy Perry",
      duration: "4:30",
    },
    {
      id: 8765432,
      title: "Don't stop the music",
      artist: "Rihanna",
      duration: "3:45",
    },
    {
      id: 7654321,
      title: "Beat It",
      artist: "Michael Jackson",
      duration: "4:15",
    },
  ]);

  // Let's call the setPlaylist from PlaylistContext here
  const { playlist, setPlaylist } = useContext(PlaylistContext);
  
  return (
    <div className="col-md-6">
      <h2>Audio Tracks</h2>
      <div className="card">
        <ul className="list-group list-group-flush">
          {songs.map((song: any) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={song.id}
              >
                <div className="ms-2 me-auto">
                  <div className="fw-bold">{song.title}</div>
                  <span className="text-muted">Artists: {song.artist}</span>
                  <span className="text-muted ps-2">
                    Duration: {song.duration}
                  </span>
                </div>
                <button
                  className="btn btn-success btn-sm"
                  onClick={() => {
                    console.log("Add Song");
                    console.log(song);
                    setPlaylist([ 
                      ...playlist, 
                      song
                    ])
                  }}
                >
                  +
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default AudioTracks;