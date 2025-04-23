const Home = () => {
  return (
    <div className="px-4 py-5 my-5 text-center">
      <h1 className="display-5 fw-bold text-body-emphasis">React App Demo</h1>
      <div className="col-lg-6 mx-auto">
        <p className="lead mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt quasi quis non qui veniam eaque earum, vel similique exercitationem voluptatibus beatae enim quia aspernatur nam id doloribus, ea nesciunt blanditiis.</p>
        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
          <button type="button" className="btn btn-primary btn-lg px-4 gap-3">Browse Netflix</button>
          <button type="button" className="btn btn-outline-secondary btn-lg px-4">Manage Employees</button>
        </div>
      </div>
    </div>
  )
}

export default Home