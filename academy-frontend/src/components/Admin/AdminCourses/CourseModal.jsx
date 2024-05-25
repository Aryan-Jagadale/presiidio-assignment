import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";



const PropertieModal = ({
  setShowModal,
  id,
  deleteButtonHandler,
  addImageHandler,
  courseTitle,
  lectures,
  setImages,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [imgPrev, setImgPrev] = useState("");

  const changeVideoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setImgPrev(reader.result);
      setImage(file);
    };
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!title || !description || !image || !imgPrev) {
      return toast.error("Please fill all fields!");
    }

    const newImage = {
      title,
      description,
      imgPrev,
      url: imgPrev,
    };

    addImageHandler(e, id, title, description, image).then(() => {
      setImages((prevImages) => [...prevImages, newImage]);
      setShowModal(false);
    });
  };

  console.log(lectures);
  return (
    <>
      <div className="min-w-full justify-center items-center flex overflow-x-auto overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="modal-dialog-scrollable relative w-auto my-6 mx-auto max-w-5xl">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
              <h3 className="text-3xl font-semibold">{courseTitle}</h3>
            </div>
            <div className="relative p-6 flex-auto">
              <div className="grid grid-cols-[500px_minmax(900px,_1fr)_100px]">
                <section>
                  <div>
                    <h4 className="text-sky-800">{id}</h4>
                  </div>
                  <br />
                  <h3>Images</h3>
                  {lectures.length > 0 ? (
                    <Carousel className="mr-4 border-2 border-black " showThumbs={false} showStatus={false}>
                      {lectures.map((item, i) => (
                        <div key={i}>
                          <img
                            className="flex justify-center items-center h-[22rem] w-full object-cover"
                            src={item.video.url}
                            alt={item.title}
                          />
                          <p className="legend">{item.title}</p>
                        </div>
                      ))}
                    </Carousel>
                  ) : (
                    <p>No images available</p>
                  )}
                </section>

                <section>
                  <h2>Add more images</h2>
                  <div>
                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        type="text"
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      />
                    </div>

                    <div className="mb-6">
                      <input
                        accept="image/*"
                        required
                        type={"file"}
                        className="form-control block w-[50%] px-4 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        onChange={changeVideoHandler}
                      />
                    </div>

                    {imgPrev && (
                      <div className="flex items-center justify-center bg-[#2a2a2a] w-[28rem] min-h-[200px] mt-5 mb-5 p-3 rounded">
                        <img src={imgPrev} alt="" className="h-[25vh] border" />
                      </div>
                    )}

                    <button
                      className="text-blue-500 background-transparent border-blue-500 font-bold uppercase px-6 py-6 hover:font-bold text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="submit"
                      onClick={submitHandler}
                    >
                      Upload
                    </button>
                  </div>
                </section>
              </div>
            </div>
            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
    </>
  );
};

export default PropertieModal;
