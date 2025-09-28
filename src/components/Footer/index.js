import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <footer className="footer-container">
    <div className="social-icons">
      <FaGoogle size={22} className="social-icon" />
      <FaTwitter size={22} className="social-icon" />
      <FaInstagram size={22} className="social-icon" />
      <FaYoutube size={22} className="social-icon" />
    </div>
    <p className="footer-text">Contact Us</p>
  </footer>
)

export default Footer
