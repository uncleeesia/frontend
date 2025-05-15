import React from 'react';
import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

const PdfExportButton = ({ targetElementId, fileName = 'report', buttonText = 'Save as PDF', className = '' }) => {
  const handleExport = () => {
    const input = document.getElementById(targetElementId);
    
    html2canvas(input, {
      scale: 2, // Higher quality
      logging: false,
      useCORS: true,
      allowTaint: true
    }).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = canvas.height * imgWidth / canvas.width;
      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save(`${fileName}.pdf`);
    });
  };

  return (
    <button 
      onClick={handleExport}
      className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition ${className}`}
    >
      {buttonText}
    </button>
  );
};

export default PdfExportButton;