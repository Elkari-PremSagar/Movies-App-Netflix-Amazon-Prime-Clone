// src/components/Search/index.js
import React, {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import MovieCard from '../MovieCard'
import Header from '../Header'
import './index.css' // search-route CSS (see CSS section below)

const apiStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  empty: 'EMPTY',
  failure: 'FAILURE',
}

class Search extends Component {
  state = {
    moviesList: [],
    status: apiStatus.initial,
  }

  componentDidMount() {
    this.fetchFromQuery()
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.fetchFromQuery()
    }
  }

  fetchFromQuery = async () => {
    const params = new URLSearchParams(this.props.location.search)
    const q = params.get('query') || ''
    if (q.trim() === '') {
      // empty query -> show empty state (design expects no-results)
      this.setState({moviesList: [], status: apiStatus.empty})
      return
    }

    this.setState({status: apiStatus.loading})
    const jwtToken = Cookies.get('jwt_token')
    const url = `https://apis.ccbp.in/movies-app/movies-search?search=${encodeURIComponent(
      q,
    )}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    try {
      const response = await fetch(url, options)
      if (response.ok) {
        const data = await response.json()
        if (data.results.length === 0) {
          this.setState({moviesList: [], status: apiStatus.empty})
        } else {
          const updated = data.results.map(each => ({
            id: each.id,
            title: each.title,
            posterPath: each.poster_path,
          }))
          this.setState({moviesList: updated, status: apiStatus.success})
        }
      } else {
        this.setState({status: apiStatus.failure})
      }
    } catch (e) {
      this.setState({status: apiStatus.failure})
    }
  }

  renderLoading = () => (
    <div className="loader-wrapper" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailure = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/dkxxgpj3r/image/upload/v1693647469/failure-image.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.fetchFromQuery}>
        Try Again
      </button>
    </div>
  )

  renderNoResults = () => {
    const params = new URLSearchParams(this.props.location.search)
    const q = params.get('query') || ''
    return (
      <div className="no-results">
        <img
          src="https://res.cloudinary.com/daelhwxsf/image/upload/Group_7394_nmacgz.png"
          alt="no movies"
          className="no-results-img"
        />
        <p className="no-results-text">
          Your search for {q} did not find any matches.
        </p>
      </div>
    )
  }

  renderMovies = () => {
    const {moviesList} = this.state
    return (
      <ul className="search-movies-list">
        {moviesList.map(item => (
          <MovieCard key={item.id} movie={item} />
        ))}
      </ul>
    )
  }

  renderContent = () => {
    const {status} = this.state
    switch (status) {
      case apiStatus.loading:
        return this.renderLoading()
      case apiStatus.success:
        return this.renderMovies()
      case apiStatus.empty:
        return this.renderNoResults()
      case apiStatus.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        {/* Header is included so the header search form (on /search) is visible */}
        <Header />
        <main className="search-page">{this.renderContent()}</main>
      </>
    )
  }
}

export default Search
