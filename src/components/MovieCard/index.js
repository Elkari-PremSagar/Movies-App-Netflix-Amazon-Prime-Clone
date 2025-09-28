import {withRouter} from 'react-router-dom'
import './index.css'

const MovieCard = props => {
  const {movie, history} = props
  const {id, posterPath} = movie

  const onClickMovie = () => {
    history.push(`/movies/${id}`)
  }

  return (
    <li className="movie-card">
      <button type="button" className="movie-card-btn" onClick={onClickMovie}>
        <img
          src={posterPath}
          alt={movie.title || 'movie poster'}
          className="movie-poster"
        />
      </button>
    </li>
  )
}

export default withRouter(MovieCard)
