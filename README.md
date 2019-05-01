Airship AR Demo App

## Setup

- Be sure to have Homebrew, Node, & Watchman installed on OSX
- Download the Viro Media App | [iOS](https://itunes.apple.com/us/app/viro-media/id1163100576?mt=8) | [Andoird](https://play.google.com/store/apps/details?id=com.viromedia.viromedia)
- [Create an API key with Viro](https://viromedia.com/signup) and replace the `API_KEY` in `config.js`
- `yarn global add react-native-cli`
- `yarn`
- `yarn start`
- Open the Viro Media App on your iOS or Android device.
- Tap on the menu icon in the top left and tap on "Enter Testbed".
- Find your ngrok url (https://xxxxxx.ngrok.io) which is printed at the top of the terminal window where you ran npm start. Enter that into the empty text field on the Testbed screen (xxxxxx.ngrok.io) and press "Go".
