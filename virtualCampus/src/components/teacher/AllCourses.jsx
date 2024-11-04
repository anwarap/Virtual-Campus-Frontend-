import React, { useState, useEffect } from 'react';
import TeacherHeader from './TeacherHeader';
import { useQuery } from 'react-query';
import { useSelector } from 'react-redux';
import { getCourse } from '../../api/adminapi';
import { useNavigate } from 'react-router-dom';


const AllCourses = () => {
    const { isTeacher } = useSelector((state) => state.auth);
    const teacherId = isTeacher?.teacherData?._id;
    const [teacherCourses, setTeacherCourses] = useState([]);
    const navigate = useNavigate();

    const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  console.log(courses,'sfjsfsdf')

  
  useEffect(() => {
    if (courses?.data?.data && teacherId) {
      const filteredCourses = courses.data.data.filter(course => course.instructor === teacherId && course.isApproved);
      console.log(filteredCourses,'dfsfsf')
      setTeacherCourses(filteredCourses);
    }
  }, [courses, teacherId]);

  const handleCourseClick = (id) => {
    navigate(`/teacher/courseDetails/${id}`);
  };

  return (
    <>
  <TeacherHeader />
  <div className="text-2xl w-full flex justify-center">
    <h1 className="mt-5 text-lg sm:text-2xl font-bold m-4 underline">MY COURSES</h1>
  </div>
  <div className="container mx-auto p-4">
    {isLoading && <div className="text-center">Loading...</div>}
    {isError && <div className="text-center text-red-600">Error loading courses</div>}
    {!isLoading && teacherCourses.length === 0 && (
      <div className="text-center text-gray-500">No courses available</div>
    )}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {teacherCourses.map((course,index) => (
         <div key={index}
         className="border rounded-lg p-4 shadow-md"
         onClick = {()=>handleCourseClick(course._id)}
         >
          <img
            src={course.cover}
            alt={course.title}
            className="w-full h-40 object-cover rounded"
          />
          <h2 className="text-lg font-semibold mt-2">{course.title}</h2>
        </div>
      ))}
    </div>
  </div>
</>
  );
}

export default AllCourses
