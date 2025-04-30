import { createContext, useState } from "react";

/* 1. Create the context */
export const PlaylistContext =  createContext<any>(undefined);

// let's supply the data through Context Provider 
export const PlaylistContextProvider = (props: any) => {
  // let's maintain the play here 
  const [playlist, setPlaylist] = useState<any>([]);

  const dataToBeSupplied = {
    playlist: playlist, // needed for the MyPlaylist component
    setPlaylist: setPlaylist // needed for the AudioTracks Component
  }

  return (
    <PlaylistContext.Provider value={dataToBeSupplied}>
      {props.children}
    </PlaylistContext.Provider>
  )
}


