import { socialLinks } from "../../constant/links";

const Footer = () => {
  const section = [
    { header: "home", links: [{ text: "services" }] },
    { header: "product", links: [{ text: "coach" }] },
    { header: "about us", links: [{ text: "number" }] },
    {
      header: "privacy & terms",
      links: [{ text: "term" }, { text: "privacy" }],
    },
  ];

  return (
    <div className="h-[300px] w-full bg-[#D8D8D8] mt-4 p-4 bottom-[0%] ">
      <div className="flex justify-center gap-x-10 m-8 ">
        <div className="flex flex-col gap-y-4 ">
          <b className="text-4xl text-[#E94823]">EXERZISE</b>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore
            facilis, inventore facere dicta voluptatum.
          </p>
          <div className="flex gap-x-3">
            {socialLinks.map((el, index) => (
              <img
                key={index}
                src={el.url}
                className="h-8 cursor-pointer hover:scale-110 transition"
              />
            ))}
          </div>
          Privacy Policy | © 2024 Exerzise
        </div>
        <div className="flex gap-x-10">
          {section.map((el, index) => (
            <div className="flex flex-col " key={index}>
              <div className="text-xl text-red-500 mb-2" key={index}>
                {el.header}
              </div>
              {el.links.map((el, index) => (
                <div
                  className="cursor-pointer hover:text-white transition"
                  key={index}
                >
                  {el.text}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
