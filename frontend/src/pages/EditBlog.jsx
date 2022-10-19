import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

const EditBlog = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { blog } = state;
  const { id } = useParams();
  const { authToken } = useContext(AuthContext);

  const [blogData, setBlogData] = useState(blog);
  const [imageUpdate, setImageUpdate] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };
  const handleImage = (e) => {
    setImageUpdate(e.target.files[0]);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const { title, content, category } = blogData;
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("category", category);
    if (imageUpdate) {
      formData.append("image", imageUpdate);
    }

    const response = await fetch(
      `http://127.0.0.1:8000/api/blogs/${id}/update/`,
      {
        method: "PUT",
        headers: {
          Authorization: "Bearer " + String(authToken.access),
        },
        body: formData,
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      navigate(`/blog/${id}`);
    } else {
      alert(data);
    }
  };

  return (
    <>
   

      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-slate-50  rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create your Blog
            </h1>
            <form className="space-y-4 md:space-y-6"  onSubmit={handleUpdate}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Title
                </label>
                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                  value={blogData.title}
          onChange={handleChange}
          name="title"
          id="title"
          type="text"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  Content
                </label>

                <textarea
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                 
                  cols="30"
                  rows="6"
                  value={blogData.content}
                  onChange={handleChange}
                  name="content"
                  id="content"
                ></textarea>
              </div>
             
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 "
                >
                  File Upload
                </label>

                <input
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 focus:outline-none"
                  type="file"
                  name="image"
                  id="image"
                  onChange={handleImage}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
              >
               Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditBlog;
