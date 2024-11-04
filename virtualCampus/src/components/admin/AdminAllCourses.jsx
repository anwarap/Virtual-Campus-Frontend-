import React, { useState, useEffect }from 'react';
import { useQuery } from "react-query";
import { getCourse } from '../../api/adminapi';

const AdminAllCourses = () => {
  const [isCourse, setIsCourse] = useState(false);
  const [course,setCourse] = useState([]);

  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  console.log(courses, 'coourseseses');

  if (courses?.data?.data && !isCourse) {
    setIsCourse(true);
  }

  useEffect(() => {
    if (courses?.data?.data) {
      const filteredCourses = courses.data.data.filter(course => course.isApproved);
      console.log(filteredCourses,'dfsfsf')
      setCourse(filteredCourses);
    }
  }, [courses]);

  console.log(course,'fsdfsd')
  return (
    <div className="container mx-auto px-4">
      {!isCourse ? (
        <h1 className="text-center">NO COURSES</h1>
      ) : isLoading ? (
        <div className="text-center">Loading...</div>
      ) : isError ? (
        <div className="text-center">Error fetching data</div>
      ) : (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {course.map((course, index) => (
            <div key={index} className="border rounded-lg p-4 shadow-md">
              <img src={course.cover} alt={course.title} className="w-full h-auto rounded-t-lg" />
              <div className="mt-2 text-lg font-serif font-medium">{course.title}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminAllCourses;
