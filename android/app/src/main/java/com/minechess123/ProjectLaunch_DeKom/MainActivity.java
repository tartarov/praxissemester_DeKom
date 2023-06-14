package com.minechess123.ProjectLaunch_DeKom;

import android.app.ActivityManager;
import android.app.Application;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.nfc.NfcAdapter;
import android.nfc.NfcManager;
import android.nfc.Tag;
import android.os.Build;
import android.os.Bundle;
import android.os.IBinder;
import android.os.RemoteException;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactInstanceManager;
import com.facebook.react.ReactRootView;
import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.governikus.ausweisapp2.IAusweisApp2Sdk;
import com.governikus.ausweisapp2.IAusweisApp2SdkCallback;

import org.json.JSONException;
import org.json.JSONObject;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {

  private static final String AA2_PROCESS = "ausweisapp2_service";
  IAusweisApp2Sdk mSdk;
  LocalCallback mCallback;
  private ReactContext reactContext;

  public void sendDataToReactNative(String data) {
    WritableMap params = Arguments.createMap();
    params.putString("key", data);

    reactContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
            .emit("eventName", params);
}


    @Override
  public void onCreate(Bundle savedInstanceState)
  {

      reactContext = getReactInstanceManager().getCurrentReactContext();
    System.out.println("aaaaaaaaaaaaaa-------");
      setTheme(R.style.AppTheme);
      super.onCreate(savedInstanceState);

      if (isAA2Process()) {
        System.out.println("anwendung läuft schon!");
        return;
      }

      ServiceConnection mConnection = new ServiceConnection() {
        @Override
        public void onServiceConnected(ComponentName className, IBinder service) {
          try {
            mSdk = IAusweisApp2Sdk.Stub.asInterface(service);
            System.out.println("init success! ");
            mCallback = new LocalCallback(mSdk); //mSdk
            System.out.println("callBack init: " + mCallback);

            mSdk.connectSdk(mCallback);
            sendDataToReactNative(" <<<<<<< pJson >>>>>>>");

            handleIntent(getIntent(), mCallback);
            String cmd = "{\"cmd\": \"RUN_AUTH\", \"tcTokenURL\": \"https://test.governikus-eid.de/AusweisAuskunft/WebServiceRequesterServlet\", \"developerMode\": \"false\", \"handleInterrupt\": \"false\", \"status\": \"true\"}";
            System.out.println("before send");
            System.out.println("command?: "+cmd+" -> " + mSdk.send(mCallback.mSessionID, cmd));
            System.out.println("after send");

          } catch (RemoteException e) {
            e.printStackTrace();
          }
        }

        @Override
        public void onServiceDisconnected(ComponentName className) {
          mSdk = null;
        }
      };
      String pkg = getApplicationContext().getPackageName();
      String name = "com.governikus.ausweisapp2.START_SERVICE";
      Intent serviceIntent = new Intent(name);
      serviceIntent.setPackage(pkg);
      bindService(serviceIntent, mConnection, Context.BIND_AUTO_CREATE);
      // Perform one-time initialization of YOUR app, e.g. Firebase connection

  }

    @Override
    public void onNewIntent(Intent intent) {
        System.out.println("currentIntent: " + intent);
        super.onNewIntent(intent);
        handleIntent(intent, mCallback);
    }

      private boolean isAA2Process()
    {
        if (Build.VERSION.SDK_INT >= 28)
        {
            return Application.getProcessName().endsWith(AA2_PROCESS);
        }

        final int pid = android.os.Process.myPid();
        ActivityManager manager = (ActivityManager) getSystemService(ACTIVITY_SERVICE);
        for (ActivityManager.RunningAppProcessInfo appProcess : manager.getRunningAppProcesses())
        {
            if (appProcess.pid == pid)
            {
                return appProcess.processName.endsWith(AA2_PROCESS);
            }
        }
        return false;
    }

   public void handleIntent(Intent intent, LocalCallback mCallback)
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



  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  /**
   * Returns the instance of the {@link ReactActivityDelegate}. There the RootView is created and
   * you can specify the renderer you wish to use - the new renderer (Fabric) or the old renderer
   * (Paper).
   */
  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this, BuildConfig.IS_NEW_ARCHITECTURE_ENABLED,
      new MainActivityDelegate(this, getMainComponentName())
    );
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }

  public static class MainActivityDelegate extends ReactActivityDelegate {
    public MainActivityDelegate(ReactActivity activity, String mainComponentName) {
      super(activity, mainComponentName);
    }

    @Override
    protected ReactRootView createRootView() {
      ReactRootView reactRootView = new ReactRootView(getContext());
      // If you opted-in for the New Architecture, we enable the Fabric Renderer.
      reactRootView.setIsFabric(BuildConfig.IS_NEW_ARCHITECTURE_ENABLED);
      return reactRootView;
    }

    @Override
    protected boolean isConcurrentRootEnabled() {
      // If you opted-in for the New Architecture, we enable Concurrent Root (i.e. React 18).
      // More on this on https://reactjs.org/blog/2022/03/29/react-v18.html
      return BuildConfig.IS_NEW_ARCHITECTURE_ENABLED;
    }
  }
}

class LocalCallback extends IAusweisApp2SdkCallback.Stub
{
    public String mSessionID = null;
    public IAusweisApp2Sdk mSdk;
    private AusweisApp2Module mAusweisApp2Module;

    @Override
    public void sessionIdGenerated(
            String pSessionId, boolean pIsSecureSessionId) throws RemoteException
    {
        mSessionID = pSessionId;
    }

    public LocalCallback( IAusweisApp2Sdk mSdk) {
        this.mSdk  = mSdk;
    }

    @Override
    public void receive(String pJson) throws RemoteException
    {

        try {
            JSONObject json = new JSONObject(pJson);
            String msg = json.getString("msg");
            System.out.println("pJSON +++++++++: " + msg);
            if(msg.equals("ACCESS_RIGHTS")) {
                System.out.println("Access rights are done! Congrats");
                String cmdTwo = "{\"cmd\": \"ACCEPT\"}";
                mSdk.send(this.mSessionID,cmdTwo);
            }
            if(msg.equals("ENTER_PIN")){
                String cmdThree = "{\"cmd\": \"SET_PIN\", \"value\": \"451086\"}";
                mSdk.send(this.mSessionID, cmdThree);
            }

            if(msg.equals("ENTER_CAN")){
                String cmdFour = "{\"cmd\": \"SET_CAN\", \"value\": \"491908\"}";
                mSdk.send(this.mSessionID, cmdFour);
            }

        } catch (JSONException e) {
            e.printStackTrace();
        }
        // handle message from SDK

    }

    @Override
    public void sdkDisconnected() throws RemoteException {

    }

    public void setAusweisApp2Module(AusweisApp2Module ausweisApp2Module) {
        mAusweisApp2Module = ausweisApp2Module;
    }

}