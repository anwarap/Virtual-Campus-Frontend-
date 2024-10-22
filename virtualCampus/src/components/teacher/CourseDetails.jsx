import React, { useState, useEffect } from 'react';
import TeacherHeader from './TeacherHeader';
import { useQuery } from 'react-query';
import { getCourse } from '../../api/adminapi';
import { useSelector } from 'react-redux';
import { IoMdCloudyNight } from 'react-icons/io';

const CourseDetails = () => {
  const { isTeacher } = useSelector((state) => state.auth);
  const teacherId = isTeacher?.teacherData?._id;

  const [teacherCourses, setTeacherCourses] = useState([]);


  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  const hee = courses?.data?.data[0]?.instructor;
const instructorId = hee 
console.log(instructorId);

  useEffect(() => {
    if (courses?.data?.data && teacherId) {
      const filteredCourses = courses.data.data.filter(course => course.instructor._id === teacherId);
      console.log(filteredCourses,'filele')
      setTeacherCourses(filteredCourses);
    }else{
      console.log('hehehehje')
    }
  }, [courses, teacherId]);

  console.log(teacherCourses,'fsf')

  return (
    <>
      <TeacherHeader />
      <div className="bg-red-700 text-2xl w-full flex justify-center">
        <h1 className="mt-5 text-lg sm:text-2xl font-bold m-4 underline">MY COURSES</h1>
      </div>
      <div className="container mx-auto p-4">
        {isLoading && <div className="text-center">Loading...</div>}
        {isError && <div className="text-center text-red-600">Error loading courses</div>}
        {!isLoading && teacherCourses.length === 0 && (
          <div className="text-center text-gray-500">No courses available</div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {teacherCourses.map(course => (
            <div key={course._id} className="border rounded-lg p-4 shadow-md">
              <h2 className="text-xl font-semibold">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.category}</p>
              <p className="text-sm text-gray-600">{course.level}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default CourseDetails;
