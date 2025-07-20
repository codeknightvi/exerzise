import { benefitContent } from "../../constant/content";

const Benefits = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center gap-y-2 ">
        <div className="w-[700px] text-center">
          Reprehenderit proident ut consequat labore officia tempor officia id
          minim laboris in duis ex pariatur. Commodo officia laboris velit dolor
          sunt ullamco voluptate Lorem aliquip.
        </div>
        <div>
          <div className="flex items-center ">
            {benefitContent.map((el, index) => (
              <div
                key={index}
                className={`flex flex-col items-center py-3 px-8 ${
                  index === 1 && "border-x-2	"
                }`}
              >
                <img className="w-20 my-2" src={el.icon} />
                <div>{el.content}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Benefits;
