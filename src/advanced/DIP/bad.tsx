import axios, { AxiosError } from "axios";
import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { handleAxiosError } from "../../utils/fetching";
import { prepareFeedbackDataColumn } from "../../utils/feedback";

const FeedbackForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      // Perform registration logic here, e.g., send data to the server.
      console.log("Registration data:", formData);
      const data = {
        id: uuidv4(),
        fullName: formData.name,
        feedback: prepareFeedbackDataColumn(formData.feedback),
      };

      await axios.post("https://playside.io/feedback/submit", data);
    } catch (err) {
      if (err && err instanceof Error)
        console.log("Error: ", err.message);
      else if (err instanceof AxiosError) handleAxiosError(err);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4 text-black">
          Submit Feedback
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="name"
            >
              Your Name 🤵
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-600 text-sm font-medium mb-2"
              htmlFor="password"
            >
              Your Feedback 💭
            </label>
            <textarea
              id="password"
              name="feedback"
              value={formData.feedback}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg outline-none focus:ring focus:ring-blue-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Send Feedback 😄
          </button>
        </form>
      </div>
    </div>
  );
};

//BAD ❌
export function FeedbackBAD() {
  return <FeedbackForm />;
}
