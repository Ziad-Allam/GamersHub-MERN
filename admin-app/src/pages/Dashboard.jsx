import React, { useEffect, useState } from 'react'
import ImageUpload from '../components/ImageUpload';
import { useDispatch, useSelector } from 'react-redux';
import { addBannarImage, deleteBanner, getBannarImages } from '../features/bannar/bannarSlice';
import { toast } from 'react-toastify';

function Dashboard() {
  const [imageFile, setImageFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState("");
  const [imgLoadingState, setImgLoadingState] = useState(false);

  const dispatch = useDispatch()

  function handleUploadBannarImage() {
    dispatch(addBannarImage({ image: uploadedImageUrl })).then(data => {
      if (data.payload.success) {
        dispatch(getBannarImages())
        setImageFile(null)
        toast.success("Bannar uploaded successfully")
      }
    })
  }

  function handleDelete(bannerId) {
    dispatch(deleteBanner(bannerId)).then(data => {
      if (data.payload?.success) {
        dispatch(getBannarImages())
        toast.success("Banner deleted successfully")
      }
    })
  }

  useEffect(() => {
    dispatch(getBannarImages())
  }, [])

  const images = useSelector((state) => state.bannar.bannarImage.images)

  return (
    <div>
      <h1>Upload feature images</h1>
      <ImageUpload
        imageFile={imageFile}
        setImageFile={setImageFile}
        uploadedImageUrl={uploadedImageUrl}
        setUploadedImageUrl={setUploadedImageUrl}
        imgLoadingState={imgLoadingState}
        setImgLoadingState={setImgLoadingState}
        isCurrentStyling={true}
      />

      <button className='bg-blue-600 text-white py-2 px-6 mt-4 mb-8' onClick={handleUploadBannarImage}>Upload</button>

      <div className='grid gap-3'>
        {
          images && images?.length > 0 ?
            images?.map(bannarImage => (
              <div key={bannarImage._id} className='relative overflow-hidden bg-gray-100 rounded-lg shadow-lg group hover:bg-gray-200 transition-all '>
                <img src={bannarImage.image.url} alt="" />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(bannarImage?._id)}
                    className="bg-blue-500 text-white px-6 py-3 rounded-md text-lg">
                    Delete
                  </button>
                </div>
              </div>
            ))
            :
            null
        }
      </div>

    </div>
  )
}

export default Dashboard