import LatestShow from "./LatestShow"

const LatestShowList = () => {
  return (
    <div className="row mt-3">
      <h3>Latest Shows | Props Demo</h3>
      <div className="col-md-3">
        <LatestShow 
          title="The Godfather" 
          description="An American crime drama film directed by Francis Ford..."
          thumbnailUrl="https://placehold.co/600x400/EEE/31343C"/>
      </div>

      <div className="col-md-3">
        <LatestShow 
          title="KGF" 
          description="The story of the most powerful man in the world..."
          thumbnailUrl="https://placehold.co/600x400/678/ffffff" />
      </div>

      <div className="col-md-3">
        <LatestShow 
          title="Money Heist" 
          description="An unusual group of robbers attempt to carry out the most..."
          thumbnailUrl="https://placehold.co/600x400/ff0000/ffffff" />
      </div>

      <div className="col-md-3">
        <LatestShow 
          title="Planet Earth II" 
          description="David Attenborough hosts a new wildlife documentary..."
          thumbnailUrl="https://placehold.co/600x400/90A/ffffff" />
      </div>

    </div>

  )
}

export default LatestShowList
