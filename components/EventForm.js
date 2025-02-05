"use client";
import React, { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import Dropdown from "./Dropdown";
import { FielUploader } from "./FielUploader";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { eventFormSchema } from "@/lib/validator";
import { Checkbox } from "./ui/checkbox";
import { useUploadThing } from "@/lib/uploadthing";
import { useRouter } from "next/navigation";
import { createEvent } from "@/lib/actions/events.actions";

const EventForm = ({ type, userId }) => {
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues: {
      title: "",
      discription: "",
      location: "",
      imageUrl: "",
      startDateTime: new Date(),
      endDateTime: new Date(),
      categoryId: "",
      price: "",
      isFree: false,
      url: "",
    },
  });

  const { startUpload } = useUploadThing("imageUploader");

  const router = useRouter();

  const [files, setFiles] = useState([]);

  // Form Onsubmit logic.
  const onSubmit = async (values) => {
    let uploadedImageUrl = values.imageUrl;
    console.log("Initial Image URL", uploadedImageUrl);

    // Uploading the Image if provided.
    if (files.length > 0) {
      const uploadedImages = await startUpload(files);

      if (!uploadedImages) {
        console.log("Image not uploaded", uploadedImageUrl);
        return;
      }

      uploadedImageUrl = uploadedImages[0].url;
    }

    // Creating the Event if the type === "create".
    if (type === "create") {
      try {
        const newEvent = await createEvent({
          event: { ...values, imageUrl: uploadedImageUrl },
          userId,
          path: "/profile",
        });

        if (newEvent) {
          form.reset();
          router.push(`/events/${newEvent._id}`);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen mt-4 flex items-center flex-col">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex justify-center gap-10 mt-8 items-center h-full w-full"
        >
          {/* Event Details  */}
          <div className="formfield flex flex-col gap-2 w-[50%] h-full -2 ">
            {/* Title and Dropdown */}
            <div className="flex px-2 gap-4 justify-center w-full">
              {/* Title form field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex  flex-col gap-1 items-center">
                    <FormControl>
                      <Input
                        placeholder="Title"
                        {...field}
                        className="w-full rounded-full mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Category Dropdown */}
              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex justify-center flex-col gap-1 items-start">
                    <FormControl>
                      <Dropdown
                        placeholder="Category"
                        onChangeHandler={field.onChange}
                        value={field.value}
                        className="w-full h-48 rounded-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description form field */}
            <FormField
              control={form.control}
              name="discription"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 items-center">
                  <FormControl className="h-44">
                    <Textarea
                      placeholder="Description"
                      {...field}
                      className="w-[100%] border-2 focus:border-black rounded-xl mt-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Location and Price */}
            <div className="flex px-2 gap-4 justify-center w-full">
              {/* Location form field */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col gap-1 items-center">
                    <FormControl className="">
                      <Input
                        placeholder="Location"
                        {...field}
                        className="w-full rounded-full mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Price and IsFree */}
              <div className="flex items-center relative w-1/2">
                {/* Price form field */}
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col gap-1 items-center">
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="Price"
                          {...field}
                          className="w-full rounded-full mt-2"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* isFree form field */}
                <FormField
                  control={form.control}
                  name="isFree"
                  render={({ field }) => (
                    <FormItem className="bg-white top-4 absolute right-2 flex flex-col gap-1 items-center">
                      <FormControl>
                        <div className="flex justify-center items-center gap-2">
                          <label htmlFor="isFree">Is Free</label>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value} // Reflect current value
                            id="isFree"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            {/* URL */}
            <div className="flex px-2 gap-4 justify-start w-full">
              {/* URL form field */}
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-1/2 flex flex-col gap-1 items-center">
                    <FormControl>
                      <Input
                        placeholder="URL"
                        {...field}
                        className="w-full rounded-full mt-2"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Start and end date picker */}
            <div className="flex px-2 gap-4 justify-start w-full">
              {/* Start Date Time form field */}
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 items-center justify-center">
                    <FormControl className="w-full">
                      <div className="flex flex-col w-[20%]">
                        <label htmlFor="startDateTime">
                          Start Date and Time
                        </label>
                        <DatePicker
                          className="w-full border-2 rounded-full px-2 py-2 mt-2"
                          showTimeSelect
                          TimeInputLable="Time:"
                          {...field}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* End Date Time form field */}
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 items-center justify-center">
                    <FormControl className="w-full">
                      <div className="flex flex-col w-[20%]">
                        <label htmlFor="EndDateTime">End Date and Time</label>
                        <DatePicker
                          className="w-full border-2 rounded-full px-2 py-2 mt-2"
                          showTimeSelect
                          TimeInputLable="Time:"
                          {...field}
                          selected={field.value}
                          onChange={(date) => field.onChange(date)}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* submit BUttonZ */}
            <Button
              className="mt-3 rounded-full"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
              {form.formState.isSubmitting ? "submitting..." : `Create ${type}`}
            </Button>
          </div>

          {/* Event Poster */}
          <div className="ImageField flex flex-col gap-2 w-[40%] h-full -2 ">
            {/* Image Upload form field */}
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 items-start">
                  <FormControl className="border-2 border-purple-800">
                    <FielUploader
                      onFieldChange={field.onChange}
                      imageUrl={field.value}
                      setFiles={setFiles}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    </div>
  );
};

export default EventForm;
