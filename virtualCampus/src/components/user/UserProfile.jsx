import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useSelector } from 'react-redux';
import { PenSquare } from 'lucide-react';

const UserProfile = () => {
  const [userData, setUserData] = useState(null);
  const { isUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isUser && isUser.userData) {
      setUserData(isUser.userData);
    }
  }, [isUser]);

  const handleEdit = () => {

    console.log('Edit profile clicked');
  };

  const handleLibrary = () => {

    console.log('Library clicked');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-center mb-8">Profile</h1>
        
        <div className="grid md:grid-cols-2 gap-6">

          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col items-center">

              <div className="flex items-center justify-center gap-2 mb-4 w-full">
                <h2 className="text-xl font-bold">
                  {userData?.name || 'User Name'}
                </h2>
                <button 
                  onClick={handleEdit}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <PenSquare className="w-5 h-5 text-gray-600" />
                </button>
              </div>

              <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                <img
                  src="/api/placeholder/128/128"
                  alt="fsfPffdfddrofile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="w-full space-y-2">
                <p className="text-gray-600">
                  Email: {userData?.email || 'email@example.com'}
                </p>
                <p className="text-gray-600">
                  Mobile: {userData?.mobile || '1234567890'}
                </p>
              </div>
            </div>
          </div>


          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-col h-full">
              <button
                onClick={handleLibrary}
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors mb-6"
              >
                Library
              </button>

   
              <div>
                <h2 className="text-xl font-bold mb-4">Completed Course</h2>
                <ul className="space-y-2">
                  <li className="text-gray-600">• web development</li>
                  <li className="text-gray-600">• Designing</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;