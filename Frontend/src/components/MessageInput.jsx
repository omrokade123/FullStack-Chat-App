import React,{useRef, useState} from 'react'
import { useChatStore } from '../store/useChatStore';
import { Send,Image, X} from 'lucide-react';
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text,setText] = useState("");
  const [imagePreview,setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore();

  const handleImageChange = (e) =>{
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
        toast.error("Please select an image file");
        return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
        setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleSendMessage = async (e) =>{
     e.preventDefault();
    if (!text.trim() && !imagePreview) return;

    try {
      await sendMessage({
        text: text.trim(),
        image: imagePreview,
      });

      // Clear form
      setText("");
      setImagePreview(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <div className='border-t border-base-300 bg-base-100 p-2 sm:p-4 w-full'>
        {imagePreview && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-base-300
              flex items-center justify-center hover:bg-base-400 transition"
              type="button"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full input input-bordered rounded-lg input-sm sm:input-md focus:outline-none focus:ring-2 focus:ring-primary"
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
            className={`btn btn-circle btn-sm sm:btn-md flex items-center justify-center transition
                     ${imagePreview ? "text-emerald-500" : "text-zinc-400 hover:text-zinc-300"}`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} className="sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md btn-circle flex items-center justify-center hover:bg-primary transition"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput