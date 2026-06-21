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
    <div className='border-t border-base-300 bg-gradient-to-t from-base-100 to-base-100/95 p-3 sm:p-4 w-full shadow-lg'>
        {imagePreview && (
        <div className="mb-3 flex items-center gap-3">
          <div className="relative group">
            <img
              src={imagePreview}
              alt="Preview"
              className="w-16 sm:w-20 h-16 sm:h-20 object-cover rounded-xl border-2 border-primary/30 group-hover:border-primary/60 transition-all duration-300"
            />
            <button
              onClick={removeImage}
              className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-red-500 hover:bg-red-600
              flex items-center justify-center transition-all duration-300 shadow-lg"
              type="button"
            >
              <X className="size-4 text-white" />
            </button>
          </div>
        </div>
      )}

      <form onSubmit={handleSendMessage} className="flex items-end gap-2">
        <div className="flex-1 flex gap-2 items-center">
          <input
            type="text"
            className="w-full input input-bordered rounded-xl input-sm sm:input-md focus:outline-none focus:ring-2 focus:ring-primary/50 bg-base-200 hover:bg-base-200/80 transition-all duration-300"
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
            className={`btn btn-circle btn-sm sm:btn-md flex items-center justify-center transition-all duration-300 ${
              imagePreview 
                ? "btn-success text-white hover:shadow-lg hover:shadow-success/30" 
                : "btn-ghost hover:bg-base-200"
            }`}
            onClick={() => fileInputRef.current?.click()}
          >
            <Image size={18} className="sm:size-5" />
          </button>
        </div>
        <button
          type="submit"
          className="btn btn-sm sm:btn-md btn-circle btn-primary flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-primary/30"
          disabled={!text.trim() && !imagePreview}
        >
          <Send size={22} />
        </button>
      </form>
    </div>
  )
}

export default MessageInput