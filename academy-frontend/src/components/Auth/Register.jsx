import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../../redux/actions/user";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const [imagePrev, setImagePrev] = useState("");
  const [image, setImage] = useState("");
  const [selected, setSelected] = useState("Buyer");

  const changeImageHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImagePrev(reader.result);
      setImage(file);
    };
  };

  const dispatch = useDispatch();

  const submitHandler = (e) => {
    if (
      !name ||
      !lastName ||
      !email ||
      !password ||
      !selected ||
      !phoneNumber
    ) {
      toast.error("Required all inputs");
      return;
    }
    if (phoneNumber.length !== 10) {
      toast.error("Invalid Phone number!");
      return;
    }

    e.preventDefault();
    // console.log("name", name, lastName, email, password, selected, phoneNumber);

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("lastName", lastName);
    myForm.append("email", email);
    myForm.append("password", password);
    myForm.append("type", selected);
    myForm.append("phoneNumber", phoneNumber);
    myForm.append("file", image);
    if (selected === "Seller") {
      myForm.append("role", "admin");
    }

    dispatch(register(myForm));
  };

  return (
    <section className="md:h-[135vh]">
      <div className="px-6 py-4 h-screen text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <img
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
              className="w-full"
              alt="Sample"
            />
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            {/*Avatar */}
            <div className="flex flex-wrap justify-center">
              <div className="w-6/12 sm:w-4/12 px-4">
                <img
                  src={imagePrev}
                  alt={""}
                  className="shadow rounded-full max-w-full h-auto align-middle border-none"
                />
              </div>
            </div>

            <div className="md:mt-6">
              {/* First Name */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="First Name*"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              {/* Last Name */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Last Name*"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>

              {/*Phone Number */}
              <div className="mb-6">
                <input
                  type="number"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Phone number*"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  required
                  maxLength={10}
                />
              </div>

              {/* Email */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Email Address*"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-6">
                <input
                  type="text"
                  className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                  placeholder="Password*"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {/*Select type */}
              <div className="mb-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="country"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Type
                  </label>
                  <div className="mt-2">
                    <select
                      id="country"
                      name="country"
                      autoComplete="country-name"
                      value={selected}
                      onChange={(e) => setSelected(e.target.value)}
                      // className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6"
                      className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-full"
                    >
                      <option value={"Buyer"}>Buyer</option>
                      <option value={"Seller"}>Seller</option>
                    </select>
                  </div>
                </div>
              </div>

              <main className="flex flex-col items-center justify-center bg-gray-100 font-sans py-5">
                <label
                  htmlFor="dropzone-file"
                  className="mx-auto cursor-pointer flex w-full max-w-lg flex-col items-center rounded-xl border-2 border-dashed border-blue-400 bg-white p-6 text-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-10 w-10 text-blue-500"
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

                  <h2 className="mt-4 text-xl font-medium text-gray-700 tracking-wide">
                    Upload avatar
                  </h2>

                  <p className="mt-2 text-gray-500 tracking-wide">
                    Upload or darg & drop SVG, PNG, JPG or GIF.{" "}
                  </p>

                  <input
                    id="dropzone-file"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={changeImageHandler}
                    required
                  />
                </label>
              </main>

              <div className="text-center mt-5 lg:text-left">
                <button
                  type="button"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={submitHandler}
                >
                  Sign up
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  Have an account?
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                  >
                    {" "}
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
