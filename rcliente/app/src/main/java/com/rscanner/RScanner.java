package com.rscanner;


import android.Manifest;
import android.app.Application;
import android.content.Context;
import android.content.pm.PackageManager;
import android.net.ConnectivityManager;
import android.os.Build;


import android.app.Application;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

import com.googlecode.tesseract.android.TessBaseAPI;

import java.io.File;
import java.util.Locale;





public class RScanner extends Application {

    private ClientThread client;
    private ClientListener listener;
    private Controller controller;
    public boolean useScreenCap = false;
      String pointsStr;

    public void onCreate(){
        super.onCreate();
        pointsStr = "";
    }

    public void setController(Controller c){
        controller	= c;
    }

    public Controller getController()
    {
        return controller;
    }


public void setCurrLMsg(String msg){
        listener.setCurrLMsg(msg);
}



    /***********************************************************************************

     Server Control

     ***********************************************************************************/

    public void createClientThread(String ipAddress, int port){
try {
            System.out.print("ClientActivity.createClientThread: " + ipAddress + " " + port);
    client = new ClientThread(ipAddress, port);

    Thread cThread = new Thread(client);
    cThread.start();
        } catch (Exception e) {
    e.printStackTrace();
    System.out.print("ClientActivity.createClientThread: " + e.getMessage());
        }

    }

    public void createScreenCaptureThread(int listenerPort, int fps)
    {
        try {
            System.out.print("ClientActivity.createScreenCaptureThread: " + listenerPort + " " + fps);
            listener = new ClientListener(listenerPort, fps, this);

            Thread cThread = new Thread(listener);
            cThread.start();
        } catch (Exception e) {
            e.printStackTrace();

            System.out.print("ClientActivity.createScreenCaptureThread: " + e.getMessage());
        }

    }

    public void sendMessage(String message){
        try {
            System.out.print("ClientActivity.sendMessage: " + message);
            if(client != null) {
                client.sendMessage(message);
            }
        } catch (Exception e) {
            e.printStackTrace();
            System.out.print("ClientActivity.sendMessage: " + e.getMessage());
        }
        System.out.print("ClientActivity.sendMessage: " + message);





        }




    public void stopServer(){
        try {
            System.out.print("ClientActivity.stopServer");
            if(client != null && client.connected){
                client.closeSocket();
            }
            client = null;

            if(listener != null)
            {
                listener.closeSocket();
            }

            listener = null;
        } catch (Exception e) {
            e.printStackTrace();
            System.out.print("ClientActivity.stopServer: " + e.getMessage());
        }

    }



    /***********************************************************************************

     Testing Connectivity

     ***********************************************************************************/

    public boolean connected(){

        if(client != null)
            return client.connected;

        return false;
    }

    public boolean canAccessNetwork(){
        final ConnectivityManager connMgr = (ConnectivityManager)
                getSystemService(Context.CONNECTIVITY_SERVICE);

        android.net.NetworkInfo wifi = connMgr.getNetworkInfo(ConnectivityManager.TYPE_WIFI);
        if(wifi.isAvailable()) {
            System.out.print("ClientActivity.wifi.isAvailable");
            return true;
        } else {
		/*
		 * For now the mobile connectivity does not matter
		 * the scale of this project is local wireless networks
		 * 
		android.net.NetworkInfo mobile = connMgr.getNetworkInfo(ConnectivityManager.TYPE_MOBILE);
		if(mobile.isAvailable())
			return true;
		*/

            return false;
        }
    }

    public void setUseScreenCap(boolean useScreenCap) {
        this.useScreenCap = useScreenCap;
    }
    public boolean getUseScreenCap() {
        return useScreenCap;
    }


}
    
    
