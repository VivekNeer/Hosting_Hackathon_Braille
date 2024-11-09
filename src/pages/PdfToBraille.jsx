import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';
import pdfToText from 'react-pdftotext'; // Import the react-pdftotext library
import TwoButtons from "../components/TwoButtons.jsx";
import ThreeButtons from "../components/ThreeButtons.jsx";

// Braille map for conversion
const brailleMap = {
  a: '⠁', b: '⠃', c: '⠉', d: '⠙', e: '⠑', f: '⠋', g: '⠛', h: '⠓', i: '⠊', j: '⠚',
  k: '⠅', l: '⠇', m: '⠍', n: '⠝', o: '⠕', p: '⠏', q: '⠟', r: '⠗', s: '⠎', t: '⠞',
  u: '⠥', v: '⠧', w: '⠺', x: '⠭', y: '⠽', z: '⠵',
  '1': '⠁', '2': '⠃', '3': '⠉', '4': '⠙', '5': '⠑', '6': '⠋', '7': '⠛', '8': '⠓', '9': '⠊', '0': '⠚',
};
const NUMBER_INDICATOR = '⠼';
const LETTER_INDICATOR = '⠰';

function toBraille(text) {
  let result = '';
  let isPrevCharNumber = false;
  for (const char of text) {
    if (/\d/.test(char)) {
      if (!isPrevCharNumber) {
        result += NUMBER_INDICATOR;
        isPrevCharNumber = true;
      }
      result += brailleMap[char];
    } else if (/[a-zA-Z]/.test(char)) {
      if (isPrevCharNumber) {
        result += LETTER_INDICATOR;
        isPrevCharNumber = false;
      }
      result += brailleMap[char.toLowerCase()];
    } else {
      result += char;
      isPrevCharNumber = false;
    }
  }
  return result;
}

const PdfToBraille = () => {
  const [pdfText, setPdfText] = useState('');
  const [brailleText, setBrailleText] = useState('');
  const [brailleFontBase64, setBrailleFontBase64] = useState('');

  // Load Braille font in base64 format
  useEffect(() => {
    fetch('/braille-font-base64.txt')
      .then(response => response.text())
      .then(data => setBrailleFontBase64(data))
      .catch(error => console.error('Error loading font:', error));
  }, []);

  const extractText = (event) => {
    const file = event.target.files[0];
    if (file) {
      pdfToText(file)
        .then(text => {
          setPdfText(text);
          setBrailleText(toBraille(text));
        })
        .catch(error => console.error("Failed to extract text from pdf", error));
    }
  };

  const handleDownloadPDF = () => {
    if (!brailleFontBase64) {
      alert('Braille font not loaded');
      return;
    }

    const doc = new jsPDF();
    doc.addFileToVFS('braille.ttf', brailleFontBase64);
    doc.addFont('braille.ttf', 'braille', 'normal');
    doc.setFont('braille', 'normal');
    doc.setFontSize(14);

    const pageHeight = doc.internal.pageSize.height;
    const margin = 10;
    const maxLineHeight = pageHeight - 2 * margin;
    let y = margin;

    const lines = doc.splitTextToSize(brailleText, 180);

    lines.forEach(line => {
      if (y + 10 > maxLineHeight) { // 10 here represents the approximate line height
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 10;
    });

    doc.save('braille_output.pdf');
  };

  // BRF file download handler
  const handleDownloadBRF = () => {
    const blob = new Blob([brailleText], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'braille_output.brf';
    link.click();
  };

  return (
    <div className="flex justify-center flex-col items-center w-full gap-10">
      <div className="flex gap-16">
        <div className="text-center">
          <article className="prose">
            <h2>PDF</h2>
          </article>
          <input 
            type="file" 
            className="file-input file-input-bordered w-full max-w-xs mt-40" 
            accept="application/pdf" 
            onChange={extractText}
          />
        </div>
        <div className="text-center">
          <article className="prose mb-4">
            <h2>Text</h2>
          </article>
          <textarea
            placeholder="Converted Text From PDF"
            rows={10}
            cols={50}
            className="textarea textarea-bordered w-full max-w-lg text-center resize-none mb-4"
            value={pdfText}
            readOnly
          />
        </div>
        <div className="text-center">
          <article className="prose">
            <h2>Braille</h2>
          </article>
          <textarea
            className="textarea textarea-bordered h-96 w-96 text-center resize-none"
            placeholder="Output"
            value={brailleText}
            readOnly
          />
        </div>
      </div>
      <TwoButtons downloadPDF={handleDownloadPDF} downloadBRF={handleDownloadBRF}/>
      <ThreeButtons />
    </div>
  );
}

export default PdfToBraille;
