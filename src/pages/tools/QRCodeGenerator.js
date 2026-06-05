import React, { useState, useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { motion } from 'framer-motion';
import { HiQrcode, HiDownload, HiClipboard, HiCheck } from 'react-icons/hi';

const QRCodeGenerator = () => {
  const [text, setText] = useState('https://github.com');
  const [size, setSize] = useState(256);
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [level, setLevel] = useState('L');
  const [copied, setCopied] = useState(false);
  const qrRef = useRef();

  const downloadQRCode = () => {
    const canvas = qrRef.current.querySelector('canvas');
    if (canvas) {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = 'devtoolkit-qrcode.png';
      link.href = url;
      link.click();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-indigo-500 rounded-xl text-white">
          <HiQrcode className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">QR Code Generator</h1>
          <p className="text-slate-500 dark:text-slate-400">Generate high-quality QR codes for any text or URL.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Controls */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Content</label>
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter URL or text..."
              className="w-full h-32 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border focus:ring-2 focus:ring-primary outline-none font-mono text-sm resize-none"
            />
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm space-y-4">
            <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Customization</h3>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1">Foreground Color</label>
                <input
                  type="color"
                  value={fgColor}
                  onChange={(e) => setFgColor(e.target.value)}
                  className="w-full h-10 rounded bg-transparent border-none cursor-pointer"
                />
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1">Background Color</label>
                <input
                  type="color"
                  value={bgColor}
                  onChange={(e) => setBgColor(e.target.value)}
                  className="w-full h-10 rounded bg-transparent border-none cursor-pointer"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Size ({size}px)</label>
              <input
                type="range"
                min="128"
                max="512"
                step="8"
                value={size}
                onChange={(e) => setSize(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-primary"
              />
            </div>

            <div>
              <label className="block text-xs text-slate-400 mb-1">Error Correction Level</label>
              <select
                value={level}
                onChange={(e) => setLevel(e.target.value)}
                className="w-full p-2 rounded bg-slate-50 dark:bg-slate-900 border border-border text-sm outline-none"
              >
                <option value="L">Level L (7%)</option>
                <option value="M">Level M (15%)</option>
                <option value="Q">Level Q (25%)</option>
                <option value="H">Level H (30%)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-7">
          <div className="bg-card p-8 rounded-2xl border border-border shadow-sm flex flex-col items-center justify-center min-h-[500px]">
            <div
              ref={qrRef}
              className="p-8 bg-white rounded-2xl shadow-xl mb-8 transition-all duration-300 transform hover:scale-105"
            >
              <QRCodeCanvas
                value={text}
                size={size}
                fgColor={fgColor}
                bgColor={bgColor}
                level={level}
                includeMargin={true}
              />
            </div>

            <div className="flex space-x-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={downloadQRCode}
                className="flex items-center px-8 py-3 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20 transition-all"
              >
                <HiDownload className="mr-2 w-5 h-5" /> Download PNG
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  navigator.clipboard.writeText(text);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center px-8 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl font-bold transition-all"
              >
                {copied ? <HiCheck className="mr-2 w-5 h-5 text-green-500" /> : <HiClipboard className="mr-2 w-5 h-5" />}
                {copied ? 'Copied Content' : 'Copy Content'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
