import { useEffect, useRef } from "react";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import { Skeleton } from "../../components/ui/skeleton";
import { FileIcon, UploadCloudIcon, XIcon } from "lucide-react";
import { Button } from "../../components/ui/button";
import axios from "axios";

function ProductImageUpload({
  imageFile,
  setImageFile,
  uploadImageUrl,
  setUploadImageUrl,
  imageLoadingState,
  setImageLoadingState,
  isEditMode,
}) {
  const inputRef = useRef(null);
  console.log(isEditMode);

  function handleChangeImage(event) {
    console.log(event.target.files[0]);
    const selectedFile = event.target.files?.[0];
    console.log(selectedFile);

    if (selectedFile) setImageFile(selectedFile);
  }
  function handleDragOver(event) {
    event.preventDefault();
  }
  function handleDrop(event) {
    event.preventDefault();
    const droppedFile = event.dataTransfer.files?.[0];
    if (droppedFile) setImageFile(droppedFile);
  }

  function handleRemoveChange() {
    setImageFile(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  }

  async function uploadImage() {
    setImageLoadingState(true);
    const data = new FormData();
    data.append("my_file", imageFile);
    const response = await axios.post(
      "http://localhost:3000/upload-image",
      data
    );
    console.log(response);
    if (response?.data?.success) {
      setUploadImageUrl(response.data.result.url);
      setImageLoadingState(false);
    }
  }
  console.log(imageFile);
  useEffect(() => {
    if (imageFile !== null) uploadImage();
  }, [imageFile]);

  return (
    <div className="w-full mx-auto max-w-md mt-4">
      <label className="text-lg font-semibold mb-2 block">upload image</label>
      <div
        onDragOver={handleDragOver}
        onDrag={handleDrop}
        className={`${
          isEditMode ? "opacity-60" : ""
        } border-2 border-dashed rounded-lg p-4`}
      >
        <Input
          type="file"
          id="image-upload"
          className="hidden "
          ref={inputRef}
          onChange={handleChangeImage}
          disabled={isEditMode}
        />

        {!imageFile ? (
          <Label
            htmlFor="image-upload"
            className={`${
              isEditMode ? "cursor-not-allowed" : ""
            } flex flex-col items-center justify-center h-32 cursor-pointer`}
          >
            <UploadCloudIcon className="w-10 h-10 text-muted-foreground mb-2" />
            <span>Drag & drop or click to upload</span>
          </Label>
        ) : imageLoadingState ? (
          <Skeleton className="h-10 bg-gray-100" />
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <FileIcon className="w-8 mr-2 text-primary h-8" />
            </div>
            <p className="text-sm font-medium">{imageFile.name}</p>
            <Button
              variant="gost"
              size="icon"
              className="text-muted-foreground hover:text-foreground"
              onClick={handleRemoveChange}
            >
              <XIcon className="w-4 h-4" />
              <span className="sr-only">Remove File</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductImageUpload;
