import { useState } from "react";
import FeaturedShow from "./FeaturedShow"

const FeaturedShowList = () => {
  // state 
  const [shows, setShows] = useState([
    {
      id: 234567890,
      title: "Avatar: The Way of Water",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora...",
      thumbnailUrl: "https://placehold.co/600x400/0077cc/ffffff",
      isInWatchlist: true
    },
    {
      id: 76897689,
      title: "Everything Everywhere All at Once",
      description: "An aging Chinese immigrant is swept up in an insane adventure...",
      thumbnailUrl: "https://placehold.co/600x400/ffcc00/333333",
      isInWatchlist: false
    },
    {
      id: 54764576,
      title: "Dune: Part Two",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge...",
      thumbnailUrl: "https://placehold.co/600x400/cc6600/ffffff",
      isInWatchlist: false
    },
    {
      id: 435768578,
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development...",
      thumbnailUrl: "https://placehold.co/600x400/333333/ffffff",
      isInWatchlist: false
    }
  ]);

  const manageWatchlist = (id: number) => {
    console.log("Click handled in Parent Component with id " + id);

    // updating shows immutably using id
    const updatedShows = shows.map((show) => { 
      // let's compare the clicked id with show id
      if(show.id === id) {
        // let's return the matched object with isInWatchlist updated
        return {
          ...show,
          isInWatchlist: !show.isInWatchlist
        }
      } else {
        // Let's return unmatched objects so that they can be part of the brand new array (updatedShows)
        return show
      }
    })

    console.log(updatedShows);
    setShows(updatedShows);
    
  }

  return (
    <div className="row mt-5">
      <h3>Featured Shows | Props, States, Events, Conditional Rendering, Lists & Keys Demo</h3>

      {/* Conditional Rendering inside JSX */}
      {(shows && shows.length === 0) &&
        <div className="alert alert-danger text-center">
          Sorry! Unable to find any featured shows. Try again later.
        </div>
      }

      {/* Lists and Keys */}
      {shows && shows?.map((show) => {
        console.log(show);
        return <div className="col-md-3" key={show.id}>
          <FeaturedShow
            id={show.id}
            title={show.title}
            thumbnailUrl={show.thumbnailUrl}
            description={show.description}
            isInWatchlist={show.isInWatchlist}
            manageWatchlist={manageWatchlist}
          />
        </div>
      })
      }

    </div>
  )
}

export default FeaturedShowList
