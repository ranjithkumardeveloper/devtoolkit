import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';
import { HiLockClosed, HiShieldCheck, HiExclamation } from 'react-icons/hi';

const JWTDecoder = () => {
  const [token, setToken] = useState('');
  const [header, setHeader] = useState(null);
  const [payload, setPayload] = useState(null);
  const [error, setError] = useState('');
  const { theme } = useTheme();

  const handleDecode = (val) => {
    setToken(val);
    if (!val) {
      setHeader(null);
      setPayload(null);
      setError('');
      return;
    }

    try {
      // JWT consists of 3 parts separated by dots
      const parts = val.split('.');
      if (parts.length !== 3) {
        throw new Error('Invalid JWT format. Must have 3 parts separated by dots.');
      }

      // Decode Header (manually because jwtDecode only does payload)
      const decodedHeader = JSON.parse(atob(parts[0]));
      const decodedPayload = jwtDecode(val);

      setHeader(decodedHeader);
      setPayload(decodedPayload);
      setError('');
    } catch (e) {
      setError(e.message);
      setHeader(null);
      setPayload(null);
    }
  };

  const renderSection = (title, data, color) => (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm h-full flex flex-col">
      <div className={`p-4 border-b border-border flex items-center bg-gradient-to-r ${color} bg-opacity-10`}>
        <span className="font-bold text-sm uppercase tracking-wider">{title}</span>
      </div>
      <div className="flex-grow overflow-auto min-h-[200px]">
        {data ? (
          <SyntaxHighlighter
            language="json"
            style={theme === 'dark' ? vscDarkPlus : prism}
            customStyle={{
              margin: 0,
              padding: '1.5rem',
              fontSize: '0.875rem',
              backgroundColor: 'transparent',
            }}
          >
            {JSON.stringify(data, null, 2)}
          </SyntaxHighlighter>
        ) : (
          <div className="p-8 flex items-center justify-center text-slate-400 italic text-sm h-full">
            Waiting for token...
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-purple-500 rounded-xl text-white">
          <HiLockClosed className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">JWT Decoder</h1>
          <p className="text-slate-500 dark:text-slate-400">Decode JSON Web Tokens and inspect their contents.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 flex flex-col h-full">
          <div className="mb-2 px-2 flex justify-between items-center">
            <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Encoded Token</span>
            {error && (
              <span className="text-xs text-red-500 flex items-center">
                <HiExclamation className="mr-1" /> Invalid Token
              </span>
            )}
          </div>
          <textarea
            value={token}
            onChange={(e) => handleDecode(e.target.value)}
            placeholder="Paste your JWT here..."
            className="flex-grow w-full h-[500px] p-6 rounded-2xl bg-card border border-border focus:ring-2 focus:ring-primary focus:border-transparent outline-none font-mono text-sm resize-none transition-all duration-300 shadow-sm"
          />
          <div className="mt-4 p-4 rounded-xl bg-blue-50 dark:bg-blue-900/10 border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-300 flex items-start">
              <HiShieldCheck className="w-4 h-4 mr-2 flex-shrink-0 mt-0.5" />
              <span>
                <strong>Note:</strong> Tokens are decoded locally in your browser.
                Your sensitive data never leaves your machine.
              </span>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col space-y-6 h-full">
          <div className="flex-grow">
            {renderSection('Header', header, 'from-purple-500/20 to-indigo-500/20')}
          </div>
          <div className="flex-grow">
            {renderSection('Payload', payload, 'from-blue-500/20 to-cyan-500/20')}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JWTDecoder;
