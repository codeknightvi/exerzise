import { coverImg } from "../../constant/images";

const HomeCover = () => {
  return (
    <div className="relative overflow-hidden w-full h-[calc(100vh-16px-80px)]">
      <img
        className="w-full object-cover"
        src={coverImg.img}
        alt={coverImg.alt}
      />
      <div className="center-axis-x text-8xl">Welcome to Exerzise</div>
    </div>
  );
};

export default HomeCover;
