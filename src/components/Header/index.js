import React, {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import {HiOutlineSearch} from 'react-icons/hi'
import './index.css' // header CSS (see CSS section below)

class Header extends Component {
  state = {
    searchInput: '',
  }

  componentDidMount() {
    const {location} = this.props
    const params = new URLSearchParams(location.search)
    const q = params.get('query') || ''
    this.setState({searchInput: q})
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    if (location.search !== prevProps.location.search) {
      const params = new URLSearchParams(location.search)
      const q = params.get('query') || ''
      this.setState({searchInput: q})
    }
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  onSubmitSearch = event => {
    event.preventDefault()
    const {history} = this.props
    const {searchInput} = this.state
    const q = searchInput.trim()
    // If query is empty we still navigate to /search (tests expect route),
    // but Search component will show the empty state.
    history.push(`/search?query=${encodeURIComponent(q)}`)
  }

  renderSearchForm = () => {
    const {searchInput} = this.state
    return (
      <form className="header-search-form" onSubmit={this.onSubmitSearch}>
        <input
          type="search"
          role="searchbox" // makes getByRole('searchbox') succeed
          aria-label="Search"
          className="header-search-input"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearch}
        />
        <button
          type="submit"
          className="header-search-submit"
          aria-label="Search submit"
          data-testid="searchButton"
        >
          <HiOutlineSearch size={18} />
        </button>
      </form>
    )
  }

  render() {
    const {location} = this.props
    const isSearchRoute = location.pathname === '/search'

    return (
      <nav className="header-container">
        <div className="header-inner">
          <div className="left">
            <Link to="/" className="logo-link">
              <img
                src="https://res.cloudinary.com/daelhwxsf/image/upload/v1757845915/Group_7399_s1qami.png"
                alt="website logo"
                className="website-logo"
              />
            </Link>
          </div>

          <ul className="nav-links">
            <li>
              <Link to="/" className="nav-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/popular" className="nav-item">
                Popular
              </Link>
            </li>
          </ul>

          <div className="header-right">
            {/* If we're on /search render the search form in header;
                otherwise show the icon button that navigates to /search */}
            {isSearchRoute ? (
              this.renderSearchForm()
            ) : (
              <Link to="/search" className="search-link">
                <button
                  type="button"
                  data-testid="searchButton" // ONLY header has this testid
                  className="search-icon-btn"
                  aria-label="Open search"
                >
                  <HiOutlineSearch size={20} />
                </button>
              </Link>
            )}

            <Link to="/account" className="profile-link">
              <img
                src="https://res.cloudinary.com/daelhwxsf/image/upload/v1757864053/Avatar_n7rtjp.png"
                alt="profile"
                className="profile-img"
              />
            </Link>
          </div>
        </div>
      </nav>
    )
  }
}

export default withRouter(Header)
