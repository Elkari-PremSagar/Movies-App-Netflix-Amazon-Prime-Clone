import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Header from '../Header'
import Footer from '../Footer'
import MovieCard from '../MovieCard'
import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: {},
    similarMovies: [],
    moviesApiStatus: apiStatus.initial,
  }

  componentDidMount() {
    this.getMovieItemDetails()
  }

  getMovieItemDetails = async () => {
    this.setState({moviesApiStatus: apiStatus.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    const jwtToken = Cookies.get('jwt_token')

    const url = `https://apis.ccbp.in/movies-app/movies/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const movie = data.movie_details
      const updatedMovieDetails = {
        id: movie.id,
        title: movie.title,
        adult: movie.adult,
        backdropPath: movie.backdrop_path,
        overview: movie.overview,
        genres: movie.genres,
        spokenLanguages: movie.spoken_languages,
        voteAverage: movie.vote_average,
        voteCount: movie.vote_count,
        budget: movie.budget,
        releaseDate: movie.release_date,
        runtime: movie.runtime,
      }

      const updatedSimilarMovies = movie.similar_movies.map(each => ({
        id: each.id,
        posterPath: each.poster_path,
        title: each.title,
      }))

      this.setState({
        movieDetails: updatedMovieDetails,
        similarMovies: updatedSimilarMovies,
        moviesApiStatus: apiStatus.success,
      })
    } else {
      this.setState({moviesApiStatus: apiStatus.failure})
    }
  }

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/daelhwxsf/image/upload/Icon_gfkyks.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-text">Something went wrong. Please try again</p>
      <button
        type="button"
        className="retry-btn"
        onClick={this.getMovieItemDetails}
      >
        Try Again
      </button>
    </div>
  )

  renderSuccessView = () => {
    const {movieDetails, similarMovies} = this.state
    const {
      title,
      backdropPath,
      overview,
      runtime,
      releaseDate,
      genres,
      spokenLanguages,
      voteAverage,
      voteCount,
      budget,
      adult,
    } = movieDetails

    const censorRating = adult ? 'A' : 'U/A'
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const runTimeDisplay = minutes > 0 ? `${hours}h ${minutes}m` : `${hours}h`
    const formattedBudget = `$${budget.toLocaleString()}`

    return (
      <>
        <div
          className="movie-banner"
          style={{backgroundImage: `url(${backdropPath})`}}
        >
          <div className="banner-content">
            <h1 className="movie-title">{title}</h1>
            <p className="movie-runtime">
              {runTimeDisplay} | {releaseDate.split('-')[0]}
            </p>
            <p className="movie-rating">{censorRating}</p>
            <p className="movie-overview">{overview}</p>
            <button className="play-btn" type="button">
              Play
            </button>
          </div>
        </div>

        <div className="movie-info-section">
          <div className="movie-info-column">
            <h3 className="info-heading">Genres</h3>
            <ul className="info-list">
              {genres.map(each => (
                <li key={each.id}>
                  <p> {each.name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="movie-info-column">
            <h3 className="info-heading">Audio Available</h3>
            <ul className="info-list">
              {spokenLanguages.map(each => (
                <li key={each.id}>
                  <p>{each.english_name}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="movie-info-column">
            <h3 className="info-heading">Rating Count</h3>
            <p className="info-text">{voteCount}</p>
            <h3 className="info-heading">Rating Average</h3>
            <p className="info-text">{voteAverage}</p>
          </div>

          <div className="movie-info-column">
            <h3 className="info-heading">Budget</h3>
            <p className="info-text">{formattedBudget}</p>
            <h3 className="info-heading">Release Date</h3>
            <p className="info-text">{releaseDate}</p>
          </div>
        </div>

        <div className="similar-movies-section">
          <h2 className="section-title">More like this</h2>
          <ul className="similar-movies-list">
            {similarMovies.map(movie => (
              <li key={movie.id}>
                <MovieCard movie={movie} />
              </li>
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderMovieDetails = () => {
    const {moviesApiStatus} = this.state

    switch (moviesApiStatus) {
      case apiStatus.inProgress:
        return this.renderLoadingView()
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="movie-item-details-container">
        <Header />
        {this.renderMovieDetails()}
        <Footer />
      </div>
    )
  }
}

export default withRouter(MovieItemDetails)
