import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addFeatureImages, getFeatureImages } from "../../srore/common-slice";
import ProductImageUpload from "./image-upload";
import { Button } from "../../components/ui/button";

function AdminDashboard() {
    const [imageFile, setImageFile] = useState(null);
    const [uploadedImageUrl, setUploadedImageUrl] = useState("");
    const [imageLoadingState, setImageLoadingState] = useState(false);
    const dispatch = useDispatch();
    const { featureImageList } = useSelector((state) => state.commonFeature);
    console.log(uploadedImageUrl, "uploadedImageUrl");

    function handleUploadFeatureImage() {
        dispatch(addFeatureImages(uploadedImageUrl)).then((data) => {
          if (data?.payload?.success) {
            dispatch(getFeatureImages());
            setImageFile(null);
            setUploadedImageUrl("");
          }
        });
      }

      useEffect(() => {
        dispatch(getFeatureImages());
      }, [dispatch]);

      console.log(featureImageList, "featureImageList");



    return (
        <div>
        <h1>AdminDashboard</h1>
        <ProductImageUpload 
        imageFile={imageFile}
        setImageFile={setImageFile} 

        uploadImageUrl={uploadedImageUrl} 
        setUploadImageUrl={setUploadedImageUrl}

        imageLoadingState={imageLoadingState}
        setImageLoadingState={setImageLoadingState}

        />
          <Button onClick={handleUploadFeatureImage} className="mt-5 w-full">
        Upload
      </Button>
      <div className="flex flex-col gap-4 mt-5">
        {featureImageList && featureImageList.length > 0
          ? featureImageList.map((featureImgItem) => (
              <div className="relative">
                <img
                  src={featureImgItem.image}
                  className="w-full h-[300px] object-cover rounded-t-lg"
                />
              </div>
            ))
          : null}
        </div>
        </div>
      );
}

export default AdminDashboard;