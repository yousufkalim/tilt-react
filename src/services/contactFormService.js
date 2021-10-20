import axios from "axios";
import { toast } from "react-toastify";
import { baseUrl } from "../config";

export const postContactForm = async (body) => {
  try {
    if (body.prenom && body.nom && body.message) {
      const { data } = await axios.post(
        `${baseUrl}/contact/contact-form`,
        body
      );
      toast.success("Formulaire soumis");
    }
  } catch (error) {
    console.log(error);
    toast.error("une erreur s'est produite");
  }
};
