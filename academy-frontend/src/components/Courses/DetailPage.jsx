import { FaPaperclip } from "react-icons/fa";
import {  useSelector } from "react-redux";

const DetailPage = ({ id, creator,sellerData }) => {

const {  courses } = useSelector(
    (state) => state.course
  );
  const exportData = () => {
    const jsonString = `data:text/json;chatset=utf-8,${encodeURIComponent(
      JSON.stringify(sellerData)
    )}`;
    const link = document.createElement("a");
    link.href = jsonString;
    link.download = "data.json";

    link.click();
  };

  console.log("courses",courses);
  

  return (
    <div className="px-4 py-4">
      <div className="">
        <h3 className="text-base font-semibold leading-7 text-gray-900">
          Seller Information
        </h3>
      </div>
      <div className="mt-6 border-t border-gray-100">
        <dl className="divide-y divide-gray-100">
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Full name
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {creator + " " + sellerData?.lastName}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Seller id
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {id || "---"}
            </dd>
          </div>
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Email address
            </dt>
            <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
              {sellerData?.email}
            </dd>
          </div>
          
          <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">
              Properties
            </dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul
                role="list"
                className="divide-y divide-gray-100 rounded-md border border-gray-200"
              >
              {
                courses.filter((item)=>item.createdBy === creator).map((item)=>{
                    return (
                        <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                        <div className="flex w-0 flex-1 items-center">
                          <FaPaperclip />
                          <div className="ml-4 flex min-w-0 flex-1 gap-2">
                            <span className="truncate font-medium">
                              {item?.title}
                            </span>
                            <span className="flex-shrink-0 text-gray-400">{item?.category}</span>
                          </div>
                        </div>
                        <div className="ml-4 flex-shrink-0">
                          <button
                          onClick={exportData}
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            Download
                          </button>
                        </div>
                      </li>
                    )
                })
              }
               
               
              </ul>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
};

export default DetailPage;
