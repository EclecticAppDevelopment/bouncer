rows = 4;
cols = 8;

var barinpre = 300;
                           
function startGame(){
    
     blks = [ [
                0 , 0 , 0 , 0 , 0 , 0 , 0 , 0 ,
                0 , 0 , 0 , 2 , 2 , 0 , 0 , 0 ,
                0 , 0 , 0 , 2 , 2 , 0 , 0 , 0 ,
                0 , 0 , 0 , 0 , 0 , 0 , 0 , 0
            ],[
                0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 ,
                0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 ,
                0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 ,
                0 , 0 , 1 , 1 , 1 , 1 , 0 , 0   
            ],[    
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                1 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ,
                1 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1
            ],[
                0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 ,
                0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 ,
                0 , 1 , 1 , 1 , 1 , 1 , 1 , 0 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1
            ],[
                0 , 0 , 0 , 1 , 1 , 0 , 0 , 0 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                0 , 0 , 0 , 1 , 1 , 0 , 0 , 0
            ],[
                1 , 0 , 0 , 1 , 1 , 0 , 0 , 1 ,
                0 , 1 , 0 , 1 , 1 , 0 , 1 , 0 ,
                0 , 0 , 1 , 1 , 1 , 1 , 0 , 0 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1
            ],[ 
                0 , 1 , 1 , 0 , 0 , 1 , 1 , 0 ,
                1 , 0 , 0 , 2 , 2 , 0 , 0 , 1 ,
                1 , 0 , 0 , 2 , 2 , 0 , 0 , 1 ,
                0 , 1 , 1 , 0 , 0 , 1 , 1 , 0
            ],[
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1 ,
                1 , 1 , 1 , 1 , 1 , 1 , 1 , 1                
            ] ]; 

maxlevels = blks.length;
 
level = 0;
score = 0;
cont();

}
    function cont(){
    // SETUP - NOTE: ALL DERIVED FROM CANVAS WID/HGT
    cwid = document.getElementById('bouncercnv').width;
    chgt = document.getElementById('bouncercnv').height;
    midx = cwid/2;
    midy = chgt/2; 

    barw = midx/4;
    barh = midy/10; 
    bary = 1.75*midy;

    balx = midx;
    baly = midy;
    balr = midy/20;
    
    blkmax = rows*cols;
    blkw = (cwid-80)/cols;
    blkh = (chgt/30);
    
    // blocks present array
    //var blks = [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]; 
    // Blocks pattern
    // max 8x by 4y
    // for each line in pattern
    // 1=#blks, 2=
    //ptrn(4,6) = [[
                
    loser = 0;
    
    // Accelerate
    balxd = (((0.5*level)+1));
    balyd = (((0.5*level)+1));
    
    nextFrame();
    
}

function nextFrame(){
    
    barx = (document.getElementById('barposinput').value/600)*cwid;
    
    inputdiff = barx - barinpre;
    
    barinpre = barx;
    
    balx = balx + balxd;
    baly = baly + balyd;
    
    // If fallen off bottom, lose & exit
    if (baly > chgt){      
        loser = 1;
    }
        
    // Check left, top and right edges
    checkedges();
    // Check blk collisions
    checkblks();
    // Check bar collision
    checkbar();
    // Draw results
    cnv();
    
    document.getElementById('bouncertxt').innerHTML = "Score: "+score+"   -   Level: "+(level+1)+" (of "+blks.length+")";
    
    if (loser == 0){
        t=setTimeout(function(){nextFrame()},1);
    } else if (loser == 1){
        lose();
    } else {
        level = level + 1;
        if (level == maxlevels){
            win();
        }
        cont();
        }
    
}

function detectCollision(Ax, Ay, Aw, Ah, Bx, By, Bh, Bw, rType){
    
    // Loose detect
    if(
        ( ((Ax + Aw ) >= (Bx - Bw)) || (Ax - Aw <= Bx + Bw) )
        &&
        ( (Ay + Ah >= By - Bh) || (Ay - Ah <= By + Bh) )
    ){
        if (rType == 0){
            return "hit";     
        }else{
            if      (Ax <= Bx - Bw){return "left";}
            else if (Ax >= Bx + Bw){return "right";}
            else if (Ay <= By - Bh){return "top";}
            else if (Ay >= By + Bh){return "bottom";}
            else {return "corner";}
        }
              
    }else{
        return "miss";     
    }    
    //exit detectCollision();   
}

function circCollision(){
    
    for (ang = 0; ang < 6.1;ang+0.26179){
        
        chkx = balx + (balr*Math.cos(ang));
        chky = baly + (balr*Math.sin(ang));
        
        
        
    }
    
    
}

function checkedges(){

    if (balx < balr || balx > cwid-balr){
        balxd = -1*balxd;
    }

    if (baly < balr){
        balyd = -1*balyd;
    }

}

