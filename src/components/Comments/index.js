import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentsItem from '../CommentItem'
import './index.css'

const backgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

class Comments extends Component {
  state = {name: '', comment: '', commentList: []}

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onAddComment = event => {
    this.setState({comment: event.target.value})
  }

  submitForm = event => {
    event.preventDefault()
    const backgroundColor =
      backgroundClassNames[
        Math.ceil(Math.random() * backgroundClassNames.length - 1)
      ]
    const {name, comment} = this.state
    const newData = {
      id: uuidv4(),
      yourName: name,
      yourComment: comment,
      date: new Date(),
      isLike: false,
      initialClass: backgroundColor,
    }
    if (name && comment !== '') {
      this.setState(prevState => ({
        commentList: [...prevState.commentList, newData],
      }))

      this.setState({name: '', comment: ''})
    }
  }

  onDelete = id => {
    const {commentList} = this.state
    const updateList = commentList.filter(eachItem => eachItem.id !== id)
    this.setState({commentList: updateList})
  }

  onLiking = id => {
    this.setState(prevState => ({
      commentList: prevState.commentList.map(eachItem => {
        if (id === eachItem.id) {
          return {...eachItem, isLike: !eachItem.isLike}
        }
        return eachItem
      }),
    }))
  }

  renderEachComment = () => {
    const {commentList} = this.state
    return (
      <ul className="comments-item-container">
        {commentList.map(eachItem => (
          <CommentsItem
            onLike={this.onLiking}
            onDelete={this.onDelete}
            key={eachItem.id}
            data={eachItem}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {name, comment, commentList} = this.state
    return (
      <div className="app-background">
        <h1>Comments</h1>
        <div className="inputs-container">
          <form className="form" onSubmit={this.submitForm}>
            <p className="say-paragraph">
              Say something about 4.0 Technologies
            </p>
            <input
              value={name}
              onChange={this.onChangeName}
              className="input"
              type="text"
              placeholder="Your Name"
            />
            <textarea
              value={comment}
              onChange={this.onAddComment}
              className="textarea"
              placeholder="Your Comment"
            />
            <button type="submit" className="add-comment-button">
              Add Comment
            </button>
          </form>
          <img
            className="image"
            src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
            alt="comments"
          />
        </div>
        <hr />
        <p className="say-paragraph">
          <span className="span">{commentList.length}</span> Comments
        </p>
        {this.renderEachComment()}
      </div>
    )
  }
}

export default Comments
