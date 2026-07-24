import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react';
import { Camera } from 'lucide-react'
import { Mail, MessageSquare, User, LockIcon, Lock,EyeOff,Eye, Loader2 } from 'lucide-react'

const ProfilePage = () => {
    const { authUser, isUpdatingProfile, updateProfile } = useAuthStore()
    const [selectedImg, setSelectedImg] = useState(null);
    const handleImageUpload = async (e) => {
        const file = e.target.files[0]; // we used [0] because e.target.files is an array of files and we want the first file
        // array of files exist because the user can select multiple files at once but we only want the first file
        if (!file) return;
        const reader = new FileReader(); // FileReader is a built-in JavaScript class that allows us to read the contents of files
        reader.readAsDataURL(file); // readAsDataURL is a method of FileReader that reads the contents of the file and returns it as a base64 encoded string
        reader.onload = async () => {
            const base64Img = reader.result; // reader.result is the base64 encoded string of the file
            await updateProfile({ profilePic: base64Img }); // we are sending the base64 encoded string to the server to update the profile picture
            setSelectedImg(base64Img); // we are setting the selected image to the base64 encoded string so that we can show the preview of the image
        };
    }
  return (
    <div className='min-h-screen pt-20'>
      <div className='max-w-2xl mx-auto p-4 py-8' >
        <div className='bg-base-300 rounded-xl p-6 space-y-8'>
          <div className='text-center'>
            <h1 className='text-2xl font-semibold'>Profile</h1>
            <p className='mt-2'>Your Profile Description</p>
          </div>
          {/* Avatar section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <img
                src={selectedImg || authUser.profilePic || "../public/avatar.png"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 "
              />
              <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-base-content hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                `}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </div>
            <p className="text-sm text-zinc-400">
              {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.fullName}</p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>

          <div className="mt-6 bg-base-300 rounded-xl p-6">
            <h2 className="text-lg font-medium  mb-4">Account Information</h2>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <span className="text-green-500">Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfilePage