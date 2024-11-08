import React, { useState, useEffect } from 'react';
import { jsPDF } from 'jspdf';

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

const TextToBrail = () => {
  const [inputValue, setInputValue] = useState('');
  const [outputValue, setOutputValue] = useState('');
  const [brailleFontBase64, setBrailleFontBase64] = useState('');

  useEffect(() => {
    fetch('/braille-font-base64.txt') // Corrected path
      .then(response => response.text())
      .then(data => {
        setBrailleFontBase64(data);
      })
      .catch(error => console.error('Error loading font:', error));
  }, []);

  const handleChange = (e) => {
    const inputText = e.target.value;
    setInputValue(inputText);
    setOutputValue(toBraille(inputText));
  };

  const downloadPDF = () => {
    if (!brailleFontBase64) {
      alert('Braille font not loaded');
      return;
    }

    const doc = new jsPDF();

    // Add Braille font to jsPDF
    doc.addFileToVFS('braille.ttf', brailleFontBase64); // Add the Braille font
    doc.addFont('braille.ttf', 'braille', 'normal'); // Set it as a normal font

    doc.setFont('braille', 'normal'); // Set the font to Braille

    // Set the font size and add text
    doc.setFontSize(14);
    const lines = doc.splitTextToSize(outputValue, 180); // Wrap text to fit within 180 width

    doc.text(lines, 10, 10); // Render the Braille text

    // Save the PDF
    doc.save('braille_output.pdf');
  };

  return (
    <div className="container">
      <div>
        <label htmlFor="inputField">Input:</label>
        <input
          type="text"
          id="inputField"
          value={inputValue}
          onChange={handleChange}
          placeholder="Enter text to convert to Braille"
          style={{ width: '100%', marginBottom: '10px' }}
        />
      </div>
      <div>
        <label>Output (Braille):</label>
        <div id="outputField" className="output" style={{ whiteSpace: 'pre-wrap', marginTop: '10px' }}>
          {outputValue}
        </div>
      </div>
      <button onClick={downloadPDF} style={{ marginTop: '10px' }}>Download as PDF</button>
    </div>
  );
};

export default TextToBrail;
