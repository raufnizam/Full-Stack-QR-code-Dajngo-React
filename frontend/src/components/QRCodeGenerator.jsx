import { useState } from 'react';
import axios from 'axios';

const QRCodeGenerator = () => {
  const [qrText, setQrText] = useState('');
  const [qrImage, setQrImage] = useState(null);

  const generateQRCode = async () => {
    if (!qrText) {
      alert("Please enter text to generate a QR code.");
      return;
    }
  
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/generate-qr/', {
        qr_text: qrText  
      });
      setQrImage(response.data.qr_image_base64);
    } catch (error) {
      console.error('Error generating QR code:', error);
    }
  };
  

  const downloadQRCode = () => {
    if (qrImage) {
      const link = document.createElement('a');
      link.href = `data:image/png;base64,${qrImage}`;
      link.download = 'qrcode.png';
      link.click();
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">QR Code Generator</h1>
      
      <div className="flex flex-col items-center space-y-4">
        <input
          type="text"
          className="w-full p-3 border border-gray-300 rounded-md"
          value={qrText}
          onChange={(e) => setQrText(e.target.value)}
          placeholder="Enter text/link for QR code"
          required
        />
        
        <button
          onClick={generateQRCode}
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-500"
        >
          Generate QR Code
        </button>

        {qrImage && (
          <div className="flex flex-col items-center space-y-4">
            <h2 className="text-xl font-semibold text-center">QR Code For: {qrText}</h2>
            <h2 className="text-xl font-semibold text-center">Generated QR Code:</h2>
            <img src={`data:image/png;base64,${qrImage}`} alt="QR Code" className="w-48 h-48" />
            
            <button
              onClick={downloadQRCode}
              className="bg-green-600 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-500"
            >
              Download QR Code
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;
