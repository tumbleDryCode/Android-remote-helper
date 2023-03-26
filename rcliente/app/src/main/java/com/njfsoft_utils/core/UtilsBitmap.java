package com.njfsoft_utils.core;


import android.app.Activity;
import android.content.Context;
import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.ColorMatrix;
import android.graphics.ColorMatrixColorFilter;
import android.graphics.Matrix;
import android.graphics.Paint;
import android.graphics.PointF;
import android.graphics.PorterDuff;
import android.graphics.PorterDuffXfermode;
import android.graphics.Rect;
import android.graphics.RectF;
import android.graphics.drawable.BitmapDrawable;
import android.graphics.drawable.Drawable;
import android.media.FaceDetector;
import android.media.FaceDetector.Face;
import android.os.AsyncTask;
import android.util.Log;


import com.njfsoft_utils.core.OnTaskExecutionFinished;

// import android.support.v7.app.AppCompatActivity;

// import com.quickorder.R;

public class UtilsBitmap {
 
Paint ctClrPaint;
     int bcount;
    int currSwidth;
    int currSheight;

    public int allBmaps;
    int fnlFrameTtl;
    boolean isDone;
    boolean isGood;
   boolean isMovSaving;
    boolean isMovDone;
     Bitmap bmpFaceProp;
     Bitmap bmpBodProp;
     Bitmap bmpLScapeProp;
     Bitmap currMBdefbm;
    Context contxt;
	Activity mActivity;





	  private int numberOfFace = 5;
	  private FaceDetector myFaceDetect;
	  private Face[] myFace;
float myEyesDistance;






    public UtilsBitmap() {
	  currSwidth = 200;
	  currSheight = 200;
	  isDone = false;
	  isGood = false;
	  allBmaps = 0;
 
	  isMovDone = false;
	  isMovSaving = false;
	  fnlFrameTtl = 5;

		ctClrPaint = new Paint();



	}


    public UtilsBitmap(Activity activity, Context context) {
        contxt = context;
        mActivity = activity;
	  currSwidth = 200;
	  currSheight = 200;
	  isDone = false;
	  isGood = false;
	  allBmaps = 0;
 
	  isMovDone = false;
	  isMovSaving = false;
	  fnlFrameTtl = 5;


		ctClrPaint = new Paint();

 
/*
	  BitmapDrawable myIcon = (BitmapDrawable) context.getResources().getDrawable(R.raw.santa);
        bmpFaceProp = myIcon.getBitmap();

	  BitmapDrawable amyIcon = (BitmapDrawable) context.getResources().getDrawable(R.raw.vbody);
        bmpBodProp = amyIcon.getBitmap();

	  BitmapDrawable bmyIcon = (BitmapDrawable) context.getResources().getDrawable(R.raw.landscape);
        bmpLScapeProp = bmyIcon.getBitmap();
*/
	}
 


 
    public void setFaceProp(Bitmap tmpFPbmp) {

	bmpFaceProp = tmpFPbmp;

    }





 

public static Bitmap drawableToBitmap(Drawable drawable) {
    Bitmap bitmap = null;

    if (drawable instanceof BitmapDrawable) {
        BitmapDrawable bitmapDrawable = (BitmapDrawable) drawable;
        if(bitmapDrawable.getBitmap() != null) {
            System.out.println("cutOuts:drawableToBitmap: drawable instanceof BitmapDrawable");
            return bitmapDrawable.getBitmap();
        }
    }

    if(drawable.getIntrinsicWidth() <= 0 || drawable.getIntrinsicHeight() <= 0) {
        bitmap = Bitmap.createBitmap(1, 1, Bitmap.Config.ARGB_8888); // Single color bitmap will be created of 1x1 pixel
            System.out.println("cutOuts:drawableToBitmap: drawable.getIntrinsicWidth() <= 0");

    } else {
        bitmap = Bitmap.createBitmap(drawable.getIntrinsicWidth(), drawable.getIntrinsicHeight(), Bitmap.Config.ARGB_8888);
            System.out.println("cutOuts:drawableToBitmap: bitmap = Bitmap.createBitmap");

    }

    Canvas canvas = new Canvas(bitmap);
    drawable.setBounds(0, 0, canvas.getWidth(), canvas.getHeight());
    drawable.draw(canvas);
    return bitmap;
}













