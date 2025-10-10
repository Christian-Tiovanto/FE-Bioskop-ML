import { useState } from "react";
import type { IMovie } from "./Main";
import { useNavigate } from "react-router";

const AdminDashboard = () => {
  const [title, setTitle] = useState("");
  const [coverImgUrl, setCoverImgUrl] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [rating, setRating] = useState("");
  const [releaseDate, setReleaseDate] = useState<Date>(new Date());
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newMovie: IMovie = {
      id: Date.now(),
      title,
      cover_img_url: coverImgUrl,
      synopsis,
      rating: parseFloat(rating),
      release_date: releaseDate,
    };
    setTitle("");
    setCoverImgUrl("");
    setSynopsis("");
    setRating("");
    setReleaseDate(new Date());
    setSuccessMessage(`Movie "${title}" added successfully!`);
    setTimeout(() => setSuccessMessage(""), 3000);
  };
  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-12">
          <div className="flex justify-between items-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Admin Dashboard</h1>
            <button
              onClick={() => navigate("/")}
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition">
              ← Back to Showcase
            </button>
          </div>
        </header>
        <main>
          <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-2xl shadow-2xl">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Film</h2>
            {successMessage && (
              <p className="bg-green-500/20 text-green-400 text-center p-3 rounded-lg mb-4">{successMessage}</p>
            )}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="title">
                  Title
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="cover_img_url">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="cover_img_url"
                  value={coverImgUrl}
                  onChange={(e) => setCoverImgUrl(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="synopsis">
                  Synopsis
                </label>
                <textarea
                  id="synopsis"
                  rows={4}
                  value={synopsis}
                  onChange={(e) => setSynopsis(e.target.value)}
                  className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                  required></textarea>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="rating">
                    Rating (0.0 - 10.0)
                  </label>
                  <input
                    type="number"
                    id="rating"
                    step="0.1"
                    min="0"
                    max="10"
                    value={rating}
                    onChange={(e) => setRating(e.target.value)}
                    className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 text-sm font-bold mb-2" htmlFor="release_date">
                    Release Date
                  </label>
                  <input
                    type="date"
                    id="release_date"
                    value={releaseDate.toISOString()}
                    onChange={(e) => setReleaseDate(new Date(e.target.value))}
                    className="w-full bg-gray-700 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                    required
                  />
                </div>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full mt-4 bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 px-4 rounded-lg focus:outline-none focus:shadow-outline transition">
                  Add Film
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
