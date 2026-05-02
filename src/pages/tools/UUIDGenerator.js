import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import { HiClipboard, HiCheck, HiRefresh, HiCube } from 'react-icons/hi';

const UUIDGenerator = () => {
  const [uuid, setUuid] = useState('');
  const [history, setHistory] = useState([]);
  const [copied, setCopied] = useState(false);

  const generateUUID = () => {
    const newUuid = uuidv4();
    setUuid(newUuid);
    setHistory(prev => [newUuid, ...prev].slice(0, 10));
  };

  useEffect(() => {
    generateUUID();
  }, []);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(text);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-red-500 rounded-xl text-white">
          <HiCube className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">UUID Generator</h1>
          <p className="text-slate-500 dark:text-slate-400">Generate secure, random UUIDs (v4).</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-8">
          <div className="bg-card p-8 rounded-3xl border border-border shadow-xl text-center">
            <h2 className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-4">Your Generated UUID</h2>
            <div className="relative group">
              <div className="text-2xl md:text-4xl font-mono font-bold text-primary break-all mb-8 p-4 bg-slate-100 dark:bg-slate-800 rounded-2xl">
                {uuid}
              </div>
              <div className="flex flex-wrap justify-center gap-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={generateUUID}
                  className="flex items-center px-6 py-3 bg-primary text-white rounded-xl font-bold transition-all shadow-lg shadow-primary/20"
                >
                  <HiRefresh className="mr-2 w-5 h-5" /> Generate New
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => copyToClipboard(uuid)}
                  className="flex items-center px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl font-bold transition-all"
                >
                  {copied === uuid ? <HiCheck className="mr-2 w-5 h-5 text-green-500" /> : <HiClipboard className="mr-2 w-5 h-5" />}
                  {copied === uuid ? 'Copied!' : 'Copy UUID'}
                </motion.button>
              </div>
            </div>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border">
            <h3 className="text-lg font-bold mb-4">What is a UUID?</h3>
            <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
              A Universally Unique Identifier (UUID) is a 128-bit number used to identify information in computer systems. 
              The v4 UUIDs generated here are randomly generated using a cryptographically strong random number generator. 
              The probability of a duplicate is practically zero.
            </p>
          </div>
        </div>

        <div className="bg-card p-6 rounded-2xl border border-border flex flex-col h-fit">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <HiRefresh className="mr-2 text-slate-400" /> History
          </h3>
          <div className="space-y-3">
            {history.map((h, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-900/50 rounded-xl border border-border group">
                <span className="text-xs font-mono text-slate-500 truncate mr-2">{h}</span>
                <button 
                  onClick={() => copyToClipboard(h)}
                  className="text-slate-400 hover:text-primary transition-colors"
                >
                  {copied === h ? <HiCheck className="w-4 h-4 text-green-500" /> : <HiClipboard className="w-4 h-4" />}
                </button>
              </div>
            ))}
            {history.length === 0 && (
              <p className="text-sm text-slate-400 italic">No history yet.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UUIDGenerator;
