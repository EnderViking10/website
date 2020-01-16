/* 
		   ____________
		  /            \
		 /  Erik Klem   \
		/    Period 7    \
		\ Final Project  /
		 \  50 Points   /
		  \ Due Jan. 16/
		   \__________/   
*/

/*
Ok, this program was written mostly out of class because as you probably noticed I kinda
goofed off about 90% of the time, and the time I wasn't goofing off I had one hard thing,
but when I finished that one hard thing I went back to goofing off or helping Kurt. This 
program mostly shows that I'm not really that creative, but that I am really good at 
programming. Also that I show initiative.
 */
var canvas;
var c;
var midx,midy, cw,ch;
var pi = Math.PI;
var img = [];
var yscale = 1;
var dy = 4;
var count = 0;
var imageY = 460;
var x = [], y = [];
var randomx = [], randomy = [];
var color = ["white", "lightgrey", "grey"];
var colorNum = [];
var radius = [];
var mouse = {
	x: undefined,
	y: undefined
};
var snowX = [], snowY = [];
var rotation = 0;

function initialize() {
	canvas = document.getElementById( "canvas" );
	if ( canvas && canvas.getContext ) {
		c = canvas.getContext( "2d" );
		
		resize(); // Resizes canvas initially
		
	  // Dynamically risezes canvas
		window.addEventListener("resize", resize);
	  // Listens for mouse movement
		window.addEventListener("mousemove", function(event){
			mouse.x = event.clientX;
			mouse.y = event.clientY;
		});
		
	  // Calls santas
		for(let i=0; i<15; i++){
			img[i] = document.getElementById("santa" + i);
	}
		
	  // Makes cords for background dots
		for(let i=0; i<100; i++){
			x[i] = parseInt(Math.random()*cw);
			y[i] = parseInt(Math.random()*ch);
			colorNum[i] = parseInt(Math.random()*3);
			radius[i] = 1;
		}
		
		window.setInterval("drawScreen()",1000/30);
		
	} // end if
} // initialize()
  
	  
function drawScreen() {
	
  // Background
  
	c.beginPath();
	c.fillStyle = "black";
	c.fillRect(0,0, canvas.width, canvas.height);
	c.closePath();
	
  // Background dots
	
	for(let i=0; i<100; i++){
		// Colors
		if(count % 12 == 0)
			colorNum[i]++;
		if(colorNum[i] > 2)
			colorNum[i] = 0;
		
		// Draws dots
		c.fillStyle = color[colorNum[i]];
		c.beginPath();
		c.arc(x[i],y[i],radius[i],0,2*pi);
		c.fill();
		c.closePath();
		
		// Mouse over stuff
		if(x[i] - mouse.x < 50 && x[i] - mouse.x > 0 && y[i] - mouse.y < 50 && y[i] - mouse.y > 0)
			radius[i] += 1;
		else if(radius[i] > 1)
			radius[i] -= 1;
	}
	
  // Draws buildings
	
	// Building one
	c.save();
	c.translate(0, ch-400);
	
	c.beginPath();
	c.fillStyle = "chocolate"
	c.fillRect(0,0,200,400);
	c.closePath();
	
	// Windows
	windows(10,60,"white","brown"); // Window one
	windows(110,100,"white","brown"); // Window two
	windows(92,300,"white","brown"); // Window three
	// Window four / round window
	c.beginPath();
	c.lineWidth = 5;
	c.fillStyle = "yellow";
	c.strokeStyle = "white";
	c.arc(30,200,20,0,pi*2);
	c.fill();
	c.stroke();
	c.closePath();
	
	c.restore();
	
	// Building two
	c.save();
	c.translate(267, ch-300);
	c.beginPath();
	c.fillStyle = "red";
	c.fillRect(0,0,300,300);
	c.closePath();
	
	// Windows
	windows(20,70,"white", "grey"); // Window one
	windows(38,150,"grey", "lightgrey"); // Window two
	windows(109,200, "yellow", "black"); // Window three
	windows(149,120, "purple", "orange"); // Window four
	windows(220, 60, "beige", "#99ff66"); // Window five
	
	c.restore();
	
  // Draws pinwheel
	
	c.save();
	c.translate(267,ch-300);
	c.rotate(rotation);
	
	for(let rotate=0; rotate<2*pi; rotate += pi/2){
		c.save();
		c.rotate(rotate);
		
		c.beginPath();
		c.fillStyle = "#ccff33";
		c.moveTo(30,30);
		c.lineTo(0,30);
		c.lineTo(0,0);
		c.fill();
		c.closePath();
		
		c.restore();
	}
	c.restore();
	
	rotation += pi/100
	
  // Draws santa
	
	c.save();
	c.translate(200,imageY);
	c.scale(yscale, 1);
	c.beginPath();
	c.drawImage(img[count], -img[count].width/2, -img[count].height/2);
	c.closePath();
	c.restore();
	
	imageY += dy;
	
	if(count > 12)
		count = 0;
	count++;
	
	if(imageY > ch-img[count].height/2 || imageY < ch-450){
		dy = -dy;
		yscale = -yscale;
	}
	
	
  // Draws snow
	
	for(let i=0; i<200; i++){
		
		c.beginPath();
		c.fillStyle = "white";
		c.arc(snowX[i], snowY[i], 5, 0, 2*pi);
		c.fill();
		c.closePath();

		if(snowY[i] < ch)
			snowY[i] += 3;
		else
			snowY[i] = 0;
		if(snowX[i] < cw)
			snowX[i] += 2;
		else
			snowX[i] = 0;
	}
	
	
  // Draws name
	
	c.beginPath();
	c.fillStyle = "#b30000";
	c.textBaseline = "bottom";
	c.textAlign = "right";
	c.font = "24pt Bold Comic Sans MS";
	c.fillText("Erik Klem",cw,ch);
	c.closePath();
	
} // end drawScreen

// Windows function
function windows(x,y,color,bkg){
	
	c.beginPath();
	c.fillStyle = color;
	c.strokeStyle = bkg;
	c.lineWidth = 10;
	c.lineCap = "round";
	c.lineJoin = "round";
	c.moveTo(x,y);
	c.lineTo(x,y+50);
	c.lineTo(x+50,y+50);
	c.lineTo(x+50,y);
	c.lineTo(x,y);
	c.stroke();
	c.fill();
	c.closePath();
}

function resize(){
	 // Canvas variables
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			cw = canvas.width;
			ch = canvas.height;
			midx = cw/2;
			midy = ch/2;
			
			// Makes cords for background dots
			for(let i=0; i<100; i++){
				x[i] = parseInt(Math.random()*cw);
				y[i] = parseInt(Math.random()*ch);
			}
			
	  	// Makes cords for snow
		
			for(let i=0; i<200; i++){
				snowX[i] = parseInt(Math.random()*cw);
				snowY[i] = parseInt(Math.random()*ch);
			}
}