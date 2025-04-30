import { useContext } from "react";
import { PlaylistContext } from "../../contexts/PlaylistContext";
import { ITrack } from "../../models/spotify/ITrack";

const MyPlaylist = () => {
  // let's get the data from the context -- use the hook named useContext
  const { playlist } = useContext(PlaylistContext);
  console.log(playlist);

  return (
    <div className="col-md-6">
      <h2>My Playlist ({playlist.length})</h2>
      <div className="card">
        <ul className="list-group list-group-flush">
          {/* lists and keys */}
          {
            playlist.map((track: ITrack) => {
              return (
                <li className="list-group-item d-flex justify-content-between align-items-start" key={track.id}>
                  <div className="ms-2 me-auto">
                    <div className="fw-bold">{track.title}</div>
                    <span className="text-muted">Artists: {track.artist}</span>
                    <span className="text-muted ps-2">Duration: {track.duration}</span>
                  </div>
                  <button className="btn btn-danger btn-sm">-</button>
                </li>
              )
            })
          }
        </ul>
      </div>
    </div>
  );
};

export default MyPlaylist;