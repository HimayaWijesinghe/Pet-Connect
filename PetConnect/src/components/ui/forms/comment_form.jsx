// src/CommentForm.jsx
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define the validation schema with Zod
const commentSchema = z.object({
  comment: z
    .string()
    .min(3, "Comment must be at least 3 characters")
    .max(300, "Comment cannot exceed 300 characters"),
  email: z
    .string()
    .email("Invalid email format")
    .min(1, "Email is required"),
});

function CommentForm({ userEmail, onCommentSubmit }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(commentSchema), // Apply Zod validation
    defaultValues: {
      email: userEmail
    }
  });

  // const [bob, setBob] = React.useState(null)

  const onSubmit = (data) => {
    onCommentSubmit(data);
    // setBob(data)
    setTimeout(() => reset(), 500); // Clear the form after submission with delay  };
  }

  return (
    <div className="w-full p-4 border-t mt-2">
      {/* <h2 className="text-xl font-bold mb-3">Leave a Comment</h2> */}
      {/* <p className="p-1 text-xs text-center bg-fuchsia-300 w-3/4 mx-auto mb-3">{JSON.stringify(bob)}</p> */}
      <form onSubmit={handleSubmit(onSubmit)} className="px-3 space-y-2">
        {/* Comment Input */}
        <div>
          <textarea
            {...register("comment")}
            className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="3"
            placeholder="Leave a comment..."
          ></textarea>
          {errors.comment && <p className="text-red-500">{errors.comment.message}</p>}
        </div>

        <div className="w-full px-3 flex justify-between">
            <div className="flex items-center gap-1">
                <i class="fas fa-user-circle"></i>
                <span className="text-xs">{userEmail}</span> 
            </div>
            <button
            type="submit"
            className="bg-blue-600 text-white px-5 py-2 flex justify-center items-center rounded-md hover:bg-blue-700"
            >
            <i class="fas fa-paper-plane"></i>
            </button>
        </div>

        {/* Submit Button */}
      </form>
    </div>
  );
}

export default CommentForm;