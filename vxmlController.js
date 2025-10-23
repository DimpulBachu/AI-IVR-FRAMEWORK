const path = require('path');
const { speechToText, textToSpeech } = require('../connectors/bapConnector');

async function handleCall(req, res) {
    const audioFile = path.join(__dirname, '../../tmp/input.wav');  // where Asterisk records
    const outputFile = path.join(__dirname, '../../tmp/output.mp3'); // TTS output

    try {
        const userText = await speechToText(audioFile);
        console.log('Caller said:', userText);

        let botResponse = '';
        if (userText.toLowerCase().includes('balance')) botResponse = 'Your current balance is 1,200 dollars.';
        else if (userText.toLowerCase().includes('support')) botResponse = 'Connecting you to support.';
        else botResponse = `You said: ${userText}`;

        await textToSpeech(botResponse, outputFile);
        res.json({ audioFile: outputFile });
    } catch (err) {
        console.error(err);
        res.status(500).send('Error processing call');
    }
}

module.exports = { handleCall };
