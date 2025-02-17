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
import { createEvent, updateEvent } from "@/lib/actions/events.actions";

const EventForm = ({ event, type, userId, eventId }) => {
  // Defautl values for the Event form.
  const form = useForm({
    resolver: zodResolver(eventFormSchema),
    defaultValues:
      event && type === "Update"
        ? {
            ...event,
            startDateTime: new Date(event.startDateTime),
            endDateTime: new Date(event.endDateTime),
          }
        : {
            title: "",
            description: "",
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
    //Updating the Event if the type === "Update"
    if (type === "Update") {
      if (!eventId) {
        router.push("/");
        return;
      }

      try {
        const updatedEvent = await updateEvent({
          userId,
          event: { ...values, imageUrl: uploadedImageUrl, _id: eventId },
          path: `/events/${eventId}`,
        });
        console.log("Updated Event", updatedEvent);

        if (updatedEvent) {
          form.reset();
          router.push(`/events/${updatedEvent._id}`);
        }
      } catch (error) {
        console.log("Update Event OnSubmit", error);
      }
    }
  };

  return (
    <div className="w-full min-h-screen mt-4 flex items-center flex-col px-4 sm:px-6 lg:px-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col lg:flex-row justify-center gap-4 md:gap-10 mt-8 items-center h-full w-full"
        >
          {/* Event Details */}
          <div className="formfield flex flex-col gap-2 w-full lg:w-[50%] h-full">
            {/* Title and Dropdown */}
            <div className="flex flex-col md:flex-row px-2 gap-4 justify-center w-full">
              {/* Title form field */}
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 flex flex-col gap-1 items-center">
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
                  <FormItem className="w-full md:w-1/2 flex justify-center flex-col gap-1 items-start">
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
                      className="w-full border-2 focus:border-black rounded-xl mt-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
  
            {/* Location and Price */}
            <div className="flex flex-col md:flex-row px-2 gap-4 justify-center w-full">
              {/* Location form field */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem className="w-full md:w-1/2 flex flex-col gap-1 items-center">
                    <FormControl>
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
              <div className="flex items-center relative w-full md:w-1/2">
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
                    <FormItem className="bg-white top-4 absolute right-2 md:static md:ml-2 flex flex-col gap-1 items-center">
                      <FormControl>
                        <div className="flex justify-center items-center gap-2">
                          <label htmlFor="isFree">Is Free</label>
                          <Checkbox
                            onCheckedChange={field.onChange}
                            checked={field.value}
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
            <div className="flex px-2 justify-start w-full">
              <FormField
                control={form.control}
                name="url"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 items-center">
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
            <div className="flex flex-col md:flex-row px-2 gap-4 justify-start w-full">
              {/* Start Date Time */}
              <FormField
                control={form.control}
                name="startDateTime"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 items-center justify-center">
                    <FormControl className="w-full">
                      <div className="flex flex-col w-full md:w-[80%]">
                        <label htmlFor="startDateTime">Start Date and Time</label>
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
  
              {/* End Date Time */}
              <FormField
                control={form.control}
                name="endDateTime"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-1 items-center justify-center">
                    <FormControl className="w-full">
                      <div className="flex flex-col w-full md:w-[80%]">
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
  
            {/* Submit Button */}
            <Button
              className="mt-3 rounded-full w-full md:w-auto"
              disabled={form.formState.isSubmitting}
              type="submit"
            >
                {form.formState.isSubmitting ? (
                <div role="status">
                  <svg
                    aria-hidden="true"
                    className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-purple-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                  <span className="sr-only">Loading...</span>
                </div>
              ) : (
                `${type} Event`
              )}
            </Button>
          </div>
  
          {/* Event Poster */}
          <div className="ImageField flex flex-col gap-2 w-full lg:w-[40%] h-full">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-1 items-start">
                  <FormControl className="border-2 border-purple-800 w-full">
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
