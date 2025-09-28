import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter} from 'react-router-dom'
import Loader from 'react-loader-spinner'

import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import MovieCard from '../MovieCard'
import Header from '../Header'
import Footer from '../Footer'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    trendingMovies: [],
    originalsMovies: [],
    bannerMovie: null,
    trendingApiStatus: apiStatusConstants.initial,
    originalsApiStatus: apiStatusConstants.initial,
    bannerApiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getTrendingMovies()
    this.getOriginalMovies()
  }

  getTrendingMovies = async () => {
    this.setState({trendingApiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        trendingMovies: updatedData,
        trendingApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({trendingApiStatus: apiStatusConstants.failure})
    }
  }

  getOriginalMovies = async () => {
    this.setState({
      originalsApiStatus: apiStatusConstants.inProgress,
      bannerApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        title: each.title,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
      }))
      const randomMovie =
        updatedData[Math.floor(Math.random() * updatedData.length)]
      this.setState({
        originalsMovies: updatedData,
        bannerMovie: randomMovie,
        originalsApiStatus: apiStatusConstants.success,
        bannerApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        originalsApiStatus: apiStatusConstants.failure,
        bannerApiStatus: apiStatusConstants.failure,
      })
    }
  }

  onClickRetryTrending = () => this.getTrendingMovies()

  onClickRetryOriginals = () => this.getOriginalMovies()

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
    </div>
  )

  renderFailureView = retryFun => (
    <div className="failure-view">
      <img
        src="https://res.cloudinary.com/daelhwxsf/image/upload/Icon_gfkyks.png"
        alt="failure view"
        className="failure-img"
      />
      <p className="failure-msg">Something went wrong. Please try again</p>
      <button type="button" className="retry-btn" onClick={retryFun}>
        Try Again
      </button>
    </div>
  )

  renderSlider = movies => {
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 1,
      arrows: true,
      responsive: [
        {breakpoint: 1200, settings: {slidesToShow: 3, slidesToScroll: 3}},
        {breakpoint: 992, settings: {slidesToShow: 2, slidesToScroll: 2}},
        {breakpoint: 576, settings: {slidesToShow: 1, slidesToScroll: 1}},
      ],
    }
    return (
      <Slider {...settings}>
        {movies.map(each => (
          <MovieCard key={each.id} movie={each} />
        ))}
      </Slider>
    )
  }

  renderTrendingMovies = () => {
    const {trendingMovies, trendingApiStatus} = this.state
    switch (trendingApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSlider(trendingMovies)
      case apiStatusConstants.failure:
        return this.renderFailureView(this.onClickRetryTrending)
      default:
        return null
    }
  }

  renderOriginalsMovies = () => {
    const {originalsMovies, originalsApiStatus} = this.state
    switch (originalsApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSlider(originalsMovies)
      case apiStatusConstants.failure:
        return this.renderFailureView(this.onClickRetryOriginals)
      default:
        return null
    }
  }

  renderBanner = () => {
    const {bannerMovie, bannerApiStatus} = this.state

    switch (bannerApiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return (
          <div
            className="banner"
            style={{backgroundImage: `url(${bannerMovie.backdropPath})`}}
          >
            <div className="banner-content">
              <h1 className="banner-title">{bannerMovie.title}</h1>
              <p className="banner-overview">{bannerMovie.overview}</p>
              <button type="button" className="play-btn">
                Play
              </button>
            </div>
          </div>
        )
      case apiStatusConstants.failure:
        return this.renderFailureView(this.onClickRetryOriginals)
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />
        {this.renderBanner()}
        <div className="section">
          <h1 className="section-title">Trending Now</h1>
          {this.renderTrendingMovies()}
        </div>
        <div className="section">
          <h1 className="section-title">Originals</h1>
          {this.renderOriginalsMovies()}
        </div>
        <Footer />
      </div>
    )
  }
}

export default withRouter(Home)
