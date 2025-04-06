import React, { useState } from "react";

const PetCard = ({ pet, onLike, onComment }) => {
  const [comment, setComment] = useState("");
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const handleSubmitComment = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (comment.trim()) {
      onComment(pet.id, comment);
      setComment("");
      setShowCommentInput(false);
    }
  };

  const handleLikeClick = (e) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onLike(pet.id);
  };

  const handleCommentClick = (e) => {
    e.stopPropagation();
    setShowCommentInput(!showCommentInput);
  };

  return (
    <div className="bg-white rounded-lg shadow-md border border-gray-200 cursor-pointer relative group w-[350px] h-[500px] flex flex-col overflow-hidden">
      {/* Header - Fixed height */}
      <div className="bg-gradient-to-r from-blue-500 to-blue-800 text-white p-4 flex justify-between items-center h-16 shrink-0">
        <span className="font-bold text-xl truncate">{pet.name || "Unnamed Pet"}</span>
        <span className="text-sm opacity-90 whitespace-nowrap">{pet.timeAgo || "Just now"}</span>
      </div>

      {/* Location - Fixed height */}
      <div className="py-2 px-4 text-sm text-gray-500 border-b border-gray-200 flex items-center h-10 shrink-0">
        <span className="mr-1.5">📍</span> 
        <span className="truncate">{pet.location || "Unknown Location"}</span>
      </div>

      {/* Image - Fixed height */}
      <div className="w-full h-[220px] shrink-0 overflow-hidden">
        <img
          src={pet.image || "/api/placeholder/350/220"}
          alt={pet.name || "Pet"}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Story - Fixed height with overflow handling */}
      <div className="p-4 text-sm text-gray-800 leading-relaxed h-[120px] shrink-0 overflow-hidden">
        {pet.story ? (
          <div className="h-full flex flex-col">
            <p className="line-clamp-3 flex-grow">{pet.story}</p>
            <span className="text-blue-500 cursor-pointer font-semibold transition-colors hover:text-blue-700 hover:underline mt-1">
              See More
            </span>
          </div>
        ) : (
          <p className="text-gray-500">No story available.</p>
        )}
      </div>

      {/* Actions - Fixed height */}
      <div className="flex border-t border-gray-200 py-3 px-4 justify-between mt-auto h-16 shrink-0">
        <div
          className={`flex items-center cursor-pointer transition-colors duration-200 text-sm ${
            isLiked ? "text-blue-500" : "text-gray-500"
          }`}
          onClick={handleLikeClick}
        >
          <span className={`mr-2 text-lg ${isLiked ? "fas fa-thumbs-up" : "far fa-thumbs-up"}`}>👍</span>
          <span>{pet.likes || 0}</span>
        </div>
        <div
          className="flex items-center text-gray-500 cursor-pointer transition-colors duration-200 hover:text-blue-500 text-sm"
          onClick={handleCommentClick}
        >
          <span className="mr-2 text-lg">💬</span>
          <span>{pet.comments || 0}</span>
        </div>
        <div className="flex items-center text-gray-500 cursor-pointer transition-colors duration-200 hover:text-blue-500 text-sm">
          <span className="mr-2 text-lg">↗️</span>
          <span>{pet.shares || 0}</span>
        </div>
      </div>

      {/* Comment Form - Overlays at bottom when shown, doesn't affect card height */}
      {showCommentInput && (
        <form
          className="py-3 px-4 border-t border-gray-200 flex bg-blue-50 absolute bottom-0 left-0 right-0 h-16 z-10"
          onSubmit={handleSubmitComment}
          onClick={(e) => e.stopPropagation()}
        >
          <input
            type="text"
            placeholder="Write a comment..."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="flex-1 py-2 px-4 border border-gray-200 rounded-full outline-none text-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500 focus:ring-opacity-20"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white border-none rounded-full py-2 px-4 ml-2 cursor-pointer font-semibold transition-colors duration-200 hover:bg-blue-700"
          >
            📤
          </button>
        </form>
      )}
    </div>
  );
};

export default PetCard;