function checkblks(){

    var blk = 0;
    for (i = 0; i < rows; i++){
        
        for (j = 0; j < cols; j++){
        
            var blkdraw = blks[level][blk];
        
            if (blkdraw > 0){
                blkx = (10*j)+(j*blkw)+(blkw/2);
                blky = (10*i)+(i*blkh)+(blkh/2);
               if (((blkx-(blkw/2)-balr < balx) && (balx < blkx+(blkw/2)+balr))&&((blky-(blkh/2)-balr < baly) && (baly < blky+(blkh/2)+balr))){
               //var rslt = detectCollision(balx, baly, balr, balr, blkx, blky, blkw/2, blkh/2, 0);
               //if (rslt == "hit"){
                    
                    blks[level][blk]--;
                    score = score + 10;
               }
                 
            }
            blk = blk + 1;
              
        }
               
    }
    // if all blocks destroyed, win
    blkcount = 0;
    for (k = 0; k < blkmax; k++){
        var blkon = blks[level][k];
        blkcount = blkcount + blkon;
    }
    if (blkcount == 0){
        loser = -1;
    }
    
}

function checkbar(){
    
    if (((barx-(barw/2)-balr < balx) && (balx < barx+(barw/2)+balr))&&((bary-(barh/2)-balr < baly) && (baly < bary+(barh/2)+balr)))
    {
        var beep = document.getElementById('beep');
        //beep.play();
        // Momentum
        if (inputdiff < 0){
            balxd = balxd + Math.floor(Math.max(-5, inputdiff),1);
        } else{
            balxd = balxd + Math.floor(Math.min(inputdiff,5),1);  
        }
        
        if ( (balx < (barx-(barw/2)) ) || (balx > (barx+(barw/2)) ) ){
            balxd = -1*balxd;    
        } else {
            balyd = -1*balyd;
        }
    }

}

function win(){
    
    var c = document.getElementById('bouncercnv');
    var ctx = c.getContext('2d');
    
    ctx.clearRect(0, 0, c.width, c.height);  
    ctx.fillStyle = '#00ff00';
    ctx.fillRect(0,0,cwid,chgt);
    ctx.font = '30pt Verdana';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("YOU WIN!",midx-100,midy);
    clearTimeout(t);
    
}
function lose(){
    
    var c = document.getElementById('bouncercnv');
    var ctx = c.getContext('2d');
    
    ctx.clearRect(0, 0, c.width, c.height);  
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(0,0,cwid,chgt);
    ctx.font = '30pt Verdana';
    ctx.fillStyle = '#ffffff';
    ctx.fillText("YOU LOSE!",midx-100,midy);
    ctx.fillText("TAP TO RESTART.",midx-175,midy+50);
    clearTimeout(t);
    
    c.addEventListener("touchstart", doTouchStart, false);
	   c.addEventListener("mousedown", doClickStart, false);

}

function doTouchStart(event){ 
    event.preventDefault();
    startGame();
}

function doClickStart(){ 
    event.preventDefault();
    startGame();
}

function cnv(){
    
    var c = document.getElementById('bouncercnv');
    var ctx = c.getContext('2d');
       
    // Store the current transformation matrix
    ctx.save();

        // Use the identity matrix while clearing the canvas
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.clearRect(0, 0, c.width, c.height);

    // Restore the transform
    ctx.restore();
    ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
 
    // BG
    bgGrad = ctx.createLinearGradient(0,0,c.width,c.height);
    bgGrad.addColorStop(0,'#f2ce45');
    bgGrad.addColorStop(1,"white");
	   ctx.fillStyle=bgGrad;
    
    ctx.fillRect(0,0,c.width,c.height);
    
    
    // Bar 
    barGrad = ctx.createLinearGradient(barx-(barw/2),bary-(barh/2),barw,barh);
    barGrad.addColorStop(0,'#421351');
    barGrad.addColorStop(1,"black");
	   ctx.fillStyle=barGrad;
    ctx.fillRect(barx-(barw/2),bary-(barh/2),barw,barh);
    
    // Ball
    ctx.beginPath();
    ctx.moveTo(balx+balr,baly);
    ctx.arc(balx, baly, balr, 0, 2*Math.PI);
    balGrad = ctx.createRadialGradient(balx,baly,5,balx,baly,balr);
    balGrad.addColorStop(0,"#ca1ba8");
    balGrad.addColorStop(1,"#a01c9a");
    ctx.fillStyle = balGrad;
    ctx.fill();
    
    // Blocks
    var blk = 0;
    for (i = 0; i < rows; i++){
        
        for (j = 0; j < cols; j++){
        
            var blkdraw = blks[level][blk];
        
            if (blkdraw > 0){
                blkx = (10*j)+(j*blkw);
                blky = (10*i)+(i*blkh);
                blkGrad = ctx.createLinearGradient(blkx,blky,blkx+blkw,blky+blkh);
                if (blkdraw == 1){
                    blkGrad.addColorStop(0,'#029603');
                } else {
                    blkGrad.addColorStop(0,'#7f1919');
                }
                blkGrad.addColorStop(1,"black");
	               ctx.fillStyle=blkGrad; 
                ctx.fillRect(blkx, blky, blkw, blkh);
                
            }
            blk = blk + 1;
              
        }
               
    }
    
}
