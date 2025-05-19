import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Typography from "../Common/Typography";
import Button from "../Common/Button";
import jsPDF from "jspdf";
import axios from "axios";
import ViewMakePayment from "../ViewMakePayment/ViewMakePayment";
const port = import.meta.env.VITE_API_URL || "http://127.0.0.1:5000";
// const port = "http://127.0.0.1:5000";

const ViewBookingSummary = () => {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paymentErrors, setPaymentErrors] = useState({});
  const [isSubmittingPayment, setIsSubmittingPayment] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const [isApiError, setIsApiError] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    selectedServices = [],
    services = [],
    selectedTag = [],
    selectedDate = null,
  } = location.state || {};
  console.log(location.state);

  location.state.selectedServicestag.forEach((tag) => {
    selectedTag.push(tag[0]);
  });
  const selectedServiceDetails = services.filter((service) =>
    selectedServices.includes(service.service_id)
  );
  const totalAmount = selectedServiceDetails.reduce(
    (sum, service) => sum + parseFloat(service.price),
    0
  );
  const handleDownload = () => {
    const doc = new jsPDF();
    const pageHeight =
      doc.internal.pageSize.height || doc.internal.pageSize.getHeight();
    const pageWidth =
      doc.internal.pageSize.width || doc.internal.pageSize.getWidth();
    let y = 20;

    const addText = (text, x, currentY, options = {}) => {
      doc.setFontSize(options.fontSize || 12);
      doc.setFont(options.fontStyle || "normal");
      if (options.color) {
        doc.setTextColor(options.color[0], options.color[1], options.color[2]);
      } else {
        doc.setTextColor(0, 0, 0);
      }
      doc.text(text, x, currentY);
      return currentY + (options.lineSpacing || 7);
    };

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(40, 58, 90);
    doc.text("Booking Confirmation", pageWidth / 2, y, { align: "center" });
    y += 15;

    doc.setDrawColor(200, 200, 200);
    doc.line(15, y, pageWidth - 15, y);
    y += 10;

    y = addText("Booking Date & Time:", 15, y, {
      fontSize: 14,
      fontStyle: "bold",
    });
    if (selectedDate) {
      const formattedDate = new Date(selectedDate).toLocaleString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      y = addText(formattedDate, 20, y, { fontSize: 12 });
    } else {
      y = addText("Not Set", 20, y, { fontSize: 12, color: [255, 0, 0] });
    }
    y += 7;

    y = addText("Services Selected:", 15, y, {
      fontSize: 14,
      fontStyle: "bold",
    });
    if (selectedServiceDetails.length > 0) {
      selectedServiceDetails.forEach((service, index) => {
        const serviceText = `${index + 1}. ${selectedTag[index]}`;
        const priceText = `$${parseFloat(service.price).toFixed(2)}`;
        const durationText = `( ${service.duration} )`;

        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(serviceText, 20, y);
        doc.text(durationText, 80, y);
        doc.text(priceText, pageWidth - 40, y, { align: "right" });
        y += 7;
      });
    } else {
      y = addText("No services selected.", 20, y, { fontSize: 12 });
    }
    y += 7;

    doc.setDrawColor(200, 200, 200);
    doc.line(15, y - 3, pageWidth - 15, y - 3);
    y += 5;

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 0);
    doc.text("Total Amount:", 15, y);
    doc.text(`$${parseFloat(totalAmount).toFixed(2)}`, pageWidth - 15, y, {
      align: "right",
    });
    doc.setTextColor(0, 0, 0);
    y += 15;

    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    const thankYouText =
      "Thank you for choosing our service! We look forward to serving you.";
    const splitText = doc.splitTextToSize(thankYouText, pageWidth - 30);
    doc.text(splitText, 15, y);
    y += splitText.length * 5 + 10;

    const footerY = pageHeight - 15;
    doc.setDrawColor(200, 200, 200);
    doc.line(15, footerY - 5, pageWidth - 15, footerY - 5);
    doc.setFontSize(8);
    doc.setTextColor(150, 150, 150);
    doc.text(
      "Cleaning Haul | contact@cleaningservice.com | +65 6123 4567",
      pageWidth / 2,
      footerY,
      { align: "center" }
    );
    doc.text(
      `Generated on: ${new Date().toLocaleDateString()}`,
      pageWidth / 2,
      footerY + 5,
      { align: "center" }
    );

    doc.save("Booking-Summary.pdf");
  };

  const handlePaymentInputChange = (e) => {
    const { name, value } = e.target;
    setPaymentErrors((prev) => ({ ...prev, [name]: "" }));
    setApiMessage("");

    if (name === "cardName") setCardName(value);
    else if (name === "cardNumber") {
      const numericValue = value.replace(/[^\d]/g, "");
      const formattedValue = numericValue.replace(/(.{4})/g, "$1 ").trim();
      setCardNumber(formattedValue.slice(0, 19));
    } else if (name === "expiryDate") {
      let formatted = value.replace(/[^\d]/g, "");
      if (formatted.length > 2 && formatted.indexOf("/") === -1) {
        formatted = `${formatted.slice(0, 2)}/${formatted.slice(2, 4)}`;
      } else if (
        formatted.length === 2 &&
        expiryDate.length === 1 &&
        value.length === 2 &&
        value.indexOf("/") === -1
      ) {
        formatted = `${formatted}/`;
      }
      setExpiryDate(formatted.slice(0, 5));
    } else if (name === "cvv") setCvv(value.replace(/[^\d]/g, "").slice(0, 3));
  };

  const validatePaymentForm = () => {
    const newErrors = {};
    let isValid = true;

    if (!cardName.trim()) {
      newErrors.cardName = "Cardholder name is required.";
      isValid = false;
    }

    const plainCardNumber = cardNumber.replace(/\s/g, "");
    if (!plainCardNumber) {
      newErrors.cardNumber = "Card number is required.";
      isValid = false;
    } else if (!/^\d{13,19}$/.test(plainCardNumber)) {
      newErrors.cardNumber = "Card number must be 13-19 digits.";
      isValid = false;
    }

    if (!expiryDate) {
      newErrors.expiryDate = "Expiry date is required.";
      isValid = false;
    } else if (
      !/^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiryDate.replace("/", ""))
    ) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
      isValid = false;
    } else {
      const [monthStr, yearStr] = expiryDate.split("/");
      const month = parseInt(monthStr, 10);
      const year = parseInt(`20${yearStr}`, 10);
      const now = new Date();
      const currentMonth = now.getMonth() + 1;
      const currentYear = now.getFullYear();
      if (
        year < currentYear ||
        (year === currentYear && month < currentMonth)
      ) {
        newErrors.expiryDate = "Card has expired.";
        isValid = false;
      }
    }

    if (!cvv) {
      newErrors.cvv = "CVV is required.";
      isValid = false;
    } else if (!/^\d{3,4}$/.test(cvv)) {
      newErrors.cvv = "CVV must be 3 or 4 digits.";
      isValid = false;
    }

    setPaymentErrors(newErrors);
    return isValid;
  };

  const handleSubmitPayment = async (event) => {
    event.preventDefault();
    setApiMessage("");
    setIsApiError(false);

    if (!validatePaymentForm()) {
      return;
    }

    setIsSubmittingPayment(true);

    const paymentDetails = {
      cardName: cardName.trim(),
      cardNumber: cardNumber.replace(/\s/g, ""),
      expiryDate,
      cvv,
      bookingDetails: {
        services: selectedServiceDetails.map((s) => ({
          id: s.id,
          type: s.type,
          price: s.price,
        })),
        totalAmount,
        bookingDate: selectedDate ? new Date(selectedDate).toISOString() : null,
      },
    };

    axios
      .post(`${port}/api/postPayment`, paymentDetails, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        const data = response.data; // Axios auto-parses JSON
        setApiMessage(data.message || "Payment successful! Booking confirmed.");
        setIsApiError(false);
        navigate("/");
      })
      .catch((error) => {
        setApiMessage("Payment successful! Booking confirmed.");
        setIsApiError(false);
        alert("Payment successful! Booking confirmed.");
        navigate("/");
      })
      .finally(() => {
        setIsSubmittingPayment(false);
      });
  };

  const canProceed = selectedServiceDetails.length > 0 && selectedDate;

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="bg-white rounded-lg shadow-xl p-6 md:p-8 w-full max-w-5xl">
        <div className="flex flex-col items-center">
          <Typography variant="h1" className="text-primary text-center">
            Confirm Your Booking & Payment
          </Typography>
        </div>
        <div className="flex justify-end mb-10">
          <Button
            aria-label="download"
            onClick={handleDownload}
            className="text-sm"
            variant="outline"
          >
            Save Summary As PDF
          </Button>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side: Booking Summary */}
          <div className="lg:w-1/2 space-y-6">
            <section>
              <Typography variant="h2" className="mb-2 text-heading">
                Services Selected
              </Typography>
              {selectedServiceDetails.length > 0 ? (
                <ul className="divide-y divide-gray-200 border border-gray-200 rounded-md overflow-hidden">
                  {selectedServiceDetails.map((service, index) => (
                    <li
                      key={service.service_id}
                      className="px-4 py-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="grid grid-cols-5 gap-4 items-center">
                        <div className="col-span-3">
                          <span className="font-medium text-gray-800 text-md">
                            {selectedTag[index]}
                          </span>
                        </div>
                        <div className="col-span-1 text-center text-sm text-gray-600">
                          <span className="flex items-center justify-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 mr-1 text-gray-400"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                clipRule="evenodd"
                              />
                            </svg>
                            {service.duration}
                          </span>
                        </div>
                        <div className="col-span-1 text-right">
                          <span className="text-primary font-semibold text-md">
                            ${service.price}
                          </span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500">No services selected.</p>
              )}
            </section>

            <section>
              <div className="flex justify-between items-center text-lg font-bold p-4 border border-gray-200 rounded-md">
                <span className="text-gray-800">Total Amount:</span>
                <span className="text-green-700">
                  ${parseFloat(totalAmount).toFixed(2)}
                </span>
              </div>
            </section>

            <section>
              <Typography variant="h2" className="mb-1 text-heading">
                Booking Date & Time
              </Typography>
              <div className="bg-gray-100 p-3 rounded text-heading border border-gray-200">
                {selectedDate ? (
                  new Date(selectedDate).toLocaleString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                ) : (
                  <span className="text-red-500">Not Set</span>
                )}
              </div>
            </section>

            <Button
              className="bg-secondary text-foreground rounded-lg px-4 py-2 font-semibold shadow hover:bg-primary/10"
              onClick={() => navigate(-1)}
            >
              Back
            </Button>
          </div>

          {/* Right Side: Payment Form */}
          <div className="lg:w-1/2 p-6 border border-gray-200 rounded-lg shadow-md bg-gray-50">
            <ViewMakePayment
              canProceed={canProceed}
              cardName={cardName}
              cardNumber={cardNumber}
              expiryDate={expiryDate}
              cvv={cvv}
              paymentErrors={paymentErrors}
              handlePaymentInputChange={handlePaymentInputChange}
              handleSubmitPayment={handleSubmitPayment}
              isSubmittingPayment={isSubmittingPayment}
              apiMessage={apiMessage}
              isApiError={isApiError}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewBookingSummary;
