package me.dm7.barcodescanner.zxing;

import android.content.Context;
import android.content.res.Configuration;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.graphics.ImageFormat;
import android.graphics.Rect;
import android.graphics.YuvImage;
import android.hardware.Camera;
import android.os.Environment;
import android.os.Handler;
import android.os.Looper;
import android.util.AttributeSet;
import android.util.Log;

import com.google.zxing.BarcodeFormat;
import com.google.zxing.BinaryBitmap;
import com.google.zxing.DecodeHintType;
import com.google.zxing.LuminanceSource;
import com.google.zxing.MultiFormatReader;
import com.google.zxing.NotFoundException;
import com.google.zxing.PlanarYUVLuminanceSource;
import com.google.zxing.ReaderException;
import com.google.zxing.Result;
import com.google.zxing.common.HybridBinarizer;
import com.rscanner.Controller;
import com.rscanner.RScanner;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.Collection;
import java.util.EnumMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

import cz.adaptech.tesseract4android.sample.Assets;
import me.dm7.barcodescanner.core.BarcodeScannerView;
import me.dm7.barcodescanner.core.DisplayUtils;

public class ZXingScannerView extends BarcodeScannerView {
    private static final String TAG = "ZXingScannerView";
    Controller rScanner;
     String currScanType;

    public interface ResultHandler {
        void handleResult(Result rawResult);
    }

    private MultiFormatReader mMultiFormatReader;
    public static final List<BarcodeFormat> ALL_FORMATS = new ArrayList<>();
    private List<BarcodeFormat> mFormats;
    private ResultHandler mResultHandler;
    int intNumTries;
    static {
        ALL_FORMATS.add(BarcodeFormat.AZTEC);
        ALL_FORMATS.add(BarcodeFormat.CODABAR);
        ALL_FORMATS.add(BarcodeFormat.CODE_39);
        ALL_FORMATS.add(BarcodeFormat.CODE_93);
        ALL_FORMATS.add(BarcodeFormat.CODE_128);
        ALL_FORMATS.add(BarcodeFormat.DATA_MATRIX);
        ALL_FORMATS.add(BarcodeFormat.EAN_8);
        ALL_FORMATS.add(BarcodeFormat.EAN_13);
        ALL_FORMATS.add(BarcodeFormat.ITF);
        ALL_FORMATS.add(BarcodeFormat.MAXICODE);
        ALL_FORMATS.add(BarcodeFormat.PDF_417);
        ALL_FORMATS.add(BarcodeFormat.QR_CODE);
        ALL_FORMATS.add(BarcodeFormat.RSS_14);
        ALL_FORMATS.add(BarcodeFormat.RSS_EXPANDED);
        ALL_FORMATS.add(BarcodeFormat.UPC_A);
        ALL_FORMATS.add(BarcodeFormat.UPC_E);
        ALL_FORMATS.add(BarcodeFormat.UPC_EAN_EXTENSION);
    }

    public ZXingScannerView(Context context) {
        super(context);
        initMultiFormatReader();
        currScanType = "prod";
    }

    public ZXingScannerView(Controller context, AttributeSet attributeSet) {

        super(context, attributeSet);
        rScanner = context;
        initMultiFormatReader();
        currScanType = "prod";
    }

    public void setFormats(List<BarcodeFormat> formats) {
        mFormats = formats;
        initMultiFormatReader();
    }

    public void setResultHandler(ResultHandler resultHandler) {
        mResultHandler = resultHandler;
    }

    public Collection<BarcodeFormat> getFormats() {
        if(mFormats == null) {
            return ALL_FORMATS;
        }
        return mFormats;
    }

    private void initMultiFormatReader() {
        Map<DecodeHintType,Object> hints = new EnumMap<>(DecodeHintType.class);
        hints.put(DecodeHintType.POSSIBLE_FORMATS, getFormats());
        mMultiFormatReader = new MultiFormatReader();
        mMultiFormatReader.setHints(hints);
    }

// write a function to take a picture fron onPreviewFrame
public void takePicture(Camera mCamera, byte[] mData) {
    ResultHandler tmpResultHandler = mResultHandler;
    mResultHandler = null;

    stopCameraPreview();

        System.out.println("ClienteActivity.takePicture");
        Camera.Parameters parameters = mCamera.getParameters();
        Camera.Size size = parameters.getPreviewSize();
        int width = size.width;
        int height = size.height;
        int rotationCount = getRotationCount();
        if (rotationCount == 1 || rotationCount == 3) {
            int tmp = width;
            width = height;
            height = tmp;
        }
        YuvImage yuvImage = new YuvImage(mData, ImageFormat.NV21, width, height, null);
        ByteArrayOutputStream out = new ByteArrayOutputStream();
        yuvImage.compressToJpeg(new Rect(0, 0, width, height), 100, out);
        byte[] imageBytes = out.toByteArray();
        Bitmap image = BitmapFactory.decodeByteArray(imageBytes, 0, imageBytes.length);
        rScanner.recognizeImage(image);
    }




