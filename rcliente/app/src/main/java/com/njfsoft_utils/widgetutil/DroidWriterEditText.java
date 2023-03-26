package com.njfsoft_utils.widgetutil;

// import com.quickorder.R;
/**
 * Created by IntelliJ IDEA.
 * User: boss
 * Date: 29-03-2014
 * Time: 17:12
 * To change this template use File | Settings | File Templates.
 */

import android.annotation.SuppressLint;
import android.app.Activity;
import android.content.Context;
import android.graphics.Color;
import android.graphics.Typeface;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.ResultReceiver;
import android.text.Editable;
import android.text.Html;
import android.text.Layout;
import android.text.Selection;
import android.text.Spannable;
import android.text.SpannableString;
import android.text.Spanned;
import android.text.TextWatcher;
import android.text.style.AbsoluteSizeSpan;
import android.text.style.AlignmentSpan;
import android.text.style.CharacterStyle;
import android.text.style.ForegroundColorSpan;
import android.text.style.StyleSpan;
import android.text.style.UnderlineSpan;
import android.util.AttributeSet;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.view.inputmethod.InputMethodManager;
import android.widget.Button;
import android.widget.EditText;
import android.widget.FrameLayout;
import android.widget.ImageButton;
import android.widget.LinearLayout;
import android.widget.ToggleButton;



import java.util.Arrays;

import static java.lang.Integer.parseInt;

import com.rscanner.R;


@SuppressLint("AppCompatCustomView")
public class DroidWriterEditText extends EditText {




    // Log tag
    public static final String TAG = "DroidWriter";

    // Style constants
    private static final int STYLE_BOLD = 0;
    private static final int STYLE_ITALIC = 1;
    private static final int STYLE_UNDERLINED = 2;
    private static final int STYLE_FONTSIZE = 3;
    private static final int STYLE_FONTCOLOR = 4;
    private static final int STYLE_TEXTALIGN = 5;


    final int INT_BTN_BOLD = 10;
    final int INT_BTN_ITALIC = 11;
    final int INT_BTN_ULINE = 12;
    final int INT_BTN_CLR = 13;
    final int INT_BTN_FSIZE = 14;
    String currFontColor = "000000";
    String currFontSize = "18";
    String currFontBold = "no";
    String currFontItal = "no";

    // Optional styling button references

    String oldTxtColor = "#636161";
    String newTxtColor = "#636161";

 


    // Html image getter that handles the loading of inline images
    private Html.ImageGetter imageGetter;
    int intLastSelStart;
    int intLastSelEnd;

    ColorPickerDialog colorPickerDialog;
    ColorPickerDialog.OnColorChangedListener colorChangedListener;
    private Object[] theStles;

    private SoftKeyReceiver mSkr;





Activity dractivity;
private LinearLayout lnrLytDWETView;
private FrameLayout mDWETFrameLayout;
private FrameLayout mDWETLayout;
static final FrameLayout.LayoutParams COVER_SCREEN_PARAMS = new FrameLayout.LayoutParams( ViewGroup.LayoutParams.FILL_PARENT, ViewGroup.LayoutParams.WRAP_CONTENT);

ImageButton imgBtnMMainT;
EditText txtVwMEdCntcs;
Button btnMGetContcts;
ImageButton imgBtnMHelp;
ToggleButton tglBtnMBold;
ToggleButton tglBtnMItalics;
ImageButton imgBtnMTxtClr;
ImageButton imgBtnMFntSize;
ImageButton imgMBtnReloadMsgs;
ImageButton imgBtnMSendMsg;
ImageButton imgBtnMGetScene;
DWETListener sDWETListener;
SCTextWatcher scTextWatcher;
Context dwetContext;
    public DroidWriterEditText(Context context) {
        super(context);
	  dwetContext = context;
        intLastSelStart = 0;
        intLastSelEnd = 0;
        initialize();
    }

    public DroidWriterEditText(Context context, AttributeSet attrs) {
        super(context, attrs);
        dwetContext = context;
        initialize();
    }


