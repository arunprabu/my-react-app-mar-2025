import { FeaturedShowProps } from "../../models/netflix/ShowProps"

const FeaturedShow = ({ id, title, description, thumbnailUrl, isInWatchlist, manageWatchlist }: FeaturedShowProps) => {
  console.log(isInWatchlist);

  return (
    <div className="card">
      <img src={thumbnailUrl}
        className="card-img-top"
        alt={title} />
      <div className="card-body">
        <h5 className="card-title">
          {title}
        </h5>
        <p className="card-text">{description}</p>
        <button className="btn btn-secondary btn-sm me-1">More Details</button>
        <button className="btn btn-warning btn-sm" onClick={() => {
          console.log("Clicked in Child Component")
          manageWatchlist(id);
        }}>
          {isInWatchlist ? "In Watchlist" : "Add to Watchlist"}
        </button>
      </div>
    </div>
  )
}

export default FeaturedShow