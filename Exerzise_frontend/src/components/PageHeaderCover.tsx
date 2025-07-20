import { IPageHeaderCover } from "../interfaces/propTypes";

const PageHeaderCover = ({ header, background }: IPageHeaderCover) => {
  return (
    <div className="relative h-[360px]">
      <img
        className="absolute md:left-[50%] md:-translate-x-1/2 grayscale"
        src={background}
        alt=""
      />
      <div className="absolute top-20 left-40 text-black text-8xl">
        {header}
      </div>
    </div>
  );
};

export default PageHeaderCover;
