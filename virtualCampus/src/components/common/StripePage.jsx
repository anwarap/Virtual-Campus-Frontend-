import React, { useState } from "react";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { FaStripe, FaTimesCircle } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { handlePaymentSuccess } from "../../api/userapi";

const StripePage = ({
  clientSecret,
  bugs,
  courseId,
  teacherId,
  userId,
  newOffer,
  courseName,
}) => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const calculateAmount = () => {
    if (newOffer) {
      const discountedAmount = bugs - (bugs * newOffer) / 100;
      return `₹${discountedAmount.toLocaleString()}.00`;
    }
    return `₹${bugs.toLocaleString()}.00`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
        toast.error("Payment system not initialized");
        return;
    }

    setIsProcessing(true);

    try {
        const { error, paymentIntent } = await stripe.confirmPayment({
            elements,
            confirmParams: {},
            redirect: "if_required",
        });

        if (error) {
            console.log('Error during payment confirmation:', error);
            toast.error(error.message);
            setIsProcessing(false);
            return;
        }

        if (paymentIntent && paymentIntent.status === "succeeded") {
            const Buydata = {
                paymentstatus: "success",
                amount: paymentIntent.amount,
                date: new Date(),
                userId,
                courseName,
                courseId,
            };
            console.log(Buydata, 'buyData');

            const response = await handlePaymentSuccess(Buydata);
            console.log(response,'sfsfs')
            if(response.status === 201){
              console.log('daa')
              toast.error("The course was already purchased");
              setOpen(false)
            }
            console.log(response,'jj')
            if (response.status === 200) {
                toast.success("Payment successful!", {
                    position: "top-right",
                    autoClose: 2000,
                });
                setTimeout(() => navigate("/user/success"), 2000);
            }
        } else {
            console.log('Payment status not successful:', paymentIntent.status);
        }
    } catch (error) {
        console.error("Payment failed:", error);
        toast.error("Payment failed. Please try again.");
    } finally {
        setIsProcessing(false);
    }
};

  return (
    <div className="font-sans">
      <button
        onClick={handleOpen}
        className="px-6 py-3 bg-violet-600 hover:bg-violet-700 text-white rounded-lg 
                 font-medium transition-colors duration-200 flex items-center justify-center
                 space-x-2 w-full sm:w-auto"
      >
        <span>Pay Now</span>
        <span className="font-semibold">{calculateAmount()}</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="min-h-screen px-4 text-center flex items-center justify-center">
            {/* Overlay */}
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={handleOpen} />

            {/* Modal */}
            <div className="inline-block w-full max-w-md p-6 my-8 text-left align-middle transition-all transform 
                          bg-white shadow-xl rounded-2xl relative z-10">
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-semibold text-gray-900">
                    Make Your Payment
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Complete your course purchase securely
                  </p>
                </div>
                <button
                  onClick={handleOpen}
                  className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
                >
                  <FaTimesCircle className="w-6 h-6" />
                </button>
              </div>

              {/* Amount Display */}
              <div className="bg-violet-50 p-4 rounded-lg mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Course Amount</span>
                  <span className="text-xl font-semibold text-violet-600">
                    {calculateAmount()}
                  </span>
                </div>
                {newOffer && (
                  <div className="mt-2 text-sm text-violet-600">
                    {newOffer}% discount applied
                  </div>
                )}
              </div>

              {/* Payment Form */}
              <div className="space-y-6">
                <PaymentElement />
                
                <button
                  onClick={handleSubmit}
                  disabled={isProcessing || !stripe}
                  className="w-full py-3 px-4 bg-violet-600 hover:bg-violet-700 disabled:bg-violet-300
                           text-white font-medium rounded-lg transition-colors duration-200
                           flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin" />
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <span>Pay {calculateAmount()}</span>
                  )}
                </button>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
                  <FaStripe className="w-6 h-6 text-blue-500" />
                  <span>Payments are secure and encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default StripePage;