	public static Bitmap chageToInvert(Bitmap bitmap) {
		int width = bitmap.getWidth();
		int height = bitmap.getHeight();
		
		Bitmap returnBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
		
		int colorArray[] = new int[width * height];
		int r, g, b;
		bitmap.getPixels(colorArray, 0, width, 0, 0, width, height);
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				int index = y * width + x;
				r = (colorArray[index] >> 16) & 0xff;
				g = (colorArray[index] >> 8) & 0xff;
				b = colorArray[index] & 0xff;
				colorArray[index] = 0xff000000 | (r << 16) | (g << 8) | b;
			}
		}
		
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				r = (255-(int)(colorArray[((y*width+x))]& 0x00FF0000) >>> 16);
				g = (255-(int)(colorArray[((y*width+x))]& 0x0000FF00) >>> 8);
				b = (255-(int)(colorArray[((y*width+x))] & 0x000000FF));
				
				colorArray[((y*width+x))] = (255 << 24) + (r << 16) + (g << 8) + b;
				returnBitmap.setPixel(x, y, colorArray[((y*width+x))]);
			}
		}
		
		return returnBitmap;
		
	}


    public static Bitmap getSepiaEffect(Bitmap mBitmap) {
        ColorMatrix sepiaMatrix = new ColorMatrix();
        float[] sepMat = {0.3930000066757202f, 0.7689999938011169f, 0.1889999955892563f, 0, 0, 0.3490000069141388f, 0.6859999895095825f, 0.1679999977350235f, 0, 0, 0.2720000147819519f, 0.5339999794960022f, 0.1309999972581863f, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1};
        sepiaMatrix.set(sepMat);
        final ColorMatrixColorFilter colorFilter = new ColorMatrixColorFilter(sepiaMatrix);
        Bitmap rBitmap = mBitmap.copy(Bitmap.Config.ARGB_8888, true);
        Paint paint = new Paint();
        paint.setColorFilter(colorFilter);
        Canvas myCanvas = new Canvas(rBitmap);
        myCanvas.drawBitmap(rBitmap, 0, 0, paint);
         return rBitmap;

       //  return changeToGray(rBitmap);
    }


	public static Bitmap changeToGray(Bitmap bitmap) {
		int width, height;
		width = bitmap.getWidth();
		height = bitmap.getHeight();
			
		Bitmap grayBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565);
		Canvas canvas = new Canvas(grayBitmap);
		Paint paint = new Paint();
		paint.setAntiAlias(true); // ?????
			
		ColorMatrix colorMatrix = new ColorMatrix();
		colorMatrix.setSaturation(12.833f);
			
		ColorMatrixColorFilter filter = new ColorMatrixColorFilter(colorMatrix);
			
		paint.setColorFilter(filter);
		canvas.drawBitmap(bitmap, 0, 0, paint);
			
		return grayBitmap;
	}








    public static Bitmap roundCorner(Bitmap src, float round) {
        // image size
        int width = src.getWidth();
        int height = src.getHeight();
        // create bitmap output
        //Bitmap result = Bitmap.createBitmap(width, height, Bitmap.Config.ALPHA_8);
        Bitmap result = Bitmap.createBitmap(width, height, Bitmap.Config.ARGB_8888);
        // set canvas for painting
        Canvas rcanvas = new Canvas(result);
        rcanvas.drawARGB(0, 0, 0, 0);

        // config paint
        final Paint paint = new Paint();
        paint.setAntiAlias(true);
        // paint.setColor(Color.BLACK);

        // config rectangle for embedding
        final Rect rect = new Rect(0, 0, width, height);
        final RectF rectF = new RectF(rect);

        // draw rect to canvas
        rcanvas.drawRoundRect(rectF, round, round, paint);

        // create Xfer mode
        paint.setXfermode(new PorterDuffXfermode(PorterDuff.Mode.SRC_IN));
        // draw source image to canvas
        rcanvas.drawBitmap(src, rect, rect, paint);

        // return final image
        return result;
    }





	public static Bitmap changeToInvert(Bitmap bitmap) {
		int width = bitmap.getWidth();
		int height = bitmap.getHeight();
		
		Bitmap returnBitmap = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565);
		
		int colorArray[] = new int[width * height];
		int r, g, b;
		bitmap.getPixels(colorArray, 0, width, 0, 0, width, height);
		for (int y = 0; y < height; y++) {
			for (int x = 0; x < width; x++) {
				int index = y * width + x;
				r = (colorArray[index] >> 16) & 0xff;
				g = (colorArray[index] >> 8) & 0xff;
				b = colorArray[index] & 0xff;
				colorArray[index] = 0xff000000 | (r << 16) | (g << 8) | b;
			}
		}
		
		for (int x = 0; x < width; x++) {
			for (int y = 0; y < height; y++) {
				r = (255-(int)(colorArray[((y*width+x))]& 0x00FF0000) >>> 16);
				g = (255-(int)(colorArray[((y*width+x))]& 0x0000FF00) >>> 8);
				b = (255-(int)(colorArray[((y*width+x))] & 0x000000FF));
				
				colorArray[((y*width+x))] = (255 << 24) + (r << 16) + (g << 8) + b;
				returnBitmap.setPixel(x, y, colorArray[((y*width+x))]);
			}
		}
		
		return returnBitmap;
		
	}












    public Bitmap scaleBoundBitmap(Bitmap theBitmap, int thebound) {
        // Get the ImageView and its bitmap
        System.out.println("scaleView called::");


        // Get current dimensions AND the desired bounding box
        int width = theBitmap.getWidth();
        int height = theBitmap.getHeight();
        int bounding = thebound;
        Log.i("Test", "original width = " + Integer.toString(width));
        Log.i("Test", "original height = " + Integer.toString(height));
        Log.i("Test", "bounding = " + Integer.toString(bounding));

        // Determine how much to scale: the dimension requiring less scaling is
        // closer to the its side. This way the image always stays inside your
        // bounding box AND either x/y axis touches it.
        float xScale = ((float) bounding) / width;
        float yScale = ((float) bounding) / height;
        float scale = (xScale <= yScale) ? xScale : yScale;
        Log.i("Test", "xScale = " + Float.toString(xScale));
        Log.i("Test", "yScale = " + Float.toString(yScale));
        Log.i("Test", "scale = " + Float.toString(scale));

        // Create a matrix for the scaling and add the scaling data
        Matrix matrix = new Matrix();
        matrix.postScale(scale, scale);

        // Create a new bitmap and convert it to a format understood by the ImageView
        Bitmap scaledBitmap = Bitmap.createBitmap(theBitmap, 0, 0, width, height, matrix, true);
        width = scaledBitmap.getWidth(); // re-use
        height = scaledBitmap.getHeight(); // re-use
        // BitmapDrawable result = new BitmapDrawable(scaledBitmap);
        Log.i("Test", "scaled width = " + Integer.toString(width));
        Log.i("Test", "scaled height = " + Integer.toString(height));


    Bitmap bmp2 = scaledBitmap.copy(scaledBitmap.getConfig(), true);
    theBitmap.recycle();
    return bmp2;

 



    }

