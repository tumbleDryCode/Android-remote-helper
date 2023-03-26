// 	Copyright 2010 Justin Taylor
// 	This software can be distributed under the terms of the
// 	GNU General Public License. 

package com.rscanner;

import android.Manifest;
import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.graphics.Rect;
import android.graphics.drawable.BitmapDrawable;
import android.hardware.Camera;
import android.net.Uri;
import android.net.http.SslError;
import android.os.Build;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.text.Editable;
import android.text.TextWatcher;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.KeyEvent;
import android.view.MotionEvent;
import android.view.View;
import android.view.View.OnClickListener;
import android.view.View.OnKeyListener;
import android.view.View.OnTouchListener;
import android.view.ViewGroup;
import android.view.Window;
import android.view.WindowManager;
import android.view.inputmethod.InputMethodManager;
import android.webkit.CookieSyncManager;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.LinearLayout;
import android.widget.ScrollView;
import android.widget.TextView;
import android.widget.Toast;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.LuminanceSource;
import com.google.zxing.NotFoundException;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.ReaderException;
import com.google.zxing.Result;
import com.google.zxing.ResultPoint;
import com.google.zxing.common.HybridBinarizer;
import com.googlecode.tesseract.android.TessBaseAPI;
import com.njfsoft_utils.js_interfaces.JSI_controller;
import com.njfsoft_utils.js_interfaces.JSI_controllerDlg;
import com.njfsoft_utils.webviewutil.UtilWebDialog;
import com.njfsoft_utils.webviewutil.UtilWebView;
import com.njfsoft_utils.dbutil.UtilDbRecord;
import com.njfsoft_utils.dbutil.UtilSQLAdapter;


import java.io.File;
import java.util.Collection;
import java.util.Locale;
import java.util.Timer;
import java.util.regex.Pattern;

import me.dm7.barcodescanner.core.DisplayUtils;
import me.dm7.barcodescanner.zxing.ZXingScannerView;
import messages.Constants;

import android.app.Application;
import android.os.SystemClock;
import android.util.Log;

import androidx.annotation.NonNull;
import androidx.lifecycle.AndroidViewModel;
import androidx.lifecycle.LiveData;
import androidx.lifecycle.MutableLiveData;

public class Controller extends Activity  implements OnTouchListener, OnKeyListener,  ZXingScannerView.ResultHandler {
	
	float lastXpos = 0;
	float lastYpos = 0;
	
	private int mouse_sensitivity = 1;
	private float screenRatio = 1.0f;

	boolean keyboard = false;
	Thread checking;
		
	Button Left;
	Button Right;
	
	int count = 0;
	int FRAME_RATE = 10;
	EditText editText;




	private static final String TAG = Controller.class.getSimpleName();


	protected boolean hasSurface = false;
	protected Collection<BarcodeFormat> decodeFormats = null;
	protected String characterSet = null;
	String strRunning;

	private TextView statusView = null;
	private View resultView = null;
	private boolean inScanMode = false;
	//UtilsBitmap utilsBitmap;
	Timer atmrMovRec;
	String currDecodeStr;
	String currScanUrl;
	String currScanDlgUrl;
	String currScanType;
	int iMovWidth = 0;
	int iMovHeight = 0;
	float mDist;

	UtilWebView mWebView;
	public UtilWebDialog utilWDialog;
	private FrameLayout mContent;
	private LinearLayout lnrLyt_ScnrUWView;


	 ZXingScannerView mScannerView;
	 TessBaseAPI tessApi;
	 String rdatapath;
Button KBbtn;

	 MutableLiveData<Boolean> processing = new MutableLiveData<>(false);

	  MutableLiveData<String> progress = new MutableLiveData<>();

  MutableLiveData<String> result = new MutableLiveData<>();

	  boolean tessInit;
	 boolean stopped;
	RScanner appDel;
	public UtilSQLAdapter dbMSQLA;
	 String pointsStr;

	public Controller() {

	}

