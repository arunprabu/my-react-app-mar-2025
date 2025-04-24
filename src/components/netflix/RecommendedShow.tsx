import { ShowProps } from "../../models/netflix/ShowProps"

const RecommendedShow = ( {title, description, thumbnailUrl}: ShowProps) => {
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
        <a href="#" className="btn btn-primary">More Details</a>
      </div>
    </div>
  )
}

export default RecommendedShow