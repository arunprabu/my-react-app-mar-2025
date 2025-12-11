const AboutUs = () => {
  const myParaStyle = {
    color: 'gray',
    fontSize: "20px"
  }

  return (
    <div>
      {/* Inline Style */}
      <h1 style={{ color: 'red', fontSize: "52px" }}>About Us</h1>

      {/* Inline Style with variable */}
      <p style={myParaStyle}>
        This application is a hands-on training/demo Single Page Application (SPA) built with React and TypeScript.
        It is designed to teach common React patterns—props, state, hooks, context, routing, REST API calls, forms,
        and reducers—through small, practical demos and exercises.
      </p>
      <p style={myParaStyle}>
        Explore the app using the menu to see focused examples: a Netflix UI demo, Employees CRUD integrated with a mock API,
        a Spotify playlist demo using Context, and Todos that demonstrate both useState and useReducer patterns.
        Each page is intended to be a self-contained learning module so you can experiment and learn incrementally.
      </p>

    </div>
  )
}

export default AboutUs