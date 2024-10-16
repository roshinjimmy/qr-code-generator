"use client";

import { useState } from 'react';
import QRCodeStyling from 'qr-code-styling';

export default function Home() {
  const [url, setUrl] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState(null);

  const generateQRCode = () => {
    if (!url) return;

    const qr = new QRCodeStyling({
      width: 300,
      height: 300,
      data: url,
      margin: 20,
      imageOptions: {
        margin: 10,
      },
    });

    qr.getRawData('png').then((blob) => {
      const qrUrl = URL.createObjectURL(blob);
      setQrCodeUrl(qrUrl);
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black p-4">
      <div className={`max-w-lg w-full bg-white p-10 shadow-lg rounded-xl ${qrCodeUrl ? 'h-auto' : 'h-96'} transition duration-300 ease-in-out`}>
        <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-900">QR Code Generator</h1>
        {!qrCodeUrl && (
          <p className="text-lg text-gray-600 mb-8 text-center">
            Generate your personalized QR code by entering the URL below
          </p>
        )}
        <div className="mb-6">
          <input
            type="text"
            className="border border-gray-300 rounded-lg p-4 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400 transition duration-150 text-black"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold rounded-lg px-6 py-3 w-full hover:from-blue-600 hover:to-indigo-600 focus:outline-none focus:ring-4 focus:ring-indigo-400 transition duration-300"
            onClick={generateQRCode}
          >
            Generate QR Code
          </button>
        </div>

        {qrCodeUrl && (
          <div className="text-center">
            <img src={qrCodeUrl} alt="QR Code" className="mx-auto mb-6 border-4 border-gray-200 shadow-lg rounded-lg" />
            <a
              href={qrCodeUrl}
              download="qr_code.png"
              className="bg-green-500 text-white font-bold rounded-lg px-6 py-3 hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-400 transition duration-300"
            >
              Download QR Code
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