    public String zgetCurrScanType() {
        return currScanType;
    }
    public void zsetCurrScanType(String currScanType) {
        this.currScanType = currScanType;
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

    public static Bitmap getBitmapImageFromYUV(byte[] data, int width,
                                               int height, Rect rect) {
        YuvImage yuvimage = new YuvImage(data, ImageFormat.NV21, width, height,
                null);
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        yuvimage.compressToJpeg(new Rect(0, 0, width, height), 90, baos);

        byte[] jdata = baos.toByteArray();
        BitmapFactory.Options bitmapFatoryOptions = new BitmapFactory.Options();
        bitmapFatoryOptions.inPreferredConfig = Bitmap.Config.ARGB_8888;
        Bitmap bmp = BitmapFactory.decodeByteArray(jdata, 0, jdata.length,
                bitmapFatoryOptions);

        Log.d(TAG,"getBitmapImageFromYUV w:"+bmp.getWidth()+" h:"+bmp.getHeight());


        return bmp;
    }


    @Override
    public void onPreviewFrame(byte[] data, Camera camera) {
    System.out.println("ClienteActivity.onPreviewFrame" + zgetCurrScanType());

        if(mResultHandler == null) {
            return;
        }



        
        try {





            Camera.Parameters parameters = camera.getParameters();
            Camera.Size size = parameters.getPreviewSize();
            int width = size.width;
            int height = size.height;

            if (DisplayUtils.getScreenOrientation(getContext()) == Configuration.ORIENTATION_PORTRAIT) {
                int rotationCount = getRotationCount();
                if (rotationCount == 1 || rotationCount == 3) {
                    int tmp = width;
                    width = height;
                    height = tmp;
                }
                data = getRotatedData(data, camera);
            }



            Result rawResult = null;
            PlanarYUVLuminanceSource source = buildLuminanceSource(data, width, height);



            if(Objects.equals(zgetCurrScanType(), "ocr")) {
                // check if camera is focused before taking picture


                ResultHandler tmpResultHandler = mResultHandler;
                mResultHandler = null;

                stopCameraPreview();


                int[] previewPixels = new int[width * height];
                decodeYUV420SP(previewPixels, data, width, height);
                Bitmap bb  = Bitmap.createBitmap(previewPixels, width, height, Bitmap.Config.RGB_565);
                    rScanner.recognizeImage(bb);





            } else {

                System.out.println("ClienteActivity.onPreviewFrame.barcode");
                if (source != null) {
                    BinaryBitmap bitmap = new BinaryBitmap(new HybridBinarizer(source));
                    try {
                        rawResult = mMultiFormatReader.decodeWithState(bitmap);
                    } catch (ReaderException re) {
                        // continue
                    } catch (NullPointerException npe) {
                        // This is terrible
                    } catch (ArrayIndexOutOfBoundsException aoe) {

                    } finally {
                        mMultiFormatReader.reset();
                    }

                    if (rawResult == null) {
                        LuminanceSource invertedSource = source.invert();
                        bitmap = new BinaryBitmap(new HybridBinarizer(invertedSource));
                        try {
                            rawResult = mMultiFormatReader.decodeWithState(bitmap);
                        } catch (NotFoundException e) {
                            // continue
                        } finally {

                            System.out.println("ClienteActivity.onPreviewFrame.reset");
                            mMultiFormatReader.reset();

                        }
                    }
                }

                final Result finalRawResult = rawResult;

                if (finalRawResult != null) {
                    Handler handler = new Handler(Looper.getMainLooper());
                    handler.post(new Runnable() {
                        @Override
                        public void run() {
                            // Stopping the preview can take a little long.
                            // So we want to set result handler to null to discard subsequent calls to
                            // onPreviewFrame.
                            ResultHandler tmpResultHandler = mResultHandler;
                            mResultHandler = null;

                            stopCameraPreview();
                            if (tmpResultHandler != null) {
                                tmpResultHandler.handleResult(finalRawResult);
                            }
                        }
                    });
                } else {

                    if (intNumTries < 13) {
                        intNumTries++;

                        camera.setOneShotPreviewCallback(this);
                    } else {
                        intNumTries = 0;
                        camera.setOneShotPreviewCallback(this);
                    }
                }


            }



        } catch(RuntimeException e) {
            System.out.println("ClienteActivity.onPreviewFrame.RuntimeException" + e.toString() + e.getMessage());
            // TODO: Terrible hack. It is possible that this method is invoked after camera is released.
            Log.e(TAG, e.toString(), e);
        }
    }

    public void resumeCameraPreview(ResultHandler resultHandler) {
        mResultHandler = resultHandler;
        super.resumeCameraPreview();
    }

    public PlanarYUVLuminanceSource buildLuminanceSource(byte[] data, int width, int height) {
        Rect rect = getFramingRectInPreview(width, height);
        if (rect == null) {
            return null;
        }
        // Go ahead and assume it's YUV rather than die.
        PlanarYUVLuminanceSource source = null;

        try {
            source = new PlanarYUVLuminanceSource(data, width, height, rect.left, rect.top,
                    rect.width(), rect.height(), false);
        } catch(Exception e) {
        }

        return source;
    }
}
