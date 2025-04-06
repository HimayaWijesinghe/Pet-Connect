import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api';

class CommentService {
  // Get comments for a specific pet
  static async getCommentsByPetId(petId) {
    try {
      const response = await axios.get(`${BASE_URL}/selected-comments/${petId}`);
      console.log('Response from API:', response.data);
      return response.data.comments;
    } catch (error) {
      console.error('Error fetching comments by pet ID:', error);
      throw error;
    }
  }

  // Get all comments
  static async getAllComments() {
    try {
      const response = await axios.get(`${BASE_URL}/all-comments`);
      return response.data;
    } catch (error) {
      console.error('Error fetching all comments:', error);
      throw error;
    }
  }

  // Update createComment to be static
  static async createComment(commentData) {
    try {
      const response = await axios.post(`${BASE_URL}/create-comment`, commentData);
      return response.data;
    } catch (error) {
      console.error('Error creating comment:', error);
      throw error;
    }
  }

  // Edit an existing comment
  static async updateComment(commentId, updatedData) {
    try {
      const response = await axios.put(`${BASE_URL}/update-comment/${commentId}`, updatedData);
      return response.data;
    } catch (error) {
      console.error('Error updating comment:', error);
      throw error;
    }
  }

  // Delete a comment
  static async deleteComment(commentId) {
    try {
      const response = await axios.delete(`${BASE_URL}/delete-comment/${commentId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting comment:', error);
      throw error;
    }
  }
}

export default CommentService;