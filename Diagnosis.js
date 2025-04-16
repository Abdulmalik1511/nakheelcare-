import React from 'react';
import { jsPDF } from 'jspdf';
import '../styles/DiagnosisResult.css';

const DiagnosisResult = ({ disease, confidence, treatment, language }) => {
  const generatePDF = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text(language === 'ar' ? 'تقرير التشخيص' : 'Diagnosis Report', 105, 20, null, null, 'center');

    // Disease and Confidence Level
    doc.setFontSize(14);
    doc.text(`${language === 'ar' ? 'المرض:' : 'Disease:'} ${disease}`, 20, 40);
    doc.text(`${language === 'ar' ? 'مستوى الثقة:' : 'Confidence Level:'} ${confidence}%`, 20, 50);

    // Treatment Recommendations
    doc.setFontSize(12);
    doc.text(`${language === 'ar' ? 'التوصيات العلاجية:' : 'Treatment Recommendations:'}`, 20, 70);
    const lines = doc.splitTextToSize(treatment, 170);
    doc.text(lines, 20, 80);

    return doc;
  };

  // ✅ Download PDF
  const handleDownloadPDF = () => {
    const doc = generatePDF();
    doc.save('diagnosis-report.pdf');
  };

  // ✅ Print PDF
  const handlePrintPDF = () => {
    const doc = generatePDF();
    const blob = doc.output('blob');
    const url = URL.createObjectURL(blob);
    const iframe = document.createElement('iframe');

    iframe.style.position = 'absolute';
    iframe.style.width = '0px';
    iframe.style.height = '0px';
    iframe.src = url;
    document.body.appendChild(iframe);

    iframe.onload = () => {
      iframe.contentWindow.print();
      document.body.removeChild(iframe);
      URL.revokeObjectURL(url);
    };
  };

  return (
    <div className="result-container">
      <h2>{language === 'ar' ? 'نتيجة التشخيص' : 'Diagnosis Result'}</h2>
      <p>
        {language === 'ar' ? 'المرض:' : 'Disease:'} {disease}
      </p>
      <p>
        {language === 'ar' ? 'مستوى الثقة:' : 'Confidence Level:'} {confidence}%
      </p>
      <p>
        {language === 'ar' ? 'التوصيات العلاجية:' : 'Treatment Recommendations:'} {treatment}
      </p>

      {/* Buttons */}
      <div className="buttons">
        <button className="download-button" onClick={handleDownloadPDF}>
          {language === 'ar' ? 'تحميل التقرير' : 'Download Report'}
        </button>
        <button className="print-button" onClick={handlePrintPDF}>
          {language === 'ar' ? 'طباعة التقرير' : 'Print Report'}
        </button>
      </div>
    </div>
  );
};

export default DiagnosisResult;
