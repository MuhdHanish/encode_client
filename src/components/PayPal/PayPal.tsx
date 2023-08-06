import {
  PayPalScriptProvider,
  PayPalButtons,
} from "@paypal/react-paypal-js";
import React from "react";
import { Course } from "../../dtos/Course";
import { toast } from "react-toastify";

interface PayPalProps {
  course: Course,
  handleAddcourse: () => Promise<void>;
}

const PayPal: React.FC<PayPalProps> = ({ course , handleAddcourse}) => {
  return (
    <>
      <PayPalScriptProvider
        options={{ clientId: import.meta.env.VITE_PAYPAL_CLIENT_ID as string }}
      >
        <PayPalButtons
          style={{ layout: "horizontal" }} 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          createOrder={(_data: any, actions: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: course.price,
                  },
                },
              ],
            });
          }}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          onApprove={(_data: any, actions: any) => {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
            return actions.order.capture().then(async function () {
            toast.success("Course added successfully!", {
            position: "top-right", autoClose: 3000, hideProgressBar: false,closeOnClick: true,
            pauseOnHover: true, draggable: true,progress: undefined,});
            await handleAddcourse();
            })
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .catch(function (error: any) {
            toast.success(error as string, {
            position: "top-right", autoClose: 3000, hideProgressBar: false,closeOnClick: true,
            pauseOnHover: true, draggable: true,progress: undefined,});
          });
          }}
        />
      </PayPalScriptProvider>
    </>
  );
};

export default PayPal;
