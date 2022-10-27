import {formatDistanceToNow} from 'date-fns'
import './index.css'

const CommentItem = props => {
  const {data, onDelete, onLike} = props
  const {id} = data
  const onDeleteComment = () => {
    onDelete(id)
  }

  const onLikeStatus = () => {
    onLike(id)
  }

  return (
    <li>
      <div className="initial-name-container">
        <span className={`initial  ${data.initialClass}`}>
          {data.yourName.slice(0, 1).toUpperCase()}
        </span>
        <div>
          <h1 className="name">
            {data.yourName}
            <span className="comment-item-span">
              {formatDistanceToNow(data.date)}
            </span>
          </h1>
          <p>{data.yourComment}</p>
        </div>
      </div>
      <div className="like-delete-icons-container">
        <p className="like-container" onClick={onLikeStatus}>
          <img
            src={
              data.isLike
                ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
                : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
            }
            alt="like"
          />
          <p className={data.isLike ? 'like' : 'dis-like'}>Like</p>
        </p>
        <img
          className="delete-icon"
          onClick={onDeleteComment}
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
          alt="delete"
        />
      </div>
      <hr className="horizontal-line" />
    </li>
  )
}
export default CommentItem
