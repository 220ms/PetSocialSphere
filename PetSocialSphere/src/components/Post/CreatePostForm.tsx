import React, { useState, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getJWT, getUser } from "../../utils/storage";
import { PostCreationResponse } from "../../types/posts";

const CreatePostForm: React.FC = () => {
  const [postContent, setPostContent] = useState<string>("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]); // Store multiple files
  const [dragging, setDragging] = useState<boolean>(false);

  const queryClient = useQueryClient(); // Hook to manage cache

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData): Promise<PostCreationResponse> => {
      const response = await fetch("http://localhost:8000/api/v1/posts", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error creating post");
      }

      return response.json();
    },
    onError: (error) => {
      console.error("Error creating post:", error);
    },
    onSuccess: () => {
      // Clear the form upon successful post creation
      setPostContent("");
      setSelectedFiles([]);

      // Optionally, refetch or invalidate posts query to reload all posts
      queryClient.invalidateQueries(["posts"]); // Invalidate the posts cache so it will refetch
    },
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();

    if (!postContent) {
      alert("Please fill in all fields");
      return;
    }

    const jwt = getJWT();
    const user = getUser();

    if (!jwt || !user) {
      alert("User or JWT not found in localStorage");
      return;
    }

    const formData = new FormData();
    formData.append("content", postContent);
    formData.append("userId", user._id); // Assuming `user._id` is the user ID
    formData.append("jwt", jwt); // Add the JWT to the request
    selectedFiles.forEach((file) => {
      formData.append("images", file); // Use "images" as the field name for multer
    });

    mutate(formData);
  };

  // Handle drag events
  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const files = e.dataTransfer.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles((prevFiles) => [...prevFiles, ...fileArray]);
    }
  };

  // Handle file selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files ? Array.from(e.target.files) : [];
    setSelectedFiles((prevFiles) => [...prevFiles, ...files]);
  };

  // Remove a selected file
  const handleRemoveFile = (file: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((f) => f !== file));
  };

  return (
    <div className="p-6 w-full max-w-4xl bg-white rounded-lg shadow-lg transition-all duration-500 ease-in-out">
      <h2 className="text-xl font-bold mb-4">Create a New Post</h2>
      <form
        onSubmit={handleSubmit}
        encType="multipart/form-data"
        className="flex flex-col"
      >
        <textarea
          className="w-full p-2 border border-gray-300 rounded mb-4 min-h-[150px]"
          placeholder="What's on your mind?"
          name="content"
          value={postContent}
          onChange={(e) => setPostContent(e.target.value)}
          required
        />

        {/* File upload section with drag-and-drop */}
        <div
          className={`relative mb-4 p-4 text-center rounded-md ${
            dragging ? "bg-gray-500" : "bg-gray-600"
          } text-white cursor-pointer hover:bg-gray-700 transition-all duration-200`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="absolute inset-0 opacity-0 cursor-pointer"
            name="images"
            multiple
          />
          {selectedFiles.length > 0 ? (
            <span>
              {selectedFiles.length}{" "}
              {selectedFiles.length === 1 ? "file" : "files"} selected
            </span>
          ) : (
            <span>
              {dragging ? "Drop the files here" : "Upload Files or Drag & Drop"}
            </span>
          )}
        </div>

        {/* Carousel for displaying images */}
        <div className="mb-4 overflow-x-auto flex gap-4 max-w-full">
          {selectedFiles.length > 0 ? (
            <div className="flex gap-4">
              {selectedFiles.map((file, index) => (
                <div key={index} className="relative w-32 h-32 flex-shrink-0">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Selected Preview ${index + 1}`}
                    className="w-full h-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(file)}
                    className="absolute top-0 right-0 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                  >
                    <span className="text-xs">X</span>
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No images selected</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded"
        >
          {isPending ? "Posting..." : "Post"}
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
