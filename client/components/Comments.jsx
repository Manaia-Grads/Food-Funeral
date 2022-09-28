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
      dateNum.getDate() +
      '/' +
      (dateNum.getMonth() + 1) +
      '/' +
      dateNum.getFullYear()
    const mins =
      dateNum.getMinutes() < 10
        ? '0' + dateNum.getMinutes()
        : dateNum.getMinutes()
    const time = dateNum.getHours() + ':' + mins
    return `${time} ${date}`
  }

  return (
    <div className="w-2/5">
      {comments.map((comment) => {
        return (
          <div
            className="border-2 border-custom-black rounded-md my-4 px-2 bg-custom-grey font-fredoka-one"
            key={comment.id}
          >
            <p>
              <span className="font-bold font-fredoka-one">
                - {comment.name}{' '}
              </span>
              <span>| {getDate(comment.date)}</span>
            </p>
            <p>{comment.content}</p>
          </div>
        )
      })}
    </div>
  )
}

export default Comments
