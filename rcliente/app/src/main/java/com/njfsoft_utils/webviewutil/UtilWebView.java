package com.njfsoft_utils.webviewutil;

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Bitmap;
import android.graphics.Color;
import android.net.http.SslError;
import android.text.InputType;
import android.util.AttributeSet;
import android.view.KeyEvent;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.Window;
import android.view.inputmethod.EditorInfo;
import android.view.inputmethod.InputMethodManager;
import android.webkit.CookieSyncManager;
import android.webkit.GeolocationPermissions;
import android.webkit.HttpAuthHandler;
import android.webkit.JsResult;
import android.webkit.SslErrorHandler;
import android.webkit.WebChromeClient;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.Filter;
import android.widget.Filterable;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.MultiAutoCompleteTextView;
import android.widget.RelativeLayout;
import android.widget.SlidingDrawer;
import android.widget.TextView;
import android.widget.Toast;


import com.njfsoft_utils.core.SpaceTokenizer;
import com.rscanner.R;


import java.lang.reflect.Method;
import java.util.ArrayList;


/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 20-10-2012
 * Time: 3:24
 * To change this template use File | Settings | File Templates.
 */
public class UtilWebView extends WebView {

    Context mContext;
    Activity spactivity;

    private View                                mCustomView;
    private FrameLayout                         mCustomViewContainer;
    private WebChromeClient.CustomViewCallback  mCustomViewCallback;
    private FrameLayout                         mContentView;

    private LinearLayout                        lnrLytUWView;
    private FrameLayout                         mBrowserFrameLayout;
 
    private FrameLayout                         mLayout;
    private FrameLayout                         btnLayout;

   UtilWChromeClient mWebChromeClient;


    public ImageButton btnSpeak;
    public ImageButton btnGoBack;
    private ImageButton btnGoFoward;
    private ImageButton btnRefresh;
    private ImageButton btnStop;
    private ImageButton btnSettings;
    private ImageButton slideButton;
    private Button btnGotoUrl;
    private ImageButton btnHome;
    SlidingDrawer slidingDrawer;

    private MultiAutoCompleteTextView autoCompleteTextView;
    ArrayList aListHistUrls;
    ArrayList aListHistTitles;
    RelativeLayout  panBtnsWebView;
    UtilWVListener utilWVListener;
 
    String strHomeUrl = "file:///android_asset/scanner.html";

    static final FrameLayout.LayoutParams COVER_SCREEN_PARAMS = new FrameLayout.LayoutParams( ViewGroup.LayoutParams.FILL_PARENT, ViewGroup.LayoutParams.FILL_PARENT);
    static final FrameLayout.LayoutParams COVER_BTN_PARAMS = new FrameLayout.LayoutParams( ViewGroup.LayoutParams.FILL_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);

    Object objJSinterface = new JSI_UWV(this);
    String strAppName = "app";
    String strHTML = "noQvalue";
    public interface UtilWVListener {
        void doWVEvent(int cbType);
    }



    public UtilWebView(Context context) {
        super(context);
        // TODO Auto-generated constructor stub
        mContext = context;
	  spactivity = (Activity) mContext;
        setDaWebViewClient();
    }

    public UtilWebView(Context context, String tmpHomeUrl) {
        super(context);
        // TODO Auto-generated constructor stub
        mContext = context;
	  spactivity = (Activity) mContext;
	  strHomeUrl = tmpHomeUrl;
        setDaWebViewClient();
    }

    public UtilWebView(Context context, AttributeSet attrs) {
        super(context, attrs);
        mContext = context;
	  spactivity = (Activity) mContext;
        setDaWebViewClient();
    }


    public UtilWebView(Activity activity, Context context, String tmpHomeUrl) {
        super(context);
        mContext = context;
        spactivity = activity;
	  strHomeUrl = tmpHomeUrl;
        setDaWebViewClient();
    }
    public UtilWebView(Activity activity, Context context, UtilWVListener theMainVListener, String tmpHomeUrl) {
        super(context);
        mContext = context;
        spactivity = activity;
	  strHomeUrl = tmpHomeUrl;
	  utilWVListener = theMainVListener;
        setDaWebViewClient();
    }

    public UtilWebView(Activity activity, Context context, String url, String htmlStr, UtilWVListener theMainVListener, Object theJsIobj, String theAppName) {
        super(context);
        mContext = context;
        spactivity = activity;
        objJSinterface = theJsIobj;
        strAppName = theAppName;
        strHomeUrl = url;
        strHTML = htmlStr;
        setDaWebViewClient();
	  utilWVListener = theMainVListener;
        // epMainHbook = theHbook;

    }

