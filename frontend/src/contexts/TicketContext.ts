import { createContext, useContext } from "react";
import type { FormikProps } from "formik";
import type { Ticket } from "../../types";

interface TicketContextType {
  formik?: FormikProps<Ticket>;
}

const TicketContext = createContext<TicketContextType>({});

export const useTicketContext = () => useContext(TicketContext);

export default TicketContext;
