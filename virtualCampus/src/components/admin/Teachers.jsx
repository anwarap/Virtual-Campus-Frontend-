import React, { useEffect, useState } from "react";
import { getTeachers,blockTeacher } from "../../api/adminapi";
import { useQuery } from "react-query";
import { useDispatch } from "react-redux";
import {openModal} from "../../slice/modelSlice";
import Modal from "../common/Modal";

const Teachers = () => {
  const [teacherData, setTeacherData] = useState([]);
  const [selectedTeacher,setSelectedTeacher] = useState(null);

  const { data: teacherDetails, isLoading } = useQuery("userData", getTeachers);
  useEffect(() => {
    if (teacherDetails) {
      setTeacherData(teacherDetails?.data);
    }
  }, [teacherDetails]);

  const BlockTeacher = async(id)=>{
    const response = await blockTeacher(id);
    if(response?.status == 200){
      setTeacherData((prevData)=>
       prevData.map((teacher)=>{
        if(teacher._id == id){
          return {...teacher,isBlocked: !teacher.isBlocked}
        }
        return teacher;
       })
    )
    }
  }

  const dispatch  = useDispatch();

  const handleBlockButton = (id)=>{
    setSelectedTeacher(id);
    dispatch(openModal());
  }

  const filteredTeacher =   teacherData ?teacherData : [];
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr>
            <th
              className="px-4 py-2 sm:px-6 sm:py-3 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider"
              style={{ color: "#3447ae" }}
            >
              Fullname
            </th>
            <th
              className="px-4 py-2 sm:px-6 sm:py-3 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider"
              style={{ color: "#3447ae" }}
            >
              Email
            </th>
            <th
              className="px-4 py-2 sm:px-6 sm:py-3 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider"
              style={{ color: "#3447ae" }}
            >
              Status
            </th>
            <th
              className="px-4 py-2 sm:px-6 sm:py-3 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider"
              style={{ color: "#3447ae" }}
            >
              Action
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
        {filteredTeacher?.map((user) => (
              <tr key={user.id}>
                <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-800">
                  <div className="text-sm sm:text-lg leading-5 font-serif font-medium">{user.name}</div>
                </td>
                <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-800">
                  <div className="text-sm sm:text-lg leading-5 font-serif font-medium">{user.email}</div>
                </td>
                {user.isBlocked?(
                  <td className={`px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-800 text-green-900 text-sm sm:text-lg leading-5`}>
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                      <span aria-hidden className={`absolute bg-transparent bg-green-400`}></span>
                      <span className="relative text-xs sm:text-sm">Blocked</span>
                    </span>
                  </td>
                ) : (
                  <td className={`px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-800 text-red-900 text-sm sm:text-lg leading-5`}>
                    <span className="relative inline-block px-3 py-1 font-semibold leading-tight">
                      <span aria-hidden className={`absolute bg-transparent bg-red-400`}></span>
                      <span className="relative text-xs sm:text-sm">Not Blocked</span>
                    </span>
                  </td>
                )}
                <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-500 text-sm sm:text-lg leading-5">
                  <button
                    className={`rounded-md py-1 px-2 sm:py-2 sm:px-4 hover:bg-${
                      user.isBlocked ? "green" : "red"
                    }-500 hover:text-black transition-all duration-300 
                  ${
                    user.isBlocked
                      ? "bg-green-500 text-white border-green-500"
                      : "bg-red-500 text-white border-red-500"
                  }`}
                    onClick={() => handleBlockButton(user._id)}
                  >
                    {user.isBlocked ? "Unblock" : "Block"}
                  </button>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      <Modal functionToCall={BlockTeacher} id={selectedTeacher} />

    </div>
  );
};

export default Teachers;
