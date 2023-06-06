import * as d3 from 'd3';
import * as topojson from 'topojson-client'

d3.selectAll(".button_click").on("click",async function () {

  var buttonId = d3.select(this).attr("id");
	
	if (buttonId == "add") {
		
    //Getting values
    var docData = d3.select("#docdata").node();
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var color1 = d3.select("#color1").node();
    var color2 = d3.select("#color2").node();
    var color3 = d3.select("#color3").node();
    var color4 = d3.select("#color4").node();
    var inputradio = d3.select("#radio").node();
    var inputopacity = d3.select("#opacity").node();
    
    console.log(docData.value);
    /*
    console.log(iucr1.value);
    console.log(iucr2.value); 
    console.log(iucr3.value); 
    console.log(iucr4.value); 
    console.log(color1.value); 
    console.log(color2.value); 
    console.log(color3.value); 
    console.log(color4.value); */

    const width="700";
    const height="850";
  
    // Projection of Chicago
    const projection = d3.geoMercator()
        .scale(width * 120)
        .center([-87.7298, 41.8338])
        .translate([width / 2, height / 2]);
  
    // Get chicago topojson  
    const data = await d3.json("https://raw.githubusercontent.com/michaeltranxd/UIC-Undergraduate-Research-2019-2020/master/HTML/MyWebsite/topojson/chicago_zipcodes.json")
  
    // Get geojson from topojson
    const geojson = topojson.feature(data, data.objects["Boundaries - ZIP Codes"])
  
    const svg = d3.create('svg')
        .attr('width', width)
        .attr('height',height)
        .attr('class','mapDot')
  
    //console.log(geojson)
    //svg.append("svg:title").text("Your tooltip info");
    
    svg.selectAll("path")
      .data(geojson.features)
      .enter()
      .append("path")
      .attr('fill','#ccc')
      .attr('stroke','#888')
      .attr("d", d3.geoPath(projection))
  
    //reading data crimes
    const dataSample = await d3.csv("../data/CrimesSample.csv");
    const dataCrimes = await d3.csv("../data/"+docData.value+".csv");
    //console.log(dataCrimes);
  
    //Adding data Crimes Sample
    const stateCapitalElements = svg.selectAll('g')
      .data(dataSample)
      .join('g');      
  
    for(let i=0;i<dataCrimes.length;i++){  
      let dot = 'translate('+dataCrimes[i].Longitude+","+dataCrimes[i].Latitude+")";
      //console.log(dot);
      let opacity=inputopacity.value;
      let radio=inputradio.value;
      //console.log(dataCrimes[i]['Primary Type']);
      let info="Type: "+dataCrimes[i]['Primary Type'] + "\n"+ "Description: " +dataCrimes[i]['Description'] + "\n"+ "Location: " +dataCrimes[i]['Location Description'] ;
      if(dataCrimes[i].IUCR==iucr1.value){
          const capitalGroups = stateCapitalElements.append('g')
          .attr('transform',dot)
          .append('circle')
          .attr('r',radio)
          .attr('fill',color1.value)
          .attr('opacity',opacity)
          .append("svg:title").text(info)
      }
      if(dataCrimes[i].IUCR==iucr2.value){
        const capitalGroups = stateCapitalElements.append('g')
        .attr('transform',dot)
        .append('circle')
        .attr('r',radio)
        .attr('fill',color2.value)
        .attr('opacity',opacity)
        .append("svg:title").text(info)
      }
      if(dataCrimes[i].IUCR==iucr3.value){
        const capitalGroups = stateCapitalElements.append('g')
        .attr('transform',dot)
        .append('circle')
        .attr('r',radio)
        .attr('fill',color3.value)
        .attr('opacity',opacity)
        .append("svg:title").text(info)  
      }
      if(dataCrimes[i].IUCR==iucr4.value){
        const capitalGroups = stateCapitalElements.append('g')
        .attr('transform',dot)
        .append('circle')
        .attr('r',radio)
        .attr('fill',color4.value)
        .attr('opacity',opacity)
        .append("svg:title").text(info)
      }                     
    }
    svg.append("text")
        .attr("x", '580')             
        .attr("y", '50')
        .attr("text-anchor", "middle")  
        .style("font-size", "40px")
        .style("fill",'#555')  
        .text(docData.value);
    
    // Legend
    if(iucr1.value!="none"){
    svg.append("circle")
        .attr('transform','translate(520,80)')
        .attr('r',8)
        .attr('fill',color1.value)
        .attr('opacity',opacity)      
    
    svg.append("text")
        .attr("x", '530')             
        .attr("y", '85') 
        .style("font-size", "18px")
        .style("fill","#555")  
        .text(iucr1.options[iucr1.selectedIndex].text);
    }

    if(iucr2.value!="none"){
    svg.append("circle")
        .attr('transform','translate(520,100)')
        .attr('r',8)
        .attr('fill',color2.value)
        .attr('opacity',opacity)

    svg.append("text")
        .attr("x", '530')             
        .attr("y", '105') 
        .style("font-size", "18px")
        .style("fill","#555")  
        .text(iucr2.options[iucr2.selectedIndex].text);
    }
    
    if(iucr3.value!="none"){
    svg.append("circle")
        .attr('transform','translate(520,120)')
        .attr('r',8)
        .attr('fill',color3.value)
        .attr('opacity',opacity)

    svg.append("text")
        .attr("x", '530')             
        .attr("y", '125') 
        .style("font-size", "18px")
        .style("fill","#555")  
        .text(iucr3.options[iucr3.selectedIndex].text);
    }

    if(iucr4.value!="none"){
    svg.append("circle")
        .attr('transform','translate(520,140)')
        .attr('r',8)
        .attr('fill',color4.value)
        .attr('opacity',opacity) 

    svg.append("text")
        .attr("x", '530')             
        .attr("y", '145') 
        .style("font-size", "18px")
        .style("fill","#555")  
        .text(iucr4.options[iucr4.selectedIndex].text);
    }
   
    document.body.appendChild(svg.node());
	}

  //*****************************************************************************LINE CHART
  if (buttonId =="linechart"){
    //get query
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var color1 = d3.select("#color1").node();
    var color2 = d3.select("#color2").node();
    var color3 = d3.select("#color3").node();
    var color4 = d3.select("#color4").node();
    var inputradio = d3.select("#radio").node();


    //Dimensions and margin
    const margin = {top:20,right:20,bottom:20,left:40};
    const width = 680 - margin.left - margin.right;
    const height = 400 - margin.top -margin.bottom;

    //x,y scales
    const x = d3.scaleTime()
      .range([0, width]);
    
    const y = d3.scaleLinear()
      .range([height,0]);

    //create svg
    const svg = d3.select('#chart-container')
      .append("svg")
        .attr("width", width+margin.left+margin.right)
        .attr("height", height+margin.top+margin.bottom)
        .attr('class','lineChart')
      .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    //data
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    let monthsDate=["2017-01","2017-02","2017-03","2017-04","2017-05","2017-06","2017-07","2017-08","2017-09","2017-10","2017-11","2017-12"];
    let dataset=[];
    let dataset2=[];
    let dataset3=[];
    let dataset4=[];
    for(let i=0;i<months.length;i++){
      let total1=0;
      let total2=0;
      let total3=0;
      let total4=0;
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          total1++;
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          total2++;
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          total3++;
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          total4++;
        }
      }
      var valToSet1 ={
        date: new Date(monthsDate[i]),
        value: total1
      }
      var valToSet2 ={
        date: new Date(monthsDate[i]),
        value: total2
      }
      var valToSet3 ={
        date: new Date(monthsDate[i]),
        value: total3
      }
      var valToSet4 ={
        date: new Date(monthsDate[i]),
        value: total4
      }
      dataset.push(valToSet1);
      dataset2.push(valToSet2);
      dataset3.push(valToSet3);
      dataset4.push(valToSet4);
      
    }
    console.log(dataset);
    console.log(dataset2);
    console.log(dataset3);
    console.log(dataset4);    

    //domain
    let max1=d3.max(dataset, d => d.value)
    let max2=d3.max(dataset2, d => d.value)
    let max3=d3.max(dataset3, d => d.value)
    let max4=d3.max(dataset4, d => d.value)
    let max=0
    let arrmax=[max1,max2,max3,max4]
    for(let i=0;i<arrmax.length;i++){
      if(arrmax[i]>max){
        max=arrmax[i]
      }
    }
    x.domain(d3.extent(dataset, d => d.date));
    y.domain([0, max]);

    // x-axis
    svg.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x)
      .ticks(d3.timeMonth.every(1)) 
      .tickFormat(d3.timeFormat("%b %Y"))); 


    //y-axis
    svg.append("g")
      .call(d3.axisLeft(y))

    // Create the line generator
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.value));

    // Add the line path to the SVG element  and Legend
    if(iucr1.value!="none"){
      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color1.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .append("svg:title").text(iucr1.options[iucr1.selectedIndex].text)

      svg.append("text")
        .attr("x", '480')             
        .attr("y", '0') 
        .style("font-size", "14px")
        .style("fill",color1.value)  
        .text(iucr1.options[iucr1.selectedIndex].text);
    }
    if(iucr2.value!="none"){
      svg.append("path")
        .datum(dataset2)
        .attr("fill", "none")
        .attr("stroke", color2.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .append("svg:title").text(iucr2.options[iucr2.selectedIndex].text)

      svg.append("text")
        .attr("x", '480')             
        .attr("y", '15') 
        .style("font-size", "14px")
        .style("fill",color2.value)  
        .text(iucr2.options[iucr2.selectedIndex].text);
    }
    if(iucr3.value!="none"){
      svg.append("path")
        .datum(dataset3)
        .attr("fill", "none")
        .attr("stroke", color3.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .append("svg:title").text(iucr3.options[iucr3.selectedIndex].text)

      svg.append("text")
        .attr("x", '480')             
        .attr("y", '30') 
        .style("font-size", "14px")
        .style("fill",color3.value)  
        .text(iucr3.options[iucr3.selectedIndex].text);
    }
    if(iucr4.value!="none"){
      svg.append("path")
        .datum(dataset4)
        .attr("fill", "none")
        .attr("stroke", color4.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .append("svg:title").text(iucr4.options[iucr4.selectedIndex].text)
      svg.append("text")
        .attr("x", '480')             
        .attr("y", '45') 
        .style("font-size", "14px")
        .style("fill",color4.value)  
        .text(iucr4.options[iucr4.selectedIndex].text);
    }
  }
  //********************************************Grafico 3D****************************************************************
  if (buttonId =="3dchart"){    
    
    var datainit=[[1,2,3,4],[2,2,3,4],[3,2,3,4],[3,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,4],[1,2,3,3],[1,2,3,2]];
    
    //console.log(datainit)
    var data = [{
      x: ["crimen1","crimen2","crimen3","crimen4"],
      y: ["ene","feb","mar","abr","may","jun","jul","ago","set","oct","nov","dic"],
      z: datainit,
      type: 'surface',
   }];
    var layout = {
      title: 'Title',
      scene: {
        xaxis: {title: 'X'},
        yaxis: {title: 'Y'},
        zaxis: {title: 'Z'}
      },
      margin: {
        l: 2,
        r: 2,
        b: 20,
        t: 40,
      }
    };
    Plotly.newPlot('chart3d', data, layout);
    
  }
});