    @Override
    public boolean onCheckIsTextEditor() {
        return true;
    }

   public void setDaWVListener(UtilWVListener ttVListener) {
   	  utilWVListener = ttVListener;
   }

  @SuppressLint("JavascriptInterface")
  public void setDaWebViewClient() {


        setScrollBarStyle(SCROLLBARS_INSIDE_OVERLAY);
        setFocusable(true);
        setFocusableInTouchMode(true);
        // requestFocus(View.FOCUS_DOWN);

		mLayout = new FrameLayout(mContext);
		btnLayout = new FrameLayout(mContext);

        mBrowserFrameLayout = (FrameLayout) LayoutInflater.from(spactivity).inflate(R.layout.com_njfsoft_utils_utilwebview_main, null);
 

        lnrLytUWView = (LinearLayout) mBrowserFrameLayout.findViewById(R.id.uwv_main);
 



        btnSpeak = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_speak);
        // btnGoBack = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_go_back);
        btnGoFoward = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_go_foward);
        btnRefresh = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_refresh);
        btnStop = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_stop);
        btnHome = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_Home);
        btnSettings = (ImageButton) mBrowserFrameLayout.findViewById(R.id.btn_settings);

 

        btnGotoUrl = (Button) mBrowserFrameLayout.findViewById(R.id.btn_gotourl);
        btnGotoUrl.setTextColor(Color.parseColor("#FFFFFF"));
        btnGotoUrl.setBackgroundColor(Color.parseColor("#000000"));
        String[] fullBlist;
        panBtnsWebView = (RelativeLayout) mBrowserFrameLayout.findViewById(R.id.rLayoutWVbtns);
 	 //  panBtnsWebView.setBackgroundColor(Color.argb(7,220,220,220));	

        autoCompleteTextView = (MultiAutoCompleteTextView) mBrowserFrameLayout.findViewById(R.id.aCompTextView);
        autoCompleteTextView.setImeOptions(EditorInfo.IME_ACTION_DONE);
        autoCompleteTextView.setInputType(InputType.TYPE_TEXT_VARIATION_URI);
        autoCompleteTextView.setTextColor(Color.parseColor("#000000"));
        autoCompleteTextView.setBackgroundColor(Color.parseColor("#FFFFFF"));
        autoCompleteTextView.setOnEditorActionListener(new TextView.OnEditorActionListener() {


            @Override
            public boolean onEditorAction(TextView arg0, int arg1, KeyEvent arg2) {
                // TODO Auto-generated method stub
                System.out.println("ClienteActivity.onEditorAction: " + arg1);
                if (arg1 == EditorInfo.IME_ACTION_DONE) {
                    try {
                        InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
                        imm.hideSoftInputFromWindow(autoCompleteTextView.getWindowToken(), 0);
                        UtilWebView.this.loadUrl(autoCompleteTextView.getText().toString());
                        slidingDrawer.close();
                    } catch (Exception e) {
                       //  showDaToast(e.toString());
                    }
                    // search pressed and perform your functionality.
                }
                return false;
            }

        });
        // you can also prompt the user with a hint
        autoCompleteTextView.setHint("http://");
        autoCompleteTextView.setTokenizer(new SpaceTokenizer());







        slideButton = (ImageButton) mBrowserFrameLayout.findViewById(R.id.slideButton);
        slidingDrawer = (SlidingDrawer) mBrowserFrameLayout.findViewById(R.id.slidingDrawer);
        slidingDrawer.setOnDrawerOpenListener(new SlidingDrawer.OnDrawerOpenListener() {
            @Override
            public void onDrawerOpened() {
                System.out.println("slide drawer opened");
               //  setHistoryLinks();

            }
        });

        slidingDrawer.setOnDrawerCloseListener(new SlidingDrawer.OnDrawerCloseListener() {
            @Override
            public void onDrawerClosed() {
                try {
                    InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(autoCompleteTextView.getWindowToken(), 0);
                } catch (Exception e) {
                    System.out.println("setOnDrawerCloseListener: " + e.toString());
                }
                System.out.println("slide drawer closed");
            }
        });

         btnSpeak.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                utilWVListener.doWVEvent(10);

            }
        });
