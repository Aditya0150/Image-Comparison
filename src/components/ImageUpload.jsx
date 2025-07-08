import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X } from 'lucide-react';
import { getImageDimensions, formatFileSize, getFileFormat, generateId } from '../utils/imageUtils';

const ImageUpload = ({ 
  variant, 
  onImageUpload, 
  currentImage, 
  onRemoveImage 
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = async (file) => {
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    setIsLoading(true);
    
    try {
      const dimensions = await getImageDimensions(file);
      const imageData = {
        id: generateId(),
        file,
        url: URL.createObjectURL(file),
        dimensions,
        size: file.size,
        format: getFileFormat(file.name),
        name: file.name
      };
      
      onImageUpload(imageData);
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Error processing image. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  if (currentImage) {
    return (
      <div className="relative group">
        <div className="relative overflow-hidden rounded-xl border-2 border-gray-200 bg-white shadow-md">
          <img
            src={currentImage.url}
            alt={`Variant ${variant}`}
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center">
            <button
              onClick={onRemoveImage}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transform hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
        </div>
        <div className="mt-3 text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
            Variant {variant}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          relative cursor-pointer rounded-xl border-2 border-dashed transition-all duration-300
          ${isDragging 
            ? 'border-blue-500 bg-blue-50' 
            : 'border-gray-300 hover:border-blue-400 hover:bg-gray-50'
          }
          ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}
        `}
      >
        <div className="flex flex-col items-center justify-center py-12 px-6">
          <div className={`mb-4 p-4 rounded-full ${isDragging ? 'bg-blue-500' : 'bg-gray-100'} transition-colors duration-300`}>
            {isLoading ? (
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            ) : (
              <Upload size={32} className={isDragging ? 'text-white' : 'text-gray-400'} />
            )}
          </div>
          
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Upload Variant {variant}
          </h3>
          
          <p className="text-sm text-gray-600 text-center mb-4">
            {isDragging 
              ? 'Drop your image here' 
              : 'Drag and drop an image, or click to browse'
            }
          </p>
          
          <div className="flex items-center space-x-2 text-xs text-gray-500">
            <ImageIcon size={16} />
            <span>PNG, JPG, GIF up to 10MB</span>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isLoading}
      />
    </div>
  );
};

export default ImageUpload;