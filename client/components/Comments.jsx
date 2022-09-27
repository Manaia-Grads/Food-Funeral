import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchComments } from '../actions/comments'

function Comments() {
  const dispatch = useDispatch()
  const { id } = useParams()

  useEffect(() => dispatch(fetchComments(id)), [])

  const comments = useSelector((state) => state.comments.data)

  function getDate(SQLDate) {
    const dateNum = new Date(parseInt(SQLDate))
    const date =
      dateNum.getMonth() +
      1 +
      '/' +
      dateNum.getDate() +
      '/' +
      dateNum.getFullYear()
    const time = dateNum.getHours() + ':' + dateNum.getMinutes()
    const timeDivider = dateNum.getHours() < 12 ? 'am' : 'pm'
    return `${time}${timeDivider} ${date}`
  }

  return (
    <div>
      {comments.map((comment) => {
        console.log(comment)
        return (
          <div key={comment.id}>
            <p>{comment.content}</p>
            <p>By {comment.name ? comment.name : 'Anonymous Mourner'}</p>
            <p>At {getDate(comment.date)}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
