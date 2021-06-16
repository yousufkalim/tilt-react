import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = "http://localhost:5001/";

export const postContactForm = async (body) => {
  try {
    const { data } = await axios.post(`${baseUrl}contact/contact-form`, body);
    toast.success("Form Submitted");
    console.log(data);
  } catch (error) {
    console.log(error);
    toast.error("An Error Occurred");
  }
};
