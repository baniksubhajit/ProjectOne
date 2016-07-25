function render(container,height,width,off)
{
	this.svgNS = "http://www.w3.org/2000/svg"; 
	 this.newSvg = document.createElementNS(this.svgNS,"svg");    
            this.newSvg.setAttributeNS(null,"class","graph");
            this.newSvg.setAttributeNS(null,"height",(height*1.2)+off);
            this.newSvg.setAttributeNS(null,"width",(width*1.2)+5);
	this.height=height;
	this.width=width;
	this.off=off;
        document.getElementById(container).appendChild(this.newSvg);
}

render.prototype.drawline = function(x1,x2,y1,y2,class_name)
{
	this.new_line=document.createElementNS(this.svgNS,"line");
            this.new_line.setAttributeNS(null,"x1",x1);
            this.new_line.setAttributeNS(null,"x2",x2);
            this.new_line.setAttributeNS(null,"y1",y1);
            this.new_line.setAttributeNS(null,"y2",y2);
            this.new_line.setAttributeNS(null,"class",class_name);
    this.newSvg.appendChild(this.new_line);
		return this.new_line;
}
/*render.prototype.editline = function(name,x1,x2,y1,y2)
{
	         this.namel.setAttributeNS(null,"x1",x1);
            this.namel.setAttributeNS(null,"x2",x2);
            this.namel.setAttributeNS(null,"y1",y1);
            this.namel.setAttributeNS(null,"y2",y2);
            
    
}*/
render.prototype.drawrect = function(x,y,height,width,class_name)
{
	this.new_rect=document.createElementNS(this.svgNS,"rect");
            this.new_rect.setAttributeNS(null,"x",x);
            this.new_rect.setAttributeNS(null,"y",y);
            this.new_rect.setAttributeNS(null,"height",height);
            this.new_rect.setAttributeNS(null,"width",width);
            this.new_rect.setAttributeNS(null,"class",class_name);
    this.newSvg.appendChild(this.new_rect);
	 return this.new_rect;
}
render.prototype.drawtext = function(x,y,value,class_name)
{
	this.new_text=document.createElementNS(this.svgNS,"text");
            this.new_text.setAttributeNS(null,"x",x);
            this.new_text.setAttributeNS(null,"y",y);
            this.new_text.innerHTML=(value);
            this.new_text.setAttributeNS(null,"class",class_name);
    this.newSvg.appendChild(this.new_text);
}
render.prototype.drawcircle = function(cx,cy,r,class_name)
{
	this.new_circle=document.createElementNS(this.svgNS,"circle");
            this.new_circle.setAttributeNS(null,"cx",cx);
            this.new_circle.setAttributeNS(null,"cy",cy);
            this.new_circle.setAttributeNS(null,"r",r);
            this.new_circle.setAttributeNS(null,"class",class_name);
    this.newSvg.appendChild(this.new_circle);
}
render.prototype.drawpolyline = function(points,class_name)
{
	this.new_polyline=document.createElementNS(this.svgNS,"polyline");
            this.new_polyline.setAttributeNS(null,"points",points);
            this.new_polyline.setAttributeNS(null,"class",class_name);
    this.newSvg.appendChild(this.new_polyline);
}
render.prototype.drawAxis = function()
{
	this.new_Xaxis=this.drawline((width*0.2),(width*1.21),(height+off),(height+off),"grid x-axis");
	this.new_Yaxis=this.drawline((width*0.2),(width*0.2),off*0.9,(height+off),"grid y-axis");
	
    
}
render.prototype.drawTicks = function(ratiox,lab)
{
	for(var j=0;j<=6;j++)
    {    

    	var newxlabel=min_x+((j)*Math.ceil(diff_x/6));
        var monx =newxlabel%12;
        var yrx=Math.floor(newxlabel/12)%100;
        var labelx=monx+"/"+yrx;	
    	this.new_tick=this.drawline((width*0.2+(ratiox*j)),(width*0.2+(ratiox*j)),(height+off),(height+off+4),"ticks x-ticks");
    	this.new_label=this.drawtext((width*0.2+(ratiox*j)),(height+off+20),labelx,"labels x-labels");
    }
    var len=ticks[i].length;
    for(var j=0;j<len;j++)
    {
    	this.new_tick=this.drawline((width*0.19),(width*0.2),(height+off-j*ratio[i]),(height+off-j*ratio[i]),"ticks y-ticks");
    	this.new_label=this.drawtext((width*0.18),(height+off-j*ratio[i]),lab[j],"labels y-labels");
    	if(j%2==0 && j!=len-1)
    	this.new_divRect=this.drawrect((width*0.2),(height+off-(j+1)*ratio[i]),(ratio[i]),width,"odd");

        

    }

}

