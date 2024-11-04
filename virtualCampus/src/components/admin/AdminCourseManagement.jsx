import React, { useState, useEffect } from 'react';
import { useQueryClient, useQuery } from "react-query";
import { getCourse } from '../../api/adminapi';
import { useNavigate } from 'react-router-dom';


const AdminCourseManagement = () => {
  const [isCourse, setIsCourse] = useState(false);
  const [pending, setPending] = useState(false);
  const [pendingCourses, setPendingCourses] = useState([]);
  const navigate = useNavigate();

  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  console.log(courses, 'courses');

  useEffect(() => {
    if (courses?.data?.data) {
      setIsCourse(true);
      const filteredPendingCourses = courses.data.data.filter(course => !course.isApproved);
      setPendingCourses(filteredPendingCourses);
      setPending(filteredPendingCourses.length > 0);
    }
  }, [courses]);

  const handleCourseClick = (id) => {
    navigate(`/admin/courses/${id}`);
  };
  return (
    <div className="container mx-auto px-4">
      {!isCourse ? (
        <h1 className="text-center">NO COURSES</h1>
      ) : isLoading ? (
        <div className="text-center">Loading...</div>
      ) : isError ? (
        <div className="text-center">Error fetching data</div>
      ) : (
        <div>
          <h2 className="text-center text-xl font-bold mb-4">
            {pending ? "Pending Courses" : "No Pending Courses"}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pendingCourses.map((course, index) => (
              <div key={index}
               className="border rounded-lg p-4 shadow-md"
               onClick = {()=>handleCourseClick(course._id)}
               >
                <img src={course.cover} alt={course.title} className="w-full h-auto rounded-t-lg" />
                <div className="mt-2 text-lg font-serif font-medium">{course.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCourseManagement
