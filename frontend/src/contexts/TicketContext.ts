import { createContext, useContext } from "react";
import type { FormikProps } from "formik";
import type { Ticket } from "../../types";
import * as Yup from "yup";

interface TicketContextType {
  formik?: FormikProps<Ticket>;
}

const TicketContext = createContext<TicketContextType>({});

export const useTicketContext = () => useContext(TicketContext);

export const ticketValidationSchema = Yup.object().shape({
  status: Yup.string().required("Status is required"),
  contact: Yup.object().shape({
    name: Yup.string().required("Name is required"),
    phone: Yup.number()
      .min(3, "Phone number must be at least 3 digits")
      .required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  }),
  channel: Yup.string().required("Channel is required"),
  // language: Yup.string().required("Language is required"),
  intent: Yup.string().required("Intent is required"),
  priority: Yup.string()
    .oneOf(["low", "medium", "high", "urgent"], "Invalid priority")
    .required("Priority is required"),
  // entities: Yup.array(),
});

export default TicketContext;
