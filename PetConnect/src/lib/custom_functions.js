function timeAgo(isoDateStr) {
    const date = new Date(isoDateStr);
    const now = new Date();
    const diffMs = now - date; // difference in milliseconds
  
    const seconds = Math.floor(diffMs / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours   = Math.floor(minutes / 60);
    const days    = Math.floor(hours / 24);
    const weeks   = Math.floor(days / 7);
    const months  = Math.floor(days / 30); // approximate month length
  
    if (seconds < 60) {
      return `${seconds} sec ago`;
    } else if (minutes < 60) {
      return `${minutes}min ago`;
    } else if (hours < 24) {
      return `${hours} hours ago`;
    } else if (days < 7) {
      return `${days} days ago`;
    } else if (weeks < 5) {
      return `${weeks} weeks ago`;
    } else {
      return `${months} months ago`;
    }
}

function formatCurrency(amountStr) {
  // Convert the string to a number
  const amount = Number(amountStr);
  // Format the number with commas and exactly two decimals
  return amount.toLocaleString('en-US', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2 
  });
}

export { timeAgo, formatCurrency };