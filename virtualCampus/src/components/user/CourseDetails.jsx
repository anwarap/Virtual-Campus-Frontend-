import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from "react-query";
import { getCourse } from "../../api/adminapi";

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  
  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  
  useEffect(() => {
    if (courses?.data?.data) {
      const selectedCourse = courses.data.data.find(course => course._id === id);
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [courses, id]);

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError || !course) {
    return <div className="flex items-center justify-center min-h-screen text-red-600">
      Error fetching course details or course not found
    </div>;
  }
  console.log(course)

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
       
        <div className="p-6">
          <h1 className="text-2xl font-bold">
            {course.title }
          </h1>
          <p className="text-gray-600 mt-2">
            {course.description }
          </p>
        </div>
        

        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
       
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {course.preview ? (
                  <video 
                    controls 
                    src={course.preview} 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    Preview not available
                  </div>
                )}
              </div>
              <button 
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ₹{course.price}
              </button>
            </div>

            
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Chapters</h2>
              <div className="space-y-2">
                  
                {course.lessons?.map((chapter, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    {index + 1}. {chapter.title}
                  </div>
                )) 
                }
              </div>
              
              <div className="mt-6">
                <p className="text-gray-600">For more details about the course:</p>
                <button 
                  className="mt-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                
                >
                  Contact Me
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;