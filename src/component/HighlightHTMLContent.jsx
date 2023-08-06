import React, { useState } from "react";
import highlightHTMLContent from "../Htmlcontent";

const HighlightHTMLContent = () => {
  const [htmlContent, setHtmlContent] = useState(``);
  const [plainText, setPlainText] = useState(``);
  const [positions, setPositions] = useState([{ start: "", end: "" }]);
  const [highlightedContent, setHighlightedContent] = useState(``);

  const addPosition = () => {
    setPositions([...positions, { start: "", end: "" }]);
  };

  const highlightAndDisplay = () => {
    const plainTextPositions = positions.map(({ start, end }) => ({
      start: parseInt(start),
      end: parseInt(end),
    }));

    const highlightedContent = highlightHTMLContent(
      htmlContent,
      plainText,
      plainTextPositions
    );
    setHighlightedContent(highlightedContent);
  };

  return (
    <div>
      <form>
        <label htmlFor="htmlContent">HTML Content:</label>
        <br />
        <textarea
          id="htmlContent"
          rows="10"
          cols="50"
          required
          value={htmlContent}
          onChange={(e) => setHtmlContent(e.target.value)}
        ></textarea>
        <br />

        <label htmlFor="plainText">Plain Text:</label>
        <br />
        <textarea
          id="plainText"
          rows="3"
          cols="50"
          required
          value={plainText}
          onChange={(e) => setPlainText(e.target.value)}
        ></textarea>
        <br />

        <div id="positions">
          <label>Positions:</label>
          <div id="positionInputs">
            {positions.map((position, index) => (
              <div key={index}>
                <input
                  type="number"
                  placeholder="Start position"
                  required
                  value={position.start}
                  onChange={(e) => {
                    const newPositions = [...positions];
                    newPositions[index].start = e.target.value;
                    setPositions(newPositions);
                  }}
                />
                <input
                  type="number"
                  placeholder="End position"
                  required
                  value={position.end}
                  onChange={(e) => {
                    const newPositions = [...positions];
                    newPositions[index].end = e.target.value;
                    setPositions(newPositions);
                  }}
                />
              </div>
            ))}
          </div>
          <button type="button" onClick={addPosition}>
            Add Position
          </button>
        </div>
        <br />

        <button type="button" onClick={highlightAndDisplay}>
          Highlight and Display
        </button>
      </form>

      {highlightedContent && (
        <div>
          <label htmlFor="highlightedContent" style={{ color: "red" }}>
            Highlighted Content:
          </label>
          <br />
          <div
            id="highlightedContent"
            dangerouslySetInnerHTML={{ __html: highlightedContent }}
          ></div>
        </div>
      )}
    </div>
  );
};

export default HighlightHTMLContent;
