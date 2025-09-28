import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

class Account extends Component {
  onClickLogout = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    localStorage.removeItem('username')
    localStorage.removeItem('password')
    history.replace('/login')
  }

  render() {
    const username = localStorage.getItem('username') || 'rahul'
    const password = localStorage.getItem('password') || 'password123'

    return (
      <>
        <Header />
        <div className="account-bg">
          <div className="account-container">
            <h1 className="account-heading">Account</h1>
            <hr className="separator" />

            <div className="account-details">
              <p className="label">Member ship</p>
              <div className="membership-info">
                <p className="value">{username}@gmail.com</p>
                <p className="value">
                  Password : {'*'.repeat(password.length)}
                </p>
              </div>
            </div>

            <hr className="separator" />

            <div className="plan-details">
              <p className="label">Plan details</p>
              <div className="plan-info">
                <p className="value">Premium</p>
                <p className="quality">Ultra HD</p>
              </div>
            </div>

            <hr className="separator" />

            <div className="logout-container">
              <button
                type="button"
                className="logout-btn"
                onClick={this.onClickLogout}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }
}

export default withRouter(Account)
