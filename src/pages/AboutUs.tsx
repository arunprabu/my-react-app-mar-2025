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
      <p style={myParaStyle}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Illo maiores doloremque commodi aperiam voluptates laboriosam voluptas repellendus officiis officia, enim dolorem, perspiciatis vero reprehenderit libero consequatur iusto ut. Possimus, iusto.</p>
      <p style={myParaStyle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut, nesciunt? Soluta, recusandae eius sint impedit consectetur obcaecati ad repellat ipsa voluptatum. Dolor sit rem facere nihil totam eos nulla aspernatur.</p>

    </div>
  )
}

export default AboutUs