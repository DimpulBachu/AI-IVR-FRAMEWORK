irequire('dotenv').config();
const fs = require('fs');
const speechSdk = require('microsoft-cognitiveservices-speech-sdk');

const AZURE_KEY = process.env.AZURE_SPEECH_KEY;
const AZURE_REGION = process.env.AZURE_REGION;

// Speech-to-Text
async function speechToText(audioFilePath) {
    return new Promise((resolve, reject) => {
        const pushStream = speechSdk.AudioInputStream.createPushStream();
        fs.createReadStream(audioFilePath)
          .on('data', chunk => pushStream.write(chunk))
          .on('end', () => pushStream.close());

        const audioConfig = speechSdk.AudioConfig.fromStreamInput(pushStream);
        const speechConfig = speechSdk.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);

        const recognizer = new speechSdk.SpeechRecognizer(speechConfig, audioConfig);
        recognizer.recognizeOnceAsync(
            result => {
                if (result.reason === speechSdk.ResultReason.RecognizedSpeech) resolve(result.text);
                else reject(result);
            },
            err => reject(err)
        );
    });
}

// Text-to-Speech
async function textToSpeech(text, outputFilePath) {
    return new Promise((resolve, reject) => {
        const speechConfig = speechSdk.SpeechConfig.fromSubscription(AZURE_KEY, AZURE_REGION);
        speechConfig.speechSynthesisOutputFormat = speechSdk.SpeechSynthesisOutputFormat.Audio16Khz32KBitRateMonoMp3;

        const audioConfig = speechSdk.AudioConfig.fromAudioFileOutput(outputFilePath);
        const synthesizer = new speechSdk.SpeechSynthesizer(speechConfig, audioConfig);

        synthesizer.speakTextAsync(
            text,
            result => {
                if (result.reason === speechSdk.ResultReason.SynthesizingAudioCompleted) resolve(outputFilePath);
                else reject(result.errorDetails);
            },
            err => reject(err)
        );
    });
}

module.exports = { speechToText, textToSpeech };

  