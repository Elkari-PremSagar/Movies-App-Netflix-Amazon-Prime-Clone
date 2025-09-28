import {withRouter} from 'react-router-dom'
import './index.css'

const SearchMovieCard = props => {
  const {movie, history} = props
  const {id, posterPath, title} = movie

  const onClickMovie = () => {
    history.push(`/movies/${id}`)
  }

  return (
    <li className="search-movie-card" onClick={onClickMovie}>
      <img src={posterPath} alt={title} className="search-movie-poster" />
    </li>
  )
}

export default withRouter(SearchMovieCard)
