import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { HiAdjustments, HiClipboard, HiCheck, HiSwitchHorizontal } from 'react-icons/hi';

const Base64Converter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('encode'); // 'encode' or 'decode'
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = (val, currentMode = mode) => {
    setInput(val);
    if (!val) {
      setOutput('');
      setError('');
      return;
    }

    try {
      if (currentMode === 'encode') {
        setOutput(btoa(val));
      } else {
        setOutput(atob(val));
      }
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'encode' ? 'decode' : 'encode';
    setMode(newMode);
    // Swap input and output for convenience
    if (output && !error) {
      setInput(output);
      handleConvert(output, newMode);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-cyan-500 rounded-xl text-white">
          <HiAdjustments className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Base64 Converter</h1>
          <p className="text-slate-500 dark:text-slate-400">Encode and decode text to/from Base64 format.</p>
        </div>
      </div>

      <div className="bg-card p-8 rounded-3xl border border-border shadow-xl">
        <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-8 mb-8">
          <div className="flex-grow w-full">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-2">
              {mode === 'encode' ? 'Text to Encode' : 'Base64 to Decode'}
            </label>
            <textarea
              value={input}
              onChange={(e) => handleConvert(e.target.value)}
              placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter base64 string...'}
              className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border focus:ring-2 focus:ring-primary outline-none font-mono text-sm resize-none"
            />
          </div>

          <motion.button
            whileHover={{ rotate: 180 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleMode}
            className="p-4 rounded-full bg-primary text-white shadow-lg shadow-primary/20 flex-shrink-0"
            title="Switch Mode"
          >
            <HiSwitchHorizontal className="w-6 h-6" />
          </motion.button>

          <div className="flex-grow w-full">
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Result ({mode === 'encode' ? 'Base64' : 'Decoded Text'})
              </label>
              {output && (
                <button onClick={copyToClipboard} className="text-primary text-xs font-bold hover:underline flex items-center">
                  {copied ? <><HiCheck className="mr-1" /> Copied</> : <><HiClipboard className="mr-1" /> Copy</>}
                </button>
              )}
            </div>
            <div className="w-full h-40 p-4 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border font-mono text-sm break-all overflow-auto whitespace-pre-wrap">
              {error ? (
                <span className="text-red-500">Error: {error}</span>
              ) : output || <span className="text-slate-400 italic">Result will appear here...</span>}
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="px-6 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-sm font-bold text-slate-500 flex items-center">
            Currently: <span className="text-primary ml-2 uppercase tracking-widest">{mode} Mode</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Base64Converter;
