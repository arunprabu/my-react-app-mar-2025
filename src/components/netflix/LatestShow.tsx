import { ShowProps } from "../../models/netflix/ShowProps";

const LatestShow = ( props: ShowProps ) => {
  console.log(props);
  /* props
    * receive data from parent component via props
    * props are immutable (i.e read-only)
    * props are of objects
  */
  return (
    <div className="card">
      <img src={props.thumbnailUrl} 
        className="card-img-top" 
          alt={props.title} />
      <div className="card-body">
        <h5 className="card-title">
          {props.title}
        </h5>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-primary">More Details</a>
      </div>
    </div>
  )
}

export default LatestShow