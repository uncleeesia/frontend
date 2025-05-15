import { useState } from "react";
import { FiUpload } from "react-icons/fi";

const MAX_FILE_SIZE_MB = 25;
const ALLOWED_TYPES = ["image/png", "image/jpeg", "application/pdf"];

const UploadCert = () => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    const isValidType = ALLOWED_TYPES.includes(selected.type);
    const isValidSize = selected.size / (1024 * 1024) <= MAX_FILE_SIZE_MB;

    if (!isValidType) {
      alert("Only PNG, JPG, or PDF files are allowed.");
      return;
    }

    if (!isValidSize) {
      alert(`File must be less than ${MAX_FILE_SIZE_MB}MB.`);
      return;
    }

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleClear = () => {
    setFile(null);
    setPreviewUrl("");
  };

  const handleSubmit = async () => {
    if (!file) return;

    setIsSubmitting(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("https://your-api-endpoint.com/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      alert("File uploaded successfully!");
      handleClear();
    } catch (error) {
      console.error("Upload error:", error);
      alert("Error uploading file.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
      <div className="w-full max-w-md bg-gray-900 rounded-xl p-6 shadow-lg flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold text-white text-center">Upload & Preview</h1>
        <p className="text-sm text-gray-400 text-center">
          Upload a PNG, JPG, or PDF file (max {MAX_FILE_SIZE_MB}MB)
        </p>

        <label className="w-full bg-gray-700 hover:bg-gray-600 transition-all text-white p-3 rounded-xl cursor-pointer flex items-center justify-center gap-2 text-sm">
          <FiUpload className="text-lg" />
          {file ? file.name : "Choose File"}
          <input
            type="file"
            accept=".png, .jpg, .jpeg, .pdf"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {previewUrl ? (
          <div className="w-full bg-gray-800 p-3 rounded-md">
            {file?.type === "application/pdf" ? (
              <iframe
                src={previewUrl}
                title="PDF Preview"
                className="w-full h-64 rounded"
              />
            ) : (
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-contain rounded"
              />
            )}

            <div className="flex gap-2 mt-4">
              <button
                onClick={handleClear}
                className="w-1/2 py-2 bg-red-600 hover:bg-red-700 text-white rounded"
              >
                Clear
              </button>
              <button
                onClick={handleSubmit}
                disabled={!file || isSubmitting}
                className={`w-1/2 py-2 text-white rounded ${
                  !file || isSubmitting
                    ? "bg-gray-600 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        ) : (
          <p className="text-sm text-gray-500 text-center w-full">
            No file selected.
          </p>
        )}
      </div>
    </div>
  );
};

export default UploadCert;