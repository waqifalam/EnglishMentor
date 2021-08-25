const sendNewTranscript = (uuid: string, text: string, id: string): void => {
  const url = process.env.NEXT_PUBLIC_MESSAGES_API;
  if (url) {
    fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ uuid, text, id })
    })
  } else console.log('Error: Could not send transcript because no API url was set in env');
}

export default sendNewTranscript;
