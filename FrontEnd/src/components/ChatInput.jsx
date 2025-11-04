import { useRef, useState } from 'react';
import { ChatStore } from '../store/Chatstore.js';
import { Image, Send } from 'lucide-react';
import { X } from 'lucide-react';
import toast from 'react-hot-toast';

const ChatInput = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState("");
  let fileInputref = useRef(null);
  const { sendMessages } = ChatStore();

  function handletextChange(evt) {
    setText(evt.target.value);
  }
  function handleimageChange(evt) {
    let file = evt.target.files[0];
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setImage(reader.result);
    }
  }
  function removeImage() {
    setImage(null);
    fileInputref.current.value = "";
  };
  function handleSubmit(evt) {
    evt.preventDefault();
    const imagedata = fileInputref.current?.files[0];
    sendMessages({text:text.trim(),image:imagedata});
    setText("");
    setImage("");
    fileInputref.current.value = "";
  }
  return (
    <div className='p-4 w-full'>
      {image && (
        <div className="mb-3 flex items-center gap-2">
          <div className="relative">
            <img
              src={image}
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
      <form className='flex items-center gap-2' onSubmit={handleSubmit}>
        <input type="text" name='text' value={text} placeholder="type your message..."
          onChange={handletextChange} className="input input-bordered rounded-md focus:border-1 focus:border-primary w-full" style={{ outline: 'none' }} />

        <label htmlFor="image" className={`p-2 border cursor-pointer hover:border-primary rounded-md ${image ? "text-primary" : "text-gray-400"}`}>
          <Image className='size-7' />
        </label>
        <input type="file" ref={fileInputref} id='image' onChange={handleimageChange} className='hidden' />
        <button type='submit' disabled={!text && !image} className={`p-2 border cursor-pointer hover:border-primary rounded-md ${(image || text)?"text-white" : "text-gray-600"}`}>
          <Send className='size-7' />
        </button>
      </form>

    </div>
  )
}

export default ChatInput