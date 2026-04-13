import './Footer.css'

function Footer(): JSX.Element {
  const year = new Date().getFullYear()
  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__copy">© {year} DEBI</p>
      </div>
    </footer>
  )
}

export default Footer
