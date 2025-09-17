"use client"

import React from 'react';
import { Upload } from 'lucide-react';

interface ProfilePictureUploadProps {
  profilePicture: File | null;
  onFileChange: (file: File | null) => void;
}

export const ProfilePictureUpload: React.FC<ProfilePictureUploadProps> = ({
  profilePicture,
  onFileChange
}) => {
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    onFileChange(file || null);
  };

  return (
    <div>
      <label className="block text-sm font-medium text-slate-700 mb-4">
        Profile Picture
      </label>
      <div className="flex items-center gap-5 p-4 border border-slate-200 rounded-lg">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center">
          {profilePicture ? (
            <img
              src={URL.createObjectURL(profilePicture)}
              alt="Profile preview"
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <Upload className="w-6 h-6 text-slate-400" />
          )}
        </div>
        <div className="flex-1">
          <input
            type="file"
            accept="image/png,image/jpg,image/jpeg"
            onChange={handleFileUpload}
            className="hidden"
            id="profile-upload"
          />
          <label
            htmlFor="profile-upload"
            className="text-sm text-slate-600 cursor-pointer hover:text-slate-800"
          >
            Click to upload photo, allowed file types: png, jpg, jpeg.
          </label>
        </div>
      </div>
    </div>
  );
};
