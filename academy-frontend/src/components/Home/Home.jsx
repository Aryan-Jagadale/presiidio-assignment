import React from "react";
import { Link } from "react-router-dom";
import main from "../../assets/main.jpg";

const Home = () => {
  return (
    <div className="pt-7">
      <div className="flex-col pl-0 md:pl-7 md:flex md:flex-row">
        <section className="w-full flex items-center justify-center  md:w-1/2 ">
          <div>
            <h1 className="text-4xl text-center font-extrabold md:text-5xl md:text-left">
              Get good properties with Rentify
            </h1>
            <p className="text-base text-center leading-10 mt-3 mb-7 md:text-left">
              Over 8,00,000 users trust us
            </p>

            <div className="text-center md:text-left">
              <button
                type="button"
                className="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              >
                <Link to={"/course"} className="text-base hover:underline">
                  Explore now
                </Link>
              </button>
            </div>
          </div>
        </section>

        <section className="w-full object-contain md:w-1/2">
          <img
            className="w-full h-full hidden md:block"
            src={main}
            alt="hero"
          />
        </section>
      </div>
    </div>
  );
};

export default Home;
