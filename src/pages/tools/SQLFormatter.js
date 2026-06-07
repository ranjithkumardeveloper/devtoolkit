import React, { useState } from "react";
import { format } from "sql-formatter";
import { motion } from "framer-motion";
import {
    HiCodeBracket,
    HiClipboard,
    HiCheck,
} from "react-icons/hi2";

const SqlFormatter = () => {
    const [input, setInput] = useState("");
    const [formattedSql, setFormattedSql] = useState("");
    const [copied, setCopied] = useState(false);

    const handleFormat = () => {
        try {
            const result = format(input, {
                language: "sql",
            });

            setFormattedSql(result);
        } catch (error) {
            setFormattedSql("Invalid SQL Query");
        }
    };

    const copyToClipboard = async () => {
        if (!formattedSql) return;

        await navigator.clipboard.writeText(formattedSql);
        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);
    };

    const clearAll = () => {
        setInput("");
        setFormattedSql("");
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header */}
            <div className="flex items-center space-x-4 mb-8">
                <div className="p-3 bg-indigo-500 rounded-xl text-white">
                    <HiCodeBracket className="w-8 h-8" />
                </div>

                <div>
                    <h1 className="text-3xl font-bold">SQL Formatter</h1>
                    <p className="text-slate-500 dark:text-slate-400">
                        Format and beautify SQL queries for better readability and debugging.
                    </p>
                </div>
            </div>

            {/* Main Card */}
            <div className="bg-card border border-border rounded-3xl shadow-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                    {/* Input */}
                    <div>
                        <h3 className="font-semibold mb-3">Input SQL</h3>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Paste your SQL query here..."
                            className="
                w-full h-96 p-4 rounded-2xl
                border border-border
                bg-slate-50 dark:bg-slate-900/50
                text-slate-800 dark:text-slate-200
                focus:outline-none focus:ring-2 focus:ring-primary
                font-mono text-sm
              "
                        />
                    </div>

                    {/* Output */}
                    <div>
                        <h3 className="font-semibold mb-3">Formatted SQL</h3>

                        <textarea
                            value={formattedSql}
                            readOnly
                            placeholder="Formatted SQL will appear here..."
                            className="
                w-full h-96 p-4 rounded-2xl
                border border-border
                bg-slate-50 dark:bg-slate-900/50
                text-slate-800 dark:text-slate-200
                focus:outline-none
                font-mono text-sm
              "
                        />
                    </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 mt-6">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleFormat}
                        className="
              px-6 py-3
              bg-primary text-white
              rounded-xl font-bold
              shadow-lg shadow-primary/20
            "
                    >
                        Format SQL
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={copyToClipboard}
                        disabled={!formattedSql}
                        className="
              flex items-center
              px-6 py-3
              bg-slate-200 dark:bg-slate-800
              hover:bg-slate-300 dark:hover:bg-slate-700
              rounded-xl font-bold
              transition-all
            "
                    >
                        {copied ? (
                            <>
                                <HiCheck className="mr-2 w-5 h-5 text-green-500" />
                                Copied!
                            </>
                        ) : (
                            <>
                                <HiClipboard className="mr-2 w-5 h-5" />
                                Copy SQL
                            </>
                        )}
                    </motion.button>

                    <button
                        onClick={clearAll}
                        className="
              px-6 py-3
              bg-red-500 text-white
              rounded-xl font-bold
              hover:bg-red-600
              transition-all
            "
                    >
                        Clear
                    </button>
                </div>
            </div>

            {/* Info Section */}
            <div className="mt-8 bg-card p-6 rounded-2xl border border-border">
                <h3 className="text-lg font-bold mb-4">
                    Why use SQL Formatter?
                </h3>

                <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
                    SQL formatting improves readability by organizing keywords,
                    indentation, and line breaks consistently. It helps developers
                    debug queries faster, review code efficiently, and maintain a
                    consistent coding style across projects.
                </p>
            </div>
        </div>
    );
};

export default SqlFormatter;