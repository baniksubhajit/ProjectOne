

parser();
findLimits();
limit_opt();
calculate_div();
calculate_coordinates();
renderChart();

	

function parser(){//------getting data in object-----
	var obj = mydata.data;
	var obj2 = mydata.chart;
	var parsed_data = {};
	var height,width,caption_text,subcaption_text,chart_type;
	for (var key in obj) {
	    var o = obj[key];
	    var temp,date_v,yr,mo,months;
	    for (var key2 in o) {
	       
	        if (key2 == 'time') {
	            temp = o[key2];
	            date_v=new Date(temp);
	            yr=date_v.getFullYear();
		        mo=date_v.getMonth();
		        var months=yr*12+mo;
	        }
	        else {
	            if (parsed_data[key2] == undefined) {
	                parsed_data[key2] = [];
	            }
	            parsed_data[key2].push(
	            	{
	            	    time: temp,
	            	    months:months,
	                	value: o[key2]
	            	}
	            );
	        }  
	    }
	}
	for (var key in obj2) {
        var oc = obj2[key];

        if (key == "width") {
            width = oc;
        }
        if (key == "height") {
            height = oc;
        }
         if (key == "caption") {
            caption_text = oc;
        }
         if (key == "subcaption") {
            subcaption_text = oc;
        }
        if(key=="type"){
        	chart_type=oc;
        }


	}
	var graphcount = Object.keys(parsed_data).length;
	this.parsed_data=parsed_data;
	this.graphcount=graphcount;
	this.width=width;
	this.height=height;
	this.off=height*0.08+10;
	this.caption_text=caption_text;
	this.subcaption_text=subcaption_text;
	this.chart_type=chart_type;
}//----end-parse function

function findLimits(){//------Finding the limits and differences of x-axis and y-axes--
	var max = [],
    min = [],
    y_labels = [],
    diff=[];
    var count = 0,maxx,minx;
    for (var key in parsed_data) {
    	y_labels[count]=key;
        var obj = parsed_data[key];
        for (var key2 in obj) {
            var value = obj[key2].value;
            var months = obj[key2].months;
            if(minx==undefined)
            	minx=months;
            else{
            	if (months < minx)
            	minx=months;
        	}

            if(maxx==undefined)
            	maxx=months;
            else{
            	if (months > maxx)
            	maxx=months;
        	}

            if(max[count]==undefined)
            	max[count]=value;
            else{
            	if (value > max[count]) {
                	max[count] = value;
            	}
            }

            if(min[count]==undefined)
            	min[count]=value;
            else{
            	if (value < min[count]) {
                	min[count] = value;
            	}
            }
        }
        diff[count]=max[count]-min[count];
        count++;
    }
    this.max=max;
    this.min=min;
    this.y_labels=y_labels;
    this.max_x=maxx;
    this.min_x=minx;
    this.diff_x=maxx-minx;
    this.diff=diff;

}//-----end of limits function

function limit_opt(){//---optimization of limits--  
    var min_opt =Array(graphcount) ;
    var max_opt = Array(graphcount);
    var diff_opt= Array(graphcount);
    for (var i = 0; i < graphcount; i++) {
        var term = diff[i] + "";
        var len = (term).length;
        var divmin = 5 * Math.pow(10, (len - 2));
        var quot = Math.floor(min[i] / divmin);
        min_opt[i] = quot * divmin;
        if (max[i] / diff[i] < 10) {
            var term2 = min[i] + "";
            var lent2 = (term2).length;
            var divmax = 5 * Math.pow(10, (lent2 - 2));
            if (divmax > divmin)
                divmin = divmax;
        }
        var quot2 = (max[i] / divmin);
        max_opt[i] = quot2 * divmin;
        diff_opt[i]=max_opt[i]-min_opt[i];
    }
    this.max_opt=max_opt;
    this.min_opt=min_opt;
    this.diff_opt=diff_opt;
}
function calculate_div(){//-------y axis div height, tick values and coordinate-ratios-----
    var divisiony = Array(graphcount);
    var ratio = Array(graphcount);
    var ticks = Array(graphcount);
    
    for (var i = 0; i < graphcount; i++) {
        var temp = max_opt[i] + "";
        var len = (temp).length;
        var divs = Math.pow(10, (len - 2));
        var opmax = max_opt[i] / divs;
        var opmin = min_opt[i] / divs;
        var differ = Math.abs(opmax - opmin);
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
        ticks[i] = [];
    	for (var j = min_opt[i]; j <= max_opt[i]; j += divisiony[i])
    	{
		    ticks[i].push(j);
    	}
    	ticks[i].push(j);
		ratio[i]=(height/(ticks[i].length-1));

    }

    this.ratiox=width/5;
	this.ratio=ratio;	    
    this.divisiony=divisiony;
	this.ticks=ticks;
}//---end of div calculation



function calculate_coordinates(){//-------calculate coordinates
	var count=0;
	var xplot_ratio=width/diff_x;var coordinates=Array(graphcount);
	var coordinatec={},min_dist;

	for (var key in parsed_data) {
		var yplot_ratio=(height)/(diff_opt[count]);
		var obj = parsed_data[key];
		var temp="";var temp_diff=width*2;

        for (var key2 in obj) {
            var value = obj[key2].value;
            var time = obj[key2].months;
            var time_coordinate=(0.2*width)+(time-min_x)*xplot_ratio;
            var sub = temp_diff-time_coordinate ;

            if(min_dist == undefined)
			{
				
				min_dist=sub;

			}
            if(min_dist>sub){
            	
            	min_dist=sub;
            }
            temp_diff=time_coordinate;
            var y_coordinate=height+off-( (value-min[count])*yplot_ratio);
            temp=temp+time_coordinate+","+y_coordinate+" ";
            if (coordinatec[count] == undefined) {
                    coordinatec[count] = [];
                }
    			coordinatec[count].push({
	                xc: time_coordinate,
	                yc: y_coordinate,
	                xv: time,
	                yv: value
            	});
        }
        coordinates[count]=temp;
        count++;
    }
    this.coordinate_l=coordinates;
    this.coordinate_c=coordinatec;
    this.min_dist=min_dist;
}
function renderChart(){
	for(i=0;i < graphcount;i++)
   {
		newChart=new render("chart-cont",height,width,off,10);
		newChart.drawTicks(ratiox,ticks[i]);
		newChart.drawAxis();
		if(chart_type=="line"){
			newChart.lineChart(coordinate_l[i],coordinate_c[i]);
			
		}
		if(chart_type=="column"){
			newChart.columnChart(coordinate_c[i]);
		}
		responseGraph(newChart);
	}
}
function responseGraph(newChart){
	document.addEventListener("newMessage", function(evt){
					var cursorx=evt.detail.mouse_x;
					var cursory=evt.detail.mouse_y;
					if(chart_type=="line"){
						newChart.hairLine(cursorx,cursory);
						//newChart.plotAnchor(,4);
					}
					if(chart_type=="column"){
							newChart.highlight(cursorx,cursory);
					}
				}, false);
}
