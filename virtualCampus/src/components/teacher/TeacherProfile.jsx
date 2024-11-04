import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { PenSquare, Wallet } from 'lucide-react';
import TeacherHeader from './TeacherHeader';

const TeacherProfile = () => {
    const [teacherData, setTeacherData] = useState(null);
    const { isTeacher } = useSelector((state) => state.auth);
    console.log(isTeacher);

    useEffect(() => {
        if (isTeacher) {
            setTeacherData(isTeacher.teacherData);
        }
    }, [isTeacher]);

    const handleEdit = () => {
        console.log("Edit button clicked");
    };

    const handleWallet = () => {
        console.log('Wallet button clicked');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <TeacherHeader />

            <div className="max-w-6xl mx-auto px-4 py-8">
                <h1 className="text-2xl font-bold text-center mb-8">Profile</h1>

                <div className="bg-white rounded-lg shadow-md p-6">
                    <div className="flex flex-col items-center">

                        <div className="flex items-center justify-center gap-2 mb-4 w-full">
                            <h2 className="text-xl font-bold text-center">
                                {teacherData?.name || 'User Name'}
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
                                alt="Profile"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="w-full flex flex-col items-center space-y-2">
                            <p className="text-gray-600">
                                Email: {teacherData?.email || 'email@example.com'}
                            </p>
                            <p className="text-gray-600">
                                Mobile: {teacherData?.mobile || '1234567890'}
                            </p>
                        </div>

                        <button
                            onClick={handleWallet}
                            className="mt-6 flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            <Wallet className="w-5 h-5" />
                            Wallet
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeacherProfile;