/*
        btnGoBack.setOnClickListener(new View.OnClickListener() {
            public void onClick(View view) {
                if (UtilWebView.this.canGoBack()) {
                    if (UtilWebView.this.getUrl().equals("about:blank")) {
                        UtilWebView.this.loadUrl(strHomeUrl);
                    } else {
                        UtilWebView.this.goBack();

                    }


                }

            }
        });
 */

        btnGoFoward.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                if (UtilWebView.this.canGoForward()) {
                    if (UtilWebView.this.getUrl().equals("about:blank")) {
                        UtilWebView.this.loadUrl(strHomeUrl);
                    } else {
                        UtilWebView.this.goForward();

                    }

                }

            }
        });


        btnRefresh.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                if (UtilWebView.this.getUrl().equals("about:blank")) {
                    UtilWebView.this.loadUrl(strHomeUrl);
                } else {
                    UtilWebView.this.reload();
                }


            }
        });

        btnStop.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
               //  UtilWebView.this.stopLoading();
			UtilWebView.this.loadUrl("javascript:JSSHOP.jndroid.doWebShopUrl()");
            }
        });

        btnSettings.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                 UtilWebView.this.loadUrl("file:///android_asset/logipal/settings.html");
			// loadSpeechToText();
// UtilWebView.this.loadUrl("javascript:doJSUIComm(55)");
            }
        });



        btnHome.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                try {
                    UtilWebView.this.loadUrl(strHomeUrl);
                } catch (Exception e) {
//                    showDaToast(e.toString());
                }


            }
        });
        btnGotoUrl.setOnClickListener(new OnClickListener() {
            public void onClick(View view) {
                try {
                    InputMethodManager imm = (InputMethodManager) mContext.getSystemService(Context.INPUT_METHOD_SERVICE);
                    imm.hideSoftInputFromWindow(autoCompleteTextView.getWindowToken(), 0);
                    String strUrlString = autoCompleteTextView.getText().toString();
                    if (strUrlString.toLowerCase().startsWith("http")) {

                    } else {
				if(strUrlString.indexOf(" ") != -1) {
				String bustr = "http://www.google.com/search?q=" + strUrlString;
                        strUrlString = bustr;

				}else {
                        strUrlString = "http://" + strUrlString;
				}
                    }
                    UtilWebView.this.loadUrl(strUrlString);
                    slidingDrawer.close();
                } catch (Exception e) {
//                    showDaToast(e.toString());
                }


            }
        });



   



        UtilWebView.this.clearSslPreferences();
       // UtilWebView.this.enablePlatformNotifications();
 
        setScrollBarStyle(View.SCROLLBARS_INSIDE_OVERLAY);
        try {
            Method m = WebSettings.class.getMethod("setDomStorageEnabled", new Class[]{boolean.class});
            m.invoke(getSettings(), true);
        } catch (Exception e) {
           //  showDaToast(e.toString());
        }



 
	  setToggleWViewBtns(true,false);
        // loadUrl(strHomeUrl);


 

        WebSettings webSettings = getSettings();
        webSettings.setSaveFormData(true);
        webSettings.setJavaScriptEnabled(true);

        webSettings.setSupportZoom(true);
	  UtilWebView.this.setInitialScale(1);
 
        webSettings.setUseWideViewPort(true);
        webSettings.setLoadWithOverviewMode(true);
/*
        webSettings.setSupportZoom(false);
        webSettings.setUseWideViewPort(false);
        webSettings.setLoadWithOverviewMode(false);
*/
	  // fix this showing images
       //  boolean CURR_SHOW_WEB_IMAGES = Boolean.parseBoolean(currConfBundle.getString("confShowWebImgs"));
       //  webSettings.setLoadsImagesAutomatically(CURR_SHOW_WEB_IMAGES);

        webSettings.setBuiltInZoomControls(false);
	  // webSettings.setPluginsEnabled(true);
 
	  webSettings.setDomStorageEnabled(true);
	  webSettings.supportMultipleWindows();
        webSettings.setUserAgentString("Mozilla/5.0 (Linux; U; Android 2.0; en-us; Droid Build/ESD20) AppleWebKit/530.17 (KHTML, like Gecko) Version/4.0 Mobile Safari/530.17");
//         UtilWebView.this.registerForContextMenu(this);

      webSettings.setAllowFileAccessFromFileURLs(true);
      webSettings.setAllowUniversalAccessFromFileURLs(true);
      //  s.setSavePassword(true);

        UtilWebView.this.addJavascriptInterface(new JSI_UWV(this), "app_uwv");
        UtilWebView.this.addJavascriptInterface(objJSinterface, strAppName);
        // UtilWebView.this.setFocusable(false);
        // UtilWebView.this.setFocusableInTouchMode(false);
        // UtilWebView.this.requestFocus(View.FOCUS_DOWN);

        CookieSyncManager.createInstance(mContext);
	 //  mWebChromeClient = new UtilWChromeClient();


