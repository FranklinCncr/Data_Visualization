import * as d3 from 'd3';
import * as topojson from 'topojson-client'

d3.selectAll(".button_click").on("click",async function () {

  var buttonId = d3.select(this).attr("id");
	
	if (buttonId == "addMap") {
		
    //Getting values
    var docData = d3.select("#docdata").node();
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var iucr5 = d3.select("#iucr5").node();
    var color1 = d3.select("#color1").node();
    var color2 = d3.select("#color2").node();
    var color3 = d3.select("#color3").node();
    var color4 = d3.select("#color4").node();
    var color5 = d3.select("#color5").node();
    var inputradio = d3.select("#radio").node();
    var inputopacity = d3.select("#opacity").node();

    var area1 = d3.select('#area1').node();
    var area2 = d3.select('#area2').node();
    var area3 = d3.select('#area3').node();
    var area4 = d3.select('#area4').node();
    var area5 = d3.select('#area5').node();

    var namesAreas = ["Rogers Park",
    "West Ridge",
    "Uptown",
    "Lincoln Square",
    "North Center",
    "Lake View",
    "Lincoln Park",
    "Near North Side",
    "Edison Park",
    "Norwood Park",
    "Jefferson Park",
    "Forest Glen",
    "North Park",
    "Albany Park",
    "Portage Park",
    "Irving Park",
    "Dunning",
    "Montclare",
    "Belmont Cragin",
    "Hermosa",
    "Avondale",
    "Logan Square",
    "Humboldt Park",
    "West Town",
    "Austin",
    "West Garfield Park",
    "East Garfield Park",
    "Near West Side",
    "North Lawndale",
    "South Lawndale",
    "Lower West Side",
    "(The) Loop[11]",
    "Near South Side",
    "Armour Square",
    "Douglas",
    "Oakland",
    "Fuller Park",
    "Grand Boulevard",
    "Kenwood",
    "Washington Park",
    "Hyde Park",
    "Woodlawn",
    "South Shore",
    "Chatham",
    "Avalon Park",
    "South Chicago",
    "Burnside",
    "Calumet Heights",
    "Roseland",
    "Pullman",
    "South Deering",
    "East Side",
    "West Pullman",
    "Riverdale",
    "Hegewisch",
    "Garfield Ridge",
    "Archer Heights",
    "Brighton Park",
    "McKinley Park",
    "Bridgeport",
    "New City",
    "West Elsdon",
    "Gage Park",
    "Clearing",
    "West Lawn",
    "Chicago Lawn",
    "West Englewood",
    "Englewood",
    "Greater Grand Crossing",
    "Ashburn",
    "Auburn Gresham",
    "Beverly",
    "Washington Heights",
    "Mount Greenwood",
    "Morgan Park",
    "O'Hare",
    "Edgewater"]
    
    //console.log(docData.value);
    

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

    let n1=0;
    let n2=0;
    let n3=0;
    let n4=0;
    let n5=0;
  
    for(let i=0;i<dataCrimes.length;i++){  
      let dot = 'translate('+dataCrimes[i].Longitude+","+dataCrimes[i].Latitude+")";
      //console.log(dot);
      let opacity=inputopacity.value;
      let radio=inputradio.value;
      //console.log(dataCrimes[i]['Primary Type']);
      let info="Type: "+dataCrimes[i]['Primary Type'] + "\n"+ "Description: " +dataCrimes[i]['Description'] + "\n"+ "Location: " +dataCrimes[i]['Location Description']  + "\n"+ "Comunity Area: " +namesAreas[dataCrimes[i]['CommunityArea']-1];
      if(dataCrimes[i].IUCR==iucr1.value){
          if(dataCrimes[i].CommunityArea == area1.value || dataCrimes[i].CommunityArea==area2.value || dataCrimes[i].CommunityArea==area3.value || dataCrimes[i].CommunityArea==area4.value || dataCrimes[i].CommunityArea==area5.value || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            const capitalGroups = stateCapitalElements.append('g')
            .attr('transform',dot)
            .append('circle')
            .attr('r',radio)
            .attr('fill',color1.value)
            .attr('opacity',opacity)
            .append("svg:title").text(info);
            n1++;
          }
      }
      if(dataCrimes[i].IUCR==iucr2.value){
        if(dataCrimes[i].CommunityArea == area1.value || dataCrimes[i].CommunityArea==area2.value || dataCrimes[i].CommunityArea==area3.value || dataCrimes[i].CommunityArea==area4.value || dataCrimes[i].CommunityArea==area5.value|| area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
          const capitalGroups = stateCapitalElements.append('g')
          .attr('transform',dot)
          .append('circle')
          .attr('r',radio)
          .attr('fill',color2.value)
          .attr('opacity',opacity)
          .append("svg:title").text(info);
          n2++;
        }
      }
      if(dataCrimes[i].IUCR==iucr3.value){
        if(dataCrimes[i].CommunityArea == area1.value || dataCrimes[i].CommunityArea==area2.value || dataCrimes[i].CommunityArea==area3.value || dataCrimes[i].CommunityArea==area4.value || dataCrimes[i].CommunityArea==area5.value|| area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
          const capitalGroups = stateCapitalElements.append('g')
          .attr('transform',dot)
          .append('circle')
          .attr('r',radio)
          .attr('fill',color3.value)
          .attr('opacity',opacity)
          .append("svg:title").text(info);
          n3++;  
        }
      }
      if(dataCrimes[i].IUCR==iucr4.value){
        if(dataCrimes[i].CommunityArea == area1.value || dataCrimes[i].CommunityArea==area2.value || dataCrimes[i].CommunityArea==area3.value || dataCrimes[i].CommunityArea==area4.value || dataCrimes[i].CommunityArea==area5.value|| area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
          const capitalGroups = stateCapitalElements.append('g')
          .attr('transform',dot)
          .append('circle')
          .attr('r',radio)
          .attr('fill',color4.value)
          .attr('opacity',opacity)
          .append("svg:title").text(info);
          n4++;
        }
      }
      if(dataCrimes[i].IUCR==iucr5.value){
        if(dataCrimes[i].CommunityArea == area1.value || dataCrimes[i].CommunityArea==area2.value || dataCrimes[i].CommunityArea==area3.value || dataCrimes[i].CommunityArea==area4.value || dataCrimes[i].CommunityArea==area5.value|| area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
          const capitalGroups = stateCapitalElements.append('g')
          .attr('transform',dot)
          .append('circle')
          .attr('r',radio)
          .attr('fill',color5.value)
          .attr('opacity',opacity)
          .append("svg:title").text(info);
          n5++;
        }
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
    let w=520;
    let h=80;
    if(iucr1.value!="none"){
      svg.append("circle")
          .attr('transform','translate('+w+','+h+')')
          .attr('r',8)
          .attr('fill',color1.value)
          .attr('opacity',opacity)      
      
      svg.append("text")
          .attr("x", w+10)             
          .attr("y", h+5) 
          .style("font-size", "18px")
          .style("fill","#555")  
          .text(n1+" "+iucr1.options[iucr1.selectedIndex].text);
      h=h+20;
    }

    if(iucr2.value!="none"){
      svg.append("circle")
          .attr('transform','translate('+w+','+h+')')
          .attr('r',8)
          .attr('fill',color2.value)
          .attr('opacity',opacity)

      svg.append("text")
          .attr("x", w+10)             
          .attr("y", h+5) 
          .style("font-size", "18px")
          .style("fill","#555")  
          .text(n2+" "+iucr2.options[iucr2.selectedIndex].text);
      h=h+20;
    }
    
    if(iucr3.value!="none"){
      svg.append("circle")
          .attr('transform','translate('+w+','+h+')')
          .attr('r',8)
          .attr('fill',color3.value)
          .attr('opacity',opacity)

      svg.append("text")
          .attr("x", w+10)             
          .attr("y", h+5) 
          .style("font-size", "18px")
          .style("fill","#555")  
          .text(n3+" "+iucr3.options[iucr3.selectedIndex].text);
      h=h+20;
    }

    if(iucr4.value!="none"){
      svg.append("circle")
          .attr('transform','translate('+w+','+h+')')
          .attr('r',8)
          .attr('fill',color4.value)
          .attr('opacity',opacity) 

      svg.append("text")
          .attr("x", w+10)             
          .attr("y", h+5) 
          .style("font-size", "18px")
          .style("fill","#555")  
          .text(n4+" "+iucr4.options[iucr4.selectedIndex].text);
      h=h+20;
    }

    if(iucr5.value!="none"){
      svg.append("circle")
          .attr('transform','translate('+w+','+h+')')
          .attr('r',8)
          .attr('fill',color5.value)
          .attr('opacity',opacity) 
  
      svg.append("text")
          .attr("x", w+10)             
          .attr("y", h+5) 
          .style("font-size", "18px")
          .style("fill","#555")  
          .text(n5+" "+iucr5.options[iucr5.selectedIndex].text);
      h=h+20;
    }
   
    document.body.appendChild(svg.node());
	}

  //*****************************************************************************LINE CHART************************************************
  if (buttonId =="linechart"){
    //get query
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var iucr5 = d3.select("#iucr5").node();
    var color1 = d3.select("#color1").node();
    var color2 = d3.select("#color2").node();
    var color3 = d3.select("#color3").node();
    var color4 = d3.select("#color4").node();
    var color5 = d3.select("#color5").node();
    var inputradio = d3.select("#radio").node();
    var inputopacity = d3.select("#opacity").node();

    var area1 = d3.select('#area1').node();
    var area2 = d3.select('#area2').node();
    var area3 = d3.select('#area3').node();
    var area4 = d3.select('#area4').node();
    var area5 = d3.select('#area5').node();

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
    let dataset5=[];
    for(let i=0;i<months.length;i++){
      let total1=0;
      let total2=0;
      let total3=0;
      let total4=0;
      let total5=0;
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total1++;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total2++;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total3++;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total4++;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total5++;
          }
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
      var valToSet5 ={
        date: new Date(monthsDate[i]),
        value: total5
      }
      dataset.push(valToSet1);
      dataset2.push(valToSet2);
      dataset3.push(valToSet3);
      dataset4.push(valToSet4);
      dataset5.push(valToSet5);
      
    }    

    //domain
    let max1=d3.max(dataset, d => d.value)
    let max2=d3.max(dataset2, d => d.value)
    let max3=d3.max(dataset3, d => d.value)
    let max4=d3.max(dataset4, d => d.value)
    let max5=d3.max(dataset5, d => d.value)
    let max=0
    let arrmax=[max1,max2,max3,max4,max5]
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

    const circle = d3.curveLinearClosed()

    // Add the line path to the SVG element  and Legend
    let h=0;
    let opacity=inputopacity.value;
    if(iucr1.value!="none"){
      svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", color1.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .attr('opacity',opacity)
        .append("svg:title").text(iucr1.options[iucr1.selectedIndex].text)
      
      svg.selectAll(".val").data(dataset)
        .enter()
        .append('text')
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .attr("dy", "-0.5em")
          .text(d => d.value)
          .style("font-size", "12px")

      svg.append("text")
        .attr("x", '480')             
        .attr("y", h) 
        .style("font-size", "14px")
        .style("fill",color1.value)  
        .text(iucr1.options[iucr1.selectedIndex].text);
      
      h=h+15;
    }
    if(iucr2.value!="none"){
      svg.append("path")
        .datum(dataset2)
        .attr("fill", "none")
        .attr("stroke", color2.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .attr('opacity',opacity)
        .append("svg:title").text(iucr2.options[iucr2.selectedIndex].text)

      svg.selectAll(".val").data(dataset2)
        .enter()
        .append('text')
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .attr("dy", "-0.5em")
          .text(d => d.value)
          .style("font-size", "12px")

      svg.append("text")
        .attr("x", '480')             
        .attr("y", h) 
        .style("font-size", "14px")
        .style("fill",color2.value)  
        .text(iucr2.options[iucr2.selectedIndex].text);
      
      h=h+15;
    }
    if(iucr3.value!="none"){
      svg.append("path")
        .datum(dataset3)
        .attr("fill", "none")
        .attr("stroke", color3.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .attr('opacity',opacity)
        .append("svg:title").text(iucr3.options[iucr3.selectedIndex].text)

      svg.selectAll(".val").data(dataset3)
        .enter()
        .append('text')
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .attr("dy", "-0.5em")
          .text(d => d.value)
          .style("font-size", "12px")

      svg.append("text")
        .attr("x", '480')             
        .attr("y", h) 
        .style("font-size", "14px")
        .style("fill",color3.value)  
        .text(iucr3.options[iucr3.selectedIndex].text);

      h=h+15;
    }
    if(iucr4.value!="none"){
      svg.append("path")
        .datum(dataset4)
        .attr("fill", "none")
        .attr("stroke", color4.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .attr('opacity',opacity)
        .append("svg:title").text(iucr4.options[iucr4.selectedIndex].text)    
        
      svg.selectAll(".val").data(dataset4)
        .enter()
        .append('text')
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .attr("dy", "-0.5em")
          .text(d => d.value)
          .style("font-size", "12px")

      svg.append("text")
        .attr("x", '480')             
        .attr("y", h) 
        .style("font-size", "14px")
        .style("fill",color4.value)  
        .text(iucr4.options[iucr4.selectedIndex].text);

      h=h+15;
    }
    if(iucr5.value!="none"){
      svg.append("path")
        .datum(dataset5)
        .attr("fill", "none")
        .attr("stroke", color5.value)
        .attr("stroke-width", inputradio.value)
        .attr("d", line)
        .attr('opacity',opacity)
        .append("svg:title").text(iucr5.options[iucr5.selectedIndex].text)

      svg.selectAll(".val").data(dataset5)
        .enter()
        .append('text')
          .attr("x", d => x(d.date))
          .attr("y", d => y(d.value))
          .attr("dy", "-0.5em")
          .text(d => d.value)
          .style("font-size", "12px")

      svg.append("text")
        .attr("x", '480')             
        .attr("y", h) 
        .style("font-size", "14px")
        .style("fill",color5.value)  
        .text(iucr5.options[iucr5.selectedIndex].text);
      
      h=h+15;
    }
    let title="";
    if(area1.value!="none"){      
      title=title+area1.options[area1.selectedIndex].text;
    }
    if(area2.value!="none"){
      title=title+", "
      title=title+area2.options[area2.selectedIndex].text;
    }
    if(area3.value!="none"){
      title=title+", "
      title=title+area3.options[area3.selectedIndex].text;
    }
    if(area4.value!="none"){
      title=title+", "
      title=title+area4.options[area4.selectedIndex].text;
    }
    if(area5.value!="none"){
      title=title+", "
      title=title+area5.options[area5.selectedIndex].text;
    }
    svg.append("text")
        .attr("x", '20')             
        .attr("y", '5')
        .style("font-size", "16px")
        .style("fill",'#555')  
        .text(title);
  }
  //********************************************CHART 3D-TIME****************************************************************
  if (buttonId =="d3chartT1"){
    //Input
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var iucr5 = d3.select("#iucr5").node();
    
    var area1 = d3.select('#area1').node();
    var area2 = d3.select('#area2').node();
    var area3 = d3.select('#area3').node();
    var area4 = d3.select('#area4').node();
    var area5 = d3.select('#area5').node();
    
    //data
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    let ene=[];
    let feb=[];
    let mar=[];
    let abr=[];
    let may=[];
    let jun=[];
    let jul=[];
    let ago=[];
    let set=[];
    let oct=[];
    let nov=[];
    let dic=[];
    let dataMonth=[];
    let dataYear=[];
    for(let i=0;i<months.length;i++){
      let total1=0;
      let total2=0;
      let total3=0;
      let total4=0;
      let total5=0;
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total1++;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total2++;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total3++;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total4++;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total5++;
          }
        }
      }
      if(iucr1.value!="none"){
        dataMonth.push(total1);
      }
      if(iucr2.value!="none"){
        dataMonth.push(total2);
      }
      if(iucr3.value!="none"){
        dataMonth.push(total3);
      }
      if(iucr4.value!="none"){
        dataMonth.push(total4);
      }
      if(iucr5.value!="none"){
        dataMonth.push(total5);
      }
      dataYear.push(dataMonth);
      dataMonth = [];
      //console.log(months[i]);            
    }    

    //Legend Crimes selected    
    let crimesSelected=[]
    if(iucr1.value!="none"){
      crimesSelected.push(iucr1.options[iucr1.selectedIndex].text);      
    }
    if(iucr2.value!="none"){
      crimesSelected.push(iucr2.options[iucr2.selectedIndex].text);
    }
    if(iucr3.value!="none"){
      crimesSelected.push(iucr3.options[iucr3.selectedIndex].text);
    }
    if(iucr4.value!="none"){
      crimesSelected.push(iucr4.options[iucr4.selectedIndex].text);
    }
    if(iucr5.value!="none"){
      crimesSelected.push(iucr5.options[iucr5.selectedIndex].text);
    }

    let title="";
    if(area1.value!="none"){      
      title=title+area1.options[area1.selectedIndex].text;
    }
    if(area2.value!="none"){
      title=title+", "
      title=title+area2.options[area2.selectedIndex].text;
    }
    if(area3.value!="none"){
      title=title+", "
      title=title+area3.options[area3.selectedIndex].text;
    }
    if(area4.value!="none"){
      title=title+", "
      title=title+area4.options[area4.selectedIndex].text;
    }
    if(area5.value!="none"){
      title=title+", "
      title=title+area5.options[area5.selectedIndex].text;
    }

    var data = [{
      x: crimesSelected,
      y: ["ene","feb","mar","abr","may","jun","jul","ago","set","oct","nov","dic"],
      z: dataYear,
      type: 'surface',
   }];
    var layout = {
      title: title,
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
    Plotly.newPlot('chart3d1', data, layout);    
  }
  if (buttonId =="d3chartT2"){
    //Input
    var iucr1 = d3.select("#iucr1").node();
    var iucr2 = d3.select("#iucr2").node();
    var iucr3 = d3.select("#iucr3").node();
    var iucr4 = d3.select("#iucr4").node();
    var iucr5 = d3.select("#iucr5").node();
    
    var area1 = d3.select('#area1').node();
    var area2 = d3.select('#area2').node();
    var area3 = d3.select('#area3').node();
    var area4 = d3.select('#area4').node();
    var area5 = d3.select('#area5').node();
    
    //data
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    let ene=[];
    let feb=[];
    let mar=[];
    let abr=[];
    let may=[];
    let jun=[];
    let jul=[];
    let ago=[];
    let set=[];
    let oct=[];
    let nov=[];
    let dic=[];
    let dataMonth=[];
    let dataYear=[];
    for(let i=0;i<months.length;i++){
      let total1=0;
      let total2=0;
      let total3=0;
      let total4=0;
      let total5=0;
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total1++;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total2++;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total3++;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total4++;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          if(area1.value==dataCrimes[j].CommunityArea || area2.value==dataCrimes[j].CommunityArea || area3.value==dataCrimes[j].CommunityArea || area4.value==dataCrimes[j].CommunityArea || area5.value==dataCrimes[j].CommunityArea || area1.value=='all'|| area2.value=='all'|| area3.value=='all'|| area4.value=='all'|| area5.value=='all'){
            total5++;
          }
        }
      }
      if(iucr1.value!="none"){
        dataMonth.push(total1);
      }
      if(iucr2.value!="none"){
        dataMonth.push(total2);
      }
      if(iucr3.value!="none"){
        dataMonth.push(total3);
      }
      if(iucr4.value!="none"){
        dataMonth.push(total4);
      }
      if(iucr5.value!="none"){
        dataMonth.push(total5);
      }
      dataYear.push(dataMonth);
      dataMonth = [];
      //console.log(months[i]);            
    }    

    //Legend Crimes selected    
    let crimesSelected=[]
    if(iucr1.value!="none"){
      crimesSelected.push(iucr1.options[iucr1.selectedIndex].text);      
    }
    if(iucr2.value!="none"){
      crimesSelected.push(iucr2.options[iucr2.selectedIndex].text);
    }
    if(iucr3.value!="none"){
      crimesSelected.push(iucr3.options[iucr3.selectedIndex].text);
    }
    if(iucr4.value!="none"){
      crimesSelected.push(iucr4.options[iucr4.selectedIndex].text);
    }
    if(iucr5.value!="none"){
      crimesSelected.push(iucr5.options[iucr5.selectedIndex].text);
    }

    let title="";
    if(area1.value!="none"){      
      title=title+area1.options[area1.selectedIndex].text;
    }
    if(area2.value!="none"){
      title=title+", "
      title=title+area2.options[area2.selectedIndex].text;
    }
    if(area3.value!="none"){
      title=title+", "
      title=title+area3.options[area3.selectedIndex].text;
    }
    if(area4.value!="none"){
      title=title+", "
      title=title+area4.options[area4.selectedIndex].text;
    }
    if(area5.value!="none"){
      title=title+", "
      title=title+area5.options[area5.selectedIndex].text;
    }

    var data = [{
      x: crimesSelected,
      y: ["ene","feb","mar","abr","may","jun","jul","ago","set","oct","nov","dic"],
      z: dataYear,
      type: 'surface',
   }];
    var layout = {
      title: title,
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
    Plotly.newPlot('chart3d2', data, layout);    
  }
});
