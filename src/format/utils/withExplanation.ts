export const withExplanation = (text: string, explanation: string) =>
    `<div title="${explanation}">${text}<sup>:grey_question:</sup></div>`;