public Bitmap getResizedBitmap(Bitmap bm, int newWidth, int newHeight) {
    int width = bm.getWidth();
    int height = bm.getHeight();
    float scaleWidth = ((float) newWidth) / width;
    float scaleHeight = ((float) newHeight) / height;
    // CREATE A MATRIX FOR THE MANIPULATION
    Matrix matrix = new Matrix();
    // RESIZE THE BIT MAP
    matrix.postScale(scaleWidth, scaleHeight);

    // "RECREATE" THE NEW BITMAP

    Bitmap resizedBitmap = Bitmap.createBitmap(bm, 0, 0, width, height, matrix, false);
    Bitmap bmp2 = resizedBitmap.copy(resizedBitmap.getConfig(), true);
    bm.recycle();
    return bmp2;
}













public void decodeYUV420SP(int[] rgb, byte[] yuv420sp, int width, int height) {

   final int frameSize = width * height;

   for (int j = 0, yp = 0; j < height; j++) {
     int uvp = frameSize + (j >> 1) * width, u = 0, v = 0;
     for (int i = 0; i < width; i++, yp++) {
       int y = (0xff & ((int) yuv420sp[yp])) - 16;
       if (y < 0)
         y = 0;
       if ((i & 1) == 0) {
         v = (0xff & yuv420sp[uvp++]) - 128;
         u = (0xff & yuv420sp[uvp++]) - 128;
       }

       int y1192 = 1192 * y;
       int r = (y1192 + 1634 * v);
       int g = (y1192 - 833 * v - 400 * u);
       int b = (y1192 + 2066 * u);

       if (r < 0)
         r = 0;
       else if (r > 262143)
         r = 262143;
       if (g < 0)
         g = 0;
       else if (g > 262143)
         g = 262143;
       if (b < 0)
         b = 0;
       else if (b > 262143)
         b = 262143;

       rgb[yp] = 0xff000000 | ((r << 6) & 0xff0000) | ((g >> 2) & 0xff00) | ((b >> 10) & 0xff);
     }
   }
 
 }    




	public Bitmap changeToColor(Bitmap ctbitmap) {
		int ctwidth, ctheight;
		ctwidth = ctbitmap.getWidth();
		ctheight = ctbitmap.getHeight();
		Bitmap ctgrayBitmap = Bitmap.createBitmap(ctwidth, ctheight, Bitmap.Config.RGB_565);
		Canvas ctcanvas = new Canvas(ctgrayBitmap);
		ctcanvas.drawBitmap(ctbitmap, 0, 0, ctClrPaint);			
		return ctgrayBitmap;
	}
 





