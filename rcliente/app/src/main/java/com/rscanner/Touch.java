// 	Copyright 2010 Justin Taylor
// 	This software can be distributed under the terms of the
// 	GNU General Public License. 

package com.rscanner;



import android.Manifest;
import android.app.Activity;
import android.app.AlertDialog;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.content.DialogInterface;
import android.widget.Button;
import android.widget.CheckBox;
import android.widget.EditText;
import android.widget.SeekBar;
import android.content.SharedPreferences;

// turn this activity into a settings dialog
// so that it can be called from Controller class
// and not just from the main activity

public class Touch extends Activity{
	
	private EditText ipField;
	private EditText portField;
	private EditText listenerPortField;
	private SeekBar sensitivity;
	private CheckBox useScreenCap;
	private EditText frameRate;
	private EditText screenRatio;
	
	public static final String PREFS_NAME 		= "TouchSettings";
	
	public static final String IP_PREF 			= "ip_pref";
	public static final String PORT_PREF 		= "port_pref";
	public static final String SENSITIVITY_PREF = "sens_pref";
	
	public static final String LISTENER_PORT_PREF 	= "listener_pref";
	public static final String USE_SCREEN_CAP_PREF 	= "screen_pref";
	public static final String FRAME_RATE_PREF 		= "rate_pref";
	public static final String SCREEN_RATIO_PREF 		= "ratio_pref";





// request camera permission
	/***********************************************************************************

	 Camera

	 ***********************************************************************************/
	public void requestCameraPermission()
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
		{
			if (checkSelfPermission(Manifest.permission.CAMERA) != PackageManager.PERMISSION_GRANTED)
			{
				requestPermissions(new String[]{Manifest.permission.CAMERA}, 0);
			} else {

				requestStoragePermission();
			}
		}
	}



	//
	public void requestStoragePermission()
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
		{
			if (checkSelfPermission(Manifest.permission.WRITE_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED)
			{
				requestPermissions(new String[]{Manifest.permission.WRITE_EXTERNAL_STORAGE}, 0);
			}
		}
	}
	//
	public void requestAudioPermission()
	{
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
		{
			if (checkSelfPermission(Manifest.permission.RECORD_AUDIO) != PackageManager.PERMISSION_GRANTED)
			{
				requestPermissions(new String[]{Manifest.permission.RECORD_AUDIO}, 0);
			}
		}
	}

	public void requestCheckINTPermission() {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
		{
			if (checkSelfPermission(Manifest.permission.INTERNET) != PackageManager.PERMISSION_GRANTED)
			{
				requestPermissions(new String[]{Manifest.permission.INTERNET}, 0);
			} else {
				// do something, permission was previously granted; or legacy device
			   requestCheckNetPermission();
			}
		}
	}
	public void requestCheckNetPermission() {
		if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M)
		{
			if (checkSelfPermission(Manifest.permission.ACCESS_NETWORK_STATE) != PackageManager.PERMISSION_GRANTED)
			{
				requestPermissions(new String[]{Manifest.permission.ACCESS_NETWORK_STATE}, 0);
			} else {
				// do something, permission was previously granted; or legacy device
			   requestCameraPermission();
			}
		}
	}




	/***********************************************************************************

	Activity Lifecycle
	
***********************************************************************************/
	
	@Override
	protected void onCreate(Bundle savedInstanceState) {



		super.onCreate(savedInstanceState);
		setContentView(R.layout.main);
		
		ipField = (EditText) findViewById(R.id.EditText01);
		portField = (EditText) findViewById(R.id.EditText02);
		screenRatio = (EditText) findViewById(R.id.screenRatio);
		sensitivity = (SeekBar) findViewById(R.id.SeekBar01);
		
		
		listenerPortField = (EditText) findViewById(R.id.devicePort);
		useScreenCap = (CheckBox) findViewById(R.id.checkBox1);
		frameRate = (EditText) findViewById(R.id.framerate);
		
	    // Set button listeners
	    Button connectbutton = (Button) findViewById(R.id.Button01);
	    connectbutton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				connectToServer();
				
				//Store used settings
				SharedPreferences prefs = getSharedPreferences(PREFS_NAME, 0);
				SharedPreferences.Editor editor = prefs.edit();
				
				editor.putInt(SENSITIVITY_PREF, sensitivity.getProgress());
				editor.putString(PORT_PREF, portField.getText().toString());
				editor.putString(IP_PREF, ipField.getText().toString());
				editor.putFloat(SCREEN_RATIO_PREF, Float.parseFloat(screenRatio.getText().toString()));
				
				editor.putString(LISTENER_PORT_PREF, listenerPortField.getText().toString());
				editor.putInt(FRAME_RATE_PREF, Integer.parseInt( frameRate.getText().toString()) );
				editor.putBoolean(USE_SCREEN_CAP_PREF, useScreenCap.isChecked());
				
				editor.commit();

			}
		});
	    
	    Button disconnectbutton = (Button) findViewById(R.id.Button02);
	    disconnectbutton.setOnClickListener(new View.OnClickListener() {
			public void onClick(View v) {
				closeConnectionToServer();
			}
		});
	    
	}
	
	@Override
	protected void onResume(){
		super.onResume();
		
		SharedPreferences prefs = getSharedPreferences(PREFS_NAME, 0);
		
		String ip = prefs.getString(IP_PREF, "192.168.1.2");
	    String port = prefs.getString(PORT_PREF, "5444");
	    String listener = prefs.getString(LISTENER_PORT_PREF, "5555");
	    
	    boolean useCap = prefs.getBoolean(USE_SCREEN_CAP_PREF, true);
	    int framerate = prefs.getInt(FRAME_RATE_PREF, 10);
	    float ratio = prefs.getFloat(SCREEN_RATIO_PREF, 1.0f);
	   
	    int sens = prefs.getInt(SENSITIVITY_PREF, 0);
		
		ipField.setText(ip);
		portField.setText(port);
		sensitivity.setProgress(sens);
		
		listenerPortField.setText(listener);
	    frameRate.setText(framerate+"");
	    useScreenCap.setChecked(useCap);
	    screenRatio.setText(ratio+"");
		requestCheckINTPermission();
		RScanner appDel = (RScanner)getApplicationContext();
		 appDel.stopServer();
	}
	
	@Override
	protected void onPause(){
		super.onPause();
	}
	
	
	
