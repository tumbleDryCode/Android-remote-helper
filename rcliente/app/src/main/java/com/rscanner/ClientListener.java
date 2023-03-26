package com.rscanner;

import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;
import java.util.Timer;
import java.util.TimerTask;

import messages.Constants;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

public class ClientListener implements Runnable{

	private InetAddress serverAddr;
	private int serverPort;
	private DatagramSocket socket;
	byte[] buf = new byte[65000];
	private DatagramPacket dgp;
	private RScanner delegate;
	private int framesPerSecond = -1;
	public boolean connected = false;

	public static int deviceWidth = 100;
	public static int deviceHeight = 100;
	String currLMsg;
	public ClientListener(int port, int fps, RScanner del){
		delegate = del;
		framesPerSecond = fps;
		
		try{
			
			serverAddr = getLocalIpAddress();
			dgp = new DatagramPacket(buf, buf.length);

		}catch (Exception e){
			System.out.print("ClientActivity.error: " + e);
			Log.e("ClientActivity", "C: Error", e);
		}
		serverPort = port;
		currLMsg = "pmsg";
	}
	
	
	public void setCurrLMsg(String msg){
		currLMsg = msg;
	}

	public void run() {
	       try {
	           socket = new DatagramSocket(serverPort, serverAddr);
	           connected = true;
	           
	           Timer timer = new Timer();
	           // int frames = 1000/framesPerSecond;
			   int frames = 3000;
	           timer.scheduleAtFixedRate(getImageTask, 3000, frames);
	           
	           listen();	           
	       }
	       catch (Exception e) {
			   System.out.print("ClientActivity.error: " + e);
	           Log.e("ClientActivity", "Client Connection Error", e);
	       }
	 }
	
	
	
	private TimerTask getImageTask = new TimerTask(){

		@Override
		public void run() {
			System.out.println("ClientActivity: getImageTask: "+currLMsg);
			String tCurrLMsg = "noQvalue";


			String message = new String(""+
					Constants.REQUESTIMAGE+
					 Constants.DELIMITER+
					 deviceWidth+
					 Constants.DELIMITER+
					 deviceHeight+"");
			String pmsg = new String(""+
					Constants.REQUESTPOINTS+
					 Constants.DELIMITER+
					 100+
					 Constants.DELIMITER+
					 100+"");
			/*
			switch (currLMsg) {
				case "imsg":
					tCurrLMsg = message;
					delegate.sendMessage(tCurrLMsg);
					break;
				case "pmsg":
					tCurrLMsg = pmsg;
					delegate.sendMessage(tCurrLMsg);
					break;
				default:
					break;
			}

			 */
			if(delegate.getUseScreenCap()) {
			if(currLMsg.equals("pmsg"))
			{
				currLMsg = "imsg";
				delegate.sendMessage(message);
			}
			else
			{
				currLMsg = "pmsg";
				delegate.sendMessage(pmsg);
			}
			} else {
				delegate.sendMessage(pmsg);
			}
			System.out.println("ClientActivity: getImageTask: "+tCurrLMsg);
			// currLMsg = "noQvalue";
			 // delegate.sendMessage(message);
		}
	};
	
	
	
	private void listen()
	{
	   	while(connected){

	   		try{
				   System.out.println("ClientActivity: willlisten");

	   			socket.receive(dgp);

				   if(currLMsg.equals("imsg"))
				   {
					   Bitmap bm = BitmapFactory.decodeByteArray(dgp.getData(), 0, 65000);
					   Log.e("REQUESTINGSIZE", "SIZERECV: "+bm.getWidth()+" "+bm.getHeight());
					   delegate.getController().setImage(bm);
				   }
				   else
				   {
					   String msg = new String(dgp.getData(), 0, dgp.getLength());
					   System.out.println("ClientActivity: listen: "+msg);
					   delegate.getController().setPointsStr(msg);
				   }


				/*
	   			Bitmap bm = BitmapFactory.decodeByteArray(dgp.getData(), 0, 65000);
	   			Log.e("REQUESTINGSIZE", "SIZERECV: "+bm.getWidth()+" "+bm.getHeight());
	   			delegate.getController().setImage(bm);

				 */
	   		}catch(Exception e){
	   			e.printStackTrace();
	   		}
	   	}
	}

	
	
   public static InetAddress getLocalIpAddress() {
	    try {
	        for (Enumeration<NetworkInterface> en = NetworkInterface.getNetworkInterfaces(); en.hasMoreElements();) {
	            NetworkInterface intf = en.nextElement();
	            for (Enumeration<InetAddress> enumIpAddr = intf.getInetAddresses(); enumIpAddr.hasMoreElements();) {
	                InetAddress inetAddress = enumIpAddr.nextElement();
	                if (!inetAddress.isLoopbackAddress() && !inetAddress.toString().contains(":"))
	                {
	                    return inetAddress;
	                }
	            }
	        }
	    } catch (SocketException ex) {
	        Log.e("", ex.toString());
	    }
	    return null;
	}
   
   
   
   public void closeSocket(){
	   if(socket != null) {
		   socket.close();
	   }
	   connected = false;
	   if(getImageTask != null) {
		   getImageTask.cancel();
	   }
   }
}
