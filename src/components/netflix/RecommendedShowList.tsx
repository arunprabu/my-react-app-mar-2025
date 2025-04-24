import { useState } from "react"
import RecommendedShow from "./RecommendedShow"

const RecommendedShowList = () => {
  /* state  
      * component-wide updateable data
      * is data that can change over time
      * state is mutable (i.e. can be changed)
      * changing state will trigger a re-render of the component
      * thus UI will be updated with the new state
      * Do not Update the state directly 
  */
  const [resolution, setResolution] = useState("HD");

  const recommendedShows = [
    {
      title: "Inception",
      description: "A thief who steals corporate secrets through the use of dream-sharing technology...",
      thumbnailUrl: "https://placehold.co/600x400/ABC/31343C"
    },
    {
      title: "The Dark Knight",
      description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham...",
      thumbnailUrl: "https://placehold.co/600x400/DEF/ffffff"
    },
    {
      title: "Parasite",
      description: "Greed and class discrimination threaten the newly formed symbiotic relationship...",
      thumbnailUrl: "https://placehold.co/600x400/123/ffffff"
    },
    {
      title: "Spirited Away",
      description: "During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world...",
      thumbnailUrl: "https://placehold.co/600x400/456/ffffff"
    }
  ]

  const handleChangeResolution = () => {
    // never update the state directly
    setResolution("4K"); // update the state using only setter function
  }

  return (
    <div className="row mt-5">
      <h3>Recommended Shows | States, Events, Props Demo</h3>
      <div className="alert alert-primary text-center">
        <p>Watch the shows in {resolution} quality</p>
        <button className="btn btn-danger" onClick={handleChangeResolution}>Change Resolution</button>
      </div>

      <div className="col-md-3">
        <RecommendedShow 
          title={recommendedShows[0].title}
          description={recommendedShows[0].description}
          thumbnailUrl={recommendedShows[0].thumbnailUrl} />
      </div>

      <div className="col-md-3">
        <RecommendedShow 
          title={recommendedShows[1].title}
          description={recommendedShows[1].description}
          thumbnailUrl={recommendedShows[1].thumbnailUrl} />
      </div>

      <div className="col-md-3">
        <RecommendedShow 
          title={recommendedShows[2].title}
          description={recommendedShows[2].description}
          thumbnailUrl={recommendedShows[2].thumbnailUrl} />
      </div>

      <div className="col-md-3">
        <RecommendedShow 
          title={recommendedShows[3].title}
          description={recommendedShows[3].description}
          thumbnailUrl={recommendedShows[3].thumbnailUrl} />
      </div>

    </div>
  )
}
export default RecommendedShowList