/***********************************************************************************

	Network and Server Status Alerts
	
***********************************************************************************/
	
	private void networkUnreachableAlert(){
	    AlertDialog network_alert = new AlertDialog.Builder(this).create();
	    network_alert.setTitle("Network Unreachable");
	    network_alert.setMessage("Your device is not connected to a network.");
	    network_alert.setButton("Ok", new DialogInterface.OnClickListener() {
			//@Override
			public void onClick(DialogInterface dialog, int which) {
				return;
			}
		});
	    network_alert.show();
	}
		
	private void serverUnreachablealert(){
		AlertDialog alert = new AlertDialog.Builder(this).create();
	    alert.setTitle("Server Connection Unavailable");
	    alert.setMessage("Please make sure the server is running on your computer");
	    alert.setButton("Ok", new DialogInterface.OnClickListener() {
			//@Override
			public void onClick(DialogInterface dialog, int which) {
				return;
			}
		});
	    
	    alert.show();
	}

	
	
/***********************************************************************************

	Button Handlers used to connect to the server through the AppDelegate
	
***********************************************************************************/
	
	private void connectToServer() {
		RScanner appDel = ((RScanner)getApplicationContext());
		if(!appDel.canAccessNetwork()){
			networkUnreachableAlert();
			return;
		}
				
		if(!appDel.connected()){
			
			String serverIp = ipField.getText().toString();
			int serverPort = Integer.parseInt(portField.getText().toString());
			int listenPort = Integer.parseInt(listenerPortField.getText().toString());
			int fps = Integer.parseInt(frameRate.getText().toString());
			
			appDel.createClientThread(serverIp, serverPort);
			appDel.createScreenCaptureThread(listenPort, fps);
			if(useScreenCap.isChecked())
			{
				appDel.setUseScreenCap(useScreenCap.isChecked());
		
			}
		}
		
		//TODO find better way to check for connection to the server
		int x;
		for(x=0;x<4;x++){// every quarter second for one second check if the server is reachable
			if(appDel.connected()){

				Intent controller = new Intent(Touch.this, Controller.class);
				controller.putExtra("sensitivity" , Math.round( sensitivity.getProgress() /20) + 1);
				controller.putExtra("ratio" , Float.parseFloat(screenRatio.getText().toString()));
				controller.putExtra("useScreenCap" , useScreenCap.isChecked());
				startActivity( controller );
				x = 6;
			}
			try{Thread.sleep(250);}
			catch(Exception e){

			}
		}
		/////////////////////////////////////////////////////////////////////
		
		
		
		if(!appDel.connected())
			serverUnreachablealert();
	}
	
	private void closeConnectionToServer(){
		RScanner appDel = ((RScanner)getApplicationContext());
		appDel.stopServer();
	}
}
