/* Copyright 2021 Internetrix
This program is free software; you can redistribute it and/or
modify it under the terms of the GNU General Public License
version 2 as published by the Free Software Foundation.
This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU General Public License for more details. */
package com.firstapp;
 
import android.widget.Toast;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

import java.util.Map;
import java.util.HashMap;

public class ToastModule extends ReactContextBaseJavaModule {
  private static ReactApplicationContext reactContext;

  private static final String DURATION_SHORT_KEY = "SHORT";
  private static final String DURATION_LONG_KEY = "LONG";
  private static final String YOUR_SECRET_KEY= "ANU-REACT-NATIVE-JAVA";
  private static Integer answer = 0;
  ToastModule(ReactApplicationContext context) {
    super(context);
    reactContext = context;
  }

  @Override
  public String getName() {
    return "CalcExample";
  }

  @Override
  public Map<String, Object> getConstants() {
    final Map<String, Object> constants = new HashMap<>();
    constants.put(DURATION_SHORT_KEY, Toast.LENGTH_SHORT);
    constants.put(DURATION_LONG_KEY, Toast.LENGTH_LONG);
    return constants;
  }

  @ReactMethod
  public void show(String message, int num1, int num2,  int duration) {
    if (message.charAt(0) == 'a'){
      ToastModule.answer = num1 + num2;
    }
    else if (message.charAt(0) == 's'){
      ToastModule.answer = num1 - num2;
    }
    else if (message.charAt(0) == 'd'){
      ToastModule.answer = num1 / num2;
    }
    else if (message.charAt(0) == 'm'){
      ToastModule.answer = num1 * num2;
    }
    else{
      ToastModule.answer= 0;
    }
     String outputMessage= "Command: "
      + message + '\n' 
      + "Verify user: " 
      + ToastModule.YOUR_SECRET_KEY 
      + '\n'
      + "Your answer is: " 
      + Integer.toString(ToastModule.answer);


    Toast.makeText(getReactApplicationContext(), outputMessage , duration).show();
  }
}