    public DroidWriterEditText(Activity tactivity, Context context, DWETListener tdwetListener) {
        super(context);
	  dractivity = tactivity;
	  dwetContext = context;
	  sDWETListener = tdwetListener;
        initialize();
    }


    public DroidWriterEditText(Context context, AttributeSet attrs, int defStyle) {
        super(context, attrs, defStyle);
	  dwetContext = context;
        initialize();
    }

    private void initialize() {





	mDWETLayout = new FrameLayout(dwetContext);
	mDWETFrameLayout = (FrameLayout) LayoutInflater.from(dractivity).inflate(R.layout.com_njfsoft_utils_widgetutil_droidwriteredittext, null);
	lnrLytDWETView = (LinearLayout) mDWETFrameLayout.findViewById(R.id.dwet_main);



	imgBtnMMainT = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnMainT);
      imgBtnMMainT.setOnClickListener(new OnClickListener() {
          public void onClick(View view) {
              try {
		  sDWETListener.onComplete(sDWETListener.DWET_SET_TOGGLE_VIEW, null);
                 //  setToggleMView();
              } catch (Exception e) {
                  // showDaToast(e.toString());
              }
          }
      });


	txtVwMEdCntcs = (EditText) mDWETFrameLayout.findViewById(R.id.txtVwEdCntcs);
    	txtVwMEdCntcs.setHint("To");


    	btnMGetContcts = (Button) mDWETFrameLayout.findViewById(R.id.btnGetCntcts);
      btnMGetContcts.setOnClickListener(new OnClickListener() {
          public void onClick(View v) {
		  sDWETListener.onComplete(sDWETListener.DWET_GET_CONTACTS, null);
          }
      });


