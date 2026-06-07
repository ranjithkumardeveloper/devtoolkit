import React, { useState } from "react";
import { format } from "sql-formatter";

const SqlFormatter = () => {
    const [input, setInput] = useState("");
    const [formattedSql, setFormattedSql] = useState("");

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

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">SQL Formatter</h1>

            <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Paste your SQL query here..."
                className="w-full h-48 border rounded-lg p-3"
            />

            <button
                onClick={handleFormat}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
            >
                Format SQL
            </button>

            <textarea
                value={formattedSql}
                readOnly
                className="w-full h-64 border rounded-lg p-3 mt-4 bg-gray-50"
            />
        </div>
    );
};

export default SqlFormatter;