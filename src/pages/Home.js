import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  HiCode, 
  HiLockClosed, 
  HiLightningBolt, 
  HiCube, 
  HiAdjustments, 
  HiSearch,
  HiQrcode
} from 'react-icons/hi';

const tools = [
  {
    id: 'api-playground',
    title: 'API Playground',
    description: 'Test your REST APIs with a powerful and intuitive interface.',
    icon: <HiLightningBolt className="w-8 h-8 text-yellow-500" />,
    path: '/api-playground',
    color: 'from-yellow-500/20 to-orange-500/20'
  },
  {
    id: 'json-formatter',
    title: 'JSON Formatter',
    description: 'Format, validate, and minify your JSON data instantly.',
    icon: <HiCode className="w-8 h-8 text-blue-500" />,
    path: '/json-formatter',
    color: 'from-blue-500/20 to-indigo-500/20'
  },
  {
    id: 'jwt-decoder',
    title: 'JWT Decoder',
    description: 'Decode and inspect JSON Web Tokens safely.',
    icon: <HiLockClosed className="w-8 h-8 text-purple-500" />,
    path: '/jwt-decoder',
    color: 'from-purple-500/20 to-pink-500/20'
  },
  {
    id: 'regex-tester',
    title: 'Regex Tester',
    description: 'Build and test complex regular expressions with ease.',
    icon: <HiSearch className="w-8 h-8 text-green-500" />,
    path: '/regex-tester',
    color: 'from-green-500/20 to-emerald-500/20'
  },
  {
    id: 'uuid-generator',
    title: 'UUID Generator',
    description: 'Generate secure, cryptographically strong UUIDs (v4).',
    icon: <HiCube className="w-8 h-8 text-red-500" />,
    path: '/uuid-generator',
    color: 'from-red-500/20 to-rose-500/20'
  },
  {
    id: 'base64-converter',
    title: 'Base64 Converter',
    description: 'Encode and decode strings to/from Base64 format.',
    icon: <HiAdjustments className="w-8 h-8 text-cyan-500" />,
    path: '/base64-converter',
    color: 'from-cyan-500/20 to-teal-500/20'
  },
  {
    id: 'qrcode-generator',
    title: 'QR Code Generator',
    description: 'Create and customize QR codes for URLs or text.',
    icon: <HiQrcode className="w-8 h-8 text-indigo-500" />,
    path: '/qrcode-generator',
    color: 'from-indigo-500/20 to-blue-500/20'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1
  }
};

const Home = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const filteredTools = tools.filter(tool => 
    tool.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    tool.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-4xl md:text-6xl font-extrabold mb-4"
        >
          Devtool<span className="text-primary">Kit</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-xl text-slate-500 dark:text-slate-400 max-w-2xl mx-auto mb-8"
        >
          The ultimate productivity suite for developers. All the tools you need, in one beautiful place.
        </motion.p>

        {/* Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative max-w-xl mx-auto"
        >
          <HiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search for a tool (e.g. JSON, JWT, API...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 rounded-2xl bg-card border border-border shadow-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </motion.div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        {filteredTools.map((tool) => (
          <Link key={tool.id} to={tool.path}>
            <motion.div
              variants={itemVariants}
              whileHover={{ 
                scale: 1.05,
                translateY: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
              className={`h-full p-8 rounded-2xl bg-card border border-border flex flex-col items-start transition-all duration-300 relative overflow-hidden group`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${tool.color} blur-3xl -mr-8 -mt-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              
              <div className="mb-4 relative z-10 p-3 rounded-xl bg-slate-100 dark:bg-slate-800">
                {tool.icon}
              </div>
              
              <h3 className="text-2xl font-bold mb-2 relative z-10">{tool.title}</h3>
              <p className="text-slate-500 dark:text-slate-400 relative z-10 flex-grow">
                {tool.description}
              </p>
              
              <div className="mt-6 flex items-center text-primary font-semibold relative z-10">
                Open Tool
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {filteredTools.length === 0 && (
        <div className="text-center py-20">
          <p className="text-slate-400 italic text-lg">No tools found matching "{searchQuery}"</p>
          <button 
            onClick={() => setSearchQuery('')}
            className="mt-4 text-primary font-bold hover:underline"
          >
            Clear search
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