	// write a fuunction to request INTERNET permission in Activity at runtime
    public void requestInternetPermission() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            if (ContextCompat.checkSelfPermission(this, Manifest.permission.INTERNET)
                    != PackageManager.PERMISSION_GRANTED) {
                ActivityCompat.requestPermissions(this, new String[]{Manifest.permission.INTERNET,Manifest.permission.CAMERA}, 1);
            }
        }
    }









	protected void onCreate(Bundle savedInstanceState) {
		
		super.onCreate(savedInstanceState);

	     setContentView(R.layout.control);
		ViewGroup contentFrame = (ViewGroup) findViewById(R.id.content_frame);
		mScannerView = new ZXingScannerView(this);
		contentFrame.addView(mScannerView);
	     mouse_sensitivity = getIntent().getExtras().getInt("sensitivity");
	     screenRatio = getIntent().getExtras().getFloat("ratio");
		pointsStr= "";
		dbMSQLA = new UtilSQLAdapter(this);
	    // Set the width of the buttons to half the screen size
	 	Display display = getWindowManager().getDefaultDisplay(); 
	 	int width = display.getWidth();
		KBbtn = (Button) findViewById(R.id.keyboardbutton);
	 	Left = (Button) findViewById(R.id.LeftClickButton);
	 	Right =  (Button) findViewById(R.id.RightClickButton);
	 	
	 	// Left.setWidth(width/2);
	 	// Right.setWidth(width/2);

		KBbtn.setOnClickListener(new OnClickListener() {
			@Override
			public void onClick(View v) {
				System.out.print("ClienteActivity.keyboardbutton.onClick");
				getKeys();
			}
								 });

	 	Left.setOnTouchListener(this);
	 	Right.setOnTouchListener(this);
	 	
	 	ClientListener.deviceWidth = width;
	 	ClientListener.deviceHeight = display.getHeight();
	 	
	    View touchView = (View) findViewById(R.id.TouchPad);
	    touchView.setOnTouchListener(this);

	    editText = (EditText) findViewById(R.id.KeyBoard);
	    editText.setOnKeyListener(this);
	    editText.addTextChangedListener(new TextWatcher(){
		    public void  afterTextChanged (Editable s){
		    	try{
					System.out.print("afterTextChanged: " + s);
		    		sendToAppDel(Constants.KEYBOARD + s.toString());
        		} catch(IndexOutOfBoundsException e){
					System.out.print("ClientActivity.error: " + e);
				}
		    	s.clear();
		    } 

	        public void  beforeTextChanged  (CharSequence s, int start, int count, int after){} 
	        public void  onTextChanged  (CharSequence s, int start, int before, int count) {
	        }
	    });


		Window window = getWindow();
		window.addFlags(WindowManager.LayoutParams.FLAG_KEEP_SCREEN_ON);
		strRunning = "no";

		hasSurface = false;
		currDecodeStr = "noQvalue";
		currScanUrl = "file:///android_asset/scanner.html";
		currScanDlgUrl = "scanner_dlg.html";
		currScanType = "prod";
		// statusView = (TextView) findViewById(R.id.status_view);
		// utilsBitmap = new UtilsBitmap(this,this);



	    setImageRequestSizes();
	    appDel = ((RScanner)getApplicationContext());
	    appDel.setController( this );
		mScannerView.startCamera();
	}


	protected void onResume() {
		super.onResume();
		requestInternetPermission();
		// editText.requestFocus();
		mScannerView.setResultHandler(this); // Register ourselves as a handler for scan results.
		// mScannerView.startCamera();          // Start camera on resume
		// InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE); imm.toggleSoftInput(InputMethodManager.SHOW_FORCED, 0);

		// mScannerView.stopCamera();
		mScannerView.stopCameraPreview();

		preparePagePopUps("blank.html", "noQvalue");

		String strwUrl = "file:///android_asset/scanner.html";
		Bundle extrasDec = getIntent().getExtras();

		if (appDel != null) {
			System.out.println("appDel != null");
		} else {
			RScanner appDel = ((RScanner)getApplicationContext());
			appDel.setController( this );
		}
		if (extrasDec != null) {
			if (extrasDec.containsKey("wUrl")) {
				String tmpstrwUrl = extrasDec.getString("wUrl");

				int cut = tmpstrwUrl.lastIndexOf('/');
				if (cut != -1) {
					strwUrl = tmpstrwUrl.substring(0, cut + 1) + "scanner.html";
					currScanUrl = strwUrl;
					currScanDlgUrl = tmpstrwUrl.substring(0, cut + 1) + "scanner_dlg.html";
				}

			}
			if (extrasDec.containsKey("scanType")) {
				currScanType = extrasDec.getString("scanType");
			}
		}

		currScanType = "prod";

		try {
		rdatapath = Environment.getExternalStorageDirectory().getPath() + File.separator + "rscanner";

		File mydir = new File(rdatapath);
		if(!mydir.exists()) {
			mydir.mkdirs();
		}
			initEFui();
		} catch (Exception e) {
			System.out.println("ClienteActivity.file.error " + e);
		}


	}

	public void setSettings() {


	}
	public void setPointsStr(String pointsStr) {
		this.pointsStr = pointsStr;
		System.out.println("ClienteActivity.setPointsStr " + pointsStr);

	}
	public String getPointsStr() {
		System.out.println("ClienteActivity.getPointsStr " + pointsStr);
		return pointsStr;
	}

