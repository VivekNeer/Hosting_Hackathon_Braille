import React, { useState, useEffect } from 'react';
import Tesseract from 'tesseract.js';
import { jsPDF } from 'jspdf';
import ThreeButtons from "../components/ThreeButtons.jsx";
import TwoButtons from "../components/TwoButtons.jsx";

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

const ImageToBraille = () => {
  const [extractedText, setExtractedText] = useState('');
  const [brailleText, setBrailleText] = useState('');
  const [brailleFontBase64, setBrailleFontBase64] = useState('');

  useEffect(() => {
    fetch('/braille-font-base64.txt')
      .then(response => response.text())
      .then(data => setBrailleFontBase64(data))
      .catch(error => console.error('Error loading font:', error));
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Tesseract.recognize(file, 'eng')
        .then(({ data: { text } }) => {
          setExtractedText(text);
          setBrailleText(toBraille(text));
        })
        .catch(error => console.error('Error extracting text from image:', error));
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
      if (y + 10 > maxLineHeight) {
        doc.addPage();
        y = margin;
      }
      doc.text(line, margin, y);
      y += 10;
    });

    doc.save('braille_output.pdf');
  };

  return (
    <div className="flex justify-center flex-col items-center w-full gap-10">
      <div className="flex gap-16">
        <div className="text-center">
          <article className="prose">
            <h2>Image</h2>
          </article>
          <input 
            type="file" 
            className="file-input file-input-bordered w-full max-w-xs mt-40" 
            accept="image/*" 
            onChange={handleImageUpload}
          />
        </div>
        <div className="text-center">
          <article className="prose">
            <h2>Letters</h2>
          </article>
          <textarea 
            className="textarea textarea-bordered h-96 w-96 text-center resize-none" 
            placeholder="Extracted Text" 
            value={extractedText} 
            readOnly 
          />
        </div>
        <div className="text-center">
          <article className="prose">
            <h2>Braille</h2>
          </article>
          <textarea 
            className="textarea textarea-bordered h-96 w-96 text-center resize-none" 
            placeholder="Braille Output" 
            value={brailleText} 
            readOnly 
          />
        </div>
      </div>
      <TwoButtons downloadPDF={handleDownloadPDF} />
      <ThreeButtons />
    </div>
  );
}

export default ImageToBraille;
