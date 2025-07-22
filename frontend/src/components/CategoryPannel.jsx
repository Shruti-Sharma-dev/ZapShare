import { useAuth } from "../context/ContextProvider";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

const CategoryPannel = () => {
  const { category, setCategory, file, setFile, uploadUrl, setUploadUrl } = useAuth();
  const [shouldOpenFilePicker, setShouldOpenFilePicker] = useState(false);
  const fileInputRef = useRef();

  const handleCategoryClick = (cat) => {
    setCategory(cat);
    setShouldOpenFilePicker(true);
  };

  const handleFileChange = async (e) => {
    const selected = e.target.files[0];
    if (selected) {
      setFile(selected);
      uploadToCloudinary(selected);
    }
  };

  const uploadToCloudinary = async (file) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "my_preset");

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/dilw32zzm/${category === "file" ? "raw" : category}/upload`,
        data
      );
      setUploadUrl(res.data.secure_url);
    } catch (error) {
      console.error("Upload error:", error.response?.data || error);
    }
  };

  useEffect(() => {
    if (shouldOpenFilePicker && fileInputRef.current) {
      fileInputRef.current.click();
      setShouldOpenFilePicker(false);
    }
  }, [category, shouldOpenFilePicker]);

  const getAcceptType = () => {
    switch (category) {
      case "video": return "video/*";
      case "audio": return "audio/*";
      case "image": return "image/*";
      case "file":
      default: return "*/*";
    }
  };

  const categoryStyles = {
    video: {
      base: "bg-sky-100 text-sky-700 hover:bg-sky-200",
      active: "bg-gradient-to-r from-sky-500 to-blue-500 text-white"
    },
    audio: {
      base: "bg-emerald-100 text-emerald-700 hover:bg-emerald-200",
      active: "bg-gradient-to-r from-emerald-500 to-green-500 text-white"
    },
    image: {
      base: "bg-violet-100 text-violet-700 hover:bg-violet-200",
      active: "bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white"
    },
    file: {
      base: "bg-amber-100 text-amber-700 hover:bg-amber-200",
      active: "bg-gradient-to-r from-amber-500 to-orange-500 text-white"
    },
  };

  return (
    <div className="w-full max-w-2xl bg-white p-6 rounded-xl shadow-lg">
      <p className="text-xl font-bold text-gray-700 mb-4 tracking-wide text-center">Select File Type</p>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {["video", "audio", "image", "file"].map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategoryClick(cat)}
            className={`py-2 px-4 rounded-lg text-lg capitalize font-semibold shadow-sm transition-all duration-300
              ${category === cat ? categoryStyles[cat].active : categoryStyles[cat].base}`}
          >
            {cat}
          </button>
        ))}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept={getAcceptType()}
        style={{ display: "none" }}
        onChange={handleFileChange}
      />

      {file && (
        <p className="text-sm text-gray-800 mt-4">
          <span className="font-semibold text-orange-500">Selected:</span> {file.name}
        </p>
      )}

      {uploadUrl && (
        <p className="text-sm text-green-600 mt-2 break-words">
          <span className="font-semibold">Uploaded:</span>{" "}
          <a href={uploadUrl} target="_blank" rel="noopener noreferrer" className="underline">
            {uploadUrl}
          </a>
        </p>
      )}
    </div>
  );
};

export default CategoryPannel;