public String getCurrScanType() {
		return currScanType;
	}
	public void setCurrScanType(String currScanType) {
		this.currScanType = currScanType;
		// mScannerView.zsetCurrScanType(currScanType);
	}



	@SuppressLint("JavascriptInterface")
	public void initEFui() {
		try {
			if (dbMSQLA == null) {
				dbMSQLA = new UtilSQLAdapter(this);
			}
			 ScrollView  mScrollView = (ScrollView) findViewById(R.id.scrlEditText);
			if (mScrollView == null) {
				mScrollView = (ScrollView) Controller.this.findViewById(R.id.scrlEditText);
			}

			if (mWebView == null) {
				UtilWebView.UtilWVListener tWVListener = new UtilWebView.UtilWVListener() {
					public void doWVEvent(int cbType) {
						InputMethodManager imm = (InputMethodManager) getApplicationContext().getSystemService(Context.INPUT_METHOD_SERVICE);
						imm.hideSoftInputFromWindow(mWebView.getWindowToken(), 0);

					}
				};
				String currHomeUrl = "file:///android_asset/scanner.html";
				mWebView = new UtilWebView(this, this, currHomeUrl, "noQvalue", tWVListener, new JSI_controller(this), "app");
				mWebView.getSettings().setJavaScriptEnabled(true);
				mWebView.clearSslPreferences();

				// mWebView.enablePlatformNotifications();
				mWebView.addJavascriptInterface(new JSI_controller(this), "app");
				// mWebView.setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
				mWebView.setInitialScale(1);
				mWebView.getSettings().setUseWideViewPort(true);
				mWebView.getSettings().setLoadWithOverviewMode(true);
				// boolean CURR_SHOW_WEB_IMAGES = Boolean.parseBoolean(currConfBundle.getString("confShowWebImgs"));
				// mWebView.getSettings().setLoadsImagesAutomatically(CURR_SHOW_WEB_IMAGES);
				mWebView.getSettings().setSupportZoom(true);
				mWebView.getSettings().setBuiltInZoomControls(true);
				// // mWebView.setLayerType(View.LAYER_TYPE_SOFTWARE, null);
				// avoids flickering
				mWebView.setBackgroundColor(Color.parseColor("#FFFFFF"));
				mWebView.setWebViewClient(new DefWViewClient());
				mWebView.setWebChromeClient(new qBChromeClient());
				// mWebView.getSettings().setTextZoom(currConfBundle.getInt("confBrowZoom"));
				// registerForContextMenu(mWebView);

				mWebView.getSettings().setAllowFileAccessFromFileURLs(true);
				mWebView.getSettings().setAllowUniversalAccessFromFileURLs(true);
				LinearLayout lnrLyt_UWView = (LinearLayout) findViewById(R.id.ll_duwv);
				mWebView.setToggleWViewBtns(false, false);
				// lnrLyt_UWView = (LinearLayout) Controller.this.findViewById(R.id.ll_duwv);
				lnrLyt_UWView.addView(mWebView.getLayout());
			} else {
				System.out.println("onCreate mWebView.notnull: ");
			}
			/* not working. need to set gradle to build native
			if(tessApi == null) {
				tessApi = new TessBaseAPI(progressValues -> {
					progress.postValue("Progress: " + progressValues.getPercent() + " %");
				});

				// Show Tesseract version and library flavor at startup
				progress.setValue(String.format(Locale.ENGLISH, "Tesseract %s (%s)",
						tessApi.getVersion(), tessApi.getLibraryFlavor()));
				initTesseract(rdatapath, "eng+por", TessBaseAPI.OEM_LSTM_ONLY);
			}

			 */
		} catch (Exception e) {
			System.out.println("CLienteActivity.initEFui.error: " + e.toString());
			e.printStackTrace();
		}
	}


	// trying to save the last url used in webview to use on resume
	@Override
	public void onRestoreInstanceState(Bundle savedInstanceState) {
		super.onRestoreInstanceState(savedInstanceState);
		// strHomeUrl = savedInstanceState.getString("lurl");

	}

	@Override
	public void onSaveInstanceState(Bundle savedInstanceState) {
		super.onSaveInstanceState(savedInstanceState);
		// savedInstanceState.putString("lurl", mWebView.getAddressUrl());

		// etc.
	}
		
	private void setImageRequestSizes() {
		DisplayMetrics metrics = new DisplayMetrics();
		WindowManager wm = (WindowManager) this.getSystemService(Context.WINDOW_SERVICE);
		Display display = wm.getDefaultDisplay();
		display.getMetrics(metrics);
		int width, height; 
		width = metrics.widthPixels;
		height = metrics.heightPixels;
		
		ClientListener.deviceWidth = (int)(screenRatio * width);
	    ClientListener.deviceHeight = (int)(screenRatio * height);
	    Log.e("REQUESTINGSIZE", screenRatio+" "+ ClientListener.deviceWidth+" "+ClientListener.deviceHeight);

	}
	
	public void finish()
	{
		System.out.println("Controller.finish()");
		RScanner appDel = ((RScanner)getApplicationContext());
		appDel.stopServer();
		
		super.finish();
	}
	
	public void onConfigurationChanged(Configuration newConfig) {
	    setImageRequestSizes();
	 	super.onConfigurationChanged(newConfig);
	}
	
	public boolean onTouch(View v, MotionEvent event) {
		if(v == Left){
			// sendToAppDel("This is a bahboo");
			/* */
			 switch ( event.getAction() ) {
			    case MotionEvent.ACTION_DOWN: sendToAppDel(Constants.LEFTMOUSEDOWN); break;
			    case MotionEvent.ACTION_UP: sendToAppDel(Constants.LEFTMOUSEUP); break;
			 }


		}else if( v == Right){
			switch ( event.getAction() ) {
		    	case MotionEvent.ACTION_DOWN: sendToAppDel(Constants.RIGHTMOUSEDOWN); break;
		    	case MotionEvent.ACTION_UP: sendToAppDel(Constants.RIGHTMOUSEUP); break;
			}
		}else if( v == KBbtn){
			switch ( event.getAction() ) {

				case MotionEvent.ACTION_UP: getKeys(); break;
			}
		}
		else
			mousePadHandler(event);
	 	
		return true;
	}
	
	// detect keyboard event
	// and send to delegate
	//@Override
	public boolean onKey(View v, int c, KeyEvent event){
		
		// c is the event keycode
		if(event.getAction() == 1)
		{
			sendToAppDel( "" + Constants.KEYCODE+c);
		}
		// this will prevent the focus from moving off the text field
	 	if(		c == KeyEvent.KEYCODE_DPAD_UP   ||
	 			c == KeyEvent.KEYCODE_DPAD_DOWN ||
	 			c == KeyEvent.KEYCODE_DPAD_LEFT ||
	 			c == KeyEvent.KEYCODE_DPAD_RIGHT
	 	)
	 		return true;
	 	
	 	return false;
	}
	
	// Show and hide Keyboard by setting the
	// focus on a hidden text field
    public void getKeys(){
		try{
			mWebView.loadUrl("javascript:document.getElementById('dmyScannerInp').focus()");
			/*
			EditText editText = (EditText) findViewById(R.id.KeyBoard);
			InputMethodManager mgr = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
			if(keyboard){
				mgr.hideSoftInputFromWindow(editText.getWindowToken(), 0);
				keyboard = false;
			}
			else{
				mgr.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT);
				keyboard = true;
			}

			 */
		} catch (Exception e) {
			System.out.println("ClienteAcitivity.keyClickHandler.error: " + e.toString());
			e.printStackTrace();
		}

    }


	public void debugMsg(String msg) {
		final String str = msg;
		this.runOnUiThread(new Runnable() {
			@Override
			public void run() {
				RScanner appDel = ((RScanner)getApplicationContext());
				appDel.sendMessage(msg);
			}
		});
	}



	// send message to AppDelegate class
	// to be sent to server on client desktop
	private void sendToAppDel(String message){
		System.out.println("sendToAppDel: " + message);
		try {
		debugMsg(message);
		}
		catch (Exception e){
			System.out.println("sendToAppDel.Error: " + e);
		}
	}
	
	private void sendToAppDel(char c){
		System.out.println("sendToAppDel c: " + c);
		sendToAppDel(""+c);
	}
	
	
	public void setImage(final Bitmap bit){
		Handler handler = new Handler(Looper.getMainLooper());
		handler.post(new Runnable() {

			public void run() {
				LinearLayout layout = (LinearLayout) findViewById(R.id.TouchPad);
				BitmapDrawable drawable = new BitmapDrawable( bit );
				layout.setBackgroundDrawable( drawable );				
			}
		});
		

	}
	
	// send a mouse message
    private void mousePadHandler(MotionEvent event) {
 	   int action = event.getAction();
 	   int touchCount = event.getPointerCount();
 	   
	   // if a single touch
 	   if(touchCount == 1){ 		   
			switch(action){
			
				case 0:	// touch down
				 		lastXpos = event.getX();
						lastYpos = event.getY();
						break;
				
				case 1:	// touch up
						long deltaTime = event.getEventTime() - event.getDownTime();
						if(deltaTime < 250)
							sendToAppDel(Constants.LEFTCLICK);
						break;
				
				case 2: // moved
					float deltaX = (lastXpos - event.getX()) * -1;
					float deltaY = (lastYpos - event.getY()) * -1;
					
					sendToAppDel(Constants.createMoveMouseMessage(deltaX * mouse_sensitivity
																, deltaY * mouse_sensitivity));
						
					lastXpos = event.getX();
					lastYpos = event.getY();
					break;
						
				default: break;
			}
 	   }
 
	   // if two touches send scroll message
	   // based off MAC osx multi touch scrolls up and down
 	   else if(touchCount == 2){
 		   if(action == 2){
 			   
 				float deltaY = event.getY() - lastYpos;
 				float tolerance = 10;
 			   
 			   if (deltaY > tolerance){
 				  sendToAppDel(Constants.SCROLLUP);
 				  lastYpos = event.getY();
 			   }
 			   else if(deltaY < -1 * tolerance){
 				  sendToAppDel(Constants.SCROLLDOWN);
 				 lastYpos = event.getY();
 			   }
 		   }else lastYpos = event.getY();
 	   }
 	}









	@Override
	public boolean onKeyDown(int keyCode, KeyEvent event) {
		if (keyCode == KeyEvent.KEYCODE_FOCUS || keyCode == KeyEvent.KEYCODE_CAMERA) {
			// Handle these events so they don't launch the Camera app
			return true;
		}
		return super.onKeyDown(keyCode, event);
	}





	@Override
	protected void onPause() {
		super.onPause();
		mScannerView.stopCamera();           // Stop camera on pause
	}



	public void setAppPopStr(final String tAstr) {


		try {
			this.runOnUiThread(new Runnable() {
				public void run() {
					utilWDialog.setCurrSwapStr("render:" + tAstr);
					utilWDialog.setPopPage(currScanDlgUrl, "noQvalue");
				}
			});


		} catch (Exception e) {
			System.out.println("dev:ERROR:setPagePopUp:" + e.toString());
			e.printStackTrace();
		}


	}



	public void setPagePopObj() {


		try {
			this.runOnUiThread(new Runnable() {
				public void run() {
					utilWDialog.setCurrSwapStr(currDecodeStr);
					utilWDialog.setPopPage(currScanDlgUrl, "noQvalue");
				}
			});


		} catch (Exception e) {
			System.out.println("dev:ERROR:setPagePopUp:" + e.toString());
			e.printStackTrace();
		}


	}

	public void setPagePopUp(final String pageUrl, final String pageHtml) {


		try {
			this.runOnUiThread(new Runnable() {
				public void run() {
					utilWDialog.setPopPage(pageUrl, pageHtml);
				}
			});


		} catch (Exception e) {
			System.out.println("dev:ERROR:setPagePopUp:" + e.toString());
			e.printStackTrace();
		}


	}







	protected void drawResultPoints(Bitmap barcode, Result rawResult) {
		System.out.println("drawResultPoints called... : ");

		ResultPoint[] points = rawResult.getResultPoints();
		if (points != null && points.length > 0) {
			for (ResultPoint point : points) {
				System.out.println("drawResultPoints not null... : " + points.length + " :: " + point.toString());
			}

			Canvas canvas = new Canvas(barcode);
			Paint paint = new Paint();
			paint.setColor(getResources().getColor(R.color.result_image_border));
			paint.setStrokeWidth(3.0f);
			paint.setStyle(Paint.Style.STROKE);
			Rect border = new Rect(2, 2, barcode.getWidth() - 2, barcode.getHeight() - 2);
			canvas.drawRect(border, paint);

			paint.setColor(getResources().getColor(R.color.result_points));
			if (points.length == 2) {
				paint.setStrokeWidth(4.0f);
				drawLine(canvas, paint, points[0], points[1]);
			} else if (points.length == 4 && (rawResult.getBarcodeFormat() == BarcodeFormat.UPC_A || rawResult.getBarcodeFormat() == BarcodeFormat.EAN_13)) {
				// Hacky special case -- draw two lines, for the barcode and
				// metadata
				drawLine(canvas, paint, points[0], points[1]);
				drawLine(canvas, paint, points[2], points[3]);

			} else if (points.length == 4) {
				for (ResultPoint point : points) {
					canvas.drawPoint(point.getX(), point.getY(), paint);
					System.out.println("drawResultPoints all 4: " + point.toString());
				}
			} else {
				paint.setStrokeWidth(10.0f);
				for (ResultPoint point : points) {
					canvas.drawPoint(point.getX(), point.getY(), paint);
					System.out.println("drawResultPoints... : " + points.length + " :: " + point.toString());
				}
			}
		}

	}

	protected static void drawLine(Canvas canvas, Paint paint, ResultPoint a, ResultPoint b) {
		canvas.drawLine(a.getX(), a.getY(), b.getX(), b.getY(), paint);
	}








	/** Determine the space between the first two fingers */
	private float getFingerSpacing(MotionEvent event) {
		// ...
		float x = event.getX(0) - event.getX(1);
		float y = event.getY(0) - event.getY(1);
		return (float)Math.sqrt(x * x + y * y);
	}







	public void preparePagePopUps(String pageUrl, String pageHtml) {
		String fullUrl = "file:///android_asset/" + pageUrl;
		String newHTML = "";

		UtilWebDialog.UtilWDListener utilWDListener = new UtilWebDialog.UtilWDListener() {

			public void epMDcom(int cbType, String cbArgs, UtilWebDialog epmd) {
				final String fnlCbArgs;
				epmd.doDismiss();
				onResume();
				System.out.println("CutOuts.preparePagePopUps: " + cbType + " : " + cbArgs);

				// stopPlayFile();
				// handler.removeCallbacks(thrdTask);
				// handler.postDelayed(thrdTask, 0);

				switch (cbType) {
					case 60:
						doDecoderUrlLoad("javascript:showScanStat('Scan for bin: " + cbArgs + "');");
						System.out.println("epMDcom.switch: " + cbType + " : " + cbArgs);
						break;
					default:
						break;
				}
			}
		};
		utilWDialog = new UtilWebDialog(this, fullUrl, pageHtml, utilWDListener, new JSI_controllerDlg(this), "appDlg");
		utilWDialog.getWindow().setSoftInputMode(WindowManager.LayoutParams.SOFT_INPUT_STATE_ALWAYS_HIDDEN);

	}



	public void doDecoderUrlLoad(final String tDLUstr) {
		try {
			this.runOnUiThread(new Runnable() {
				public void run() {
					mWebView.loadUrl(tDLUstr);
				}
			});


		} catch (Exception e) {
			System.out.println("dev:ERROR:doDecoderUrlLoad:" + e.toString());
			e.printStackTrace();
		}
	}






	private class DefWViewClient extends WebViewClient {
		@Override
		public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
			Toast.makeText(getApplicationContext(), "Oh no! " + description, Toast.LENGTH_SHORT).show();
		}

		@Override
		public void onPageStarted(WebView view, String url, Bitmap favicon) {
			if (url.indexOf("http") != -1) {
				// autoCompleteTextView.setText(url);
			}
			System.out.print("onPageStarted1: " + url);
			// TODO Auto-generated method stub
			// Toast.makeText(mContext, "page started: " + url, Toast.LENGTH_LONG).show();
			CookieSyncManager.getInstance().sync();
			//  super.onPageStarted(view, url, favicon);
			if (url.startsWith("file://") && url.contains("?")) {
				System.out.print("onPageStarted:oride " + url);
				String[] temp;
				temp = url.split(Pattern.quote("?"));
				// showDaToast("is one: " + temp[1]);
				// epMainHbook.setCurrPageVars(temp[1]);
				// currPageVars = temp[1];
				// setCurrPageVars(temp[1]);
				System.out.print("onPageStarted:getCurrPageVars: " + url);
			}

		}

		@Override
		public void onReceivedHttpAuthRequest(android.webkit.WebView view, android.webkit.HttpAuthHandler handler, java.lang.String host, java.lang.String realm) {
			// TODO Auto-generated method stub
			// Toast.makeText(mContext, "page started: " + url, Toast.LENGTH_LONG).show();
			CookieSyncManager.getInstance().sync();
			System.out.print("onReceivedHttpAuthRequest: " + host);
			handler.proceed("3537280_dev", "Logisgo_9");
			//    super.onReceivedHttpAuthRequest(view, handler, host, realm);
		}

		@Override
		public void onPageFinished(WebView view, String url) {
			//  showDaUrlToast(url);
			//  Toast.makeText(mContext, "page finished: " + url, Toast.LENGTH_LONG).show();
			// TODO Auto-generated method stub
			System.out.print("onPageFinished: " + url);
			CookieSyncManager.getInstance().sync();
			mWebView.setAddressUrl(url);


			// super.onPageFinished(view, url);
			// pumpToUrlString();
		}

		@Override
		public boolean shouldOverrideUrlLoading(WebView view, String url) {
			// currPageVars = "noQvalue";
			if (url.startsWith("file://") && url.contains("?")) {
				System.out.print("shouldOverrideUrlLoading:oride " + url);
				String[] temp;
				temp = url.split(Pattern.quote("?"));
				// showDaToast("is one: " + temp[1]);
				// epMainHbook.setCurrPageVars(temp[1]);
				// setCurrPageVars(temp[1]);
				// System.out.print("shouldOverrideUrlLoading:getCurrPageVars: " + currPageVars);
				mWebView.loadUrl(url);
				return true;
			} else if (url.contains(".mp4")) {
				// setPlayMPF(url);
				return true;
			} else if (url.contains("waze.com")) {
				try {
					// Launch Waze to look for Hawaii:
					String wazeurl = "https://waze.com/ul?q=Hawaii";
					Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse(url));
					startActivity(intent);
				} catch (Exception ex) {
					// If Waze is not installed, open it in Google Play:
					Intent intent = new Intent(Intent.ACTION_VIEW, Uri.parse("market://details?id=com.waze"));
					startActivity(intent);
				}
				return true;
			} else {
				// extraHeaders dont work
				// mWebView.loadUrl(url, extraHeaders);
				return false;
			}
		}

		public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError errer) {
			System.out.print("onReceivedSslError: " + errer);
			handler.proceed();
		}
	}


	private class qBChromeClient extends WebChromeClient {

		private Bitmap mDefaultVideoPoster;
		private View mVideoProgressView;
		long nowLong = System.currentTimeMillis() / 1000;
		String datestring = Long.toString(nowLong);

		@Override
		public void onConsoleMessage(String message, int lineNumber, String sourceID) {
			System.out.println("onConsoleMessage: " + message + " -- From line " + String.valueOf(lineNumber) + " of " + sourceID);
			super.onConsoleMessage(message, lineNumber, sourceID);
		}

		@Override
		public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
			System.out.println("+-------------------------------");
			System.out.println("|WebChromeClient onJsAlert	" + message);
			System.out.println("+-------------------------------");
			result.confirm();
			// showDaToast("Alert... " + message);
			return true;
		}

	}

	public void doRecInsert(int rt, String va, String vb, String vc, String da) {
		try {
			dbMSQLA.openToWrite();
			dbMSQLA.insert(rt, va, vb, vc, da);
			dbMSQLA.close();

		} catch (Exception e) {
			dbMSQLA.close();
			e.printStackTrace();
			System.out.println("doRecInsert" + e.toString());

		}
	}


	public void setCurrLMsg(String msg){
		appDel.setCurrLMsg(msg);
	}



	public void doINiBCSresume() {
		System.out.println("doINiBCSresume");
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				doBCSresume();
			}
		});

	}
	public void doBCSresume() {
		System.out.println("doBCSresume");
		mScannerView.resumeCameraPreview(this);
	}
	public void doINiBCSstop() {
		System.out.println("doINiBCSstop");
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				doBCSstop();
			}
		});
	}
	public void doBCSstop() {
		System.out.println("doBCSStop");

		mScannerView.stopCameraPreview();
	}

	public void doEtxtFxus() {
		System.out.println("doEtxtFxus");
		runOnUiThread(new Runnable() {
			@Override
			public void run() {
				try {
					editText.requestFocus();
					InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
					imm.showSoftInput(editText, InputMethodManager.SHOW_IMPLICIT);
				} catch (Exception e) {
					System.out.println("dev:ERROR:doEtxtFxus:" + e.toString());
					e.printStackTrace();
				}

			}
		});

	}

	public void doMsgSend(String msg) {
		try {
			System.out.println("doMsgSend");
			sendToAppDel(msg);
		} catch (Exception e) {
			System.out.println("dev:ERROR:doMsgSend:" + e.toString());
			e.printStackTrace();
		}

	}

	@Override
	public void handleResult(Result rawResult) {
		System.out.println( "ClienteActivity :handleResult:" + rawResult.getText());
		try {
		// Do something with the result here
		Log.v(TAG, rawResult.getText()); // Prints scan results
		Log.v(TAG, rawResult.getBarcodeFormat().toString()); // Prints the scan format (qrcode, pdf417 etc.)
		sendToAppDel(rawResult.getText());

		// If you would like to resume scanning, call this method below:
		  // mScannerView.resumeCameraPreview(this);

		} catch (Exception e) {
			System.out.println("dev:ERROR:handleResult:" + e.toString());
			e.printStackTrace();
		}
	}





	// tesseract stuff


	public void initTesseract(@NonNull String dataPath, @NonNull String language, int engineMode) {
		Log.i(TAG, "Initializing Tesseract with: dataPath = [" + dataPath + "], " +
				"language = [" + language + "], engineMode = [" + engineMode + "]");
		try {
			tessInit = tessApi.init(dataPath, language, engineMode);
		} catch (IllegalArgumentException e) {
			tessInit = false;
			Log.e(TAG, "Cannot initialize Tesseract:", e);
		}
	}

	public void recognizeImage(@NonNull Bitmap imagePath) {
		if (!tessInit) {
			Log.e(TAG, "recognizeImage: Tesseract is not initialized");
			return;
		}
		if (isProcessing()) {
			Log.e(TAG, "recognizeImage: Processing is in progress");
			return;
		}
		result.setValue("");
		processing.setValue(true);
		progress.setValue("Processing...");
		stopped = false;

		// Start process in another thread
		new Thread(() -> {
			tessApi.setImage(imagePath);
			// Or set it as Bitmap, Pix,...
			// tessApi.setImage(imageBitmap);

			long startTime = SystemClock.uptimeMillis();

			// Use getHOCRText(0) method to trigger recognition with progress notifications and
			// ability to cancel ongoing processing.
			tessApi.getHOCRText(0);

			// Then get just normal UTF8 text as result. Using only this method would also trigger
			// recognition, but would just block until it is completed.
			String text = tessApi.getUTF8Text();

			result.postValue(text);
			processing.postValue(false);
			if (stopped) {
				progress.postValue("Stopped.");
			} else {
				long duration = SystemClock.uptimeMillis() - startTime;
				progress.postValue(String.format(Locale.ENGLISH,
						"Completed in %.3fs.", (duration / 1000f)));
			}
		}).start();
	}

	public void stop() {
		if (!isProcessing()) {
			return;
		}
		tessApi.stop();
		progress.setValue("Stopping...");
		stopped = true;
	}

	public boolean isProcessing() {
		return Boolean.TRUE.equals(processing.getValue());
	}

	public boolean isInitialized() {
		return tessInit;
	}

	@NonNull
	public LiveData<Boolean> getProcessing() {
		return processing;
	}

	@NonNull
	public LiveData<String> getProgress() {
		return progress;
	}

	@NonNull
	public LiveData<String> getResult() {
		return result;
	}
}
