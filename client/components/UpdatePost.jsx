import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { updatePost } from '../apis/posts'
import { useAuth0 } from '@auth0/auth0-react'
import { DeletePost } from './DeletePost'

export function UpdatePost({ postData, id }) {
  const navigate = useNavigate()
  const { user } = useAuth0()
  const { data: post, loading, error } = useSelector((state) => state.post)

  const initialData = {
    title: postData?.title,
    date: postData?.date_eaten,
    content: postData?.content,
  }
  const [form, setForm] = useState(initialData)
  const [update, setUpdate] = useState({ updateStatus: false })

  const handleChange = (evt) => {
    if (evt.target.name === 'file') {
      setForm({ ...form, file: evt.target.files[0] })
    } else {
      evt.preventDefault()
      setForm({
        ...form,
        [evt.target.name]: evt.target.value,
      })
    }
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()

    const formData = new FormData()
    formData.append('file', form.file)
    formData.append('title', form.title)
    formData.append('date', form.date)
    formData.append('content', form.content)

    updatePost(formData, id)
      .then(() => {
        navigate(`/`)
      })
      .catch((err) => console.error(err.message))
  }

  function updateClickHandler(e) {
    e.target.classList.add('hidden')
    setUpdate({ updateStatus: true })
  }

  return (
    <div className="px-8">
      {postData?.auth0_id == user?.sub && (
        <>
          <button
            onClick={updateClickHandler}
            className="m-2 rounded-md font-fredoka-one border-custom-black border-2 bg-custom-pink hover:bg-custom-yellow text-custom-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
          >
            Edit or Delete Post
          </button>
        </>
      )}
      {update.updateStatus && (
        <div className="flex items-center border-custom-black border-4 bg-custom-pink flex-col mt-4 mb-4 py-2 font-graduate">
          <h1 className="text-5xl text-center mb-4">Edit your post</h1>
          <form
            className="content-center"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="px-60">
              <div className="flex mb-8">
                <label
                  className="w-full grow text-lg pr-8 text-left"
                  htmlFor="title"
                >
                  name of deceased
                </label>
                <input
                  className="border-custom-black border-2 font-fredoka-one w-full rounded"
                  onChange={handleChange}
                  name="title"
                  id="title"
                  type="text"
                  value={form.title}
                />
              </div>
              <div className="flex mb-8">
                <label
                  className="w-full grow text-lg pr-8 text-left"
                  htmlFor="date"
                >
                  date of passing
                </label>
                <input
                  className="border-custom-black border-2 font-fredoka-one w-full rounded"
                  onChange={handleChange}
                  name="date"
                  id="date"
                  type="date"
                  value={form.date}
                />
              </div>
              <div className="flex mb-4">
                <label
                  className="w-full grow text-lg pr-8 text-left"
                  htmlFor="file"
                >
                  add a photo
                </label>
                <input
                  className="font-fredoka-one w-full rounded-xl border-custom-black border-2"
                  onChange={handleChange}
                  name="file"
                  id="file"
                  type="file"
                />
              </div>
            </div>
            <div className="mb-4 px-20">
              <label
                className="flex flex-col place-items-center text-4xl"
                htmlFor="content"
              >
                memorial
              </label>
              <textarea
                className="rounded-xl flex grow h-80 border-custom-black border-2 font-fredoka-one w-full"
                onChange={handleChange}
                name="content"
                id="content"
                value={form.content}
              />
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <DeletePost id={id} auth0_id={post?.auth0_id} />
              <input
                className="rounded-md font-fredoka-one border-custom-black border-2 bg-custom-yellow hover:bg-custom-grey text-custom-black font-bold py-2 px-4 focus:outline-none focus:shadow-outline"
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
