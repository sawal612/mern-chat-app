import React from 'react'
import { useState, useRef } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { Image, Send, X } from 'lucide-react'

const MessageInput = () => {
  const [message, setMessage] = useState('')
  const [imagePreview, setImagePreview] = useState(null)
  const fileInputRef = useRef(null)
  const { sendMessage } = useChatStore();
  const [text, setText] = useState('')

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader(); // we create a new FileReader instance to read the file
      reader.onload = () => setImagePreview(reader.result); // when the file is read, we set the image preview to the result. .result() is a property of the FileReader instance that contains the file data as a base64 encoded string
      reader.readAsDataURL(file); // we read the file as a data URL so that we can display it in an img tag
    }
  }
  const removeImage = () => {
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = null; // we reset the file input value to null so that the user can select the same file again if they want to
    }
  }
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim() && !imagePreview) return; // if the message is empty and there is no image, we don't send the message
    const messageData = {
      text: text.trim(),
      image: imagePreview,
    };
    await sendMessage(messageData);
    setText('');
    removeImage();
  }

  return (
    <div className='p-4 w-full '>
      {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-base-300
              flex items-center justify-center"
              type="button"
            >
              <X className="size-3" />
            </button>
          </div>
        </div>
      )}
      {/* Message input field */}
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <div className="flex-1 flex gap-2">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleImageChange}
          />

          <button
            type="button"
            className={`hidden sm:flex btn btn-circle
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={20} />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm btn-circle"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput