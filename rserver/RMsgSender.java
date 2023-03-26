import java.awt.Graphics2D;
import java.awt.RenderingHints;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.DatagramPacket;
import java.net.DatagramSocket;
import java.net.InetAddress;
import java.util.Iterator;

import javax.imageio.IIOImage;
import javax.imageio.ImageIO;
import javax.imageio.ImageWriteParam;
import javax.imageio.ImageWriter;
import javax.imageio.stream.ImageOutputStream;

public class RMsgSender implements Runnable{
	
	private InetAddress clientAddr;
	private int clientPort;
	private DatagramSocket socket;
	public boolean connected = false;
	String currRMstr;
	public static final float SIZETHRESHOLD = 100f;
	
	private BufferedImage img;
	
	public RMsgSender(String ip, int port){
		try{
			clientAddr = InetAddress.getByName(ip);
		}
		catch (Exception e){
			System.out.print("Exception setting ip address");
		}
		
		clientPort = port;
		
		try {
	           socket = new DatagramSocket();	           
	           connected = true;
	           
	       }
	       catch (Exception e) {
	           System.out.print("Could not bind to a port");
	       }
		   currRMstr = "#pointx";
	}
	
	public RMsgSender(InetAddress ip, int port){
		clientAddr = ip;
		clientPort = port;
		
		try {
	           socket = new DatagramSocket();	           
	           connected = true;
	           
	       }
	       catch (Exception e) {
	           System.out.print("Could not bind to a port");
	       }
		   currRMstr = "#pointx";
	}
	
	
		public void setMsgStr(String tMsgSTr)
	{
		currRMstr = tMsgSTr;
	}
	
 
	public void setPort(int port)
	{
		clientPort = port;
	}
	
	public void run(){		
		System.out.println("Sending: " + currRMstr);
		byte[] data = currRMstr.getBytes();
        DatagramPacket out = new DatagramPacket(data, data.length, clientAddr, clientPort);
        
        try {
		DatagramSocket	asocket = new DatagramSocket();
			asocket.send(out);
		  System.out.println("Sent: " + currRMstr);
		 // close the socket
		 socket.close();

		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		} catch (Exception e) {
			System.out.println("Server.Error: " + e);
			e.printStackTrace();
		}
	}
	 
	
	
}
