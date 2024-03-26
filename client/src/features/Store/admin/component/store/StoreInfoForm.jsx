import React, { useEffect, useState } from "react";

const StoreDetailsForm = ({ formData: initialFormData, onEdit, onSubmit }) => {
  // State to store form data
  const [formData, setFormData] = useState({
    companyName: "",
    streetAddress: "",
    zipCode: "",
    telephone: "",
    timezone: "",
    language: "",
    coordinates: "",
    openingHours: "",
  });
  console.log(initialFormData);
  useEffect(() => {
    if (initialFormData) {
      setFormData({
        companyName: initialFormData.name || "",
        streetAddress: initialFormData.location || "",
        zipCode: initialFormData.zipCode || "",
        telephone: initialFormData.telephone || "",
        timezone: initialFormData.timezone || "",
        language: initialFormData.language || "",
        coordinates: initialFormData.coordinates || "",
        openingHours: initialFormData.openingHours || "",
      });
    }
  }, [initialFormData]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="mx-auto w-full ">
      <form
        onSubmit={handleSubmit}
        className="  rounded px-8 pt-6 pb-8 mb-4 max-w-prose "
      >
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="companyName"
          >
            Company Name
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="companyName"
            type="text"
            placeholder="Company Name"
            name="companyName"
            value={formData.companyName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="streetAddress"
          >
            Street Address
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="streetAddress"
            type="text"
            placeholder="Street Address"
            name="streetAddress"
            value={formData.streetAddress}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="zipCode"
          >
            Zip / Post Code
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="zipCode"
            type="text"
            placeholder="Zip / Post Code"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="telephone"
          >
            Telephone
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="telephone"
            type="tel"
            placeholder="Telephone"
            name="telephone"
            value={formData.telephone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="timezone"
          >
            Timezone
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="timezone"
            type="text"
            placeholder="Timezone"
            name="timezone"
            value={formData.timezone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="language"
          >
            Language
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="language"
            type="text"
            placeholder="Language"
            name="language"
            value={formData.language}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="coordinates"
          >
            GPS Co-Ordinates of Store
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="coordinates"
            type="text"
            placeholder="GPS Co-Ordinates"
            name="coordinates"
            value={formData.coordinates}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="mb-4 flex items-center justify-between">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="openingHours"
          >
            Opening Hours
          </label>
          <input
            className="shadow bg-gray-300 focus:bg-gray-100 border rounded w-[270px] py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="openingHours"
            type="text"
            placeholder="Opening Hours"
            name="openingHours"
            value={formData.openingHours}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default StoreDetailsForm;
