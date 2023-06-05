const sendNewTranscript = (uuid: string, text: string, id: string): void => {
  fetch("/api/messages", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ uuid, text, id }),
  });
};

export default sendNewTranscript;
