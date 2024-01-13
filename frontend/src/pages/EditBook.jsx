import React, { useState, useEffect } from "react";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditBook = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [publishedYear, setPublishedYear] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const {id} = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true)
    axios.get(`http://localhost:5555/books/${id}`).then((res) => {
      setTitle(res.data.title)
      setAuthor(res.data.author)
      setPublishedYear(res.data.publishedYear)
      setIsLoading(false)
    }).catch((error) => {
      setIsLoading(false)
      alert("An error occurred. Please check again!");
    })
  }, [])

  const handleEditBook = async () => {
    const data = {
      title,
      author,
      publishedYear,
    };

    setIsLoading(true);

    await axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then((res) => {
        setIsLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setIsLoading(false);
        alert("An error occurred. Please check again!");
      });
  };

  return (
    <div className="p-4">
      <BackButton />
      <h1 className="text-3xl my-4">Edit Book</h1>
      {isLoading ? <Spinner /> : ""}
      <div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Author</label>
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <div className="my-4">
          <label className="text-xl mr-4 text-gray-500">Publish Year</label>
          <input
            type="text"
            value={publishedYear}
            onChange={(e) => setPublishedYear(e.target.value)}
            className="border-2 border-gray-500 px-4 py-2 w-full"
          />
        </div>
        <button className="p-2 bg-sky-300 m-8" onClick={handleEditBook}>
          Save
        </button>
      </div>
    </div>
  );
};

export default EditBook;
