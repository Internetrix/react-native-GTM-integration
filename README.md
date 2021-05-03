## Introduction
This is a test React Native app used to demo how a React Native app can be connected to Google Analytics/Firebase and Google Tag Manager, using the [@react-native-firebase](https://rnfirebase.io/analytics/usage/) library.
This app communicates with the Android interface (Java) where a simple calculation function is written in Java (as a reactMethod), and this Java method is called in the React Native front-end, with the return value of the method displayed to the user in the app.
The app also demonstrates how an app can share a clientId with a Webview so that sessions can be stitched together in Google Analytics. A seperate web view is added to the app and is rendered when a button is clicked on the app's landing page.

## Libraries
This demo app uses the following main libraries:
* @react-native-firebase/analytics
* @react-native-firebase/app
* react-native-webview

## Installation & Configuration
* Run `npm install` to install dependencies
* Add the path of your Android SDK to PATH variable. For e.g -  C:\Users\YourUserName\AppData\Local\Android\sdk\platform-tools
* Replace the `clientId` JavaScript variable in App.js with your own hardcoded / autogenerated clientId
* Replace the placeholder example URL: https://example.com.au in App.js with your own URL you wish to use in the Webview.
* The app can then be loaded on an Android stimulator by running `react-native run-android` command from the project's root directory.

## Setup GA/GTM integration
This React Native app is connected to Firebase/Google Analytics using the steps descirbed in https://firebase.google.com/docs/android/setup
Once the app is connected with Firebase, to connect it with GTM, follow these steps:

<ol>
<li>Add the following line under 'dependencies' within the app gradle implementation <b>'com.google.android.gms:play-services-tagmanager:17.0.0'</b></li>
<li>Create GTM Container and download default container and place this default container into a created 'containers' folder in the directory: <b>app/main/assets/containers</b> Note: This has to be an actual folder with the exact name—otherwise GTM will not be installed correctly.</li>
<li>Add GCP credentials to a `google-services.json` folder at the path: `app/google-services.json`</li>
<li>Once all this is setup call <b>firebase.analytics()</b> function in react-native to send data to GTM.</li>
</ol>

## Preserving clientId between web and app views
This app demonstrates how the clientID of a React Native app can be preserved within a webview in order to prevent creating two users/sessions being created when a user switches to a Webview inside the app.  

Once a auto-generated clientId is generated (a GUID for example), the clientId of the app is set to a pre-defined value based on the command: `firebase.analytics().setUserProperty("app_cid", clientId);`


The same ClientId is passed as a url parameter to the Webview and then extracted and used as the clientId for the webview, in the Web GTM container. For demo purposes, the app is passed as a URL parameters to the Webview but other methods are also possible, so long as the Webview is passed the same ClientId as the one that the App is using.
