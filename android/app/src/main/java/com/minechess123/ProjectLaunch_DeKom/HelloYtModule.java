package com.minechess123.ProjectLaunch_DeKom;

import android.util.Log;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class HelloYtModule extends ReactContextBaseJavaModule {
    private static ReactApplicationContext reactContext;

     HelloYtModule(ReactApplicationContext context) {
        super(context);
        reactContext = context;
    }

    @NonNull
    @Override
    public String getName() {
        return "HelloYtModule";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location){
        Log.d("HelloYtModule", "Create event called with name: " + name + " and location: " + location);
    }
}
