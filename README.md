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
* Add the path of your Android SDK to PATH variable in your local machine. For e.g -  C:\Users\YourUserName\AppData\Local\Android\sdk\platform-tools
* Make sure you have installed both Java JDK and JKE in your local machine (JDK and JRE versions should be matching )
* Replace the path to Java JDK in gradle.properties with your own local path e.g. - `org.gradle.java.home=C:\\Program Files\\Java\\jdk1.8.0_291`
* Create a file called `local.properties` in android directory as android/local.properties.
* Add the path to your android SDK to the local.properties file e.g. - `sdk.dir=C\:\\Users\\YourUserName\\AppData\\Local\\Android\\Sdk`
* Replace the `clientId` JavaScript variable in App.js with your own hardcoded / autogenerated clientId
* Replace the placeholder example URL: https://example.com.au in App.js with your own URL you wish to use in the Webview.
* The app can then be loaded on an Android stimulator by running `react-native run-android` command from the project's root directory.

## Setup GA/GTM integration
This React Native Android app is connected to Firebase/Google Analytics using the steps descirbed in https://firebase.google.com/docs/android/setup
(<b>Note: </b>To connect Firebase/GA to a iOS app, please follow steps described in https://firebase.google.com/docs/ios/setup)

Once the app is connected with Firebase, to connect it with GTM, follow these steps:
<ol>
<li>Add  `google-services.json` file (which is downloaded as part of the process of adding Firebase to Android project -https://firebase.google.com/docs/android/setup ) to folder at the path: `app/google-services.json`</li>
<li>Create GTM Container and download default container and place this default container into a created 'containers' folder in the directory: <b>app/main/assets/containers</b> Note: This has to be an actual folder with the exact name—otherwise GTM will not be installed correctly.</li>
<li>Make sure to add the latest google tag manager package for android under 'dependencies' within the app gradle implementation : The current latest is <b>'com.google.android.gms:play-services-tagmanager:17.0.0'</b></li>
<li> <b>Note: </b>If you are setting up the app for iOS, make sure to use the latest GTM pod : The current latest is at <b>https://cocoapods.org/pods/GoogleTagManager</b></li>
<li>Once all this is setup call <b>firebase.analytics()</b> function in react-native to send data to GTM.</li>
<li>For additional information on connecting an android app to GTM, please visit https://developers.google.com/tag-manager/android/v5</li>
 <li><b>Note: </b>Please follow the steps described in https://developers.google.com/tag-manager/ios/v5 to add GTM for an iOS app</li>
</ol>

## Preserving clientId between web and app views
This app demonstrates how the clientID of a React Native app can be preserved within a webview in order to prevent creating two users/sessions being created when a user switches to a Webview inside the app.  

Once a auto-generated clientId is generated (a GUID for example), the clientId of the app is set to a pre-defined value based on the command: `firebase.analytics().setUserProperty("app_cid", clientId);`


The same ClientId is passed as a url parameter to the Webview and then extracted and used as the clientId for the webview, in the Web GTM container. For demo purposes, the app is passed as a URL parameters to the Webview but other methods are also possible, so long as the Webview is passed the same ClientId as the one that the App is using.
