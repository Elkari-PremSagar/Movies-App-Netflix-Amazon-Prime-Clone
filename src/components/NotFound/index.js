import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="bg-notfound-container">
    <h1 className="notfound-heading">Lost Your Way ?</h1>
    <p className="notfound-description">
      we are sorry, the page you requested could not be found Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="notfound-btn">
        Go to Home
      </button>
    </Link>
  </div>
)
export default NotFound
