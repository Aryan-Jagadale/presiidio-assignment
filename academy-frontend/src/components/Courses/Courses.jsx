import React, { useCallback } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { Link } from "react-router-dom";
import { getAllCourses } from "../../redux/actions/course";
import { toast } from "react-hot-toast";
import { addToPlaylist } from "../../redux/actions/profile";
import { loadUser } from "../../redux/actions/user";
import Drawer from "../Drawer";
import DetailPage from "./DetailPage";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { server } from "../../redux/store";
import Select from "react-select";

const Course = ({
  views,
  title,
  imageSrc,
  id,
  addToPlaylistHandler,
  creator,
  description,
  lectureCount,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [sellerData, setSellerData] = useState({});
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const handleDrawer = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    const { data } = await axios.get(`${server}/sellerdetails/${creator}`, {
      withCredentials: true,
    });
    // console.log("data",data);
    if (data) {
      setIsOpen(true);
      setSellerData(data?.user);
      return;
    }
  };

  return (
    <div>
      <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
        <div className=" h-[25vh] border-2 relative flex items-end overflow-hidden rounded-xl">
          <img
            src={
              imageSrc ||
              "https://images.unsplash.com/photo-1511556532299-8f662fc26c06?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80"
            }
            alt={title}
            className="h-full w-full object-contain"
          />
        </div>

        <div className="mt-1 p-2">
          <h2 className="text-slate-700">{title}</h2>
          <p className="mt-1 text-sm text-slate-400">
            <bold>{description}</bold>
          </p>

          <p className="mt-1 text-sm text-slate-400">
            <strong>{creator}</strong>
          </p>

          <p className="mt-1 text-sm text-slate-400">{lectureCount} photos</p>

          <p className="mt-1 text-sm text-slate-400">{views} views</p>

          <div className="mt-3 flex items-end justify-between">
            <p
              className="text-lg font-bold text-blue-500 cursor-pointer"
              onClick={handleDrawer}
            >
              I'm interested
            </p>

            <div className="flex items-center space-x-1.5 rounded-lg bg-blue-500 px-4 py-1.5 text-white duration-100 hover:bg-blue-600">
              <button
                className="text-sm"
                onClick={() => addToPlaylistHandler(id)}
              >
                Add to Widgets
              </button>
            </div>
          </div>
        </div>
      </article>

      <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
        <DetailPage id={id} creator={creator} sellerData={sellerData} />
      </Drawer>
    </div>
  );
};

const Courses = () => {
  const [keyword, setKeyword] = useState("");
  const [category] = useState("");
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState([]);
  const { user } = useSelector((state) => state.user);

  const { loading, courses, error, message } = useSelector(
    (state) => state.course
  );

  const transformData = (data) => {
    const options = [];

    data.forEach((item) => {
      options.push({
        value: item._id + "-title",
        label: item.title,
        type: "title",
      });
      options.push({
        value: item._id + "-createdBy",
        label: item.createdBy,
        type: "createdBy",
      });
      options.push({
        value: item._id + "-address",
        label: item.address,
        type: "address",
      });
    });

    return options;
  };

  const options = transformData(courses);

  const filteredCourses = courses.filter(course => {
    // If no options selected, show all courses
    if (selectedOption.length === 0) return true;

    // Check if any selected option matches the course fields
    return selectedOption.some(option => {
      if (option.type === 'title' && course.title === option.label) return true;
      if (option.type === 'createdBy' && course.createdBy === option.label) return true;
      if (option.type === 'address' && course.address === option.label) return true;
      return false;
    });
  });

  // Further filter out courses already in the user's playlist
  const finalFilteredCourses = filteredCourses.filter(
    (course) =>
      !user?.playlist
        .map((item) => item.course)
        .includes(course._id)
  );
  const navigate = useNavigate();

  const addToPlaylistHandler = async (couseId) => {
    if (!user) {
      navigate("/login");
      return;
    }
    await dispatch(addToPlaylist(couseId));
    dispatch(loadUser());
  };

  const debounceFunction = (func, delay) => {
    let timer;
    return function () {
      let self = this;
      let args = arguments;
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(self, args);
      }, delay);
    };
  };

  // eslint-disable-next-line
  const debounceSearch = useCallback(
    debounceFunction(
      (category, keyword) => dispatch(getAllCourses(category, keyword)),
      200
    ),
    []
  );

  const onInputChangeHandler = (e) => {
    setKeyword(e.target.value);
  };

  useEffect(() => {
    //dispatch(getAllCourses());
    debounceSearch(category, keyword);

    if (error) {
      toast.error(error);
      dispatch({ type: "clearError" });
    }

    if (message) {
      toast.success(message);
      dispatch({ type: "clearMessage" });
    }
  }, [dispatch, error, message, keyword, debounceSearch, category]);

  // console.log("err",error);
  return (
    <div>
      <div className="pt-32  bg-white">
        <h1 className="text-center text-2xl font-bold text-gray-800">
          All Properties
        </h1>
      </div>
      <br />
      <div className="mb-6 w-3/4 flex items-center justify-between gap-4 m-auto">
        <input
          type="text"
          className="border-solid border-blue-400 border-2 p-3 outline-none md:text-sm w-1/2"
          placeholder="Search a property"
          value={keyword}
          onChange={onInputChangeHandler}
        />

        <div className="w-1/4">
          <Select
            isMulti
            defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
            placeholder="Filter"
          />
        </div>
      </div>
      <section className="py-10 bg-gray-50">
        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3">
          {finalFilteredCourses.length > 0 ? (
            finalFilteredCourses
              .map((item) => (
                <Course
                  key={item._id}
                  title={item.title}
                  description={item.description}
                  views={item.views}
                  imageSrc={item.poster.url}
                  id={item._id}
                  creator={item.createdBy}
                  lectureCount={item.numOfVideos}
                  addToPlaylistHandler={addToPlaylistHandler}
                  loading={loading}
                />
              ))
          ) : (
            <div>Course not found</div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Courses;
