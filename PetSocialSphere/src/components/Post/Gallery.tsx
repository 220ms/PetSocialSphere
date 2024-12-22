interface GalleryProps {
  images: string[];
}

const Gallery: React.FC<GalleryProps> = ({ images }) => {
  return (
    <div className="grid grid-cols-3 gap-2 mt-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Gallery image ${index + 1}`}
          className="w-full h-auto rounded-md"
        />
      ))}
    </div>
  );
};

export default Gallery;
