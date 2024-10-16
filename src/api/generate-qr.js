// pages/api/generate-qr.js
import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { url } = req.query; // URL passed in the request

  if (!url) {
    return res.status(400).json({ error: 'No URL provided' });
  }

  try {
    const qrCodeDataUrl = await QRCode.toDataURL(url, {
      errorCorrectionLevel: 'L',
      type: 'image/png',
    });

    // Send the QR code image as a response
    res.setHeader('Content-Type', 'image/png');
    const imgBuffer = Buffer.from(qrCodeDataUrl.split(',')[1], 'base64');
    res.status(200).send(imgBuffer);
  } catch (error) {
    res.status(500).json({ error: 'Failed to generate QR code' });
  }
}
