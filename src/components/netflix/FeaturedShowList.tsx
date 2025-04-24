import { useState } from "react";
import FeaturedShow from "./FeaturedShow"

const FeaturedShowList = () => {
  // state 
  const [shows, setShows] = useState([
    {
      title: "Avatar: The Way of Water",
      description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora...",
      thumbnailUrl: "https://placehold.co/600x400/0077cc/ffffff"
    },
    {
      title: "Everything Everywhere All at Once",
      description: "An aging Chinese immigrant is swept up in an insane adventure...",
      thumbnailUrl: "https://placehold.co/600x400/ffcc00/333333"
    },
    {
      title: "Dune: Part Two",
      description: "Paul Atreides unites with Chani and the Fremen while seeking revenge...",
      thumbnailUrl: "https://placehold.co/600x400/cc6600/ffffff"
    },
    {
      title: "Oppenheimer",
      description: "The story of American scientist J. Robert Oppenheimer and his role in the development...",
      thumbnailUrl: "https://placehold.co/600x400/333333/ffffff"
    }
  ]);

  return (
    <div className="row mt-5">
      <h3>Featured Shows | Props, States, Events, Conditional Rendering, Lists & Keys Demo</h3>

      {/* Conditional Rendering */}
      {(shows && shows.length === 0) &&
        <div className="alert alert-danger text-center">
          Sorry! Unable to find any featured shows. Try again later.
        </div>
      }

      {/* Lists and Keys */}
      {shows && shows?.map((show) => {
        return <div className="col-md-3">
                  <FeaturedShow
                    title={show.title}
                    thumbnailUrl={show.thumbnailUrl}
                    description={show.description}
                  />
                </div>
      })}

    </div>
  )
}

export default FeaturedShowList
