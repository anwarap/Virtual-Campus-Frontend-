import React, { useState, useEffect, Children } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { getCourse } from '../../api/adminapi';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckout from 'react-stripe-checkout'
import StripePage from '../common/StripePage';
import { useSelector } from 'react-redux';
import { createPaymentIntent } from '../../api/userapi';

const CourseDetails = () => {
  const { id } = useParams();
  const [course, setCourse] = useState(null);
  const [clientSecret, setClientSecret] = useState('');
  const [showStripePage, setShowStripePage] = useState(false);
  const [error, setError] = useState(null);
  
  const { data: courses, isLoading, isError } = useQuery('courses', getCourse);
  const { isUser } = useSelector((state) => state.auth);
  console.log(isUser,'sfsf')

  const userID = isUser?.userData ? isUser.userData._id : isUser;
  
  const stripePromise = loadStripe(import.meta.env.VITE_REACT_APP_PUBLISHABLE_KEY);
  // const stripePromise = import.meta.env.VITE_REACT_APP_PUBLISHABLE_KEY

  useEffect(() => {
    if (courses?.data?.data) {
      const selectedCourse = courses.data.data.find(course => course._id === id);
      if (selectedCourse) {
        setCourse(selectedCourse);
      }
    }
  }, [courses, id]);

  const handlePayNow = async () => {
    if (!userID) {
        setError('Please login to make a purchase');
        return;
    }

    try {
        setError(null);
        const response = await createPaymentIntent(id);
        console.log(response, 'paymentIntent response');

        if (response?.clientSecret) {
            setClientSecret(response.clientSecret);
            setShowStripePage(true);
        } else {
            throw new Error('No client secret received');
        }
    } catch (error) {
        setError(error.message || 'Error creating payment. Please try again.');
        console.error('Payment Intent Error:', error);
    }
};


  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  if (isError || !course) {
    return (
      <div className="flex items-center justify-center min-h-screen text-red-600">
        Error fetching course details or course not found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <h1 className="text-2xl font-bold">{course.title}</h1>
          <p className="text-gray-600 mt-2">{course.description}</p>
          {error && (
            <div className="text-red-500 mt-2 p-2 bg-red-50 rounded">
              {error}
            </div>
          )}
        </div>
        
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden">
                {course.preview ? (
                  <video controls src={course.preview} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    Preview not available
                  </div>
                )}
              </div>
              <button
                onClick={handlePayNow}
                className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
              >
                ₹{course.price}
              </button>
            </div>
            {console.log(course,'sd')}
            {showStripePage && clientSecret && (
              <Elements stripe={stripePromise} options={{ clientSecret }}>
                <StripePage
                  clientSecret={clientSecret}
                  bugs={course.price}
                  courseId={course._id}
                  // teacherId={course.tutorId}
                  userId={userID}
                  courseName={course.title}
                />
              </Elements>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;