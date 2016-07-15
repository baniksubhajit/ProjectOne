//------getting data in object-------
		    var obj = mydata.data;
		    var dataob = {};
		    for (var key in obj) {
		        var o = obj[key];
		        var temp;
		        for (var key2 in o) {
		            var o22 = o[key2];


		            if (key2 == 'time') {
		                temp = o[key2];
		                //console.log(temp);  
		            } else {
		                //console.log(temp);
		                if (dataob[key2] == undefined) {
		                    dataob[key2] = [];
		                }
		                    dataob[key2].push({
		                        time: temp,
		                        value: o[key2]
		                    });
		                 
		                    

		            }

		        }
		    }


		    //----finding max mins
		    var noOf = Object.keys(dataob).length;
		    //console.log(noOf);
		    var max = Array(noOf).fill(0),
		        min = Array(noOf).fill(1/0),
		        y_keys = Array(noOf);

		    var count = 0;
		    var maxx,minx;
		    
		    for (var kk in dataob) {
		    	console.log("AXesss",kk);
		    	y_keys[count]=kk;
		        var kx = dataob[kk];
		        //console.log("next");
		        for (var kkk in kx) {
		            var value2 = kx[kkk].value;
		            var time2 = kx[kkk].time;
		            
		            var tt=new Date(time2);
		            var yr=tt.getFullYear();
		            var mo=tt.getMonth();
		            var tim=yr*12+mo;
		            if(minx==undefined)
		            	minx=tim;
		            else{
		            	if (tim < minx)
		            	minx=tim;
		        	}
		            if(maxx==undefined)
		            	maxx=tim;
		            else{
		            	if (tim > maxx)
		            	maxx=tim;
		        	}
		            if(max[count]==undefined)
		            	max[count]=value2;
		            else{
		            	if (value2 > max[count]) {
		                	max[count] = value2;
		            	}
		            }
		            if(min[count==undefined])
		            	min[count]=value2;
		            else{
		            	if (value2 < min[count]) {
		                	min[count] = value2;
		            	}
		            }
		            //console.log(tim/12);
		            

		            

		            
		            

		        }
		        count++;
		    }
		    //console.log(maxx/12,"gggg");
		    //----x axis max mins
		    
		   //console.log(maxx,minx,"abc")

		    //----difference
		    var diffx=maxx-minx;
		    //console.log(diffx);
		    var diff = Array(noOf);

		    for (var i = 0; i < noOf; i++) {
		    	if(max[i] - min[i]!=0)
		    	      diff[i] = (max[i] - min[i]);
		    	  else
		    	  	diff[i] = 1;
		    }
		    //console.log("mins");
		    for (var i = 0; i < noOf; i++) {
		        //console.log(min[i]);
		    }
		    //console.log("maxs");
		    for (var i = 0; i < noOf; i++) {
		        //console.log(max[i]);
		    }

		    //-----optimized max mins------  
		    var min2 = Array(noOf);
		    var max2 = Array(noOf);
		    //console.log("optimized");
		    for (var i = 0; i < noOf; i++) {
		        var term = diff[i] + "";
		        var lent = (term).length;
		        var divmin = 5 * Math.pow(10, (lent - 2));
		        var quot = Math.floor(min[i] / divmin);
		        min2[i] = quot * divmin;
		        //console.log("q"+min2[i]);

		        if (max[i] / diff[i] < 10) {
		            var term2 = min[i] + "";
		            var lent2 = (term2).length;
		            var divmax = 5 * Math.pow(10, (lent2 - 2));
		            if (divmax > divmin)
		                divmin = divmax;
		        }
		        var quot2 = (max[i] / divmin);
		        max2[i] = quot2 * divmin;
		        console.log("qq"+max2[i]);
		    }
		    //-------y axis divs-----
		    var divisiony = Array(noOf);
		    var ticks = {};
		    for (var i = 0; i < noOf; i++) {
		        var tempp = max[i] + "";
		        var lenm = (tempp).length;
		        var divs = Math.pow(10, (lenm - 2));
		       // console.log("multiplier",divs);
		        var opmax = max[i] / divs;
		        var opmin = min[i] / divs;
		        var differ = Math.abs(opmax - opmin);
		       // console.log("difference",differ);
		        var flag;
		        if (differ <= 1)
		            flag = 0.25;
		        else if (differ <= 3)
		            flag = 0.5;
		        else if (differ <= 6)
		            flag = 1;
		        else if (differ <= 12)
		            flag = 2;
		        else if (differ <= 20)
		            flag = 4;
		        else if (differ <= 30)
		            flag = 5;
		        else if (differ <= 40)
		            flag = 7;
		        else
		            flag = 10;


		        divisiony[i] = flag * divs;

		    }

		    //----calculate ticks
		    for (var i = 0; i < noOf; i++) {
		        //console.log(divisiony[i]);
		        ticks[i] = [];
		        console.log
		        for (var j = min2[i]; j <= max2[i]; j += divisiony[i])
		            ticks[i].push(j);
		    }
		    
		        console.log("ticks-",ticks);

		    

		    //--------Proportionate values--------
		    var ratio = Array(noOf);
		    var obj2 = mydata.chart;
		    var caption_text,subcaption_text;
		    var cwidth, cheight;
		    for (var key in obj2) {
		        var oc = obj2[key];

		        if (key == "width") {
		            cwidth = oc;
		        }
		        if (key == "height") {
		            cheight = oc;
		        }
		         if (key == "caption") {
		            caption_text = oc;
		        }
		         if (key == "subcaption") {
		            subcaption_text = oc;
		        }


		    }


		    var ratiox=cwidth/6;
		    for(i=0;i<noOf;i++)
		    {
		    	ratio[i]=Math.ceil(cheight/ticks[i].length);

		    }
		    //console.log(ratio);

		    //-------calculate coordinates
        		var count=0;
        		var xplot_ratio=cwidth/diffx;var coordinates=Array(noOf).fill("");
        		var coordinatec={};
        		
        		//console.log(diffx);
        	//console.log("width",cwidth,cheight);
			for (var kk in dataob) {
				var yplot_ratio=(cheight-25)/(diff[count]);
				console.log(kk,"kval");
		        var kx = dataob[kk];
		        //console.log("next",yplot_ratio,"/",xplot_ratio);
		        for (var kkk in kx) {
		            var value2 = kx[kkk].value;
		            var time2 = kx[kkk].time;
		            var tt=new Date(time2);
		            var yr=tt.getFullYear();
		            var mo=tt.getMonth();
		            var tim=yr*12+mo;
		            //console.log(tim-minx);
		            var time_coordinate=60+(tim-minx)*xplot_ratio;
		            //console.log(value2-min[count]);
		            var y_coordinate=cheight-( (value2-min[count])*yplot_ratio);
		            //console.log(time_coordinate,"^",y_coordinate);
		            var temporary=coordinates[count]+time_coordinate+","+y_coordinate+" ";
		            coordinates[count]=temporary;
		            if (coordinatec[count] == undefined) {
		                    coordinatec[count] = [];
		                }
		            			coordinatec[count].push({
		                        xc: time_coordinate,
		                        yc: y_coordinate,
		                        xv: time2,
		                        yv: value2
		                    	});
		           
		            		

		        }
		        console.log(coordinatec[count]);
		       	 count++;
		    }



		    var svgNS = "http://www.w3.org/2000/svg"; 
        	//----printing caption
        	var newSvg = document.createElementNS(svgNS,"svg");
            newSvg.setAttributeNS(null,"class","caption");
            newSvg.setAttributeNS(null,"role","img");
            newSvg.setAttributeNS(null,"height",(cheight/2.5));
          	document.getElementById("chart-cont").appendChild(newSvg);

          	


            var newcap=document.createElementNS(svgNS,"text");
           	 newcap.setAttributeNS(null,"x",cwidth/1.5);
            newcap.setAttributeNS(null,"y",cheight/6);
            newcap.setAttributeNS(null,"class","headings");
          	var textNode = document.createTextNode(caption_text);
			newcap.appendChild(textNode);
            newSvg.appendChild(newcap);

            var newcap=document.createElementNS(svgNS,"text");
           	 newcap.setAttributeNS(null,"x",cwidth/1.5);
            newcap.setAttributeNS(null,"y",cheight/4);
            newcap.setAttributeNS(null,"class","headings");
          	var textNode = document.createTextNode(subcaption_text);
			newcap.appendChild(textNode);
            newSvg.appendChild(newcap);

            //--printing graphs
            for(i=0;i<noOf;i++)
            {
            	var newBreak = document.createElement("br");
            	document.getElementById("chart-cont").appendChild(newBreak);
            	var id1="mySvg"+i;
            	 var newSvg = document.createElementNS(svgNS,"svg");
            newSvg.setAttributeNS(null,"id",id1);
            newSvg.setAttributeNS(null,"class","graph");
            newSvg.setAttributeNS(null,"role","img");
            newSvg.setAttributeNS(null,"height",(cheight+60));
            newSvg.setAttributeNS(null,"width",(cwidth+100));

            document.getElementById("chart-cont").appendChild(newSvg);
            
            //--printing y-axis--
            
            var id2="yGrid"+i;
            
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",id2);
            newG.setAttributeNS(null,"class","grid y-axis");
            document.getElementById(id1).appendChild(newG);

             var newx=document.createElementNS(svgNS,"line");
            newx.setAttributeNS(null,"x1","58");
            newx.setAttributeNS(null,"x2","58");
            newx.setAttributeNS(null,"y1",15);
            newx.setAttributeNS(null,"y2",(cheight+2));
           // heighh+=cheight;
            document.getElementById(id2).appendChild(newx);
            //--printing x axis--
            var id3="xGrid"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",id3);
            newG.setAttributeNS(null,"class","grid x-axis");
            document.getElementById(id1).appendChild(newG);

            var newx=document.createElementNS(svgNS,"line");
            newx.setAttributeNS(null,"x1","58");
            newx.setAttributeNS(null,"x2",(cwidth+90));
            newx.setAttributeNS(null,"y1",(cheight+2));
            newx.setAttributeNS(null,"y2",(cheight+2));
            document.getElementById(id3).appendChild(newx);
            //--printing ticks--
            //--y ticks
            var gname="xTicks"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",gname);
            newG.setAttributeNS(null,"class","ticks x-ticks");
            document.getElementById(id1).appendChild(newG);

            //var tick2=ticks[i];
            for(var j=0;j<ticks[i].length;j++)
            {
            	
            	//var newtick=tick2[j];
            	var newt=document.createElementNS(svgNS,"line");
            newt.setAttributeNS(null,"x1","54");
            newt.setAttributeNS(null,"x2","58");
            newt.setAttributeNS(null,"y1",(cheight-j*ratio[i]));
            newt.setAttributeNS(null,"y2",(cheight-j*ratio[i]));
            document.getElementById(gname).appendChild(newt);

            }

            //--y divisions
            var gname="xDivs"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",gname);
            
            document.getElementById(id1).appendChild(newG);

            //var tick2=ticks[i];
            for(var j=0;j<ticks[i].length;j++)
            {
            	
            	//var newtick=tick2[j];
            	var newd=document.createElementNS(svgNS,"line");
            	var newt=document.createElementNS(svgNS,"rect");
            	newd.setAttributeNS(null,"x1","58");
	            newd.setAttributeNS(null,"x2",(cwidth+90));
	            newd.setAttributeNS(null,"y1",(cheight-j*ratio[i]));
	            newd.setAttributeNS(null,"y2",(cheight-j*ratio[i]));
	            newd.setAttributeNS(null,"class","division");
	            newt.setAttributeNS(null,"x","58");
	            newt.setAttributeNS(null,"width",cwidth+32);
	            newt.setAttributeNS(null,"y",(cheight-(j+1)*ratio[i]));
            if(j==(ticks[i].length-1))
            {
            	newt.setAttributeNS(null,"height",0);
            }
            else if(j%2==0)
            {
            	newt.setAttributeNS(null,"class","even");
            	newt.setAttributeNS(null,"height",(ratio[i]));
            }
            
            else{
            	newt.setAttributeNS(null,"class","odd");
            	newt.setAttributeNS(null,"height",(ratio[i]));
            }
            document.getElementById(gname).appendChild(newt);
            document.getElementById(gname).appendChild(newd);


            }

            
            		//--y labels
            var glabel="yLabels"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",glabel);
            newG.setAttributeNS(null,"class","labels y-labels");
            document.getElementById(id1).appendChild(newG);

            var tick2=ticks[i];
            for(var j=0;j<ticks[i].length;j++)
            {
            	var newtick;
            	if(tick2[j]<1000)
            		newtick=tick2[j];
            	else if(tick2[j]<1000000)
            		newtick=(tick2[j]/1000)+"K";
            	else if(tick2[j]<1000000000)
            		newtick=(tick2[j]/1000000)+"M";
            	var newt=document.createElementNS(svgNS,"text");
           	 newt.setAttributeNS(null,"x","50");
            newt.setAttributeNS(null,"y",(cheight-j*ratio[i]));
          	var textNode = document.createTextNode(newtick);
			newt.appendChild(textNode);
            document.getElementById(glabel).appendChild(newt);

            }
            var newxlabel=y_keys[i];
            var newt=document.createElementNS(svgNS,"text");
            newt.setAttributeNS(null,"x",30);
            newt.setAttributeNS(null,"y",cheight/2);
            newt.setAttributeNS(null,"class","label-title");
            newt.setAttributeNS(null,"transform","rotate(270 17,103)");
            
            var textNode = document.createTextNode(newxlabel);
            newt.appendChild(textNode);
            document.getElementById(glabel).appendChild(newt);

        	
             //--x ticks
            var gname2="yTicks"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",gname2);
            newG.setAttributeNS(null,"class","ticks x-ticks");
            document.getElementById(id1).appendChild(newG);

            
            for(var j=0;j<=6;j++)
            {
            	
            	
            	var newt=document.createElementNS(svgNS,"line");
            newt.setAttributeNS(null,"x1",60+(ratiox*j));
            newt.setAttributeNS(null,"x2",60+(ratiox*j));
            newt.setAttributeNS(null,"y1",(cheight+2));
            newt.setAttributeNS(null,"y2",(cheight+7));
            document.getElementById(gname2).appendChild(newt);

            }
            if(i==noOf-1)
            {
            //--x labels
            var glabel2="xLabels"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",glabel2);
            newG.setAttributeNS(null,"class","labels x-labels");
            document.getElementById(id1).appendChild(newG);

            console.log("xxxxx");
            for(var j=0;j<=6;j++)
            {
            	
            	var newxlabel=minx+((j)*Math.ceil(diffx/6));
            	var monx =newxlabel%12;
            	var yrx=Math.floor(newxlabel/12);
            	var labelx=monx+"/"+yrx;
            	// console.log(monx,"--",yrx);
            	var newt=document.createElementNS(svgNS,"text");
            newt.setAttributeNS(null,"x",60+(ratiox*j));
            newt.setAttributeNS(null,"y",(cheight+25));
          	var textNode = document.createTextNode(labelx);
			newt.appendChild(textNode);
            document.getElementById(glabel2).appendChild(newt);

            }
            var newxlabel="Time";
            var newt=document.createElementNS(svgNS,"text");
            newt.setAttributeNS(null,"x",(cwidth/2)+50);
            newt.setAttributeNS(null,"y",cheight+55);
            newt.setAttributeNS(null,"class","label-title");
            var textNode = document.createTextNode(newxlabel);
            newt.appendChild(textNode);
            document.getElementById(glabel2).appendChild(newt);
       		 }	




            //----plot
            var newp=document.createElementNS(svgNS,"polyline");
            var text_co=coordinates[i];
            newp.setAttributeNS(null,"stroke","#1e7ac9");
            newp.setAttributeNS(null,"stroke-width","3");
            newp.setAttributeNS(null,"fill","none");
            newp.setAttributeNS(null,"points",text_co);
            newp.setAttributeNS(null,"id","neww");

           // heighh+=cheight;
            document.getElementById(id1).appendChild(newp);

            //----Print circles
            var gnamec="circles"+i;
            var newG=document.createElementNS(svgNS,"g");
            newG.setAttributeNS(null,"id",gnamec);
            newG.setAttributeNS(null,"class","circles");
            document.getElementById(id1).appendChild(newG);

            
            	var o=coordinatec[i];
            	for(var c2 in o)
            	{
            		var p=o[c2];


            		var newc=document.createElementNS(svgNS,"circle");
                        newc.setAttributeNS(null,"cx",p.xc);
            			newc.setAttributeNS(null,"cy",p.yc);
            			newc.setAttributeNS(null,"r","2");
            			           			
            			document.getElementById(gnamec).appendChild(newc);

            	}
            
           // console.log(o);

			
			
			var pt = newSvg.createSVGPoint();
			var verticalLineArray = [];
			var toolTipArray=[];
			var toolTipText=[];
			//for(i=0;i<noOf;i++)
			//{
			//	var id_svg="mySvg"+i;
				
				//document.getElementById(id_svg).appendChild(verticalLineArray[i]);
		//}
		//---------recieve broadcast for crosshair
			document.addEventListener("newMessage", function(evt){
					var cursorx=evt.detail.mouse_x;
					//console.log(cursorx);
					if(cursorx>65)
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
			 		}
			
				}, false); //console.log(id_svg); 
		//------recieve broadcast for tooltip

		document.addEventListener("newMessage", function(evt){
					var cursorx=evt.detail.mouse_x;
					var tooltipLabel;
					//console.log(cursorx);
					for(i=0;i<noOf;i++)
					{
						var o=coordinatec[i];
            			for(var c2 in o)
            			{
            				var p=o[c2];
            				//console.log(p.xc,"xcv");
            				if((p.xc+5)<=cursorx&&(p.xc+9)>=cursorx)
            				{
            					console.log("Matched",i,p.yv,p.xc);

            						for(j=0;j<noOf;j++)
									{	if(i==j)
										{
											var id_svg="mySvg"+j;
											if(toolTipArray[j]==undefined){
												toolTipArray[j] = document.createElementNS(svgNS,"rect");
												toolTipText[j] = document.createElementNS(svgNS,"text");
												 
											}
											tooltipLabel=p.yv;					
							        		
											
											toolTipArray[j].setAttributeNS(null,"height",20);
											toolTipArray[j].setAttributeNS(null,"width",50);		
							       			toolTipArray[j].setAttributeNS(null,"class","tooltip");
							       			
							       			if(p.yc<cheight-20){
												toolTipText[j].setAttributeNS(null,"y",p.yc+25);
												toolTipArray[j].setAttributeNS(null,"y",p.yc+10);
											}
											else
											{
												toolTipText[j].setAttributeNS(null,"y",p.yc-25);
												toolTipArray[j].setAttributeNS(null,"y",p.yc-40);
											}
											if(cursorx<cwidth+50){
												toolTipArray[j].setAttributeNS(null,"x",(cursorx-8));
												toolTipText[j].setAttributeNS(null,"x",(cursorx+4));
											}
											else
											{
												toolTipArray[j].setAttributeNS(null,"x",(cursorx-58));
												toolTipText[j].setAttributeNS(null,"x",(cursorx-42));
											}

											toolTipText[j].setAttributeNS(null,"class","tooltext");
							       			toolTipText[j].innerHTML = (tooltipLabel);
							       			document.getElementById(id_svg).appendChild(toolTipArray[j]);
									 		document.getElementById(id_svg).appendChild(toolTipText[j]);
								 		}
							 		}

            				}
            				

            				
            			}
            		}
            	
			
			}, false); //console.log(id_svg); 	
				
						

				
			


			 		newSvg.addEventListener("mousemove", alert_over, false);
			 		newSvg.addEventListener("mouseout", alert_out, false);

		}
		//----event listen



 
            function cursorPoint(evt) {
				var ptAr=[];
 			   ptAr[0] = evt.clientX; 
 			   ptAr[1]= evt.clientY;
    			
  			  
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
							},
						bubbles: true,
						cancelable: true
					}
				);	
	
			    document.dispatchEvent(hairline_event);

				
				
			}

			function alert_out(evt) {
				
				var cursorpt = cursorPoint(evt);
				
					for(var i=0;i<noOf;i++)
					{
						var id_svg="mySvg"+i;
						if(verticalLineArray[i]!=undefined)
						{
							document.getElementById(id_svg).removeChild(verticalLineArray[i]);
							verticalLineArray[i] = undefined;

						}
						if(toolTipArray[i]!=undefined)
						{
							document.getElementById(id_svg).removeChild(toolTipArray[i]);
							document.getElementById(id_svg).removeChild(toolTipText[i]);
							toolTipArray[i] = undefined;
							toolTipText[i] = undefined;
						}
						
					}

				
			}
    			
    			//newSvg.addEventListener("mouseout", alert_out);