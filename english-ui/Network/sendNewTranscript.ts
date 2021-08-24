const sendNewTranscript = (uuid: string, text: string, id: string) => {
  fetch(process.env.NEXT_PUBLIC_MESSAGES_API, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ uuid, text, id })
  }).then(data => console.log(data));
}

export default sendNewTranscript;