    imgBtnMHelp = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnHelp);
    imgBtnMHelp.setOnClickListener(new OnClickListener() {
        public void onClick(View view) {
		  sDWETListener.onComplete(sDWETListener.DWET_GET_HELP, null);
        }
    });


    tglBtnMBold = (ToggleButton) mDWETFrameLayout.findViewById(R.id.tglBtnBold);
        tglBtnMBold.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                toggleStyle(STYLE_BOLD, "noQvalue");
            }
        });


	tglBtnMItalics = (ToggleButton) mDWETFrameLayout.findViewById(R.id.tglBtnItalics);
        tglBtnMItalics.setOnClickListener(new OnClickListener() {
            public void onClick(View v) {
                toggleStyle(STYLE_ITALIC, "noQvalue");
            }
        });


    imgBtnMTxtClr = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnTxtClr);
    imgBtnMTxtClr.setOnClickListener(new OnClickListener() {
        public void onClick(View view) {
		  sDWETListener.onComplete(sDWETListener.DWET_GET_TXT_CLR, null);
        }
    });


    imgBtnMFntSize = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnFntSize);
    imgBtnMFntSize.setOnClickListener(new OnClickListener() {
        public void onClick(View v) {
		  sDWETListener.onComplete(sDWETListener.DWET_GET_TXT_SIZE, null);
        }
    });


    imgMBtnReloadMsgs = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnReloadMsgs);
    imgMBtnReloadMsgs.setOnClickListener(new OnClickListener() {
        public void onClick(View view) {
		  sDWETListener.onComplete(sDWETListener.DWET_RELOAD_MSGS, null);
        }
    });
 

    imgBtnMSendMsg = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnSendMsg);
    imgBtnMSendMsg.setOnClickListener(new OnClickListener() {
        public void onClick(View v) {
		  sDWETListener.onComplete(sDWETListener.DWET_DO_MSG_SEND, null);
        }
    });

    imgBtnMGetScene = (ImageButton) mDWETFrameLayout.findViewById(R.id.imgBtnGetScene);
    imgBtnMGetScene.setOnClickListener(new OnClickListener() {
        public void onClick(View view) {
		sDWETListener.onComplete(sDWETListener.DWET_CHECK_SCENE_KEYS, null);
        }
    });


 
    setSingleLine(false);
    setMinLines(4);
    scTextWatcher = new SCTextWatcher();
    addTextChangedListener(scTextWatcher);


        // Add a default imageGetter
        imageGetter = new Html.ImageGetter() {
        @Override
        public Drawable getDrawable(String source) {
            Drawable drawable = null;
/*
            try {
                if (source.equals("smiley_cool.gif")) {
                    drawable = getResources().getDrawable(R.drawable.wink);
                } else if (source.equals("smiley_cry.gif")) {
                    drawable = getResources().getDrawable(R.drawable.wub);
                } else {
                    drawable = null;
                }

                // Important
                if (drawable != null) {
                    drawable.setBounds(0, 0, drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight());
                }
            } catch (Exception e) {
                Log.e("SmsCanvas", "Failed to load inline image!");
            }
*/
            return drawable;
        }
        };



    setImageGetter(imageGetter);




        // Add TextWatcher that reacts to text changes and applies the selected
        // styles
        this.addTextChangedListener(new DWTextWatcher());
        Spanned e = Html.fromHtml("<b>Bla</b> <font color=\"#808080\" size=\"22px\">HOKOKOKO</font>", imageGetter, null);
        DroidWriterEditText.this.setHint("Click to edit SMS");
        //  DroidWriterEditText.this.getText().insert(0, e);




	
	lnrLytDWETView.addView(this);
	mDWETLayout.addView(mDWETFrameLayout, COVER_SCREEN_PARAMS);

    }




    private class SCTextWatcher implements TextWatcher {

        @Override
        public void beforeTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            System.out.println("txtChanged: " + getTextHTML());
            //To change body of implemented methods use File | Settings | File Templates.
        }

        @Override
        public void onTextChanged(CharSequence charSequence, int i, int i1, int i2) {
            //To change body of implemented methods use File | Settings | File Templates.
        }

        @Override
        public void afterTextChanged(Editable editable) {
            System.out.println("txtChanged: " + getTextHTML());
            String ftxt = getTextHTML();
            String nftxt = ftxt.replace("\n", "");
            String bftxt = nftxt.replace("'", "");
            setCompMsgStats();
            //To change body of implemented methods use File | Settings | File Templates.
        }
    }


    public void setCompMsgStats() {
        System.out.println("setCompMsgStats");
        // spWebView.loadUrl("javascript:initialise()");
    }


    public FrameLayout getDWETLayout() {
        return mDWETLayout;
    }




    /**
     * When the user selects a section of the text, this method is used to
     * toggle the defined style on it. If the selected text already has the
     * style applied, we remove it, otherwise we apply it.
     *
     * @param style The styles that should be toggled on the selected text.
     */
    public void toggleStyle(int style, String sargs) {
        // Gets the current cursor position, or the starting position of the
        // selection
        int selectionStart = this.getSelectionStart();
        System.out.println("toggleStyle:selectionStart: " + selectionStart);
        Spannable str = this.getText();
        // Gets the current cursor position, or the end position of the
        // selection
        // Note: The end can be smaller than the start
        int selectionEnd = this.getSelectionEnd();
        // if((style == STYLE_FONTCOLOR) || (style == STYLE_FONTSIZE)) {
         // selectionStart = intLastSelStart;
         // selectionEnd = intLastSelEnd;
	  // }
         selectionStart = 0;
         selectionEnd = this.getText().length();
        

        System.out.println("toggleStyle:selectionEnd: " + selectionEnd);
        // Reverse if the case is what's noted above
        if (selectionStart > selectionEnd) {
            int temp = selectionEnd;
            selectionEnd = selectionStart;
            selectionStart = temp;
        }

        // The selectionEnd is only greater then the selectionStart position
        // when the user selected a section of the text. Otherwise, the 2
        // variables
        // should be equal (the cursor position).
        if (selectionEnd > selectionStart) {

            boolean exists = false;
            StyleSpan[] styleSpans;


            switch (style) {
                case STYLE_BOLD:
                    styleSpans = str.getSpans(selectionStart, selectionEnd, StyleSpan.class);

                    // If the selected text-part already has BOLD style on it, then
                    // we need to disable it
                    for (int i = 0; i < styleSpans.length; i++) {
                        if (styleSpans[i].getStyle() == Typeface.BOLD) {
                            str.removeSpan(styleSpans[i]);
                            exists = true;
                            currFontBold = "no";
                        }
                    }

                    // Else we set BOLD style on it
                    if (!exists) {
                        str.setSpan(new StyleSpan(Typeface.BOLD), selectionStart, selectionEnd,
                                Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                            currFontBold = "y";
                                
                    }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
                case STYLE_ITALIC:
                    styleSpans = str.getSpans(selectionStart, selectionEnd, StyleSpan.class);

                    // If the selected text-part already has ITALIC style on it,
                    // then we need to disable it
                    for (int i = 0; i < styleSpans.length; i++) {
                        if (styleSpans[i].getStyle() == Typeface.ITALIC) {
                            str.removeSpan(styleSpans[i]);
                            exists = true;
                            currFontItal = "no";
                        }
                    }

                    // Else we set ITALIC style on it
                    if (!exists) {
                        str.setSpan(new StyleSpan(Typeface.ITALIC), selectionStart, selectionEnd,
                                Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                            currFontItal = "y";
                    }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
                case STYLE_UNDERLINED:
                    UnderlineSpan[] underSpan = str.getSpans(selectionStart, selectionEnd, UnderlineSpan.class);

                    // If the selected text-part already has UNDERLINE style on it,
                    // then we need to disable it
                    for (int i = 0; i < underSpan.length; i++) {
                        str.removeSpan(underSpan[i]);
                        exists = true;
                    }

                    // Else we set UNDERLINE style on it
                    if (!exists) {
                        str.setSpan(new UnderlineSpan(), selectionStart, selectionEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
                case STYLE_FONTSIZE:
                    AbsoluteSizeSpan[] fsizeSpan = str.getSpans(selectionStart, selectionEnd, AbsoluteSizeSpan.class);

                    // If the selected text-part already has UNDERLINE style on it,
                    // then we need to disable it
                    for (int i = 0; i < fsizeSpan.length; i++) {
                        str.removeSpan(fsizeSpan[i]);
                        exists = true;
                    }
                    currFontSize = sargs;
                    // Else we set UNDERLINE style on it
                    // if (!exists) {
                    str.setSpan(new AbsoluteSizeSpan(parseInt(sargs)), selectionStart, selectionEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    // }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
                case STYLE_TEXTALIGN:
                    AlignmentSpan.Standard[] talign = str.getSpans(selectionStart, selectionEnd, AlignmentSpan.Standard.class);

                    // If the selected text-part already has UNDERLINE style on it,
                    // then we need to disable it
                    for (int i = 0; i < talign.length; i++) {
                        str.removeSpan(talign[i]);
                        exists = true;
                    }

                    // Else we set UNDERLINE style on it
                    // if (!exists) {
                    str.setSpan(new AlignmentSpan.Standard(Layout.Alignment.valueOf(sargs)), selectionStart, selectionEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    // }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
                case STYLE_FONTCOLOR:
                    ForegroundColorSpan[] tcolor = str.getSpans(selectionStart, selectionEnd, ForegroundColorSpan.class);

                    // If the selected text-part already has UNDERLINE style on it,
                    // then we need to disable it
                    for (int i = 0; i < tcolor.length; i++) {
                        str.removeSpan(tcolor[i]);
                        exists = true;
                    }
                    currFontColor = sargs;
                    // Else we set UNDERLINE style on it
                    // if (!exists) {
                    str.setSpan(new ForegroundColorSpan(Integer.parseInt(sargs)), selectionStart, selectionEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    // }

                    this.setSelection(selectionStart, selectionEnd);
                    break;
            }


        }


        String fstr = getTextHTML();


        System.out.println("getFSpansHTML: " + fstr);

    }

    /**
     * This method makes sure that the optional style toggle buttons update
     * their state correctly when the user moves the cursor around the EditText,
     * or when the user selects sections of the text.
     */
    @Override
    public void onSelectionChanged(int selStart, int selEnd) {
        super.onSelectionChanged(selStart, selEnd);
        boolean boldExists = false;
        boolean italicsExists = false;
        boolean underlinedExists = false;

        // If the user only placed the cursor around
        if (selStart > 0 && selStart == selEnd) {
            CharacterStyle[] styleSpans = this.getText().getSpans(selStart - 1, selStart, CharacterStyle.class);

            for (int i = 0; i < styleSpans.length; i++) {
                if (styleSpans[i] instanceof StyleSpan) {
                    if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.BOLD) {
                        boldExists = true;
                    } else if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.ITALIC) {
                        italicsExists = true;
                    } else if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.BOLD_ITALIC) {
                        italicsExists = true;
                        boldExists = true;
                    }
                } else if (styleSpans[i] instanceof UnderlineSpan) {
                    underlinedExists = true;
                }
            }
        }

        // Else if the user selected multiple characters
        else {
            CharacterStyle[] styleSpans = this.getText().getSpans(selStart, selEnd, CharacterStyle.class);

            for (int i = 0; i < styleSpans.length; i++) {
                if (styleSpans[i] instanceof StyleSpan) {
                    if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.BOLD) {
                        if (this.getText().getSpanStart(styleSpans[i]) <= selStart
                                && this.getText().getSpanEnd(styleSpans[i]) >= selEnd) {
                            boldExists = true;
                        }
                    } else if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.ITALIC) {
                        if (this.getText().getSpanStart(styleSpans[i]) <= selStart
                                && this.getText().getSpanEnd(styleSpans[i]) >= selEnd) {
                            italicsExists = true;
                        }
                    } else if (((StyleSpan) styleSpans[i]).getStyle() == Typeface.BOLD_ITALIC) {
                        if (this.getText().getSpanStart(styleSpans[i]) <= selStart
                                && this.getText().getSpanEnd(styleSpans[i]) >= selEnd) {
                            italicsExists = true;
                            boldExists = true;
                        }
                    }
                } else if (styleSpans[i] instanceof UnderlineSpan) {
                    if (this.getText().getSpanStart(styleSpans[i]) <= selStart
                            && this.getText().getSpanEnd(styleSpans[i]) >= selEnd) {
                        underlinedExists = true;
                    }
                }
            }
        }

        // Display the format settings
        if (tglBtnMBold != null) {
            if (boldExists)
                tglBtnMBold.setChecked(true);
            else
                tglBtnMBold.setChecked(false);
        }

        if (tglBtnMItalics != null) {
            if (italicsExists)
                tglBtnMItalics.setChecked(true);
            else
                tglBtnMItalics.setChecked(false);
        }
	/*
        if (underlineToggle != null) {
            if (underlinedExists)
                underlineToggle.setChecked(true);
            else
                underlineToggle.setChecked(false);
        }

	*/
    }


    // Get and set Spanned, styled text
    public Spanned getSpannedText() {
        return this.getText();
    }

    public void setSpannedText(Spanned text) {
        this.setText(text);
    }

    // Get and set simple text as simple strings
    public String getStringText() {
        return this.getText().toString();
    }

    public void setStringText(String text) {
        this.setText(text);
    }

    // Get and set styled HTML text
    public String getTextHTML() {
        return Html.toHtml(DroidWriterEditText.this.getText());
    }

    public void setTextHTML(String text) {
        DroidWriterEditText.this.setText(Html.fromHtml(text, imageGetter, null));
    }

    // Set the default image getter that handles the loading of inline images
    public void setImageGetter(Html.ImageGetter imageGetter) {
        this.imageGetter = imageGetter;
    }





    private class DWTextWatcher implements TextWatcher {
        @Override
        public void afterTextChanged(Editable editable) {
            // Unused

            // Add style as the user types if a toggle button is enabled
            int position = Selection.getSelectionStart(DroidWriterEditText.this.getText());
            if (position < 0) {
                position = 0;
            }


            if (position > 0) {
                CharacterStyle[] appliedStyles = editable.getSpans(position - 1, position, CharacterStyle.class);

                StyleSpan currentBoldSpan = null;
                StyleSpan currentItalicSpan = null;
                UnderlineSpan currentUnderlineSpan = null;

                // Look for possible styles already applied to the entered text
                for (int i = 0; i < appliedStyles.length; i++) {
                    if (appliedStyles[i] instanceof StyleSpan) {
                        if (((StyleSpan) appliedStyles[i]).getStyle() == Typeface.BOLD) {
                            // Bold style found
                            currentBoldSpan = (StyleSpan) appliedStyles[i];
                        } else if (((StyleSpan) appliedStyles[i]).getStyle() == Typeface.ITALIC) {
                            // Italic style found
                            currentItalicSpan = (StyleSpan) appliedStyles[i];
                        }
                    } else if (appliedStyles[i] instanceof UnderlineSpan) {
                        // Underlined style found
                        currentUnderlineSpan = (UnderlineSpan) appliedStyles[i];
                    }
                }

                // Handle the bold style toggle button if it's present
                if (tglBtnMBold != null) {
                    if (tglBtnMBold.isChecked() && currentBoldSpan == null) {
                        // The user switched the bold style button on and the
                        // character doesn't have any bold
                        // style applied, so we start a new bold style span. The
                        // span is inclusive,
                        // so any new characters entered right after this one
                        // will automatically get this style.
                        editable.setSpan(new StyleSpan(Typeface.BOLD), position - 1, position,
                                Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    } else if (!tglBtnMBold.isChecked() && currentBoldSpan != null) {
                        // The user switched the bold style button off and the
                        // character has bold style applied.
                        // We need to remove the old bold style span, and define
                        // a new one that end 1 position right
                        // before the newly entered character.
                        int boldStart = editable.getSpanStart(currentBoldSpan);
                        int boldEnd = editable.getSpanEnd(currentBoldSpan);

                        editable.removeSpan(currentBoldSpan);
                        if (boldStart <= (position - 1)) {
                            editable.setSpan(new StyleSpan(Typeface.BOLD), boldStart, position - 1,
                                    Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                        }

                        // The old bold style span end after the current cursor
                        // position, so we need to define a
                        // second newly created style span too, which begins
                        // after the newly entered character and
                        // ends at the old span's ending position. So we split
                        // the span.
                        if (boldEnd > position) {
                            editable.setSpan(new StyleSpan(Typeface.BOLD), position, boldEnd,
                                    Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                        }
                    }
                }

                // Handling italics and underlined styles is the same as
                // handling bold styles.

                // Handle the italics style toggle button if it's present
                if (tglBtnMItalics != null && tglBtnMItalics.isChecked() && currentItalicSpan == null) {

                    editable.setSpan(new StyleSpan(Typeface.ITALIC), position - 1, position, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                } else if (tglBtnMItalics != null && !tglBtnMItalics.isChecked() && currentItalicSpan != null) {
                    int italicStart = editable.getSpanStart(currentItalicSpan);
                    int italicEnd = editable.getSpanEnd(currentItalicSpan);

                    editable.removeSpan(currentItalicSpan);
                    if (italicStart <= (position - 1)) {
                        editable.setSpan(new StyleSpan(Typeface.ITALIC), italicStart, position - 1, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    }

                    // Split the span
                    if (italicEnd > position) {
                        editable.setSpan(new StyleSpan(Typeface.ITALIC), position, italicEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    }
                }

			/* not doing underline for now

                // Handle the underlined style toggle button if it's present
                if (underlineToggle != null && underlineToggle.isChecked() && currentUnderlineSpan == null) {
                    editable.setSpan(new UnderlineSpan(), position - 1, position, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                } else if (underlineToggle != null && !underlineToggle.isChecked() && currentUnderlineSpan != null) {
                    int underLineStart = editable.getSpanStart(currentUnderlineSpan);
                    int underLineEnd = editable.getSpanEnd(currentUnderlineSpan);

                    editable.removeSpan(currentUnderlineSpan);
                    if (underLineStart <= (position - 1)) {
                        editable.setSpan(new UnderlineSpan(), underLineStart, position - 1, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    }

                    // We need to split the span
                    if (underLineEnd > position) {
                        editable.setSpan(new UnderlineSpan(), position, underLineEnd,
                                Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
                    }
                }
			*/

            }

        }

        public void beforeTextChanged(CharSequence s, int start, int count, int after) {
            // Unused
        }

        public void onTextChanged(CharSequence s, int start, int before, int count) {
            // Unused
        }


    }

    public void doSimpleFormat(Object checkStyle, Object objStyle) {

        Spannable editable = this.getText();
        SpannableString spannableString = new SpannableString(editable);
        int startSelection = DroidWriterEditText.this.getSelectionStart();
        int endSelection = DroidWriterEditText.this.getSelectionEnd();
        int selStart = Math.min(startSelection, endSelection);
        int selEnd = Math.max(startSelection, endSelection);
        System.out.println("sel: " + startSelection + "::" + endSelection);
        String selectedText = DroidWriterEditText.this.getText().toString().substring(Math.min(startSelection, endSelection), Math.max(startSelection, endSelection));
        Object[] theStyles = null;
        theStyles = editable.getSpans(selStart, selEnd, (Class<Object>) checkStyle);
        System.out.println("slen: " + Arrays.toString(theStyles) + "::" + theStyles.length);
        try {
            editable.removeSpan(checkStyle);
            /*
         if(theStyles.length >= 1) {

         }  else {


         }
         */
            editable.setSpan(objStyle, selStart, selEnd, Spannable.SPAN_MARK_MARK);
        } catch (Exception e) {
            System.out.println("slen e: " + e);
        }

    }

    public void OLDdoSimpleFormat(int ftype, Object fArgs) {
        Spannable editable = this.getText();


        SpannableString spannableString = new SpannableString(editable);
        int startSelection = DroidWriterEditText.this.getSelectionStart();
        int endSelection = DroidWriterEditText.this.getSelectionEnd();
        int selStart = Math.min(startSelection, endSelection);
        int selEnd = Math.max(startSelection, endSelection);
        System.out.println("sel: " + startSelection + "::" + endSelection);
        String selectedText = DroidWriterEditText.this.getText().toString().substring(Math.min(startSelection, endSelection), Math.max(startSelection, endSelection));

        String newText = "<font size=\"x-large\">" + selectedText + "</font>";
        // DroidWriterEditText.this.getText().replace(Math.min(startSelection, endSelection), Math.max(startSelection, endSelection), Html.fromHtml(newText), 0, Html.fromHtml(newText).length());
        // DroidWriterEditText.this.getText().replace(Math.min(startSelection, endSelection), Math.max(startSelection, endSelection), "");
        // DroidWriterEditText.this.getText().insert(Math.min(startSelection, endSelection), Html.fromHtml(newText));
        System.out.println("getHtmlText: " + getStringText());
        //  Spannable editable = this.getText();
        editable.setSpan(new ForegroundColorSpan(Color.rgb(250, 2, 202)), selStart, selEnd, Spannable.SPAN_MARK_MARK);
        // editable.setSpan(new RelativeSizeSpan(1.4f),  selStart, selEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
        //  editable.setSpan(new QuoteSpan(),  selStart, selEnd, Spannable.SPAN_EXCLUSIVE_INCLUSIVE);
        editable.setSpan(new AbsoluteSizeSpan(14), selStart, selEnd, Spannable.SPAN_MARK_MARK);
        invalidate();
        Object[] as = spannableString.getSpans(0, editable.length(), Object.class);
        System.out.println("getSpans: " + Arrays.toString(as));
        System.out.println("getSpansHTML: " + getTextHTML());

    }


    private static class SoftKeyReceiver extends ResultReceiver {
        int mNewStart;
        int mNewEnd;
        DroidWriterEditText mEST;

        SoftKeyReceiver(DroidWriterEditText est) {
            super(est.getHandler());
            mEST = est;
        }

        @Override
        protected void onReceiveResult(int resultCode, Bundle resultData) {
            if (resultCode != InputMethodManager.RESULT_SHOWN) {
                Selection.setSelection(mEST.getText(), mNewStart, mNewEnd);
            }
        }
    }


    public void hideSoftKey() {
        // this.setOnClickListener(null);
        InputMethodManager imm =
                (InputMethodManager) this.getContext().getSystemService(
                        Context.INPUT_METHOD_SERVICE);
        imm.hideSoftInputFromWindow(this.getWindowToken(), 0);
        // this.setSelection(this.getText().length(), this.getText().length());
    }

    public void getLastSels() {
        intLastSelStart = this.getSelectionStart();
        intLastSelEnd = this.getSelectionEnd();
    }

    public void doButtonClick(int intBtnType) {
        getLastSels();
        switch (intBtnType) {
            case INT_BTN_BOLD:
                System.out.println("doButtonClick");
                break;
            case INT_BTN_ITALIC:
                break;
            case INT_BTN_ULINE:
                break;
            case INT_BTN_CLR:
                break;
            case INT_BTN_FSIZE:
                break;
            default:
                break;
        }

    }

    public String getFsize() {
        return currFontSize;
    }

    public String getFcolor() {
        String newFcolor = String.format("#%06X", (0xFFFFFF & parseInt(currFontColor)));
        return currFontColor;
    }

    public String getFbold() {
        return currFontBold;
    }

    public String getFital() {
        return currFontItal;
    }

    public void getSFColorEdit(String scolor) {
        doButtonClick(INT_BTN_CLR);
        System.out.println("getSFColorEdit: [" + scolor + "]");

        oldTxtColor = newTxtColor;

        toggleStyle(STYLE_FONTCOLOR, String.valueOf(Color.parseColor(scolor)));
        newTxtColor = String.valueOf(Color.parseColor(scolor));
        Editable etext = this.getText();
        Selection.setSelection(etext, this.length());
        // this.requestFocus();
    }








 /*  ----------  Stuff to delete
    // Style toggle button setters
    public void setBoldToggleButton(ToggleButton button) {
        tglBtnMBold = button;

        tglBtnMBold.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                toggleStyle(STYLE_BOLD, "noQvalue");

            }
        });
    }


    public void setItalicsToggleButton(ToggleButton button) {
        tglBtnMItalics = button;

        tglBtnMItalics.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                toggleStyle(STYLE_ITALIC, "noQvalue");
            }
        });
    }

    public void setUnderlineToggleButton(ToggleButton button) {
        underlineToggle = button;

        underlineToggle.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                toggleStyle(STYLE_UNDERLINED, "noQvalue");

            }
        });
    }





    public void setTextClrBtn(ImageButton button) {


        button.setOnClickListener(new Button.OnClickListener() {
            public void onClick(View v) {
                ColorPickerDialog.OnColorChangedListener l = new ColorPickerDialog.OnColorChangedListener() {
                    public void colorChanged(int color) {
                        oldTxtColor = newTxtColor;
                        toggleStyle(STYLE_FONTCOLOR, String.valueOf(color));
                        newTxtColor = String.valueOf(color);
                    }
                };
                doButtonClick(INT_BTN_CLR);
                colorPickerDialog = new ColorPickerDialog(getContext(), l, Color.parseColor("#000000"));
                colorPickerDialog.show();

            }
        });
    }


    public void setImageInsertButton(View button, final String imageResource) {
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                int position = Selection.getSelectionStart(DroidWriterEditText.this.getText());

                Spanned e = Html.fromHtml(" <img src=\"" + imageResource + "\">", imageGetter, null);

                DroidWriterEditText.this.getText().insert(position, e);

                int startSelection = Selection.getSelectionStart(DroidWriterEditText.this.getText());
                int endSelection = Selection.getSelectionEnd(DroidWriterEditText.this.getText());
                Spannable spannable = DroidWriterEditText.this.getText();

                StyleSpanRemover spanRemover = new StyleSpanRemover();
// to remove all styles
                spanRemover.removeOneSpan(spannable, startSelection, endSelection, StyleSpan.class);


                // System.out.println("getSpansHTML: " + getTextHTML());
            }
        });
    }

    public void setClearButton(View button) {
        button.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                hideSoftKey();
                // DroidWriterEditText.this.setText("");
            }
        });
    }


*/







}

