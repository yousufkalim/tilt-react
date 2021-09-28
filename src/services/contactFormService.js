import axios from "axios";
import { toast } from "react-toastify";
const baseUrl = process.env.REACT_APP_API_URL;

export const postContactForm = async (body) => {
  try {
    if (body.prenom && body.nom && body.message) {
      console.log("before", body);
      const { data } = await axios.post(
        `${baseUrl}/contact/contact-form`,
        body
      );
      console.log("after");
      toast.success("Form Submitted");
    }
  } catch (error) {
    console.log(error);
    toast.error("une erreur s'est produite");
  }
};
