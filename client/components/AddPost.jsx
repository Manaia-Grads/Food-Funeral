import { useAuth0, withAuthenticationRequired } from '@auth0/auth0-react'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { addPost } from '../apis/posts'

function AddPost() {
  const { getAccessTokenSilently } = useAuth0()
  const navigate = useNavigate()

  const { user } = useAuth0()

  const initialData = {
    title: '',
    date: '',
    content: '',
    auth0_id: user?.sub || '',
    name: user?.name || '',
  }
  const [form, setForm] = useState(initialData)

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
    formData.append('auth0_id', form.auth0_id)
    formData.append('name', form.name)

    getAccessTokenSilently()
      .then((token) => {
        return addPost(formData, token)
      })
      .then((newPostData) => {
        setForm(initialData)
        navigate(`/posts/${newPostData.id}`)
      })
      .catch((err) => console.error(err.message))
  }

  return (
    <>
      <div className="px-8">
        <div className="md:flex border-custom-black border-4 bg-custom-yellow flex-col font-fredoka-one">
          <h2 className="text-5xl text-center">Write a Post</h2>
          <p className="text-xl text-center">Posting Guidelines:</p>
          <p className="text-center font-thin text-sm">
            Respect your food by giving it a memorable send off.
          </p>
          <p className="text-center font-thin text-sm">
            When blogging about your meal, it&apos;s suggested to give a
            specific food item a eulogy-like send off.
          </p>
        </div>

        <div className="flex items-center border-custom-black border-4 bg-custom-pink flex-col mt-4 mb-4 py-20 font-graduate">
          <form
            className=""
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <input
              className=""
              type="hidden"
              id="auth0_id"
              name="auth0_id"
              value={user?.sub}
            />
            <input type="hidden" id="name" name="name" value={user?.name} />
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
                />
              </div>

              <div className="flex mb-8">
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
            <div className="mb-8 px-20">
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
              />
            </div>

            <div className="flex flex-col place-items-center">
              <input
                className="rounded-xl font-fredoka-one border-custom-black border-2 bg-custom-white hover:bg-custom-grey text-custom-black font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              />
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export default withAuthenticationRequired(AddPost)