// http://stackoverflow.com/questions/3035692/how-to-convert-a-drawable-to-a-bitmap
// convert Drawable to Bitmap
// move to utils/graphix


/*
public Bitmap showImage(String iUri) {
    String uri = "drawable/"  + iUri;
    // int imageResource = R.drawable.icon;
    int imageResource = getResources().getIdentifier(uri, null, getPackageName());
    Drawable image = getResources().getDrawable(imageResource);
    return utilsBitmap.drawableToBitmap(image);
}


*/

 
	public Bitmap getFaceMap(Bitmap fbitmap) {
              try {

 		int width, height;
		width = fbitmap.getWidth();
		height = fbitmap.getHeight();
	 
        float mScale = 1F;
        Matrix mImageMatrix;
int numberOfFace = 1;
myFace = new Face[numberOfFace];
 myFaceDetect = new FaceDetector(width, height,numberOfFace);

 Paint fPaint = new Paint();
fPaint.setStyle(Paint.Style.FILL);
fPaint.setColor(Color.BLUE);
 Paint myPaint = new Paint();
myPaint.setAlpha(100);
 myPaint.setColor(Color.GREEN);
 myPaint.setStyle(Paint.Style.STROKE);
 myPaint.setStrokeWidth(3);
 Paint fntPaint = new Paint();
fntPaint.setTextSize((float)19);
fntPaint.setAlpha(100);
 fntPaint.setColor(Color.RED);
 // fntPaint.setStyle(Paint.Style.STROKE);
 		int numberOfFaceDetected = myFaceDetect.findFaces(fbitmap, myFace);


  		 Bitmap bitmap565 = Bitmap.createBitmap(width, height, Bitmap.Config.RGB_565);
  		Canvas canvas = new Canvas(bitmap565);
 


		if(numberOfFaceDetected > 0) {


	      Face f = myFace[0];


	    		PointF midPoint = new PointF();
		int r = (int) (f.eyesDistance() * 2);
            // int r = ((int) (f.eyesDistance() * mScale)) * 2;
            f.getMidPoint(midPoint);
            midPoint.x *= mScale;
            midPoint.y *= mScale;



 System.out.println("setFace(): face : confidence = " + myFace[0].confidence()
 + ", eyes distance = " + myFace[0].eyesDistance()
 + ", pose = ("+ myFace[0].pose(Face.EULER_X) + ","
 + myFace[0].pose(Face.EULER_Y) + ","
 + myFace[0].pose(Face.EULER_Z) + ")"
 + ", eyes midpoint = (" + midPoint.x + "," + midPoint.y +")"); 
 





            int midX = (int) midPoint.x;
            int midY = (int) midPoint.y;
 
 		Rect faceBodRect = new Rect(0, 0, width, height); 
		Rect facePropRect = new Rect(0, 0, width, height); 
		Rect faceFullRect = new Rect(0, 0, width, height); 

            Rect imageRect = new Rect(0, 0, width, height);



PointF myMidPoint = new PointF();
f.getMidPoint(myMidPoint);
float myEyesDistance = f.eyesDistance();
/*
canvas.drawRect((int) (myMidPoint.x - myEyesDistance * 2),
(int) (myMidPoint.y - myEyesDistance * 2),
(int) (myMidPoint.x + myEyesDistance * 2),
(int) (myMidPoint.y + myEyesDistance * 2), myPaint);
*/
RectF faceRect = new RectF((int) (myMidPoint.x - myEyesDistance * 2), (int) (myMidPoint.y - myEyesDistance * 2), (int) (myMidPoint.x + myEyesDistance * 2), (int) (myMidPoint.y + myEyesDistance * 2));
             // RectF faceRect = new RectF(midX, midY, midX, midY);


            // faceRect.inset(-r, -r);
            



/*
            if (faceRect.left < 0) { 
		faceRect.inset(-faceRect.left, -faceRect.left);
 
            }

            if (faceRect.top < 0) {
 
                faceRect.inset(-faceRect.top, -faceRect.top);
            }

            if (faceRect.right > imageRect.right) {
 
                faceRect.inset(faceRect.right - imageRect.right, faceRect.right - imageRect.right);
            }

            if (faceRect.bottom > imageRect.bottom) {
 
                faceRect.inset(faceRect.bottom - imageRect.bottom, faceRect.bottom - imageRect.bottom);
            }



*/
	
facePropRect.left = (int) faceRect.left - 10;
facePropRect.top = (int) faceRect.top - 60;
facePropRect.right = (int) faceRect.right + 10;
facePropRect.bottom =(int) faceRect.top + 20;

faceBodRect.left = (int) faceRect.left - 20;
faceBodRect.top = (int) faceRect.bottom - 10;
faceBodRect.right = (int) faceRect.right + 20;
faceBodRect.bottom =(int) faceRect.bottom + 140;
		// canvas.drawRect(faceRect, myPaint);

faceFullRect.left = facePropRect.left;
faceFullRect.top = facePropRect.top;
faceFullRect.right = faceBodRect.right;
faceFullRect.bottom = faceBodRect.bottom;




		canvas.drawBitmap(fbitmap,0,0,null);
            System.out.println("getFaceMap:I: ");

 		 Bitmap bmpFr =  Bitmap.createBitmap(bitmap565, (int) faceRect.left, (int) faceRect.top,(int)  faceRect.right,(int)  faceRect.bottom);


		 // canvas.drawBitmap(roundCorner(getSepiaEffect(bmpFr), 20F),null,faceRect,null);

	 // bmpFaceProp = BitmapFactory.decodeResource(getApplicationContext().getResources(), R.drawable.helmet);

		 canvas.drawBitmap(bmpFaceProp,null,facePropRect,null);


Bitmap bmpFFBmp = Bitmap.createBitmap(bitmap565, (int) (myMidPoint.x - myEyesDistance * 2) - 10, (int) (myMidPoint.y - myEyesDistance * 2) - 60, (int) (myMidPoint.x + myEyesDistance) + 10, (int) (myMidPoint.y + myEyesDistance * 2));
// Canvas faceCanvas = new Canvas(bmpFFBmp);

		// canvas.drawBitmap(bmpBodProp,null,faceBodRect,null);

     //    canvas.drawText(" Spy [IMOBOLiZE]", (int) faceRect.left, (int) faceRect.top + 15, fntPaint);
     //    canvas.drawText( ": " + (int) (f.eyesDistance()) + " :: " + midX + " :: " + midY, (int) faceRect.left, (int) faceRect.top + 35, fntPaint);

		// canvas.drawBitmap(bbmp,0,0,null);
            System.out.println("UtilsBitmap:CronTime:faceMap: " + faceRect.toString() + " w: " + width + " h:" + height);

	   	// canvas.drawBitmap(nnrotated,10,10,null);	
		// canvas.drawBitmap(bmpLScapeProp,0,0,null);

		bmpLScapeProp = bitmap565;
            return bmpFFBmp;	
           // return bitmap565;
	   } else {
         //  return fbitmap;
             return null;
          // return bitmap565;
		}
             } catch (Exception e) {
                System.out.println("getFaceMap: " + e.toString());
                e.printStackTrace();
          return null;
            }

	}
	

 





