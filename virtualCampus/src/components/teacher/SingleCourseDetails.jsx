import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { getCourse } from '../../api/adminapi';

const SingleCourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  console.log(courses, 'courses');
  console.log(id,'fsfsf')
  
  useEffect(() => {
    if (courses?.data?.data) {
      const selectedCourse = courses.data.data.find(course => course._id === id);
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [courses, id]);

  if (isLoading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (isError || !course) {
    return <div className="text-center mt-10 text-red-600">Error fetching course details or course not found</div>;
  }

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-2xl font-bold mb-4">Course Details for: {course.title}</h1>
      <div className="border rounded-lg p-4 shadow-md">
        <p className="text-lg mb-2"><strong>Category:</strong> {course.category}</p>
        <p className="text-lg mb-2"><strong>Level:</strong> {course.level}</p>
        <p className="text-lg mb-2"><strong>Price:</strong> ${course.price}</p>
        <p className="text-lg mb-2"><strong>Description:</strong> {course.description}</p>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4 border rounded-lg p-2 shadow-md">
          <h2 className="text-xl font-semibold mb-2">Preview:</h2>
          <video controls src={course.preview} className="w-full h-48 mt-2 rounded-lg" />
        </div>

        <div className="mt-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
          {course.lessons.map((lesson) => (
            <div key={lesson._id} className="border rounded-lg p-2 shadow-md">
              <p className="font-medium">{lesson.title}</p>
              <video controls src={lesson.content} className="w-full h-48 mt-2 rounded-lg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SingleCourseDetails;
