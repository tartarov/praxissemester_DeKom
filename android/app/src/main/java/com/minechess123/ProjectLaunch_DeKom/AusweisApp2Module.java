package com.minechess123.ProjectLaunch_DeKom;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.modules.core.DeviceEventManagerModule;

 class AusweisApp2Module extends ReactContextBaseJavaModule {

    public AusweisApp2Module(ReactApplicationContext reactContext) {
        super(reactContext);

    }

    @NonNull
    @Override
    public String getName() {
        return "AusweisApp2Module";
    }

    @ReactMethod
    public void handleJson(String json) {
        // Pass the received JSON string to your React Native component
        // You can emit an event or use any other method to send the data
        // to your React Native component
        // For example, you can use the DeviceEventManagerModule

        // Get the ReactApplicationContext
        ReactApplicationContext reactContext = getReactApplicationContext();
        System.out.println("String Json from handleJson: " + json);

        // Emit an event to send the JSON data to the React Native component
        reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit("AusweisApp2Event", json);
    }
}