// components/ExportPDFButton.jsx
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const ExportPDFButton = ({ elementId, fileName = "dashboard.pdf" }) => {
  const handleExport = async () => {
    const input = document.getElementById(elementId);
    if (!input) return;

    const canvas = await html2canvas(input, { scale: 2 });
    const imgData = canvas.toDataURL('image/png');

    const pdf = new jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save(fileName);
  };

  return (
    <button
      onClick={handleExport}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
    >
      Export to PDF
    </button>
  );
};

export default ExportPDFButton;
