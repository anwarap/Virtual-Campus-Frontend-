import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { getCategory, createCategory, blockCategory } from "../../api/adminapi";

const ITEMS_PER_PAGE = 10;

const AdminCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [error, setError] = useState("");
  const [open, setOpen] = useState(false);
  const [blockModalOpen, setBlockModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const queryClient = useQueryClient();
  
  const { data: categories, isLoading, isError } = useQuery("categories", getCategory);

  const createMutation = useMutation(createCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      setOpen(false);
      setCategoryName("");
      setError("");
    },
    onError: () => setError("Failed to create category"),
  });

  const blockMutation = useMutation(blockCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
      setBlockModalOpen(false);
      setSelectedCategory(null);
    },
    onError: () => setError("Failed to update category status"),
  });

  const filteredCategories = categories?.data?.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedCategory = categoryName.trim();

    if (!trimmedCategory) {
      setError("Category cannot be empty");
      return;
    }

    const existingCategory = categories?.data?.find(
      (category) => category.name.toLowerCase() === trimmedCategory.toLowerCase()
    );
    
    if (existingCategory) {
      setError("Category already exists");
      return;
    }

    createMutation.mutate({ name: trimmedCategory });
  };

  const handleBlockButton = (category) => {
    setSelectedCategory(category);
    setBlockModalOpen(true);
  };

  const confirmBlockUnblock = () => {
    if (selectedCategory) {
      blockMutation.mutate(selectedCategory._id);
    }
  };

  return (
    <>
      {/* Search and Add Category Button in a single line */}
      <div className="flex justify-between items-center p-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-8 p-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring focus:border-blue-300"
          />
        </div>
        <button
          onClick={() => setOpen(true)}
          className="p-2 text-white rounded-lg bg-[#3447AE]"
        >
          Add Category
        </button>
      </div>

      {/* Add Category Modal */}
      <Dialog open={open} handler={() => setOpen(false)}>
        <DialogHeader>Add Category</DialogHeader>
        <DialogBody>
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-light text-gray-700">
              Category Name
            </label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="mt-1 p-2 block w-full shadow-sm sm:text-sm rounded-md border-gray-300 focus:border-gray-800 focus:ring focus:ring-cyan-200"
            />
            {error && <div className="text-red-600">{error}</div>}
          </form>
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} className="bg-[#3447AE]">
            Add
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Block/Unblock Modal */}
      <Dialog open={blockModalOpen} handler={() => setBlockModalOpen(false)}>
        <DialogHeader>Confirm Action</DialogHeader>
        <DialogBody>
          {selectedCategory && (
            <p>
              Are you sure you want to {selectedCategory.block ? "unblock" : "block"} the category "
              {selectedCategory.name}"?
            </p>
          )}
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={() => setBlockModalOpen(false)}>
            Cancel
          </Button>
          <Button onClick={confirmBlockUnblock} className="bg-[#3447AE]">
            {selectedCategory?.block ? "Unblock" : "Block"}
          </Button>
        </DialogFooter>
      </Dialog>

      {/* Categories Table */}
      <div className="container mx-auto">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-[#3447ae]">
                  Category Name
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-[#3447ae]">
                  Status
                </th>
                <th className="px-4 py-2 border-b-2 border-gray-900 text-left text-[#3447ae]">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {isLoading ? (
                <tr>
                  <td colSpan="3" className="text-center py-4">Loading...</td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan="3" className="text-center py-4 text-red-500">Error fetching data</td>
                </tr>
              ) : (
                paginatedCategories.map((category) => (
                  <tr key={category._id}>
                    <td className="px-4 py-2 border-b border-gray-800">
                      <div className="text-sm sm:text-lg font-serif">{category.name}</div>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800">
                      <span className="text-xs sm:text-sm font-semibold">
                        {category.block ? "Blocked" : "Not Blocked"}
                      </span>
                    </td>
                    <td className="px-4 py-2 border-b border-gray-800">
                      <button
                        className={`rounded-md py-1 px-2 text-white ${
                          category.block ? "bg-green-500" : "bg-red-500"
                        }`}
                        onClick={() => handleBlockButton(category)}
                      >
                        {category.block ? "Unblock" : "Block"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>

          {/* Simplified Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="p-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <span className="p-2 font-semibold">{currentPage}</span>
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="p-2 bg-gray-200 rounded-md disabled:opacity-50"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminCategory;
