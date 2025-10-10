import React, { useState } from "react";
import { useNavigate } from "react-router";
export interface IComment {
  id: number;
  user: string;
  userId: number;
  comment: string;
  is_good: boolean;
  created_at: Date;
}
export interface IMovie {
  id: number;
  title: string;
  cover_img_url: string;
  synopsis: string;
  rating: number;
  release_date: Date;
}
export interface IMovieWithComments {
  id: number;
  title: string;
  cover_img_url: string;
  synopsis: string;
  rating: number;
  release_date: Date;
  comments: IComment[];
}
const initialMoviesData: IMovieWithComments[] = [
  {
    id: 1,
    title: "Galaxy Quest",
    cover_img_url: "https://placehold.co/500x750/1a202c/ffffff?text=Galaxy+Quest",
    synopsis:
      "The alumni cast of a space opera television series have to play their roles as the real thing when an alien race needs their help.",
    rating: 8.8,
    release_date: new Date(),
    comments: [
      {
        id: 101,
        user: "CinemaFan88",
        comment: "An absolute classic! Hilarious and heartwarming.",
        is_good: true,
        userId: 1,
        created_at: new Date(),
      },
      {
        id: 102,
        user: "SciFiGeek",
        comment: "They perfectly captured the spirit of Star Trek fandom.",
        is_good: true,
        userId: 1,
        created_at: new Date(),
      },
      {
        id: 103,
        user: "CriticX",
        comment: "A bit dated, but still holds up.",
        is_good: false,
        userId: 1,
        created_at: new Date(),
      },
    ],
  },
  {
    id: 2,
    title: "Cybernetic Horizon",
    cover_img_url: "https://placehold.co/500x750/2d3748/ffffff?text=Cybernetic+Horizon",
    synopsis:
      "In a future dominated by AI, a lone hacker discovers a secret that could either liberate humanity or destroy it forever.",
    rating: 9.2,
    release_date: new Date(),
    comments: [
      {
        id: 201,
        user: "FutureIsNow",
        comment: "Mind-bending plot and stunning visuals!",
        is_good: true,
        userId: 1,
        created_at: new Date(),
      },
    ],
  },
  {
    id: 3,
    title: "The Last Alchemist",
    cover_img_url: "https://placehold.co/500x750/4a5568/ffffff?text=The+Last+Alchemist",
    synopsis:
      "A brilliant historian uncovers an ancient map, leading her on a perilous journey to find the legendary Philosopher's Stone.",
    rating: 8.5,
    release_date: new Date(),
    comments: [],
  },
  {
    id: 4,
    title: "Ocean's Whisper",
    cover_img_url: "https://placehold.co/500x750/718096/ffffff?text=Ocean's+Whisper",
    synopsis:
      "A marine biologist forms an unexpected bond with a mysterious deep-sea creature, uncovering a conspiracy that threatens the world's oceans.",
    rating: 9.0,
    release_date: new Date(),
    comments: [
      {
        id: 401,
        user: "DeepDive",
        comment: "Beautiful and thought-provoking.",
        is_good: true,
        userId: 1,
        created_at: new Date(),
      },
    ],
  },
  {
    id: 5,
    title: "Zero Gravity",
    cover_img_url: "https://placehold.co/500x750/a0aec0/000000?text=Zero+Gravity",
    synopsis:
      "When their space station is critically damaged, two astronauts must work together to survive and find a way back to Earth against all odds.",
    rating: 8.7,
    release_date: new Date(),
    comments: [],
  },
  {
    id: 6,
    title: "Forgotten Echoes",
    cover_img_url: "https://placehold.co/500x750/cbd5e0/000000?text=Forgotten+Echoes",
    synopsis:
      "A detective with amnesia must solve his own cold case to uncover the truth about his past and a city-wide corruption scandal.",
    rating: 9.5,
    release_date: new Date(),
    comments: [],
  },
];
const timeAgo = (dateString: Date) => {
  // Basic time ago function for demonstration
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  let interval = seconds / 31536000;
  if (interval > 1) return Math.floor(interval) + " years ago";
  interval = seconds / 2592000;
  if (interval > 1) return Math.floor(interval) + " months ago";
  interval = seconds / 86400;
  if (interval > 1) return Math.floor(interval) + " days ago";
  interval = seconds / 3600;
  if (interval > 1) return Math.floor(interval) + " hours ago";
  interval = seconds / 60;
  if (interval > 1) return Math.floor(interval) + " minutes ago";
  return Math.floor(seconds) + " seconds ago";
};
const MovieCard = ({ movie, onSelectMovie }: { movie: IMovie; onSelectMovie: (movie: IMovie) => void }) => (
  <div
    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-cyan-500/50 transform hover:-translate-y-2 transition-all duration-300 cursor-pointer group"
    onClick={() => onSelectMovie(movie)}>
    <img
      src={movie.cover_img_url}
      alt={`Poster for ${movie.title}`}
      className="w-full h-auto object-cover"
      onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        e.currentTarget.onerror = null;
        e.currentTarget.src = "https://placehold.co/500x750/2d3748/ffffff?text=Image+Not+Found";
      }}
    />
    <div className="p-4">
      <h3 className="text-white text-lg font-bold truncate group-hover:text-cyan-400 transition-colors duration-300">
        {movie.title}
      </h3>
      <p className="text-gray-400 text-sm mt-1">{movie.release_date.getFullYear()}</p>
    </div>
  </div>
);
const Comment = ({ comment }: { comment: IComment }) => (
  <div className="flex items-start space-x-4 p-3 border-b border-gray-700 last:border-b-0">
    <div
      className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
        comment.is_good ? "bg-green-500" : "bg-red-500"
      }`}>
      {comment.is_good ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.085a2 2 0 00-1.736.93L5.5 8m7 2v5m0 0v5m0-5h-5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M10 14H5.236a2 2 0 01-1.789-2.894l3.5-7A2 2 0 018.738 3h4.017c.163 0 .326.02.485.06L17 4m-7 10v5a2 2 0 002 2h.085a2 2 0 001.736-.93l2.5-4m-7-5V9m0 0V4m0 5h5"
          />
        </svg>
      )}
    </div>
    <div className="flex-grow">
      <div className="flex items-center justify-between">
        <p className="font-bold text-cyan-400">{comment.user}</p>
        <p className="text-xs text-gray-500">{timeAgo(comment.created_at)}</p>
      </div>
      <p className="text-gray-300 mt-1">{comment.comment}</p>
    </div>
  </div>
);

const MovieDetail = ({
  movie,
  onDeselectMovie,
  onAddComment,
}: {
  movie: IMovieWithComments;
  onDeselectMovie: (movie: IMovie) => void;
  onAddComment: (movieId: number, newComment: IComment) => void;
}) => {
  const [newComment, setNewComment] = useState("");
  const [isGood, setIsGood] = useState(true);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newComment.trim() === "") return;

    const commentToAdd: IComment = {
      id: Date.now(), // simple unique id
      userId: 1,
      user: "CurrentUser", // hardcoded for now
      comment: newComment,
      is_good: isGood,
      created_at: new Date(),
    };

    onAddComment(movie.id, commentToAdd);
    setNewComment("");
    setIsGood(true);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-start z-50 p-4 animate-fade-in overflow-y-auto">
      <div className="bg-gray-900 rounded-2xl w-full max-w-4xl flex flex-col">
        <div className="relative flex-shrink-0 flex flex-col md:flex-row">
          {/* Close button */}
          <button
            onClick={() => onDeselectMovie}
            className="absolute top-4 right-4 text-white bg-gray-800 hover:bg-red-600 rounded-full w-10 h-10 flex items-center justify-center transition-colors duration-300 z-10"
            aria-label="Close">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Movie Poster */}
          <img
            src={movie.cover_img_url}
            alt={`Poster for ${movie.title}`}
            className="w-full md:w-1/3 h-auto object-cover rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none"
            onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = "https://placehold.co/500x750/2d3748/ffffff?text=Image+Not+Found";
            }}
          />

          {/* Movie Info */}
          <div className="p-8 flex flex-col">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2">{movie.title}</h2>
            <p className="text-gray-400 mb-4">{movie.release_date.toISOString()}</p>

            <div className="flex items-center mb-6">
              <div className="flex items-center text-yellow-400">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-2xl font-bold text-white">{movie.rating.toFixed(1)}</span>
                <span className="text-gray-400 ml-1">/ 10</span>
              </div>
            </div>

            <h3 className="text-xl font-bold text-cyan-400 mb-2">Synopsis</h3>
            <p className="text-gray-300 leading-relaxed">{movie.synopsis}</p>
          </div>
        </div>

        {/* Comments Section */}
        <div className="border-t border-gray-700 pt-6 mb-4 ml-10">
          <h3 className="text-xl font-bold text-cyan-400 flex items-center">
            Comments
            <span className="ml-2 bg-gray-700 text-cyan-400 text-xs font-semibold px-2.5 py-0.5 rounded-full">
              {movie.comments.length}
            </span>
          </h3>
        </div>
        <div className="p-8 pt-0 max-h-60 overflow-y-auto">
          <div className="flex-grow overflow-y-auto mb-4 bg-gray-800/50 rounded-lg">
            {movie.comments.length > 0 ? (
              movie.comments.map((c) => <Comment key={c.id} comment={c} />)
            ) : (
              <p className="text-gray-400 p-4">No comments yet. Be the first to comment!</p>
            )}
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-shrink-0 mt-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full bg-gray-800 text-white p-3 rounded-lg border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
            placeholder="Add a public comment..."
            rows={3}></textarea>
          <div className="flex justify-between items-center mt-3">
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsGood(true)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                  isGood ? "bg-green-500 text-white" : "bg-gray-700 text-gray-300"
                }`}>
                Like
              </button>
              <button
                type="button"
                onClick={() => setIsGood(false)}
                className={`px-3 py-1 rounded-full text-sm font-semibold transition ${
                  !isGood ? "bg-red-500 text-white" : "bg-gray-700 text-gray-300"
                }`}>
                Dislike
              </button>
            </div>
            <button
              type="submit"
              className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-6 rounded-lg transition">
              Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const MainPage = () => {
  const [movies, setMovies] = useState<IMovieWithComments[] | null>(initialMoviesData);
  const [selectedMovie, setSelectedMovie] = useState<IMovieWithComments | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const handleSelectMovie = (movie: IMovie) => {
    setSelectedMovie(movie);
  };

  const handleDeselectMovie = () => {
    setSelectedMovie(null);
  };

  const handleAddComment = (movieId: number, newComment: IComment) => {
    const updatedMovies = movies.map((movie) => {
      if (movie.id === movieId) {
        const updatedMovie = {
          ...movie,
          comments: [newComment, ...movie.comments], // Prepend new comment
        };
        // Also update the selectedMovie state if it's the one being commented on
        if (selectedMovie && selectedMovie.id === movieId) {
          setSelectedMovie(updatedMovie);
        }
        return updatedMovie;
      }
      return movie;
    });

    setMovies(updatedMovies);
  };

  // Filter movies based on the search term
  const filteredMovies = movies.filter((movie) => movie.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="bg-gray-900 min-h-screen font-sans text-white">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <div className="flex">
            <div className="w-1/3 flex justify-start">
              <button
                onClick={() => navigate("/admin")}
                className="bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded-lg transition w-30">
                Dashboard
              </button>
            </div>
            <div className="w-1/3 flex justify-center">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-600">
                  Movie Rating
                </span>
              </h1>
            </div>
            <div className="w-1/3 flex justify-end">
              <button className="bg-pink-700 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition w-30">
                Logout
              </button>
            </div>
          </div>
          <p className="text-gray-400 mt-2">Click on a movie to see its details</p>

          <div className="mt-8 max-w-xl mx-auto">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search for a movie..."
                className="w-full bg-gray-800 text-white placeholder-gray-500 px-5 py-3 pl-12 rounded-full border-2 border-gray-700 focus:border-cyan-500 focus:outline-none transition"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </header>

        <main>
          {filteredMovies.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
              {filteredMovies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} onSelectMovie={handleSelectMovie} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-bold text-white">No movies found</h2>
              <p className="text-gray-400 mt-2">Try adjusting your search for "{searchTerm}"</p>
            </div>
          )}
        </main>
      </div>

      {/* Show movie detail view if a movie is selected */}
      {selectedMovie && (
        <MovieDetail movie={selectedMovie} onDeselectMovie={handleDeselectMovie} onAddComment={handleAddComment} />
      )}
    </div>
  );
};

export default MainPage;
