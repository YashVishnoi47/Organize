import React, { startTransition, useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { allCategories, createCatagory } from "@/lib/actions/category.actions";

// import Category from "@/lib/mongodb/models/Category.model";

const Dropdown = ({ value, onChangeHandler }) => {
  const [categories, setcategories] = useState([]);

  const [newcategory, setNewcategory] = useState("");

  // Adding categories
  const handleAddCategory = () => {
    createCatagory({
      categoryName: newcategory.trim(),
    }).then((category) => {
      setcategories((prevState) => [...prevState, category]);
    });
  };

  // Fetching Categories
  useEffect(() => {
    const getAllCategories = async function () {
      const categoriesList = await allCategories();

      categoriesList && setcategories(categoriesList);
      // console.log("List", categoriesList);
    };

    getAllCategories();
  }, []);

  return (
    <Select onValueChange={(value) => onChangeHandler(value)}>
      <SelectTrigger className="w-full rounded-full mt-2">
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent className="outline-none rounded-xl w-[100%] p-1">
        {categories.length > 0 &&
          categories.map((category) => (
            <SelectItem
              className="py-3"
              key={category._id}
              value={category._id}
            >
              {category.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="w-full px-7 py-2 hover:bg-slate-100 transition-all duration-100 ease-in-out flex items-center justify-start">
            Create New Category
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Create New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <input
                  className="border-2 w-full px-4 py-3 text-black text-md rounded-full "
                  placeholder="Category Name "
                  onChange={(e) => setNewcategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => startTransition(handleAddCategory)}
              >
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;
