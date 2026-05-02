import React, { useState, useEffect } from 'react';
import { HiSearch, HiOutlineLightBulb, HiFlag, HiCheckCircle, HiXCircle } from 'react-icons/hi';

const RegexTester = () => {
  const [regex, setRegex] = useState('([a-z0-9._%+-]+)@([a-z0-9.-]+\\.[a-z]{2,})');
  const [flags, setFlags] = useState('g');
  const [testString, setTestString] = useState('hello@example.com and user.name@domain.co.uk');
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!regex) {
      setMatches([]);
      setError('');
      return;
    }

    try {
      const re = new RegExp(regex, flags);
      const results = [];
      let match;

      if (flags.includes('g')) {
        while ((match = re.exec(testString)) !== null) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
          if (re.lastIndex === match.index) re.lastIndex++; // Prevent infinite loops with zero-width matches
        }
      } else {
        match = re.exec(testString);
        if (match) {
          results.push({
            text: match[0],
            index: match.index,
            groups: match.slice(1)
          });
        }
      }
      setMatches(results);
      setError('');
    } catch (e) {
      setError(e.message);
      setMatches([]);
    }
  }, [regex, flags, testString]);

  const highlightMatches = () => {
    if (error || !regex || matches.length === 0) return testString;

    let result = [];
    let lastIndex = 0;

    // Sort matches by index to handle them in order
    const sortedMatches = [...matches].sort((a, b) => a.index - b.index);

    sortedMatches.forEach((match, i) => {
      // Add text before match
      result.push(testString.substring(lastIndex, match.index));
      // Add highlighted match
      result.push(
        <mark key={i} className="bg-yellow-300 dark:bg-yellow-500/50 text-black dark:text-white rounded-sm px-0.5">
          {match.text}
        </mark>
      );
      lastIndex = match.index + match.text.length;
    });

    // Add remaining text
    result.push(testString.substring(lastIndex));
    return result;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center space-x-4 mb-8">
        <div className="p-3 bg-green-500 rounded-xl text-white">
          <HiSearch className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-3xl font-bold">Regex Tester</h1>
          <p className="text-slate-500 dark:text-slate-400">Build, test, and debug regular expressions in real-time.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Regex Input */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <label className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Regular Expression</label>
              <div className="flex items-center space-x-2">
                <HiFlag className="text-slate-400" />
                <input
                  type="text"
                  value={flags}
                  onChange={(e) => setFlags(e.target.value)}
                  placeholder="flags (g, i, m)"
                  className="w-20 px-2 py-1 text-sm rounded bg-slate-100 dark:bg-slate-800 border border-border outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>
            <div className="flex items-center p-4 bg-slate-100 dark:bg-slate-800 rounded-xl border border-border">
              <span className="text-slate-400 font-mono mr-2">/</span>
              <input
                type="text"
                value={regex}
                onChange={(e) => setRegex(e.target.value)}
                placeholder="Enter regex pattern..."
                className="flex-grow bg-transparent outline-none font-mono text-lg text-primary"
              />
              <span className="text-slate-400 font-mono ml-2">/{flags}</span>
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500 flex items-center">
                <HiXCircle className="mr-1" /> {error}
              </p>
            )}
            {!error && regex && (
              <p className="mt-2 text-sm text-green-500 flex items-center">
                <HiCheckCircle className="mr-1" /> Valid Expression
              </p>
            )}
          </div>

          {/* Test String Input */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Test String</label>
            <div className="relative">
              <textarea
                value={testString}
                onChange={(e) => setTestString(e.target.value)}
                className="w-full h-40 p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border focus:ring-2 focus:ring-primary outline-none font-mono text-sm resize-none"
                placeholder="Enter text to test against..."
              />
              <div className="absolute top-0 left-0 w-full h-full p-4 pointer-events-none font-mono text-sm break-all overflow-auto whitespace-pre-wrap">
                <div className="opacity-0">{testString}</div>
                {/* This is a simplified highlight overlay, in a real app we'd use a more robust editor */}
              </div>
            </div>
          </div>

          {/* Matches Result */}
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm min-h-[150px]">
            <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">Highlighted Results</label>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-border font-mono text-sm whitespace-pre-wrap min-h-[100px]">
              {highlightMatches()}
            </div>
          </div>
        </div>

        {/* Sidebar / Info */}
        <div className="space-y-6">
          <div className="bg-card p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-lg font-bold mb-4 flex items-center">
              <HiOutlineLightBulb className="mr-2 text-yellow-500" /> Matches ({matches.length})
            </h3>
            <div className="space-y-4 max-h-[400px] overflow-auto pr-2">
              {matches.map((match, i) => (
                <div key={i} className="p-3 bg-slate-50 dark:bg-slate-900 rounded-lg border-l-4 border-primary">
                  <div className="text-xs text-slate-400 mb-1">Match {i + 1} at index {match.index}</div>
                  <div className="font-mono text-sm font-bold truncate">{match.text}</div>
                  {match.groups.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <div className="text-[10px] uppercase text-slate-400 font-bold mb-1">Groups</div>
                      {match.groups.map((group, gi) => (
                        <div key={gi} className="text-xs font-mono text-slate-500">
                          ${gi + 1}: <span className="text-primary">{group || 'null'}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              {matches.length === 0 && (
                <p className="text-sm text-slate-400 italic">No matches found.</p>
              )}
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent p-6 rounded-2xl text-white shadow-lg shadow-primary/20">
            <h4 className="font-bold mb-2">Regex Quick Reference</h4>
            <ul className="text-xs space-y-2 opacity-90">
              <li><code className="bg-white/20 px-1 rounded">.</code> Any character</li>
              <li><code className="bg-white/20 px-1 rounded">\d</code> Digit [0-9]</li>
              <li><code className="bg-white/20 px-1 rounded">\w</code> Word character [a-zA-Z0-9_]</li>
              <li><code className="bg-white/20 px-1 rounded">+</code> 1 or more</li>
              <li><code className="bg-white/20 px-1 rounded">*</code> 0 or more</li>
              <li><code className="bg-white/20 px-1 rounded">?</code> 0 or 1</li>
              <li><code className="bg-white/20 px-1 rounded">^</code> Start of string</li>
              <li><code className="bg-white/20 px-1 rounded">$</code> End of string</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegexTester;
