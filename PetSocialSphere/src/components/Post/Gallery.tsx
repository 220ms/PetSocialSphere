import { useState } from "react";

const Gallery = ({ images }: { images: string[] }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex gap-2 relative">
      {/* Render first 3 images */}
      {images.slice(0, 3).map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery image ${index + 1}`}
          className="w-20 h-20 object-cover rounded-md"
        />
      ))}

      {/* "More" button appears right after the last image if there are more than 3 */}
      {images.length > 3 && (
        <div
          className="w-20 h-20 flex items-center justify-center bg-gray-200 text-gray-800 font-bold rounded-md cursor-pointer"
          onClick={() => setShowModal(true)}
        >
          +{images.length - 3}
        </div>
      )}

      {/* Modal for showing all images */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <button
              className="mb-4 bg-red-500 text-white p-2 rounded"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
            <div className="grid grid-cols-2 gap-2">
              {images.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Full image ${index + 1}`}
                  className="w-full h-auto object-cover rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
