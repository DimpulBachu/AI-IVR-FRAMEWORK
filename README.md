# 🎯 AI IVR Modernization – Task 2

## Objective
Implement a middleware/API layer to connect legacy IVR systems with the Conversational AI stack.

## Components
- **Asterisk** – Voice routing and call control
- **Node.js Backend** – Middleware layer handling communication between VXML and Azure Speech Services
- **Azure Speech Services** – For Text-to-Speech (TTS) and Speech-to-Text (STT)

## Architecture Flow
1. Caller speaks → Asterisk captures audio.
2. Audio sent to Node.js backend for transcription (STT).
3. AI logic determines response text.
4. Text converted back to speech (TTS) via Azure.
5. Audio played back to caller by Asterisk.

## Folder Structure
## Run Instructions
```bash
# Start backend
cd backend
npm install
node server.js

# Start Asterisk
sudo /usr/local/sbin/asterisk -vvvvvc

# Reload Dialplan
sudo asterisk -rx "dialplan reload"
