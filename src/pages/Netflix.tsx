import LatestShowList from "../components/netflix/LatestShowList"

const Netflix = () => {
  return (
    <div className="my-5">

      <div className="p-5 text-center bg-body-tertiary rounded-3">
        <h1 className="text-body-emphasis">Welcome to Netflix</h1>
        <p className="lead">
          Binge watch the Latest, Recommended and Featured shows, 24/7
        </p>
      </div>


      {/* Props Demo */}
      <LatestShowList />



    </div>
  )
}

export default Netflix