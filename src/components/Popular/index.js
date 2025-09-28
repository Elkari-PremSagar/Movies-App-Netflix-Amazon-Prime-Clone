import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {
    popularMovies: [],
    popularApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getPopularMovies()
  }

  getPopularMovies = async () => {
    this.setState({popularApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        posterPath: each.poster_path,
        overview: each.overview,
      }))
      this.setState({
        popularMovies: updatedData,
        popularApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        popularApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetry = () => {
    this.getPopularMovies()
  }

  renderLoader = () => (
    <div className="loader" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/daelhwxsf/image/upload/Icon_gfkyks.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={this.onClickRetry}>
        Try Again
      </button>
    </div>
  )

  renderMoviesGrid = movies => (
    <ul className="movies-grid">
      {movies.map(each => (
        <li key={each.id} className="movie-item">
          <Link to={`/movies/${each.id}`}>
            <img
              src={each.posterPath}
              alt={each.title}
              className="movie-poster"
            />
          </Link>
        </li>
      ))}
    </ul>
  )

  renderMovies = () => {
    const {popularMovies, popularApiStatus} = this.state
    switch (popularApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderMoviesGrid(popularMovies)
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-container">
        <Header />
        <div className="section">
          <h1 className="section-title">Popular Movies</h1>
          {this.renderMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default Popular
