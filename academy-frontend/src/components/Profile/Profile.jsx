import React,{useState} from "react";
import { Link } from "react-router-dom";
import Button from "../Button/Button";
import { RiDeleteBin7Fill } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import {
  loadUser,
  //updateProfilePicture,
} from "../../redux/actions/user";
import { removeFromPlaylist } from "../../redux/actions/profile";
import { useEffect } from "react";
import { toast } from "react-hot-toast";


const Profile = ({ user }) => {
  const dispatch = useDispatch();



  const { message: subscriptionMessage, error: subscriptionError } =
    useSelector((state) => state.subscription);

  const { message, error } = useSelector((state) => state.profile);

  const removeFromPlaylistHandler = async (id) => {
    console.log(id);
    await dispatch(removeFromPlaylist(id));
    dispatch(loadUser());
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
    if (subscriptionMessage) {
      toast.success(subscriptionMessage);
      dispatch({ type: "clearMessage" });
      dispatch(loadUser());
    }

    if (subscriptionError) {
      toast.error(subscriptionError);
      dispatch({ type: "clearError" });
    }
  }, [dispatch, error, message, subscriptionMessage, subscriptionError]);

  return (
    <div className="bg-white-700 w-full py-10 px-10">
      <div>
        <div className="sm:flex space-x-7 md:items-start items-center">
          <div className="mb-4 h-72 bg-indigo-300 rounded-md border-indigo-500 flex items-center justify-center">
            <img
              className="rounded-md h-full md:w-80 object-contain"
              src={user.avatar.url}
              alt={user.name}
            />
          </div>
          <div>
            <h1 className="text-black-100 text-4xl font-bold my-2">
              {user.name}
            </h1>
            <p className="text-black-100 text-lg tracking-wide mb-1 md:max-w-lg">
              <strong>Email Id</strong>: {user.email}
            </p>

            <p className="text-black-100 text-lg tracking-wide mb-6 md:max-w-lg">
              <strong>Created At</strong>: {user.createdAt.split("T")[0]}
            </p>

            <Link to={"/updateprofile"}>
              <Button text={"Update profile"} />
            </Link>
            <Link to={"/changepassword"}>
              <Button text={"Change password"} />
            </Link>
          </div>
        </div>
      </div>

      <div className="">
        <h2 className="mt-5 text-black-100 text-2xl font-semibold text-center">
          Saved Widgets
        </h2>

        {user.playlist.length > 0 && (
          <div className="mt-2 grid ms:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 sm:space-x-4">
            {user.playlist.map((element, i) => (
              <div
                key={i}
                className="mx-auto mt-11 w-80 transform overflow-hidden rounded-lg shadow-md duration-300 hover:scale-105 hover:shadow-lg"
              >
                <img
                  className="h-48 w-full object-cover object-center border p-1"
                  src={element.poster}
                  alt={element.course}
                />
                <div className="p-4">
                  <p className="mb-2 text-base dark:text-gray-300 text-gray-700 invisible">
                    Product description goes here.
                  </p>
                  <div className="flex items-center">
                    <p
                    style={{
                      cursor:"not-allowed"
                    }}
                      className="inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-sm leading-tight rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                    >
                      See details
                    </p>

                    <button
                      className="ml-auto text-base font-medium text-red-500 cursor-pointer"
                      onClick={() => removeFromPlaylistHandler(element.course)}
                    >
                      <RiDeleteBin7Fill />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {user.playlist.length === 0 && (
          <div className="flex items-center justify-center m-5 h-[25vh]">
            No Properties Saved
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
