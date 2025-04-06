// ExpandableCard.jsx
import React, { createContext, useContext, useState } from 'react';
import Modal from './model';

// Create a context for sharing state
const ExpandableCardContext = createContext();

function ExpandableCard({ children }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <ExpandableCardContext.Provider value={{ isExpanded, toggleExpanded }}>
      <div className="card">{children}</div>
    </ExpandableCardContext.Provider>
  );
}

// Sub-component for shrunk content
function ShrunkContent({ children }) {
  const { toggleExpanded } = useContext(ExpandableCardContext);
  return (
    <div onClick={toggleExpanded} className="cursor-pointer">
      {children}
    </div>
  );
}

// Sub-component for expanded content
function ExpandedContent({ children }) {
  const { isExpanded, toggleExpanded } = useContext(ExpandableCardContext);
  return isExpanded ? (
    <Modal onClose={toggleExpanded}>{children}</Modal>
  ) : null;
}

// Attach sub-components to the main component
ExpandableCard.ShrunkContent = ShrunkContent;
ExpandableCard.ExpandedContent = ExpandedContent;

export default ExpandableCard;