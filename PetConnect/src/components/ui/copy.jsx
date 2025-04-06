import { useState } from 'react';

const CopyToClipboard = ({ textToCopy, displayText, className = '' }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`flex items-center justify-between gap-3 px-3 py-1 bg-gray-50 rounded-md border border-gray-200 ${className}`}>
      <span className="text-sm font-mono max-w-[350px] text-gray-600 truncate">
        {displayText || textToCopy}
      </span>
      
      <button
        onClick={handleCopy}
        className="flex-shrink-0 flex items-center gap-1 p-1 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-md transition-colors duration-200"
        aria-label={isCopied ? 'Copied!' : 'Copy to clipboard'}
      >
        {isCopied ? (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-green-600"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <span>Copied</span>
          </>
        ) : (
          <>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
            <span>Copy</span>
          </>
        )}
      </button>
    </div>
  );
};

export default CopyToClipboard;