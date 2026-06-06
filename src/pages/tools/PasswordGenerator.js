import React, { useEffect, useState, useCallback } from "react";
import { HiOutlineClipboardCopy } from "react-icons/hi";
import { HiArrowPath, HiXMark } from "react-icons/hi2";

const PasswordGenerater = () => {
    const [randomPasswordLength, setRandomPasswordLength] = useState(15);
    const [password, setPassword] = useState("");
    const [mixedCase, setMixedCase] = useState(true);
    const [uppercase, setUppercase] = useState(false);
    const [lowercase, setLowercase] = useState(false);
    const [numbers, setNumbers] = useState(false);
    const [symbols, setSymbols] = useState(false);
    const [showModal, setShowModal] = useState(false);



    const generatePassword = useCallback((length) => {
        let charset = "";

        if (mixedCase)
            charset += "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (uppercase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        if (lowercase) charset += "abcdefghijklmnopqrstuvwxyz";
        if (numbers) charset += "0123456789";
        if (symbols) charset += "!@#$%^&*()";

        if (!charset) {
            charset =
                "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
        }

        let generatedPassword = "";

        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(
                Math.random() * charset.length
            );
            generatedPassword += charset[randomIndex];
        }

        return generatedPassword;
    }, [mixedCase, uppercase, lowercase, numbers, symbols]);

    useEffect(() => {
        setPassword(generatePassword(randomPasswordLength));
    }, [randomPasswordLength, generatePassword]);

    const handleSliderChange = (event) => {
        setRandomPasswordLength(parseInt(event.target.value, 10));
    };

    const handleCopy = () => {
        if (!password) return;

        navigator.clipboard
            .writeText(password)
            .then(() => {
                setShowModal(true);
                setTimeout(() => setShowModal(false), 3000);
            })
            .catch((err) => console.error("Failed to copy:", err));
    };

    const handleCheckboxChange = (event) => {
        const { id, checked } = event.target;

        switch (id) {
            case "mixedCase":
                setMixedCase(checked);
                break;
            case "uppercase":
                setUppercase(checked);
                break;
            case "lowercase":
                setLowercase(checked);
                break;
            case "numbers":
                setNumbers(checked);
                break;
            case "symbols":
                setSymbols(checked);
                break;
            default:
                break;
        }
    };

    return (
        <div className="flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-lg p-6 sm:p-10">
                <h1 className="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
                    Password Generator
                </h1>

                {/* Password Length */}
                <div className="mb-6">
                    <p className="text-lg font-medium mb-2">
                        Password Length:{" "}
                        <span className="font-bold">
                            {randomPasswordLength}
                        </span>
                    </p>

                    <input
                        type="range"
                        min="4"
                        max="100"
                        value={randomPasswordLength}
                        onChange={handleSliderChange}
                        className="w-full cursor-pointer accent-primary"
                    />
                </div>

                {/* Password Output */}
                <div className="mb-6">
                    <p className="text-lg font-medium mb-2">
                        Generated Password:
                    </p>

                    <div className="flex items-center border border-border rounded-xl p-3 bg-card">
                        <input
                            type="text"
                            value={password}
                            readOnly
                            className="flex-grow bg-transparent outline-none font-mono text-sm sm:text-base"
                        />

                        <div className="flex items-center gap-2 ml-2">
                            <button
                                onClick={handleCopy}
                                aria-label="Copy Password"
                                className="text-primary hover:opacity-80 transition"
                            >
                                <HiOutlineClipboardCopy className="text-xl" />
                            </button>

                            <button
                                onClick={() =>
                                    setPassword(
                                        generatePassword(
                                            randomPasswordLength
                                        )
                                    )
                                }
                                aria-label="Generate Password"
                                className="text-primary hover:opacity-80 transition"
                            >
                                <HiArrowPath className="text-xl" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Options */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
                    {[
                        {
                            id: "mixedCase",
                            label: "Mixed Case",
                            state: mixedCase,
                        },
                        {
                            id: "uppercase",
                            label: "Uppercase",
                            state: uppercase,
                        },
                        {
                            id: "lowercase",
                            label: "Lowercase",
                            state: lowercase,
                        },
                        {
                            id: "numbers",
                            label: "Numbers",
                            state: numbers,
                        },
                        {
                            id: "symbols",
                            label: "Symbols",
                            state: symbols,
                        },
                    ].map((option) => (
                        <div
                            key={option.id}
                            className="flex items-center"
                        >
                            <input
                                id={option.id}
                                type="checkbox"
                                checked={option.state}
                                onChange={handleCheckboxChange}
                                className="accent-primary"
                            />

                            <label
                                htmlFor={option.id}
                                className="ml-2 text-slate-700 dark:text-slate-300"
                            >
                                {option.label}
                            </label>
                        </div>
                    ))}
                </div>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row justify-center gap-4">
                    <button
                        className="bg-primary text-white px-6 py-2 rounded-lg hover:opacity-90 transition w-full sm:w-auto"
                        onClick={() =>
                            setPassword(
                                generatePassword(randomPasswordLength)
                            )
                        }
                    >
                        Generate Password
                    </button>

                    <button
                        className="bg-emerald-600 text-white px-6 py-2 rounded-lg hover:bg-emerald-700 transition w-full sm:w-auto"
                        onClick={handleCopy}
                    >
                        Copy Password
                    </button>
                </div>

                {/* Success Modal */}
                {showModal && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black/50 p-4 z-50">
                        <div className="bg-card border border-border p-6 sm:p-10 rounded-2xl shadow-2xl flex flex-col items-center relative max-w-lg w-full">
                            <button
                                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 transition"
                                onClick={() =>
                                    setShowModal(false)
                                }
                            >
                                <HiXMark className="text-2xl" />
                            </button>

                            <div className="text-center">
                                <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                                    Password Copied!
                                </h2>

                                <p className="text-slate-600 dark:text-slate-400">
                                    Your password has been copied to the
                                    clipboard. Use it securely and store
                                    it safely.
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default PasswordGenerater;