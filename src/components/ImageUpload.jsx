import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./ImageUpload.css";
import { Upload } from "phosphor-react";

const ImageUpload = () => {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [imageError, setImageError] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const { data, error } = await supabase
          .from("customer_images")
          .select("image_url");

        if (error) throw error;

        setPreviews(data.map((image) => image.image_url));
      } catch (error) {
        console.log("Error fetching images:", error.message);
        console.log(data);
      }
    };
    fetchImages();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Uploading to bucket:", "user_uploads");

    if (!files.length) {
      setImageError("Please upload at least one image.");
      return;
    }

    setUploading(true);
    setImageError("");

    try {
      const uploadPromises = files.map(async (file) => {
        const fileName = `image_${Date.now()}_${file.name}`;
        const filePath = fileName;

        console.log("Uploading file with path:", filePath);

        //Upload to Supabase Storage
        const { data: uploadData, error: uploadError } = await supabase.storage
          .from("user_uploads") //Ensure this is your actual Supabase Storage bucket name
          .upload(filePath, file, { contentType: file.type });

        if (uploadError || !uploadData) {
          console.error("Upload error:", uploadError);
          throw new Error("Upload failed. Check database storage setting.");
        }

        //Retrieve Public URL correctly
        const { data: publicUrlData, error: publicUrlError } = supabase.storage
          .from("user_uploads")
          .getPublicUrl(filePath);

        if (publicUrlError || !publicUrlData?.publicUrl) {
          console.error("Public URL error:", publicUrlError);
          throw new Error(
            "Could not generate a public URL for the uploaded image."
          );
        }
        const publicURL = publicUrlData.publicUrl;
        console.log("Generated Public URL:", publicURL);

        //Save the image URL in the database
        const { error: dbError } = await supabase
          .from("customer_images")
          .insert([{ image_url: publicURL }]);

        if (dbError) {
          console.error("Database insert error:", dbError);
          throw new Error("Failed to insert into customer_images.");
        }
        return publicURL;
      });

      const uploadedImages = await Promise.all(uploadPromises);
      console.log("Images successfully uploaded:", uploadedImages);

      setPreviews(uploadedImages); // Fix broken images
      //Appends new images instead of replacing. Update UI with uploaded images from Supabase
      setFiles([]); // Clear selected files after upload
    } catch (error) {
      console.error("Error uploading images:", error.message);
      setImageError("An error occurred while uploading images.");
    } finally {
      setUploading(false);
    }
  };

  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(selectedFiles);

    console.log("Selected Files:", selectedFiles);
    console.log("Previous Previews Before Update:", previews);

    // Create object URLs for preview
    const newPreviews = selectedFiles.map((file) => URL.createObjectURL(file));
    setPreviews(newPreviews);
    console.log("New Previews After Update:", newPreviews);
  };

  return (
    <>
      <div className="imageSharingContainer">
        <div className="inputFileSectionBackground">
          <h2 className="sharePhotos"># Mi Casa</h2>
          <h2 className="addPhotos">Add Your Photo</h2>
          <input
            type="file"
            id="imageUploads"
            name="imageUploads"
            accept=".jpg, .jpeg, .png, image/*"
            multiple
            onChange={handleFileChange}
          />
          <button
            className="submitBtn"
            onClick={handleSubmit}
            disabled={uploading}
          >
            {uploading ? "Uploading..." : "Submit"}
          </button>
        </div>
      </div>
      <div className="backgroundColor">
        <div className="userUploadItemContainer">
          <div className="imageContainer">
            {previews.map((preview, index) => {
              console.log("Rendering Image:", preview); //Debugging step
              return (
                <img
                  className="userImage"
                  key={index}
                  src={preview}
                  alt={`Preview ${index + 1}`}
                  onError={(e) =>
                    console.error("Image failed to load:", preview)
                  }
                />
              );
            })}
          </div>
        </div>
        {imageError && <div className="error">{imageError}</div>}
      </div>
    </>
  );
};

export default ImageUpload;
