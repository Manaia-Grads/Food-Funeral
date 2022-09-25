import React from 'react'

function AddComment() {
  return (
    <>
      <form>
        <label htmlFor="comment">Add a comment</label>
        <textarea id="comment" name="comment" />
        <input type="submit" />
      </form>
    </>
  )
}

export default AddComment
