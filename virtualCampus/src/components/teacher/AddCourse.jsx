import React, { useEffect, useState } from "react";
import TeacherHeader from "./TeacherHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addCourse } from "../../api/teacherapi";

const AddCourse = () => {
  const [title, setTitle] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDiscription] = useState("");
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState(null);
  const [initailcompleted, setIntialCompleted] = useState(false);
  const [completed, setCompleted] = useState(false);

  const navigate = useNavigate();

  const { isTeacher } = useSelector((state) => state.auth);
  console.log(isTeacher, "isTeacher");
  console.log(cover);

  useEffect(() => {
    if (!isTeacher) {
      console.log("hehe");
      navigate("/teacher/signin");
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = title.replace(/\s+/g, "");
    const trimmedLevel = level.replace(/\s+/g, "");
    const trimmedCategory = category.replace(/\s+/g, "");
    const trimmedDescription = description.trim();

    if (trimmedTitle.length == 0) {
      toast.error("Title is required");
      return;
    }
    if (trimmedLevel.length == 0) {
      toast.error("Level is required");
      return;
    }
    if (trimmedCategory.length == 0) {
      toast.error("Category is required");
      return;
    }
    if (trimmedDescription.length == 0) {
      toast.error("Description is required");
      return;
    }
    if (!cover) {
      toast.error("cover image is required");
    }
    if (!preview) {
      toast.error("preview video is required");
    }

    setIntialCompleted(true);
    const formData = {
      title,
      level,
      category,
      description,
      cover,
      preview,
    };
    const result = await addCourse(formData);
    if (result?.status) {
      console.log("true");
    }
  };
  return (
    <>
      <TeacherHeader />
      {initailcompleted ? (
       <section>
       <div className="flex justify-center">
         <div>
           <h1 className="text-center text-2xl font-semibold">Lessons</h1>
         </div>
       </div>
     
       <div className="flex flex-col md:flex-row h-full">
         <div className="bg-red-700 w-full md:w-1/3">
           <div className="py-9 pl-12">
             <button
               className="rounded-md border py-3 px-5 text-white"
               type="submit"
               style={{ backgroundColor: "#3447AE" }}
             >
               Add Lessons
             </button>
           </div>
           <div className="pl-12">
           <h1 className="text-xl font-semibold">List Of Lessons:</h1>
           
           </div>
         </div>
         <div className="bg-yellow-500 w-full md:w-2/3">
           <h1>dadada</h1>
         </div>
       </div>
     </section>
     
      ) : (
        <section className="w-full min-h-screen flex flex-col justify-between">
          <div className="flex justify-center">
            <div>
              <h1 className="text-center text-2xl font-semibold">
                Course Details
              </h1>
            </div>
          </div>

          <div className="flex flex-col md:flex-row h-full">
            <div className="flex flex-col justify-center p-5 md:w-1/2">
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                <div>
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Title
                  </label>
                  <input
                    type="text"
                    name="title"
                    placeholder="Enter course title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="level"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Level
                  </label>
                  <input
                    type="text"
                    name="level"
                    placeholder="Enter course Level"
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Category
                  </label>
                  <input
                    type="text"
                    name="category"
                    placeholder="Enter course category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div>
                  <label
                    htmlFor="description"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Description
                  </label>
                  <input
                    type="text"
                    name="description"
                    placeholder="Enter course description"
                    value={description}
                    onChange={(e) => setDiscription(e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="cover"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Cover Image
                  </label>
                  <input
                    type="file"
                    name="cover Image"
                    placeholder="Upload cover image"
                    accept="image/*"
                    onChange={(e) => setCover(e.target.files[0])}
                    className=" bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 "
                  />
                </div>
                <div>
                  <label
                    htmlFor="preview"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Preview Video
                  </label>
                  <input
                    type="file"
                    name="preview"
                    accept="video/*"
                    placeholder="Upload preview video"
                    onChange={(e) => setPreview(e.target.files[0])}
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                </div>
                <div className="flex justify-center mt-8">
                  <button
                    className="rounded-md border py-3 px-5 text-white"
                    type="submit"
                    style={{ backgroundColor: "#3447AE" }}
                  >
                    Next
                  </button>
                </div>
              </form>
            </div>
            <div className="flex justify-center md:w-1/2">
              <img
                src="\5340737.jpg"
                alt=""
                className="w-full md:h-full object-cover"
              />
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default AddCourse;
