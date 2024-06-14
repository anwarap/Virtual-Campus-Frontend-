import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Dialog, DialogHeader, DialogBody, DialogFooter } from "@material-tailwind/react";
import { useQueryClient, useQuery, useMutation } from "react-query";
import { getCategory, createCategory } from "../../api/adminapi";

const AdminCategory = () => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: categories, isLoading, isError } = useQuery('categories', getCategory );
  console.log(categories)

  const mutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries('categories');
      setOpen(false);
      setCategoryName('');
    },
    onError: () => {
      setError('Failed to create category');
    }
  }
);

  const handleOpen = () => {
    setOpen(!open);
    setCategoryName('');
    setError('');
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const trimmedCategory = categoryName.trim();
    if (!trimmedCategory) {
      setError('Category cannot be empty');
      return;
    }
    
    const existingCategory = categories?.data?.find(category => category.name === trimmedCategory);
    if (existingCategory) {
      setError('Category already exists');
      return;
    }
  
    mutation.mutate({ name: trimmedCategory });
  }

  return (
    <>
      <div className="flex justify-end pr-16">
        <button onClick={handleOpen} className="p-2 hover:scale-y-110 mt-10 mr-5 text-cyan-50 rounded-lg" style={{ backgroundColor: "#3447AE" }}>Add Category</button>
      </div>

      <Dialog
        open={open}
        handler={handleOpen}
        animate={{
          unmount: { scale: 0.9, y: -100 },
        }}
      >
        <DialogHeader>Add Category</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <label htmlFor="categoryName" className="block text-sm font-light text-gray-700">Category Name</label>
            <input
              type="text"
              id="categoryName"
              name="categoryName"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-gray-800 focus:ring focus:ring-cyan-200 focus:ring-opacity-50"
            />
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={handleOpen}>Cancel</Button>
          <Button onClick={handleSubmit} style={{ backgroundColor: "#3447AE" }}>Add</Button>
        </DialogFooter>
      </Dialog>

      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider" style={{ color: "#3447ae" }}>Category Name</th>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider" style={{ color: "#3447ae" }}>Status</th>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-sm sm:text-base leading-4 tracking-wider" style={{ color: "#3447ae" }}>Action</th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="3" className="text-center">Error fetching data</td>
                </tr>
              ) : (
                categories?.data?.map((category, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 sm:px-6 sm:py-4 border-b border-gray-800">
                      <div className="text-sm sm:text-lg leading-5 font-serif font-medium">{category.name}</div>
                    </td>
                    {category.block?(
                      <td className="px-4 py-2 border-b border-gray-800 text-green-900">
                        <span className="relative inline-block  font-semibold leading-tight">

                      <span aria-hidden className={`absolute bg-transparent bg-red-400`}></span>
                      <span className="relative text-xs sm:text-sm"> Blocked</span>
                        </span>
                    </td>
                    ):(
                      <td className="px-4 py-2 border-b border-gray-800 text-red-900 ">
                        <span className="relative inline-block  font-semibold leading-tight">

                      <span aria-hidden className={`absolute bg-transparent bg-red-400`}></span>
                      <span className="relative text-xs sm:text-sm">Not Blocked</span>
                        </span>
                      </td>
                    
                    )
                    
                    }
                    <td className="px-4 py-2 border-b border-gray-800 text-sm sm:text-lg ">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Block</button>
                      {/* <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded ml-2">Delete</button> */}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
