export const sanitizeInput = (input: string): string => {
  // Remove special characters using regular expressions
  const sanitizedText = input.replace(/[^\w\s]/gi, "");
  // Escape HTML entities
  const escapeHtml = (text: string): string => {
    const map: { [key: string]: string } = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };
    return text.replace(/[&<>"']/g, (m) => map[m]);
  };

  return escapeHtml(sanitizedText);
};
