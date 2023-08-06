/**
 * Strips the prefix from the keys of the given key-value pairs
 * @param {string} htmlContent - HTML content which needs to be highlighted
 * @param {string} plainText - This plain text is extracted from htmlContent
 * @param {array} plainTextPositions - Array of Objects with start and end positions of words in plainText (Not the positions in HTML)
 * @returns {string} Using the positions in plainText, find the appropriate positions in htmlContent, highlight the content and return it
 */

export default function highlightHTMLContent(
  htmlContent,
  plainText,
  plainTextPositions
) {
  let highlightedContent = htmlContent;

  plainTextPositions.forEach((position) => {
    const { start, end } = position;
    // const plainTextToHighlightX = plainText.slice(start - 3, end + 3);
    const plainTextToHighlight = plainText.slice(start, end);

    // Find the starting position in the htmlContent by considering HTML tags and line breaks
    const startHTMLPos = highlightedContent.indexOf(
      plainTextToHighlight,
      start
    );
    // console.log(startHTMLPos);

    if (startHTMLPos !== -1) {
      // Calculate the corresponding end position in the htmlContent
      const endHTMLPos = startHTMLPos + plainTextToHighlight.length;

      // Wrap the plainText in <mark> tags to highlight it in the htmlContent
      const before = highlightedContent.slice(0, startHTMLPos);
      const highlighted = `<mark>${highlightedContent.slice(
        startHTMLPos,
        endHTMLPos
      )}</mark>`;
      const after = highlightedContent.slice(endHTMLPos);
      highlightedContent = before + highlighted + after;
    }
  });

  return highlightedContent;
}
