import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { createCourse } from "../../../redux/actions/admin";

const CreateCourse = () => {
  const dispatch = useDispatch();
  const { error, message } = useSelector((state) => state.admin);
  const { user } = useSelector(
    (state) => state.user
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [createdBy, setCreatedBy] = useState(user?.name);
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [imagePrev, setImagePrev] = useState("");

 
 

  const categories = [
    "Alcove studio apartment",
    "Bachelor apartment",
    "Basement",
    "Classic six"
  ];

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    //console.log("Stated sending data");
    if (!title || !address || !description || !category || !createdBy) {
      return toast.error("Please fill all fields!");
    }
    if (title.length < 4) {
      return toast.error("Title is small!");
      
    }
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("title", title);
    myForm.append("address", address);
    myForm.append("description", description);
    myForm.append("category", category);
    myForm.append("createdBy", createdBy);
    myForm.append("file", image);
    dispatch(createCourse(myForm));
    //console.log("Create course Form");
    //console.log("My FOrm", myForm);
  };


  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message]);

  return (
    <div className="flex items-center justify-center my-5 min-h-screen">
      <div className="block p-6 rounded-lg bg-white w-[70%]">
        {/*Image prev */}
        {imagePrev && (
          <div className="flex items-center justify-center bg-[#2a2a2a] min-h-[200px] mt-5 mb-5 p-3 rounded">
            <img src={imagePrev} alt={title} className="w-1/2 object-cover" />
          </div>
        )}

        {/*Create course Form */}
        <div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Title*"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Address*"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Description*"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              placeholder="Owner name*"
              value={createdBy}
              onChange={(e) => setCreatedBy(e.target.value)}
              readOnly
            />
          </div>

          <div className="form-group mb-6">
            <select
              className="form-select appearance-none
      block
      w-full
      px-3
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              aria-label="Default select example"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option selected>Categories</option>
              {categories.map((item) => {
                return (
                  <option key={item} value={item}>
                    {item}
                  </option>
                );
              })}
            </select>
          </div>

          {/*Image prev */}
          <div className="w-full mb-6">
            <label className="flex justify-center w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none">
              <span className="flex items-center space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6 text-gray-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium text-gray-600">
                  Drop image to Attach*
                </span>
              </span>

              <input
                type="file"
                name="file"
                className="hidden"
                accept="image/*"
                required
                onChange={changeImageHandler}
              />
            </label>
          </div>

          <button
            type="submit"
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
            onClick={submitHandler}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateCourse;
