import { imageGallery } from "../../constant/images";

const Gallery = () => {
  return (
    <>
      <div className="container mx-auto px-10 ">
        <div className="flex flex-wrap -m-1  md:-m-2">
          <div className="flex w-1/2 flex-wrap">
            <div className="w-1/2 p-1 md:p-2">
              <img
                src={imageGallery[0].src}
                alt="gallery1"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
              />
            </div>
            <div className=" w-1/2 p-1 md:p-2">
              <img
                src={imageGallery[1].src}
                alt="gallery2"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
              />
            </div>
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery3"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[2].src}
              />
            </div>
          </div>
          <div className="flex w-1/2 flex-wrap">
            <div className="w-full p-1 md:p-2">
              <img
                alt="gallery4"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[3].src}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery5"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[4].src}
              />
            </div>
            <div className="w-1/2 p-1 md:p-2">
              <img
                alt="gallery6"
                className="block h-full w-full rounded-lg object-cover object-center cursor-pointer grayscale hover:grayscale-0 transition"
                src={imageGallery[5].src}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Gallery;
