import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import APIPlayground from './pages/tools/APIPlayground';
import JSONFormatter from './pages/tools/JSONFormatter';
import JWTDecoder from './pages/tools/JWTDecoder';
import RegexTester from './pages/tools/RegexTester';
import UUIDGenerator from './pages/tools/UUIDGenerator';
import Base64Converter from './pages/tools/Base64Converter';
import QRCodeGenerator from './pages/tools/QRCodeGenerator';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api-playground" element={<APIPlayground />} />
            <Route path="/json-formatter" element={<JSONFormatter />} />
            <Route path="/jwt-decoder" element={<JWTDecoder />} />
            <Route path="/regex-tester" element={<RegexTester />} />
            <Route path="/uuid-generator" element={<UUIDGenerator />} />
            <Route path="/base64-converter" element={<Base64Converter />} />
            <Route path="/qrcode-generator" element={<QRCodeGenerator />} />
            {/* Fallback for other tools */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
