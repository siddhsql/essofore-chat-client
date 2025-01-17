// https://stackoverflow.com/a/78421259
const completionArgs = {
  cachePrompt: true,
  penalizeNl: true,
  query: "Who is Sherlock Holmes?",
  nPredict: -1,
  temperature: 0.8,
  rag: false,  
};

const url = `http://localhost:8080/completion`;

  const options = {
    method: 'POST',
    headers: {
      'accept': 'text/event-stream',
      'content-type': 'application/json',      
    },
    body: JSON.stringify(completionArgs)
  };

const parse = (data) => {
  const match = data.match(/^data:(.+)\n/); // Match "data: " followed by content and a newline
  return match ? JSON.parse(match[1]).text : ''; // Get the first capture group
}

  fetch(url, options)
  .then(res => res.body?.pipeThrough(new TextDecoderStream()).getReader()) // <-- This is the key part: transforming the body into a stream
  .then(async (reader) => {
    while(reader) {
      const { done, value } = await reader.read();
      if (done) {
        //console.log("\ndone")
        break;
      }
      process.stdout.write(parse(value));
    }
  })
  .catch(err => console.log(`event: error\ndata: {"message": "${err}"}\n\n`))
  