render.prototype.plotLine = function(points)
{
	this.new_lineplot=this.drawpolyline(points,"plotline");
	
	
    
}
render.prototype.plotAnchor = function(circlecoordinate,r)
{
	
	for(var c2 in circlecoordinate)
    {
    	var cor=circlecoordinate[c2];
    	this.new_anchorplot=this.drawcircle((cor.xc),(cor.yc),r,"circles");
	
	}
    
}
render.prototype.plotcolumn = function(col_co,r)
{
	var count=0,new_columnplot=[];
	
	for(var c2 in col_co)
    {
    	console.log(c2);
    	var cor=col_co[c2];
    	new_columnplot[count]=this.drawrect((cor.xc-(min_dist*0.45)),(cor.yc),(height+off-cor.yc),(min_dist*0.9),"columns");
		
		new_columnplot[count].addEventListener("mousemove",function column_over(evt){
			console.log(c2);
			var highlight_event = new CustomEvent(

					"columnover", 
					{
						detail: {
							mouse_x:evt.pageX,
							pos:c2,
							},
						bubbles: true,
						cancelable: true
					}
				);	
	
			    document.dispatchEvent(highlight_event);

		}, false);	
		 


		count++;
	}
	document.addEventListener("columnover", function(evt){
					var cursorx=evt.detail.mouse_x;
					var pos=evt.detail.c2;
					//var x1=(cor.xc-(min_dist*0.45));
					console.log(cursorx,pos);
					//if(cursorx==x1)
						//console.log("abxy");
					/*if(cursorx>65)
					{
						for(i=0;i<noOf;i++)
						{
							var id_svg="mySvg"+i;
							if(verticalLineArray[i]==undefined){
								verticalLineArray[i] = document.createElementNS(svgNS,"line");
							}
														
			        		verticalLineArray[i].setAttributeNS(null,"x1",(cursorx-8));
							verticalLineArray[i].setAttributeNS(null,"stroke","red");
			       			verticalLineArray[i].setAttributeNS(null,"x2",(cursorx-8));
			       			verticalLineArray[i].setAttributeNS(null,"y1",15);
			       			verticalLineArray[i].setAttributeNS(null,"y2",(cheight));
					 		verticalLineArray[i].setAttributeNS(null,"class","hairline");
					 		document.getElementById(id_svg).appendChild(verticalLineArray[i]);
				 		}
			 		}*/
			
				}, false);
	this.col_co=col_co;
	return new_columnplot;
	
    
}
render.prototype.lineChart = function(cor_l,cor_a)
{
	
		this.plotLine(cor_l);
		this.plotAnchor(cor_a,4);
 		this.newSvg.addEventListener("mousemove", alert_over, false);

    
}
render.prototype.hairLine = function(cur_x,cur_y)
{
		var width2=width*1.2;
		if(cur_x%width2>width*0.2){
		if(this.new_hairline === undefined)
		this.new_hairline = this.drawline((cur_x%width2),(cur_x%width2),off*0.9,(height+off),"hairline");
			this.new_hairline.setAttribute("x1",(cur_x%width2));
			this.new_hairline.setAttribute("x2",(cur_x%width2));
		}

    
}

render.prototype.columnChart = function(cor_c)
{
	
		this.new_plotcolumn=this.plotcolumn(cor_c);
		
 		//this.newSvg.addEventListener("mousemove", alert_over, false);
		return (this.new_plotcolumn);
}
render.prototype.highlight = function(cur_x,cur_y)
{
		var width2=width*1.2;
		if(cur_x%width2>width*0.2){
		if(this.new_hairline === undefined)
		this.new_hairline = this.drawline((cur_x%width2),(cur_x%width2),off*0.9,(height+off),"hairline");
			this.new_hairline.setAttribute("x1",(cur_x%width2));
			this.new_hairline.setAttribute("x2",(cur_x%width2));
		}
		for(var c2 in this.col_co)
    		{
    		var cor=this.col_co[c2];
    		//this.new_columnplot=this.drawrect((cor.xc-(min_dist[i]*0.45)),(cor.yc),(height+off-cor.yc),(min_dist[i]*0.9),"columns");
			if(cur_y>(height+off-cor.yc)&&cur_y<(height+off)&&cur_x>(cor.xc-(min_dist[i]*0.45))&&cur_x<(cor.xc+(min_dist[i]*0.45)))
				{
					
					console.log(cor.yc);
				}
		}

    
}

function cursorPoint(evt) {
				var ptAr=[];
 			   ptAr[0] = evt.pageX; 
 			   ptAr[1]= evt.pageY;
    			
  			  
    			    return ptAr;
   			 
			}
function alert_over(evt) {
				var cursorpt = cursorPoint(evt);
			    //console.log("(" + cursorpt[0]+ ", " + cursorpt[1] + ")");


			    var hairline_event = new CustomEvent(
					"newMessage", 
					{
						detail: {
							mouse_x: cursorpt[0],
							mouse_y:cursorpt[1]
							},
						bubbles: true,
						cancelable: true
					}
				);	
	
			    document.dispatchEvent(hairline_event);

				
				
			}
