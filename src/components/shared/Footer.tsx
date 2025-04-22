import MenuList from "./MenuList";

// Functional Component with Anonymous Function
const Footer = function() {
  const copyrightYear = 2025;

  return(
    <footer className="text-center">
      <hr />
      <MenuList />
      <p>Copyright {copyrightYear} | Arun</p>
    </footer>
  )
}

export default Footer;
