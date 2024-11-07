import React, { useState,useEffect } from 'react';
import { useQuery } from "react-query";
import { getCourse } from '../../api/adminapi';
import { useNavigate } from 'react-router-dom';

const UserCourses = () => {
    const [course,setCourse] = useState([]);

    const navigate = useNavigate();

    const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  console.log(courses,'sfjsfsdf')

    
  useEffect(() => {
    if (courses?.data?.data) {
      const filteredCourses = courses.data.data.filter(course => course.isApproved);
      console.log(filteredCourses,'dfsfsf')
      setCourse(filteredCourses);
    }
  }, [courses]);

  const handleCourseClick = (id) => {
    navigate(`/user/courseDetails/${id}`);
  };


  return (
    <div className="container mx-auto px-4">
    { isLoading ? (
      <div className="text-center">Loading...</div>
    ) : isError ? (
      <div className="text-center">Error fetching data</div>
    ) : (
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {course.map((course, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md"
          onClick = {()=>handleCourseClick(course._id)}>
            <img src={course.cover} alt={course.title} className="w-full h-auto rounded-t-lg " />
            <div className="mt-2 text-lg font-serif font-medium text-center">{course.title}</div>
          </div>
        ))}
      </div>
    )}
  </div>
);
}

export default UserCourses