/*
     	  UtilWebView.this.setWebChromeClient(mWebChromeClient);
 //   UtilWebView.this.setWebChromeClient(new WebChromeClient());
        UtilWebView.this.setWebViewClient(new UtilWViewClient());	 

*/
        lnrLytUWView.addView(this);

       mLayout.addView(mBrowserFrameLayout, COVER_SCREEN_PARAMS);
 
        // addContentView(mLayout);
	// setHistoryLinks();
 


	UtilWebView.this.loadUrl(strHomeUrl);
   }




    public void setHomeUrl(String theHomeUrl) {
        strHomeUrl = theHomeUrl;
    }
    public FrameLayout getLayout() {
        return mLayout;
    }
    public FrameLayout getBtnLayout() {
        return btnLayout;
    }
    public boolean inCustomView() {
        return (mCustomView != null);
    }

    public void hideCustomView() {
        mWebChromeClient.onHideCustomView();
    }







	private class UtilWViewClient extends WebViewClient {

        @Override
        public void onReceivedError(WebView view, int errorCode, String description, String failingUrl) {
           Toast.makeText(mContext, "Oh no! " + description, Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onPageStarted(WebView view, String url, Bitmap favicon) {
		// if(url.indexOf("http") != -1) {
		autoCompleteTextView.setText(url);
		// }
            System.out.print("onPageStarted1: " + url);
            // TODO Auto-generated method stub
            // Toast.makeText(mContext, "page started: " + url, Toast.LENGTH_LONG).show();
            CookieSyncManager.getInstance().sync();
          //  super.onPageStarted(view, url, favicon);
            
        }
        @Override
        public void onReceivedHttpAuthRequest(WebView view, HttpAuthHandler handler, String host, String realm)  {

            // TODO Auto-generated method stub
            // Toast.makeText(mContext, "page started: " + url, Toast.LENGTH_LONG).show();
            CookieSyncManager.getInstance().sync();
            System.out.print("onReceivedHttpAuthRequest: " + host);
          //    super.onReceivedHttpAuthRequest(view, handler, host, realm);
        }
        @Override
        public void onPageFinished(WebView view, String url) {
            //  showDaUrlToast(url);
            //  Toast.makeText(mContext, "page finished: " + url, Toast.LENGTH_LONG).show();
            // TODO Auto-generated method stub
		autoCompleteTextView.setText(url);
            System.out.print("onPageFinished: " + url);
            CookieSyncManager.getInstance().sync();
          // super.onPageFinished(view, url);
            // pumpToUrlString();
        }
        @Override
        public boolean shouldOverrideUrlLoading(WebView view, String theUrl) {
		autoCompleteTextView.setText(theUrl);

            return false;
        }

        public void onReceivedSslError(WebView view, SslErrorHandler handler, SslError errer) {
            System.out.print("onReceivedSslError: " + errer);
            handler.proceed() ;
        }
 

   
     }








    private class UtilWChromeClient extends WebChromeClient {

        private Bitmap      mDefaultVideoPoster;
        private View        mVideoProgressView;

 

        @Override
        public void onConsoleMessage(String message, int lineNumber, String sourceID) {
            System.out.println("onConsoleMessage: " + message + " -- From line "
                    + String.valueOf(lineNumber) + " of "
                    + sourceID);
                    super.onConsoleMessage(message, lineNumber, sourceID);
        }
            @Override
            public boolean onJsAlert(WebView view, String url, String message, JsResult result) {
                System.out.println("+-------------------------------");
                System.out.println("|WebChromeClient onJsAlert	" + message);
                System.out.println("+-------------------------------");
                result.confirm();
		    
		    Toast.makeText(mContext, "Alert... " + message, Toast.LENGTH_LONG).show();
                return true;
            }





        @Override
        public void onShowCustomView(View view, CustomViewCallback callback)
        {

                System.out.println("onShowCstmView: ");

            UtilWebView.this.setVisibility(View.GONE);

            // if a view already exists then immediately terminate the new one
            if (mCustomView != null) {
                callback.onCustomViewHidden();
                return;
            }

            mCustomViewContainer.addView(view);
            mCustomView = view;
            mCustomViewCallback = callback;
            mCustomViewContainer.setVisibility(View.VISIBLE);
        }

        @Override
        public void onHideCustomView() {
            System.out.println("customview hideeeeeeeeeeeeeeeeeeeeeeeeeee");
            if (mCustomView == null)
                return;        

            // Hide the custom view.
            mCustomView.setVisibility(View.GONE);

            // Remove the custom view from its container.
            mCustomViewContainer.removeView(mCustomView);
            mCustomView = null;
            mCustomViewContainer.setVisibility(View.GONE);
            mCustomViewCallback.onCustomViewHidden();

            UtilWebView.this.setVisibility(View.VISIBLE);
            UtilWebView.this.goBack();
            //Log.i(LOGTAG, "set it to webVew");
        }


        @Override
        public View getVideoLoadingProgressView() {
            //Log.i(LOGTAG, "here in on getVideoLoadingPregressView");
                System.out.println("getVideoLoadingProgressView: ");

            if (mVideoProgressView == null) {
                LayoutInflater inflater = LayoutInflater.from(mContext);
                mVideoProgressView = inflater.inflate(R.layout.com_njfsoft_utils_utilwebview_video_loading_progress, null);
            }
            return mVideoProgressView; 
        }

         @Override
         public void onReceivedTitle(WebView view, String title) {
            ((Activity) mContext).setTitle(title);
         }

         @Override
         public void onProgressChanged(WebView view, int newProgress) {
             ((Activity) mContext).getWindow().setFeatureInt(Window.FEATURE_PROGRESS, newProgress*100);
         }

         @Override
         public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
             callback.invoke(origin, true, false);
         }
 





    }



public void setToggleWVBtns() {


		spactivity.runOnUiThread(new Runnable() {
				                   public void run() {
				try {
        if(panBtnsWebView.isShown()) {
	  panBtnsWebView.setVisibility(View.GONE);

 	  } else {
	  panBtnsWebView.setVisibility(View.VISIBLE);
	  }

		} catch(Exception e) {
            System.out.println("dev:ERROR:setToggleWView: " + e);
		}
				                   }
			                   });

	}



public void setToggleWViewBtns(final boolean boolWBShow, final boolean boolSDShow) {


		spactivity.runOnUiThread(new Runnable() {
				                   public void run() {
				try {
        if(boolWBShow) {
	  panBtnsWebView.setVisibility(View.VISIBLE);
        if(boolSDShow) {
                    slidingDrawer.open();
        }
 	  } else {
	  panBtnsWebView.setVisibility(View.GONE);
	  }

		} catch(Exception e) {
            System.out.println("dev:ERROR:setSendSMSComm: " + e);
		}
				                   }
			                   });

	}










/*







 

*/







    public class CustomAdapater extends ArrayAdapter implements Filterable {
        private ArrayList<String> mData;
        private final ArrayList<String> orig;
        private final ArrayList<String> suggestions;
        final LayoutInflater inflater;

        @SuppressWarnings("unchecked")
        public CustomAdapater(Context context, ArrayList<String> al) {
            super(context, R.layout.com_njfsoft_utils_utilwebview_list_item, al);
 
            inflater = LayoutInflater.from(context);
            mData = al;
            this.add(mData);
            orig = (ArrayList<String>) mData.clone();
            this.suggestions = new ArrayList<String>();
        }

        @Override
        public int getCount() {
            return suggestions.size();
        }

        @Override
        public Object getItem(int position) {
            try {
                return suggestions.get(position);
            } catch (Exception e) {
                System.out.println("CustomAdapater getItem(): " + e.toString());
                return suggestions.get(suggestions.size());
            }
        }

        @Override
        public Filter getFilter() {
            Filter myFilter = new Filter() {
                @Override
                protected FilterResults performFiltering(CharSequence constraint) {
                    FilterResults filterResults = new FilterResults();
                    if (constraint != null) {
                        suggestions.clear();
                        for (String s : orig) {
                            if (s != null && s.contains(constraint))
                                suggestions.add(s);
                        }
                        filterResults.values = suggestions;
                        filterResults.count = suggestions.size();
                    }
                    return filterResults;
                }

                @SuppressWarnings("unchecked")
                @Override
                protected void publishResults(CharSequence contraint, FilterResults results) {
                    mData = (ArrayList<String>) results.values;
                    notifyDataSetChanged();
                }
            };
            return myFilter;
        }
    }


    void setHistoryLinks() {
        // autoCompleteTextView.setAdapter(new CustomAdapater(spactivity, getHistArrayList()));
    }


    public void setAddressUrl(String strU) {
        autoCompleteTextView.setText(strU);
    }
 

    public String getAddressUrl() {
        return autoCompleteTextView.getText().toString();
    }
    public void setWordSuggsFalse() {
      //   this.setInputType(InputType.TYPE_TEXT_FLAG_NO_SUGGESTIONS);
    }

    public void setWordSuggsTrue() {
    //    this.setInputType(InputType.TYPE_TEXT_FLAG_AUTO_COMPLETE );
    }


 



}