class TestAsync extends AsyncTask<String, String, String>
{
 
    String dString;
    OnTaskExecutionFinished _task_finished_event;



    public void setOnTaskFinishedEvent(OnTaskExecutionFinished _event)
    {
        if(_event != null)
        {
            this._task_finished_event = _event;
        }
    }
    
    protected void onPreExecute (){
        System.out.println("PreExceute On pre Exceute......");
    }

    protected String doInBackground(String... params) {
        dString = params[0];



    if(dString.equals("isDone")) {
 
    // allBmaps = 0; 

    } else {   
   // boolean bb = loadBmapImg();
    }
 
      return "You are at doInBackground";
    }

    protected void onProgressUpdate(String s){
        System.out.println("You are in progress update ... ");
    }

    protected void onPostExecute(String result) {

	  // delegate.processFinish(result);

        super.onPostExecute(result);
        if(this._task_finished_event != null)
        {
 
            System.out.println("You are done in onPostExecute: " +allBmaps);

            this._task_finished_event.OnTaskFihishedEvent(dString);

		// requestAnotherFrame(allBmaps);
           // epMainWebView.loadUrl("javascript:sendRecMov(" + allBmaps + ");");
        }
        else
        {
            System.out.println("SomeClass task_finished even is null");
        }


    }
}


 



	public Bitmap drawTextToBitmap(Bitmap tmpDTBmp, String tmpDTBText, Paint paint, int iPos) {


        Resources resources = contxt.getResources();
        float scale = resources.getDisplayMetrics().density;
        Bitmap bitmap = tmpDTBmp;
        String gText = tmpDTBText;
        Bitmap.Config bitmapConfig = bitmap.getConfig();
        // set default bitmap config if none
        if (bitmapConfig == null) {
            bitmapConfig = Bitmap.Config.ARGB_8888;
        }
        // resource bitmaps are imutable,
        // so we need to convert it to mutable one
        bitmap = bitmap.copy(bitmapConfig, true);


        Canvas canvas = new Canvas(bitmap);
 
        Rect bounds = new Rect();
        Rect wordBounds = new Rect();
	  

        int linenum = 1;
        int axft, ayft, tline = 0;
        paint.getTextBounds(gText, 0, gText.length(), bounds);
        int fullheight = bounds.height();
        for (String line : gText.split("\n")) {
            if (line.length() > tline) {
                tline = line.length();
                paint.getTextBounds(line, 0, line.length(), wordBounds);
            }
            // ayft+=15;
            linenum++;
            fullheight = fullheight + bounds.height();
        }
 
        int x, y;
 
 

        x = (bitmap.getWidth() - wordBounds.width()) - 15;
        y = (bitmap.getHeight() - fullheight);
        switch(iPos) {
		case 0:
        // top left
              x = 30;
              y = 30;
		  break;
       // top middle
		  case 1:
              y = 30;
		  break;
       // top right
		  case 2:
              x = (bitmap.getWidth() - wordBounds.width()) - 10;
              y = 30;
		  break;
        // left center
		  case 3:
              x = 100;
		  break;
      // center
		  case 4:
              x = (bitmap.getWidth() - wordBounds.width())/2;
              y = (bitmap.getHeight() - fullheight)/2;
		  break;
       // right center
		  case 5: 
               x = (bitmap.getWidth() - wordBounds.width()) - 10;
		  break;
       // left bottom
		  case 6: 
               x = 10;
               y = (bitmap.getHeight() - fullheight);
		  break;
        //  bottom  center
		  case 7: 
              x = (bitmap.getWidth() - wordBounds.width())/2;
               y = (bitmap.getHeight() - fullheight);
		  break;

        //  bottom  right
		  case 8: 
               x = (bitmap.getWidth() - wordBounds.width()) - 5;
               y = (bitmap.getHeight() - fullheight) + 5;
    		  break;
		  default:

        x = (bitmap.getWidth() - wordBounds.width()) - 15;
        y = (bitmap.getHeight() - fullheight);

	}
        int xft = x, yft = y;
 
        for (String line : gText.split("\n")) {
            canvas.drawText(line, xft, yft, paint);
            yft += -paint.ascent() + paint.descent();
        }

        RectF fullrect = new RectF(x - 2, y - bounds.height() - 2, wordBounds.width() + x + 5, (fullheight + y) - bounds.height() + 5);
        // bgpaint.setColor(Color.parseColor("#FFFF99"));
       //  canvas.drawBitmap(BitmapFactory.decodeResource(contxt.getResources(), R.drawable.bmplogo), null, fullrect, paint);
        System.out.println("drawTextToBitmap: bitmap" + bitmap.getWidth() + " :: " + bitmap.getHeight());
        System.out.println("drawTextToBitmap: text bounds" + bounds.width() + " :: " + bounds.height());
 

        return bitmap;

    }




    public void procBmap(String s, Bitmap b, OnTaskExecutionFinished theEvent){
    System.out.println("isGettingDone: " + isDone + " :: " + allBmaps + " :: " + isMovDone);
    TestAsync tasync = new TestAsync();
    tasync.setOnTaskFinishedEvent(theEvent);
    tasync.execute(s, s, "nada");
    }


 




}
