import React, { useState } from "react";
import TeacherHeader from "../../components/teacher/TeacherHeader";
import AddCourse from "../../components/teacher/AddCourse";
import { useNavigate,Link } from "react-router-dom";

const TeacherDash = () => {
  const [add,setAdd] = useState(false);

  const navigate = useNavigate();
  const handleButton=()=>{
    setAdd(true);
    navigate('/teacher/add-course')
  };
  
  return (
    <>
      <section >
        <TeacherHeader />
        <div className="text-2xl  w-full mt-10 ml-6">
          <h1 className=" text-2lg font-bold m-4">Welcome Teacher,</h1>
        </div>
        <div className="flex justify-end pr-16">
          <button className="rounded-md border  py-3 px-5  text-white " type="submit" style={{ backgroundColor: "#3447AE" }}
          onClick={handleButton}>
            Add Course
          </button>
        </div>
      </section>
      {add && <AddCourse/>}
    </>
  );
};

export default TeacherDash;
