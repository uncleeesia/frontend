import React, { useEffect, useState } from "react";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import axios from "axios";
import {
  FaCreditCard,
  FaPaypal,
  FaGooglePay,
  FaApplePay,
  FaUniversity,
  FaMoneyBillAlt,
} from "react-icons/fa";

const iconMap = {
  FaCreditCard: FaCreditCard,
  FaPaypal: FaPaypal,
  FaGooglePay: FaGooglePay,
  FaApplePay: FaApplePay,
  FaUniversity: FaUniversity,
  FaMoneyBillAlt: FaMoneyBillAlt,
};

const ViewMakePayment = ({
  canProceed,
  cardName,
  cardNumber,
  expiryDate,
  cvv,
  paymentErrors,
  handlePaymentInputChange,
  handleSubmitPayment,
  isSubmittingPayment,
  apiMessage,
  isApiError,
}) => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState("");

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/api/getPaymentMethods`)
      .then((response) => {
        const methods = response.data.paymentMethod || [];
        setPaymentMethods(methods);
        const defaultMethod = methods.find(
          (m) => m.payment_method_name === "Credit Card"
        );
        setSelectedMethod(
          defaultMethod?.payment_method_name || methods[0]?.payment_method_name
        );
      })
      .catch((error) => {
        console.error("Error fetching payment methods:", error);
      });
  }, []);

  const renderCreditCardForm = () => (
    <>
      {/* [Credit Card Inputs – unchanged] */}
      <div>
        <label htmlFor="cardName" className="block text-sm font-medium text-gray-700">
          Cardholder Name
        </label>
        <input
          type="text"
          id="cardName"
          name="cardName"
          value={cardName}
          onChange={handlePaymentInputChange}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required
        />
        {paymentErrors.cardName && (
          <p className="text-red-500 text-xs mt-1">{paymentErrors.cardName}</p>
        )}
      </div>

      <div>
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Card Number
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={handlePaymentInputChange}
          placeholder="XXXX XXXX XXXX XXXX"
          maxLength={19}
          className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
          required
        />
        {paymentErrors.cardNumber && (
          <p className="text-red-500 text-xs mt-1">{paymentErrors.cardNumber}</p>
        )}
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
            Expiry Date (MM/YY)
          </label>
          <input
            type="text"
            id="expiryDate"
            name="expiryDate"
            value={expiryDate}
            onChange={handlePaymentInputChange}
            placeholder="MM/YY"
            maxLength={5}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
          {paymentErrors.expiryDate && (
            <p className="text-red-500 text-xs mt-1">{paymentErrors.expiryDate}</p>
          )}
        </div>
        <div className="flex-1">
          <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
            CVV
          </label>
          <input
            type="text"
            id="cvv"
            name="cvv"
            value={cvv}
            onChange={handlePaymentInputChange}
            placeholder="XXX"
            maxLength={4}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
            required
          />
          {paymentErrors.cvv && (
            <p className="text-red-500 text-xs mt-1">{paymentErrors.cvv}</p>
          )}
        </div>
      </div>
    </>
  );

  return (
    <div className="p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50">
      <Typography variant="h2" className="mb-4 text-heading text-center">
        Secure Payment
      </Typography>

      {canProceed ? (
        <>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select Payment Method
            </label>
            <div className="space-y-2">
              {paymentMethods.map((method) => {
                const Icon = iconMap[method.payment_method_icon];
                const isSelected = selectedMethod === method.payment_method_name;
                return (
                  <div
                    key={method.payment_method_name}
                    onClick={() => setSelectedMethod(method.payment_method_name)}
                    className={`flex items-center gap-3 px-4 py-2 border rounded-md cursor-pointer transition ${
                      isSelected ? "bg-blue-50 border-blue-500" : "border-gray-300"
                    }`}
                  >
                    {Icon && <Icon className="text-xl text-gray-700" />}
                    <span className="text-sm">{method.payment_method_name}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={handleSubmitPayment} className="space-y-4">
            {selectedMethod === "Credit Card" && renderCreditCardForm()}

            <Button
              aria-label="submit"
              name="submit"
              type="submit"
              variant="primary"
              fullWidth
              loading={isSubmittingPayment}
              disabled={isSubmittingPayment || !canProceed}
              className="py-2.5"
            >
              {isSubmittingPayment ? "Processing..." : "Pay"}
            </Button>

            {apiMessage && (
              <div
                className={`mt-4 p-3 rounded-md text-sm ${
                  isApiError
                    ? "bg-red-100 text-red-700 border border-red-300"
                    : "bg-green-100 text-green-700 border border-green-300"
                }`}
              >
                {apiMessage}
              </div>
            )}
          </form>
        </>
      ) : (
        <div className="text-center text-gray-500 p-4 border-dashed border-2 border-gray-300 rounded-md">
          <Typography variant="p">
            Please select services and a date to proceed with payment.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ViewMakePayment;
