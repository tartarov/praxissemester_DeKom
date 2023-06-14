package com.minechess123.ProjectLaunch_DeKom;

import android.app.Activity;
import android.app.ActivityManager;
import android.app.Application;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.nfc.NfcAdapter;
import android.nfc.Tag;
import android.os.Build;
import android.os.IBinder;
import android.os.RemoteException;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;

import com.facebook.react.bridge.ActivityEventListener;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.Callback;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.governikus.ausweisapp2.IAusweisApp2Sdk;
import com.governikus.ausweisapp2.IAusweisApp2SdkCallback;

import org.json.JSONException;
import org.json.JSONObject;

public class Aa2_ConnectorModule extends ReactContextBaseJavaModule implements ActivityEventListener {

    private static final String AA2_PROCESS = "ausweisapp2_service";
    IAusweisApp2Sdk mSdk;
    ServiceConnection mConnection;
    ReactApplicationContext reactContext;
    LocalCallback mCallback;

    public Aa2_ConnectorModule(ReactApplicationContext reactContext) {
        super(reactContext);
        reactContext.addActivityEventListener(this);

        if (isAA2Process()) {
            System.out.println("anwendung läuft schon!");
            return;
        }

            mConnection= new ServiceConnection() {
            @Override
            public void onServiceConnected(ComponentName className, IBinder service) {
                try {
                    mSdk = IAusweisApp2Sdk.Stub.asInterface(service);
                    System.out.println("init success! ");
                    mCallback = new LocalCallback(mSdk); //mSdk
                    System.out.println("callBack init: " + mCallback);

                    mSdk.connectSdk(mCallback);

                    Activity currentActivity = reactContext.getCurrentActivity();
                    if( currentActivity != null) {
                        System.out.println(">>>>>>> HANDLE INTENT SHOULD RUN <<<<<<");
                        handleIntent(currentActivity.getIntent(), mCallback);
                    } else{
                        System.out.println("CURRENT ACTIVITY IS NULL ----------");
                    }
                    String cmd = "{\"cmd\": \"RUN_AUTH\", \"tcTokenURL\": \"https://test.governikus-eid.de/AusweisAuskunft/WebServiceRequesterServlet\", \"developerMode\": \"false\", \"handleInterrupt\": \"false\", \"status\": \"true\"}";
                    System.out.println("before send");
                    System.out.println("command?: " + cmd + " -> " + mSdk.send(mCallback.mSessionID, cmd));
                    System.out.println("after send");

                } catch (RemoteException e) {
                    e.printStackTrace();
                }
            }

            @Override
            public void onServiceDisconnected(ComponentName componentName) {

            }
        };
            String pkg =  reactContext.getPackageName();
            String name = "com.governikus.ausweisapp2.START_SERVICE";
            Intent serviceIntent = new Intent(name);
            serviceIntent.setPackage(pkg);
            reactContext.bindService(serviceIntent, mConnection, Context.BIND_AUTO_CREATE);
            //boolean success =
            // callback.invoke(success);
    }


    @ReactMethod
    private boolean isAA2Process()
    {
        if (Build.VERSION.SDK_INT >= 28)
        {
            return Application.getProcessName().endsWith(AA2_PROCESS);
        }

        final int pid = android.os.Process.myPid();
        ActivityManager manager = (ActivityManager) reactContext.getSystemService(reactContext.ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo appProcess : manager.getRunningAppProcesses())
        {
            if (appProcess.pid == pid)
            {
                return appProcess.processName.endsWith(AA2_PROCESS);
            }
        }
        return false;
    }

    @ReactMethod
    void handleIntent(Intent intent, LocalCallback mCallback)
    {
        final Tag tag = intent.getParcelableExtra(NfcAdapter.EXTRA_TAG);
        if (tag != null)
        {
            try {
                mSdk.updateNfcTag(mCallback.mSessionID, tag);
            } catch (RemoteException e) {
                // ...
            }
        }
    }

    @NonNull
    @Override
    public String getName() {
        return "Aa2_Connector";
    }

    @ReactMethod
    public void createCalendarEvent(String name, String location){
        Log.d("Aa2_Connector", "Create event called with name: " + name + " and location: " + location);
    }

    @Override
    public void onActivityResult(Activity activity, int i, int i1, @Nullable Intent intent) {

    }

    @Override
    public void onNewIntent(Intent intent) {
        handleIntent(intent, mCallback);
    }

    public static void sendEvent(ReactContext reactContext, String eventName, String params) {
        System.out.println("<<<<<<<sendEvent:   params>>>>>>>>: " + params);
        reactContext
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, params);
    }

    class LocalCallback extends IAusweisApp2SdkCallback.Stub {
        public String mSessionID = null;
        public IAusweisApp2Sdk mSdk;

        @Override
        public void sessionIdGenerated(String pSessionId, boolean pIsSecureSessionId) throws RemoteException {
            mSessionID = pSessionId;
        }

        public LocalCallback(IAusweisApp2Sdk mSdk) {
            this.mSdk = mSdk;
        }

        @Override
        public void receive(String pJson) throws RemoteException {
            try {
                JSONObject json = new JSONObject(pJson);
                String msg = json.getString("msg");
                System.out.println("pJSON +++++++++: " + msg);
                if (msg.equals("ACCESS_RIGHTS")) {
                    System.out.println("Access rights are done! Congrats");
                    String cmdTwo = "{\"cmd\": \"ACCEPT\"}";
                    mSdk.send(this.mSessionID, cmdTwo);
                }
                if (msg.equals("ENTER_PIN")) {
                    String cmdThree = "{\"cmd\": \"SET_PIN\", \"value\": \"451086\"}";
                    mSdk.send(this.mSessionID, cmdThree);
                }

                if (msg.equals("ENTER_CAN")) {
                    String cmdFour = "{\"cmd\": \"SET_CAN\", \"value\": \"491908\"}";
                    mSdk.send(this.mSessionID, cmdFour);
                }
                System.out.println("<<<<<<<pJSON>>>>>>>>: " + pJson);
                Aa2_ConnectorModule.sendEvent(getReactApplicationContext(),"pJson", pJson);

            } catch (JSONException e) {
                e.printStackTrace();
            }
            // handle message from SDK
        }

        @Override
        public void sdkDisconnected() throws RemoteException {

        }
    }
}
