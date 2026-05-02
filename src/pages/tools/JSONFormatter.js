import React, { useState } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { HiClipboard, HiCheck, HiTrash, HiDocumentText } from 'react-icons/hi';

const JSONFormatter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();

  const formatJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed, null, 2));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const minifyJSON = () => {
    try {
      const parsed = JSON.parse(input);
      setOutput(JSON.stringify(parsed));
      setError('');
    } catch (e) {
      setError(e.message);
      setOutput('');
    }
  };

  const clearAll = () => {
    setInput('');
    setOutput('');
    setError('');
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-blue-500 rounded-xl text-white">
          <HiDocumentText className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JSON Formatter & Validator</h1>
          <p className="text-slate-500 dark:text-slate-400">Validate, format, and minify your JSON data.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Area */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Input Raw JSON</span>
            <button 
              onClick={clearAll}
              className="text-slate-400 hover:text-red-500 transition-colors flex items-center text-sm"
            >
              <HiTrash className="mr-1" /> Clear
            </button>
          </div>
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Paste your JSON here... e.g. {"name": "DevtoolKit", "version": 1}'
            className="flex-grow w-full h-[400px] p-4 rounded-2xl bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm resize-none transition-all duration-300 shadow-sm"
          />
          <div className="mt-4 flex space-x-4">
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={formatJSON}
              className="flex-grow py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-colors shadow-lg shadow-primary/20"
            >
              Format JSON
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={minifyJSON}
              className="px-6 py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 rounded-xl font-semibold transition-colors"
            >
              Minify
            </motion.button>
          </div>
        </div>

        {/* Output Area */}
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center mb-2 px-2">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Formatted Output</span>
            {output && (
              <button 
                onClick={copyToClipboard}
                className="text-primary hover:text-primary-dark transition-colors flex items-center text-sm font-medium"
              >
                {copied ? <><HiCheck className="mr-1" /> Copied</> : <><HiClipboard className="mr-1" /> Copy Result</>}
              </button>
            )}
          </div>
          <div className="flex-grow w-full h-[400px] rounded-2xl bg-card border border-border overflow-hidden shadow-sm relative">
            {error ? (
              <div className="p-4 text-red-500 font-mono text-sm bg-red-50 dark:bg-red-900/10 h-full overflow-auto">
                <span className="font-bold">Invalid JSON:</span> {error}
              </div>
            ) : output ? (
              <div className="h-full overflow-auto">
                <SyntaxHighlighter
                  language="json"
                  style={theme === 'dark' ? vscDarkPlus : prism}
                  customStyle={{
                    margin: 0,
                    padding: '1rem',
                    fontSize: '0.875rem',
                    backgroundColor: 'transparent',
                    height: '100%',
                  }}
                >
                  {output}
                </SyntaxHighlighter>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-slate-400 italic text-sm">
                Formatted JSON will appear here...
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JSONFormatter;
