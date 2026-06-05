import React, { useState } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus, prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';
import { HiLightningBolt, HiPlay, HiSave, HiX } from 'react-icons/hi';

const APIPlayground = () => {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('https://jsonplaceholder.typicode.com/posts/1');
  const [headers, setHeaders] = useState([{ key: '', value: '' }]);
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const { theme } = useTheme();

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);

    const headerObj = headers.reduce((acc, curr) => {
      if (curr.key) acc[curr.key] = curr.value;
      return acc;
    }, {});

    const startTime = performance.now();

    try {
      const res = await axios({
        method,
        url,
        data: method !== 'GET' ? (body ? JSON.parse(body) : undefined) : undefined,
        headers: headerObj,
        validateStatus: () => true
      });

      const endTime = performance.now();

      setResponse({
        status: res.status,
        statusText: res.statusText,
        time: Math.round(endTime - startTime),
        data: res.data,
        headers: res.headers,
        error: false
      });
    } catch (err) {
      setResponse({
        status: 'Error',
        statusText: err.message,
        time: 0,
        data: err.response?.data || 'Failed to connect to the server.',
        error: true
      });
    } finally {
      setLoading(false);
    }
  };

  const addHeader = () => setHeaders([...headers, { key: '', value: '' }]);
  const removeHeader = (index) => setHeaders(headers.filter((_, i) => i !== index));
  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-yellow-500 rounded-xl text-white">
          <HiLightningBolt className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">API Playground</h1>
          <p className="text-slate-500 dark:text-slate-400">Lightweight client for testing HTTP requests.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Request Panel */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex space-x-2 mb-4">
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border font-bold text-primary outline-none focus:ring-2 focus:ring-primary"
              >
                {['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].map(m => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://api.example.com/endpoint"
                className="flex-grow px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 border border-border outline-none focus:ring-2 focus:ring-primary font-mono text-sm"
              />
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={handleSend}
              disabled={loading}
              className={`w-full py-3 rounded-xl font-bold flex items-center justify-center space-x-2 shadow-lg ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-primary hover:bg-primary-dark text-white shadow-primary/20'
                }`}
            >
              {loading ? (
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <><HiPlay /> <span>Send Request</span></>
              )}
            </motion.button>
          </div>

          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Headers</h3>
              <button onClick={addHeader} className="text-primary text-sm font-bold hover:underline">+ Add Header</button>
            </div>
            <div className="space-y-2">
              {headers.map((h, i) => (
                <div key={i} className="flex space-x-2">
                  <input
                    placeholder="Key"
                    value={h.key}
                    onChange={(e) => updateHeader(i, 'key', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border text-xs outline-none"
                  />
                  <input
                    placeholder="Value"
                    value={h.value}
                    onChange={(e) => updateHeader(i, 'value', e.target.value)}
                    className="flex-1 px-3 py-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-border text-xs outline-none"
                  />
                  <button onClick={() => removeHeader(i)} className="p-2 text-slate-400 hover:text-red-500"><HiX /></button>
                </div>
              ))}
            </div>
          </div>

          {method !== 'GET' && (
            <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Body (JSON)</h3>
              <textarea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder='{"key": "value"}'
                className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border outline-none font-mono text-sm resize-none"
              />
            </div>
          )}
        </div>

        {/* Response Panel */}
        <div className="lg:col-span-7 flex flex-col h-full">
          <div className="flex-grow bg-card rounded-2xl border border-border overflow-hidden shadow-sm flex flex-col">
            <div className="p-4 border-b border-border bg-slate-50 dark:bg-slate-900/50 flex justify-between items-center">
              <div className="flex space-x-4">
                <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Response</span>
                {response && (
                  <div className="flex space-x-3 text-xs font-bold">
                    <span className={response.error ? 'text-red-500' : 'text-green-500'}>
                      STATUS: {response.status}
                    </span>
                    <span className="text-blue-500">
                      TIME: {response.time}ms
                    </span>
                  </div>
                )}
              </div>
              {response && (
                <button className="text-slate-400 hover:text-primary transition-colors"><HiSave className="w-5 h-5" /></button>
              )}
            </div>
            <div className="flex-grow overflow-auto min-h-[500px]">
              {response ? (
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
                  {JSON.stringify(response.data, null, 2)}
                </SyntaxHighlighter>
              ) : (
                <div className="flex flex-col items-center justify-center h-full text-slate-400 p-12 text-center">
                  <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                    <HiPlay className="w-8 h-8 opacity-20" />
                  </div>
                  <p className="italic">Send a request to see the response here...</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default APIPlayground;
