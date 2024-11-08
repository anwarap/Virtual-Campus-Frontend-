import React, { useEffect, useState } from "react";
import TeacherHeader from "./TeacherHeader";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { IoIosClose, IoMdStar } from "react-icons/io";
import { RiDragDropLine } from "react-icons/ri";
import { toast } from "react-toastify";
import { addCourse, getCategory } from "../../api/teacherapi";
import { useQuery } from "react-query";
import axios from "axios";
import Loader from "../common/Loader";
import { FaTrashAlt } from 'react-icons/fa';
import DeleteModal from "../common/DeleteModal";


const AddCourse = () => {
  const [courseDetails, setCourseDetails] = useState({
    title: "",
    level: "",
    category: "",
    description: "",
    price:0,
    instructor:"",
    cover: "",
    preview: "",
    lessons: [],
  });


  const [initailcompleted, setIntialCompleted] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [lesson, setLesson] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [selectedContent, setSelectedContent] = useState({title:'',content:null});
  const [uploaded,setuploaded]=useState(false);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [deleteIndex, setDeleteIndex] = useState(null);

  const navigate = useNavigate();

  const { isTeacher } = useSelector((state) => state.auth);
  const { data: categories, isLoading } = useQuery("categories", getCategory);


  useEffect(() => {
    if (!isTeacher) {
      navigate("/teacher/signin");
    }
  }, []);

  const handleDrop = async (e) => {
    e.preventDefault();
    console.log(e);
    const dropeedFile = e.dataTransfer.files;
    setLesson(dropeedFile[0]);
  };

  const handleInputChange = async (e) => {
    const selectedFile = e.target.files?.[0];
    setLesson(selectedFile || null);
  };

  const uploadVideo = async () => {
    if (lesson && selectedContent.title) {
      setLoading(true);
      const data = new FormData();
      data.append("file", lesson);
      data.append("upload_preset", "video_preset");
      data.append("folder", "lessons");

      try{
        const cloudName = "dtbdvdr57"
        const api = `https://api.cloudinary.com/v1_1/${cloudName}/${"video"}/upload`;
        const res = await axios.post(api,data);
        const {secure_url} = res.data;
        

        setSelectedContent({ ...selectedContent, content:secure_url});
        setLoading(false);
        setuploaded(true);
        setModalOpen(false);
          

      }catch (error) {
        setLoading(false);
        console.log(error,'error');
        if (axios.isAxiosError(error)) {
          toast(error?.response?.data?.message);
        } else {
          toast("An unexpected error occurred");
        }
      }
      console.log(data);
    }else{
      toast.error("Fill the Fields");
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const trimmedTitle = courseDetails.title.replace(/\s+/g, "");
    const trimmedLevel = courseDetails.level.replace(/\s+/g, "");
    const trimmedCategory = courseDetails.category.trim();
    const trimmedDescription = courseDetails.description.trim();
    const trimmedPrice = courseDetails.price

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
    if(trimmedPrice<=0){
      toast.error("Price is required");
      return;
    }
    if (!courseDetails.cover) {
      toast.error("cover image is required");
      return;
    }
    if (!courseDetails.preview) {
      toast.error("preview video is required");
      return;
    }
    setIntialCompleted(true);
    console.log(courseDetails)
  };
  useEffect(() => {
    if (uploaded) {
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        lessons: [...prevDetails.lessons, selectedContent]
        
      }));
      setuploaded(false); 
      setLesson(null);
      setSelectedContent({title:'',content:null});

    }
  }, [uploaded, selectedContent]);

  const TeacherId =isTeacher?.teacherData?._id;
  console.log(TeacherId,'dfsfsfsf')

  
  console.log(courseDetails,'courseDetails')
  const handleCourse=async()=>{
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('title', courseDetails.title);
      formData.append('level', courseDetails.level);
      formData.append('category', courseDetails.category);
      formData.append('description', courseDetails.description);
      formData.append('price', courseDetails.price);
      formData.append('instructor',TeacherId)
      formData.append('cover', courseDetails.cover);
      formData.append('preview', courseDetails.preview);
      formData.append('lessons', JSON.stringify(courseDetails.lessons));

      const result = await addCourse(formData);
      console.log(result,'result')

      if (result?.status) {
        setIsUploading(false);
        navigate("/teacher/courseDetails")
        
      } else {
        setIsUploading(false);
        toast.error('Failed to add the course');
      }
    } catch (error) {
      setIsUploading(false);
      console.error('Error adding course:', error);
      toast.error('An error occurred while adding the course');
    }
  }

  const confirmDelete = () => {
    if (deleteIndex !== null) {
      setCourseDetails((prevDetails) => ({
        ...prevDetails,
        lessons: prevDetails.lessons.filter((_, i) => i !== deleteIndex),
      }));
      setDeleteIndex(null);
    }
  };
 
  return (
    <>
      <TeacherHeader />
      {initailcompleted ? (
        <section>
          <div className="flex flex-col md:flex-row items-center md:justify-between pt-5">
    <div className="w-full md:w-auto text-center md:text-left md:pl-10">
      <h1 className="text-2xl font-semibold">Lessons</h1>
    </div>
    <div className="mt-4 md:mt-0">
      <button
        className="rounded-md border py-3 px-5 text-white"
        style={{ backgroundColor: "#3447AE" }}
        onClick={() => {
          setModalOpen(true);
          setuploaded(false);
        }}
      >
        Add Lessons
      </button>
    </div>
  </div>

          <div className="flex flex-col md:flex-row h-full pt-5 px-4 gap-5">
            {/* Lesson List */}
    <div className="w-full md:w-1/3 max-h-[75vh]  p-4 rounded-md overflow-hidden">
      <h1 className="text-xl font-semibold mb-3">List Of Lessons:</h1>
      <div className="overflow-y-auto h-full">
        {courseDetails.lessons.map((les, index) => (
          <div key={index} className="flex items-center gap-4 mb-3">
            <div
              className="flex-1 flex items-center bg-blue-900/70 rounded-md py-2 px-3 cursor-pointer"
              onClick={() => setSelectedLesson(les.content)}
            >
              <p className="text-white text-sm font-medium">{les.title}</p>
            </div>
            <FaTrashAlt
              className="h-5 w-5 text-red-500 hover:text-red-700 cursor-pointer"
              onClick={() => setDeleteIndex(index)}
            />
          </div>
        ))}
      </div>
      </div>

          {/* Video Section */}
    <div className="w-full md:flex-1 pr-3">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-md overflow-hidden">
        <video
          className="w-full h-full object-cover"
          src={selectedLesson}
          controls
        ></video>
      </div>

      <div className="flex justify-center pt-4">
        {isUploading ? (
          <Loader />
        ) : (
          <button
            className="rounded-md border py-3 px-5 text-white"
            style={{ backgroundColor: "#3447AE" }}
            onClick={handleCourse}
          >
            Save Course
          </button>
        )}
      </div>
    </div>

            {modalOpen ? (
              <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-30 flex items-center justify-center">
                <div className="p-8 max-w-2xl mx-auto rounded-lg">
                  <div className="relative p-4 w-full max-w-2xl max-h-full">
                    <div className="relative rounded-lg shadow bg-blue-900 dark:bg-blue-600">
                      <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t gap-1 dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-white">
                          Upload Your Lesson Here
                        </h3>
                        <button
                          type="button"
                          disabled={loading}
                          className="end-2.5 text-gray-400 bg-transparent hover:bg-blue-500/30 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-blue-500/30 dark:hover:text-white"
                          onClick={() => {
                            setModalOpen(false);
                            setLesson(null);
                            setSelectedContent({
                              content: "",
                              title: "",
                            });
                          }}
                        >
                          <svg
                            className="w-3 h-3"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 14 14"
                          >
                            <path
                              stroke="currentColor"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                            />
                          </svg>
                          <span className="sr-only">Close modal</span>
                        </button>
                      </div>
                      {/* <!-- Modal body --> */}
                      <div className="p-4 md:p-5 text-start">
                        <div className="space-y-4">
                          <div>
                            <label
                              htmlFor=""
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Lesson Title
                            </label>
                            <input
                              type="text"
                              className="w-full bg-gray-50 text-gray-900 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white border border-gray-300 px-3 py-2 rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
                              placeholder="Enter lesson title"
                              onChange={(e) =>
                                setSelectedContent({
                                  ...selectedContent,
                                  title: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <label
                              htmlFor=""
                              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                            >
                              Your Content
                            </label>
                            <div
                              id="drop-area"
                              className="bg-gray-50 text-center border px-30 py-20 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                              onDrop={handleDrop}
                              onDragOver={(e) => e.preventDefault()}
                            >
                              {loading ? (
                                <div className="flex justify-center">
                                  <div
                                    role="status"
                                    className="flex flex-col items-center gap-3"
                                  >
                                    <svg
                                      aria-hidden="true"
                                      className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-300 fill-blue-600 font-extrabold"
                                      viewBox="0 0 100 101"
                                      fill="none"
                                      xmlns="http://www.w3.org/2000/svg"
                                    >
                                      <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                      />
                                      <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                      />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                    <p>Uploading...</p>
                                  </div>
                                </div>
                              ) : lesson ? (
                                <div className="flex items-center justify-between gap-3 bg-blue-800 px-4 py-2 rounded-lg">
                                  <p>{lesson?.name}</p>

                                  {!selectedContent.content && (
                                    <button
                                      className=""
                                      onClick={() => setLesson(null)}
                                    >
                                      <IoIosClose
                                        size={24}
                                        className="hover:text-red-600 font-bold "
                                      />
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <label
                                  htmlFor="file-input"
                                  className="h-full cursor-pointer"
                                >
                                  <b className="text-gray-400 mb-3 flex items-center">
                                    <RiDragDropLine size={60} /> Drag & drop
                                    your file here or click to select
                                  </b>
                                  <input
                                    type="file"
                                    name="file-input"
                                    accept="video/*"
                                    className=""
                                    //  value={files[0].name}
                                    id="file-input"
                                    onChange={handleInputChange}
                                  />
                                </label>
                              )}
                            </div>
                          </div>

                          <div className="mt-2">
                            <button
                              type="button"
                              className="w-full flex justify-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800  disabled:bg-blue-700/30"
                              onClick={uploadVideo}
                              disabled={!!selectedContent.content || loading}
                            >
                              {loading ? (
                                <div
                                  role="status"
                                  className="flex items-center gap-2"
                                >
                                  <svg
                                    aria-hidden="true"
                                    className="w-4 h-4 text-gray-200 animate-spin-slow-10 dark:text-gray-300 fill-red-600 font-extrabold"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="currentColor"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="currentFill"
                                    />
                                  </svg>
                                  <span className="sr-only">Loading...</span>
                                  <p className="">Uploading...m</p>
                                </div>
                              ) : (
                                "Upload Content"
                              )}
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="text-end py-2 px-4">
                        <button
                          className="text-white bg-red-800 hover:bg-red-800/80 px-4 py-1 rounded"
                          disabled={loading}
                          onClick={() => {
                            setModalOpen(false);
                            setLesson(null);
                          }}
                        >
                          Close
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className=""></div>
            )}
          </div>
        </section>
      ) : (
        <section className="w-full  flex flex-col items-center justify-center overflow-hidden">
  <div className="text-center mb-6 mt-8">
    <h1 className="text-2xl font-semibold">Course Details</h1>
  </div>

  <div className="flex flex-col md:flex-row items-center justify-center gap-8 w-full max-w-screen-lg px-4">
    <form
      onSubmit={handleSubmit}
      className="w-full grid grid-cols-1 md:grid-cols-2 gap-6"
      style={{ maxHeight: "75vh", overflowY: "auto" }}
    >
      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Title
        </label>
        <input
          type="text"
          name="title"
          placeholder="Enter course title"
          value={courseDetails.title}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              title: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Level
        </label>
        <select
          name="level"
          value={courseDetails.level}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              level: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="" disabled>
            --Select Course Level--
          </option>
          <option value="1">Beginner</option>
          <option value="2">Intermediate</option>
          <option value="3">Advanced</option>
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Category
        </label>
        <select
          name="category"
          value={courseDetails.category}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              category: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          <option value="">--Select Category--</option>
          {categories?.data?.map((cat) => (
            <option key={cat._id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Description
        </label>
        <input
          type="text"
          name="description"
          placeholder="Enter course description"
          value={courseDetails.description}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              description: e.target.value,
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Price
        </label>
        <input
          type="number"
          name="price"
          placeholder="Enter the Price"
          value={courseDetails.price}
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              price: Number(e.target.value),
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Cover Image
        </label>
        <input
          type="file"
          name="cover"
          accept="image/*"
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              cover: e.target.files[0],
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
          Preview Video
        </label>
        <input
          type="file"
          name="preview"
          accept="video/*"
          onChange={(e) =>
            setCourseDetails({
              ...courseDetails,
              preview: e.target.files[0],
            })
          }
          className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full  dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
      </div>

      <div className="col-span-full flex justify-center mt-4">
        <button
          type="submit"
          className="rounded-md bg-blue-600 py-2 px-6 text-white"
        >
          Next
        </button>
      </div>
    </form>
  </div>
</section>

      )}
      {deleteIndex !== null && (
        <DeleteModal
          onConfirm={confirmDelete}
          onClose={() => setDeleteIndex(null)}
        />
      )}
    </>
  );
};

export default AddCourse;
