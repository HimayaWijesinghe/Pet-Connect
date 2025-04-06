import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useDropzone } from 'react-dropzone';
import useSessionStore from '../../../store/sessionStore';
import { createLostPet, updateLostPet } from '../../../server/lostPetApi'; // Update the import path
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../../../firebase";

// Updated Zod schema to include all validations
const petSchema = z.object({
  name: z.string().min(1, 'Name is required').max(50, 'Name must be 50 characters or less'),
  type: z.string().min(1, 'Type is required'),
  age: z.number().min(0, 'Age cannot be negative').max(30, 'Age seems unrealistic'),
  breed: z.string().min(1, 'Breed is required'),
  color: z.string().min(1, 'Color is required'),
  location: z.string().min(1, 'Location is required'),
  story: z.string().min(10, 'story must be at least 10 characters'),
  gender: z.string().refine(val => ['Male', 'Female', 'Other'].includes(val), {
    message: 'Gender must be Male, Female, or Other'
  }),
  likes: z.number().optional(),
  image: z.string().optional(),
});

const PetForm = ({ initialData = null, onSubmitSuccess }) => {
  const activeEmail = useSessionStore((state) => state.activeEmail);
  const isEditMode = !!initialData;

  const [imageUrl, setImageUrl] = useState(initialData?.image || null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(petSchema),
    defaultValues: initialData || {
      name: '', type: '', age: '', breed: '', color: '', location: '',
      story: '', gender: '', likes: 0, image: '',
    },
  });

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { 'image/*': ['.jpeg', '.jpg', '.png', '.gif'] },
    maxFiles: 1,
    onDrop: (acceptedFiles) => {
      const file = acceptedFiles[0];
      setUploadedFile(file);
      setImageUrl(URL.createObjectURL(file));
    },
  });

  const uploadImageToFirebase = async (file) => {
    if (!file) return null;
    const storageRef = ref(storage, `pet_images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    return new Promise((resolve, reject) => {
      uploadTask.on('state_changed', null, reject, async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve(downloadUrl);
      });
    });
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      setError(null);

      let imageUrlToSave = imageUrl;
      if (uploadedFile) {
        imageUrlToSave = await uploadImageToFirebase(uploadedFile);
      }

      const formData = { ...data, email: activeEmail, image: imageUrlToSave, likes: initialData?.likes || 0 };
      let result;

      if (isEditMode) {
        const petId = Number(initialData.pId) || initialData._id;
        formData.pId = petId;
        result = await updateLostPet(petId, formData);
      } else {
        result = await createLostPet(formData);
      }

      if (onSubmitSuccess) await onSubmitSuccess(result);
      reset();
      setImageUrl(null);
      setUploadedFile(null);
    } catch (error) {
      console.error('Submission error:', error);
      setError(error.message || 'Failed to save pet data. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-8 text-gray-800 border-b pb-4">
        {isEditMode ? 'Edit Pet Profile' : 'Add New Pet'}
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Name Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pet Name</label>
          <input
            {...register('name')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter pet's name"
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
          )}
        </div>

        {/* Two-Column Grid for Type, Breed, Age, Color, Gender */}
        <div className="grid grid-cols-2 gap-6">
          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <input
              {...register('type')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="e.g., Dog, Cat"
            />
            {errors.type && (
              <p className="mt-1 text-sm text-red-600">{errors.type.message}</p>
            )}
          </div>

          {/* Breed */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Breed</label>
            <input
              {...register('breed')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pet's breed"
            />
            {errors.breed && (
              <p className="mt-1 text-sm text-red-600">{errors.breed.message}</p>
            )}
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Age</label>
            <input
              {...register('age', { valueAsNumber: true })}
              type="number"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pet's age"
            />
            {errors.age && (
              <p className="mt-1 text-sm text-red-600">{errors.age.message}</p>
            )}
          </div>

          {/* Color */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
            <input
              {...register('color')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter pet's color"
            />
            {errors.color && (
              <p className="mt-1 text-sm text-red-600">{errors.color.message}</p>
            )}
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <select
              {...register('gender')}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && (
              <p className="mt-1 text-sm text-red-600">{errors.gender.message}</p>
            )}
          </div>
        </div>

        {/* Location Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <input
            {...register('location')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter last known location"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Story Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pet's Story</label>
          <textarea
            {...register('story')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Describe your pet and circumstances"
          />
          {errors.story && (
            <p className="mt-1 text-sm text-red-600">{errors.story.message}</p>
          )}
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Pet Image</label>
          <div
            {...getRootProps()}
            className={`w-full p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-all ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <input {...getInputProps()} />
            {imageUrl ? (
              <div className="mt-2">
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="max-h-64 mx-auto rounded-lg object-cover shadow-sm"
                />
                <p className="mt-2 text-sm text-gray-600">Click or drag to replace image</p>
              </div>
            ) : (
              <div>
                <p className="text-gray-600 font-medium">Drop an image here</p>
                <p className="text-sm text-gray-500">or click to select one (JPG, PNG, GIF)</p>
              </div>
            )}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 ${
            isSubmitting 
              ? 'bg-blue-400 cursor-not-allowed' 
              : 'bg-blue-600 hover:bg-blue-700'
          } text-white rounded-lg transition-all font-medium text-lg shadow-md`}
        >
          {isSubmitting 
            ? 'Saving...' 
            : isEditMode 
              ? 'Update Pet Profile' 
              : 'Add Pet'
          }
        </button>
      </form>
    </div>
  );
};

export default PetForm;