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
  //GRAFICO POR AREAS 1**********************************************************************************************
  if (buttonId =="d3chartE1"){
    
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

    if(area1.value=='all'||area2.value=='all'||area3.value=='all'||area4.value=='all'||area5.value=='all'){
    
    //data
    let areas=["Rogers Park",
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
    
    let countAreasT1= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT2= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT3= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT4= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT5= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    
    let dataTotal=[];
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    for(let i=0;i<months.length;i++){      
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT1[0]++;break;
            case 2:countAreasT1[1]++;break;
            case 3:countAreasT1[2]++;break;
            case 4:countAreasT1[3]++;break;
            case 5:countAreasT1[4]++;break;
            case 6:countAreasT1[5]++;break;
            case 7:countAreasT1[6]++;break;
            case 8:countAreasT1[7]++;break;
            case 9:countAreasT1[8]++;break;
            case 10:countAreasT1[9]++;break;
            case 11:countAreasT1[10]++;break;
            case 12:countAreasT1[11]++;break;
            case 13:countAreasT1[12]++;break;
            case 14:countAreasT1[13]++;break;
            case 15:countAreasT1[14]++;break;
            case 16:countAreasT1[15]++;break;
            case 17:countAreasT1[16]++;break;
            case 18:countAreasT1[17]++;break;
            case 19:countAreasT1[18]++;break;
            case 20:countAreasT1[19]++;break;
            case 21:countAreasT1[20]++;break;
            case 22:countAreasT1[21]++;break;
            case 23:countAreasT1[22]++;break;
            case 24:countAreasT1[23]++;break;
            case 25:countAreasT1[24]++;break;
            case 26:countAreasT1[25]++;break;
            case 27:countAreasT1[26]++;break;
            case 28:countAreasT1[27]++;break;
            case 29:countAreasT1[28]++;break;
            case 30:countAreasT1[29]++;break;
            case 31:countAreasT1[30]++;break;
            case 32:countAreasT1[31]++;break;
            case 33:countAreasT1[32]++;break;
            case 34:countAreasT1[33]++;break;
            case 35:countAreasT1[34]++;break;
            case 36:countAreasT1[35]++;break;
            case 37:countAreasT1[36]++;break;
            case 38:countAreasT1[37]++;break;
            case 39:countAreasT1[38]++;break;
            case 40:countAreasT1[39]++;break;
            case 41:countAreasT1[40]++;break;
            case 42:countAreasT1[41]++;break;
            case 43:countAreasT1[42]++;break;
            case 44:countAreasT1[43]++;break;
            case 45:countAreasT1[44]++;break;
            case 46:countAreasT1[45]++;break;
            case 47:countAreasT1[46]++;break;
            case 48:countAreasT1[47]++;break;
            case 49:countAreasT1[48]++;break;
            case 50:countAreasT1[49]++;break;
            case 51:countAreasT1[50]++;break;
            case 52:countAreasT1[51]++;break;
            case 53:countAreasT1[52]++;break;
            case 54:countAreasT1[53]++;break;
            case 55:countAreasT1[54]++;break;
            case 56:countAreasT1[55]++;break;
            case 57:countAreasT1[56]++;break;
            case 58:countAreasT1[57]++;break;
            case 59:countAreasT1[58]++;break;
            case 60:countAreasT1[59]++;break;
            case 61:countAreasT1[60]++;break;
            case 62:countAreasT1[61]++;break;
            case 63:countAreasT1[62]++;break;
            case 64:countAreasT1[63]++;break;
            case 65:countAreasT1[64]++;break;
            case 66:countAreasT1[65]++;break;
            case 67:countAreasT1[66]++;break;
            case 68:countAreasT1[67]++;break;
            case 69:countAreasT1[68]++;break;
            case 70:countAreasT1[69]++;break;
            case 71:countAreasT1[70]++;break;
            case 72:countAreasT1[71]++;break;
            case 73:countAreasT1[72]++;break;
            case 74:countAreasT1[73]++;break;
            case 75:countAreasT1[74]++;break;
            case 76:countAreasT1[75]++;break;
            case 77:countAreasT1[76]++;break;
            default:
              break;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT2[0]++;break;
            case 2:countAreasT2[1]++;break;
            case 3:countAreasT2[2]++;break;
            case 4:countAreasT2[3]++;break;
            case 5:countAreasT2[4]++;break;
            case 6:countAreasT2[5]++;break;
            case 7:countAreasT2[6]++;break;
            case 8:countAreasT2[7]++;break;
            case 9:countAreasT2[8]++;break;
            case 10:countAreasT2[9]++;break;
            case 11:countAreasT2[10]++;break;
            case 12:countAreasT2[11]++;break;
            case 13:countAreasT2[12]++;break;
            case 14:countAreasT2[13]++;break;
            case 15:countAreasT2[14]++;break;
            case 16:countAreasT2[15]++;break;
            case 17:countAreasT2[16]++;break;
            case 18:countAreasT2[17]++;break;
            case 19:countAreasT2[18]++;break;
            case 20:countAreasT2[19]++;break;
            case 21:countAreasT2[20]++;break;
            case 22:countAreasT2[21]++;break;
            case 23:countAreasT2[22]++;break;
            case 24:countAreasT2[23]++;break;
            case 25:countAreasT2[24]++;break;
            case 26:countAreasT2[25]++;break;
            case 27:countAreasT2[26]++;break;
            case 28:countAreasT2[27]++;break;
            case 29:countAreasT2[28]++;break;
            case 30:countAreasT2[29]++;break;
            case 31:countAreasT2[30]++;break;
            case 32:countAreasT2[31]++;break;
            case 33:countAreasT2[32]++;break;
            case 34:countAreasT2[33]++;break;
            case 35:countAreasT2[34]++;break;
            case 36:countAreasT2[35]++;break;
            case 37:countAreasT2[36]++;break;
            case 38:countAreasT2[37]++;break;
            case 39:countAreasT2[38]++;break;
            case 40:countAreasT2[39]++;break;
            case 41:countAreasT2[40]++;break;
            case 42:countAreasT2[41]++;break;
            case 43:countAreasT2[42]++;break;
            case 44:countAreasT2[43]++;break;
            case 45:countAreasT2[44]++;break;
            case 46:countAreasT2[45]++;break;
            case 47:countAreasT2[46]++;break;
            case 48:countAreasT2[47]++;break;
            case 49:countAreasT2[48]++;break;
            case 50:countAreasT2[49]++;break;
            case 51:countAreasT2[50]++;break;
            case 52:countAreasT2[51]++;break;
            case 53:countAreasT2[52]++;break;
            case 54:countAreasT2[53]++;break;
            case 55:countAreasT2[54]++;break;
            case 56:countAreasT2[55]++;break;
            case 57:countAreasT2[56]++;break;
            case 58:countAreasT2[57]++;break;
            case 59:countAreasT2[58]++;break;
            case 60:countAreasT2[59]++;break;
            case 61:countAreasT2[60]++;break;
            case 62:countAreasT2[61]++;break;
            case 63:countAreasT2[62]++;break;
            case 64:countAreasT2[63]++;break;
            case 65:countAreasT2[64]++;break;
            case 66:countAreasT2[65]++;break;
            case 67:countAreasT2[66]++;break;
            case 68:countAreasT2[67]++;break;
            case 69:countAreasT2[68]++;break;
            case 70:countAreasT2[69]++;break;
            case 71:countAreasT2[70]++;break;
            case 72:countAreasT2[71]++;break;
            case 73:countAreasT2[72]++;break;
            case 74:countAreasT2[73]++;break;
            case 75:countAreasT2[74]++;break;
            case 76:countAreasT2[75]++;break;
            case 77:countAreasT2[76]++;break;
            default:
              break;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT3[0]++;break;
            case 2:countAreasT3[1]++;break;
            case 3:countAreasT3[2]++;break;
            case 4:countAreasT3[3]++;break;
            case 5:countAreasT3[4]++;break;
            case 6:countAreasT3[5]++;break;
            case 7:countAreasT3[6]++;break;
            case 8:countAreasT3[7]++;break;
            case 9:countAreasT3[8]++;break;
            case 10:countAreasT3[9]++;break;
            case 11:countAreasT3[10]++;break;
            case 12:countAreasT3[11]++;break;
            case 13:countAreasT3[12]++;break;
            case 14:countAreasT3[13]++;break;
            case 15:countAreasT3[14]++;break;
            case 16:countAreasT3[15]++;break;
            case 17:countAreasT3[16]++;break;
            case 18:countAreasT3[17]++;break;
            case 19:countAreasT3[18]++;break;
            case 20:countAreasT3[19]++;break;
            case 21:countAreasT3[20]++;break;
            case 22:countAreasT3[21]++;break;
            case 23:countAreasT3[22]++;break;
            case 24:countAreasT3[23]++;break;
            case 25:countAreasT3[24]++;break;
            case 26:countAreasT3[25]++;break;
            case 27:countAreasT3[26]++;break;
            case 28:countAreasT3[27]++;break;
            case 29:countAreasT3[28]++;break;
            case 30:countAreasT3[29]++;break;
            case 31:countAreasT3[30]++;break;
            case 32:countAreasT3[31]++;break;
            case 33:countAreasT3[32]++;break;
            case 34:countAreasT3[33]++;break;
            case 35:countAreasT3[34]++;break;
            case 36:countAreasT3[35]++;break;
            case 37:countAreasT3[36]++;break;
            case 38:countAreasT3[37]++;break;
            case 39:countAreasT3[38]++;break;
            case 40:countAreasT3[39]++;break;
            case 41:countAreasT3[40]++;break;
            case 42:countAreasT3[41]++;break;
            case 43:countAreasT3[42]++;break;
            case 44:countAreasT3[43]++;break;
            case 45:countAreasT3[44]++;break;
            case 46:countAreasT3[45]++;break;
            case 47:countAreasT3[46]++;break;
            case 48:countAreasT3[47]++;break;
            case 49:countAreasT3[48]++;break;
            case 50:countAreasT3[49]++;break;
            case 51:countAreasT3[50]++;break;
            case 52:countAreasT3[51]++;break;
            case 53:countAreasT3[52]++;break;
            case 54:countAreasT3[53]++;break;
            case 55:countAreasT3[54]++;break;
            case 56:countAreasT3[55]++;break;
            case 57:countAreasT3[56]++;break;
            case 58:countAreasT3[57]++;break;
            case 59:countAreasT3[58]++;break;
            case 60:countAreasT3[59]++;break;
            case 61:countAreasT3[60]++;break;
            case 62:countAreasT3[61]++;break;
            case 63:countAreasT3[62]++;break;
            case 64:countAreasT3[63]++;break;
            case 65:countAreasT3[64]++;break;
            case 66:countAreasT3[65]++;break;
            case 67:countAreasT3[66]++;break;
            case 68:countAreasT3[67]++;break;
            case 69:countAreasT3[68]++;break;
            case 70:countAreasT3[69]++;break;
            case 71:countAreasT3[70]++;break;
            case 72:countAreasT3[71]++;break;
            case 73:countAreasT3[72]++;break;
            case 74:countAreasT3[73]++;break;
            case 75:countAreasT3[74]++;break;
            case 76:countAreasT3[75]++;break;
            case 77:countAreasT3[76]++;break;
            default:
              break;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT4[0]++;break;
            case 2:countAreasT4[1]++;break;
            case 3:countAreasT4[2]++;break;
            case 4:countAreasT4[3]++;break;
            case 5:countAreasT4[4]++;break;
            case 6:countAreasT4[5]++;break;
            case 7:countAreasT4[6]++;break;
            case 8:countAreasT4[7]++;break;
            case 9:countAreasT4[8]++;break;
            case 10:countAreasT4[9]++;break;
            case 11:countAreasT4[10]++;break;
            case 12:countAreasT4[11]++;break;
            case 13:countAreasT4[12]++;break;
            case 14:countAreasT4[13]++;break;
            case 15:countAreasT4[14]++;break;
            case 16:countAreasT4[15]++;break;
            case 17:countAreasT4[16]++;break;
            case 18:countAreasT4[17]++;break;
            case 19:countAreasT4[18]++;break;
            case 20:countAreasT4[19]++;break;
            case 21:countAreasT4[20]++;break;
            case 22:countAreasT4[21]++;break;
            case 23:countAreasT4[22]++;break;
            case 24:countAreasT4[23]++;break;
            case 25:countAreasT4[24]++;break;
            case 26:countAreasT4[25]++;break;
            case 27:countAreasT4[26]++;break;
            case 28:countAreasT4[27]++;break;
            case 29:countAreasT4[28]++;break;
            case 30:countAreasT4[29]++;break;
            case 31:countAreasT4[30]++;break;
            case 32:countAreasT4[31]++;break;
            case 33:countAreasT4[32]++;break;
            case 34:countAreasT4[33]++;break;
            case 35:countAreasT4[34]++;break;
            case 36:countAreasT4[35]++;break;
            case 37:countAreasT4[36]++;break;
            case 38:countAreasT4[37]++;break;
            case 39:countAreasT4[38]++;break;
            case 40:countAreasT4[39]++;break;
            case 41:countAreasT4[40]++;break;
            case 42:countAreasT4[41]++;break;
            case 43:countAreasT4[42]++;break;
            case 44:countAreasT4[43]++;break;
            case 45:countAreasT4[44]++;break;
            case 46:countAreasT4[45]++;break;
            case 47:countAreasT4[46]++;break;
            case 48:countAreasT4[47]++;break;
            case 49:countAreasT4[48]++;break;
            case 50:countAreasT4[49]++;break;
            case 51:countAreasT4[50]++;break;
            case 52:countAreasT4[51]++;break;
            case 53:countAreasT4[52]++;break;
            case 54:countAreasT4[53]++;break;
            case 55:countAreasT4[54]++;break;
            case 56:countAreasT4[55]++;break;
            case 57:countAreasT4[56]++;break;
            case 58:countAreasT4[57]++;break;
            case 59:countAreasT4[58]++;break;
            case 60:countAreasT4[59]++;break;
            case 61:countAreasT4[60]++;break;
            case 62:countAreasT4[61]++;break;
            case 63:countAreasT4[62]++;break;
            case 64:countAreasT4[63]++;break;
            case 65:countAreasT4[64]++;break;
            case 66:countAreasT4[65]++;break;
            case 67:countAreasT4[66]++;break;
            case 68:countAreasT4[67]++;break;
            case 69:countAreasT4[68]++;break;
            case 70:countAreasT4[69]++;break;
            case 71:countAreasT4[70]++;break;
            case 72:countAreasT4[71]++;break;
            case 73:countAreasT4[72]++;break;
            case 74:countAreasT4[73]++;break;
            case 75:countAreasT4[74]++;break;
            case 76:countAreasT4[75]++;break;
            case 77:countAreasT4[76]++;break;
            default:
              break;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT5[0]++;break;
            case 2:countAreasT5[1]++;break;
            case 3:countAreasT5[2]++;break;
            case 4:countAreasT5[3]++;break;
            case 5:countAreasT5[4]++;break;
            case 6:countAreasT5[5]++;break;
            case 7:countAreasT5[6]++;break;
            case 8:countAreasT5[7]++;break;
            case 9:countAreasT5[8]++;break;
            case 10:countAreasT5[9]++;break;
            case 11:countAreasT5[10]++;break;
            case 12:countAreasT5[11]++;break;
            case 13:countAreasT5[12]++;break;
            case 14:countAreasT5[13]++;break;
            case 15:countAreasT5[14]++;break;
            case 16:countAreasT5[15]++;break;
            case 17:countAreasT5[16]++;break;
            case 18:countAreasT5[17]++;break;
            case 19:countAreasT5[18]++;break;
            case 20:countAreasT5[19]++;break;
            case 21:countAreasT5[20]++;break;
            case 22:countAreasT5[21]++;break;
            case 23:countAreasT5[22]++;break;
            case 24:countAreasT5[23]++;break;
            case 25:countAreasT5[24]++;break;
            case 26:countAreasT5[25]++;break;
            case 27:countAreasT5[26]++;break;
            case 28:countAreasT5[27]++;break;
            case 29:countAreasT5[28]++;break;
            case 30:countAreasT5[29]++;break;
            case 31:countAreasT5[30]++;break;
            case 32:countAreasT5[31]++;break;
            case 33:countAreasT5[32]++;break;
            case 34:countAreasT5[33]++;break;
            case 35:countAreasT5[34]++;break;
            case 36:countAreasT5[35]++;break;
            case 37:countAreasT5[36]++;break;
            case 38:countAreasT5[37]++;break;
            case 39:countAreasT5[38]++;break;
            case 40:countAreasT5[39]++;break;
            case 41:countAreasT5[40]++;break;
            case 42:countAreasT5[41]++;break;
            case 43:countAreasT5[42]++;break;
            case 44:countAreasT5[43]++;break;
            case 45:countAreasT5[44]++;break;
            case 46:countAreasT5[45]++;break;
            case 47:countAreasT5[46]++;break;
            case 48:countAreasT5[47]++;break;
            case 49:countAreasT5[48]++;break;
            case 50:countAreasT5[49]++;break;
            case 51:countAreasT5[50]++;break;
            case 52:countAreasT5[51]++;break;
            case 53:countAreasT5[52]++;break;
            case 54:countAreasT5[53]++;break;
            case 55:countAreasT5[54]++;break;
            case 56:countAreasT5[55]++;break;
            case 57:countAreasT5[56]++;break;
            case 58:countAreasT5[57]++;break;
            case 59:countAreasT5[58]++;break;
            case 60:countAreasT5[59]++;break;
            case 61:countAreasT5[60]++;break;
            case 62:countAreasT5[61]++;break;
            case 63:countAreasT5[62]++;break;
            case 64:countAreasT5[63]++;break;
            case 65:countAreasT5[64]++;break;
            case 66:countAreasT5[65]++;break;
            case 67:countAreasT5[66]++;break;
            case 68:countAreasT5[67]++;break;
            case 69:countAreasT5[68]++;break;
            case 70:countAreasT5[69]++;break;
            case 71:countAreasT5[70]++;break;
            case 72:countAreasT5[71]++;break;
            case 73:countAreasT5[72]++;break;
            case 74:countAreasT5[73]++;break;
            case 75:countAreasT5[74]++;break;
            case 76:countAreasT5[75]++;break;
            case 77:countAreasT5[76]++;break;
            default:
              break;
          }
        }
      }          
    }
    if(iucr1.value!="none"){
      dataTotal.push(countAreasT1);
    }
    if(iucr2.value!="none"){
      dataTotal.push(countAreasT2);
    }
    if(iucr3.value!="none"){
      dataTotal.push(countAreasT3);
    }
    if(iucr4.value!="none"){
      dataTotal.push(countAreasT4);
    }
    if(iucr5.value!="none"){
      dataTotal.push(countAreasT5);
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

    console.log(dataTotal);

    var data = [{
      x: areas,
      y: crimesSelected,
      z: dataTotal,
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
    Plotly.newPlot('chart3dE1', data, layout);
  //ELSE IF----------------------------------------------------------------------------------------------------------
  }else if(area1.value!='none'||area2.value!='none'||area3.value!='none'||area4.value!='none'||area5.value!='none'){
    //data
    let areas=["Rogers Park",
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
    
    let area1T1=0;
    let area1T2=0;
    let area1T3=0;
    let area1T4=0;
    let area1T5=0;

    let area2T1=0;
    let area2T2=0;
    let area2T3=0;
    let area2T4=0;
    let area2T5=0;

    let area3T1=0;
    let area3T2=0;
    let area3T3=0;
    let area3T4=0;
    let area3T5=0;

    let area4T1=0;
    let area4T2=0;
    let area4T3=0;
    let area4T4=0;
    let area4T5=0;

    let area5T1=0;
    let area5T2=0;
    let area5T3=0;
    let area5T4=0;
    let area5T5=0;
    
    let dataTotal=[];
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    for(let i=0;i<months.length;i++){      
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T1++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T1++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T1++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T1++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T1++;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T2++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T2++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T2++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T2++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T2++;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T3++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T3++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T3++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T3++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T3++;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T4++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T4++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T4++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T4++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T4++;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T5++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T5++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T5++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T5++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T5++;
          }
        }
      }          
    }
    if(iucr1.value!="none"){
      let data1=[]
      if(area1.value!='none'){
        data1.push(area1T1);
      }
      if(area2.value!='none'){
        data1.push(area2T1);
      }
      if(area3.value!='none'){
        data1.push(area3T1);
      }
      if(area4.value!='none'){
        data1.push(area4T1);
      }
      if(area5.value!='none'){
        data1.push(area5T1);
      }
      dataTotal.push(data1);
    }
    if(iucr2.value!="none"){
      let data2=[]
      if(area1.value!='none'){
        data2.push(area1T2);
      }
      if(area2.value!='none'){
        data2.push(area2T2);
      }
      if(area3.value!='none'){
        data2.push(area3T2);
      }
      if(area4.value!='none'){
        data2.push(area4T2);
      }
      if(area5.value!='none'){
        data2.push(area5T2);
      }
      dataTotal.push(data2);
    }
    if(iucr3.value!="none"){
      let data3=[]
      if(area1.value!='none'){
        data3.push(area1T3);
      }
      if(area2.value!='none'){
        data3.push(area2T3);
      }
      if(area3.value!='none'){
        data3.push(area3T3);
      }
      if(area4.value!='none'){
        data3.push(area4T3);
      }
      if(area5.value!='none'){
        data3.push(area5T3);
      }
      dataTotal.push(data3);
    }
    if(iucr4.value!="none"){
      let data4=[]
      if(area1.value!='none'){
        data4.push(area1T4);
      }
      if(area2.value!='none'){
        data4.push(area2T4);
      }
      if(area3.value!='none'){
        data4.push(area3T4);
      }
      if(area4.value!='none'){
        data4.push(area4T4);
      }
      if(area5.value!='none'){
        data4.push(area5T4);
      }
      dataTotal.push(data4);
    }
    if(iucr5.value!="none"){
      let data5=[]
      if(area1.value!='none'){
        data5.push(area1T5);
      }
      if(area2.value!='none'){
        data5.push(area2T5);
      }
      if(area3.value!='none'){
        data5.push(area3T5);
      }
      if(area4.value!='none'){
        data5.push(area4T5);
      }
      if(area5.value!='none'){
        data5.push(area5T5);
      }
      dataTotal.push(data5);      
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
    let namesAreasSelected=[]
    if(area1.value!="none"){      
      title=title+area1.options[area1.selectedIndex].text;
      namesAreasSelected.push(area1.options[area1.selectedIndex].text);
    }
    if(area2.value!="none"){
      title=title+", "
      title=title+area2.options[area2.selectedIndex].text;
      namesAreasSelected.push(area2.options[area2.selectedIndex].text);
    }
    if(area3.value!="none"){
      title=title+", "
      title=title+area3.options[area3.selectedIndex].text;
      namesAreasSelected.push(area3.options[area3.selectedIndex].text);
    }
    if(area4.value!="none"){
      title=title+", "
      title=title+area4.options[area4.selectedIndex].text;
      namesAreasSelected.push(area4.options[area4.selectedIndex].text);
    }
    if(area5.value!="none"){
      title=title+", "
      title=title+area5.options[area5.selectedIndex].text;
      namesAreasSelected.push(area5.options[area5.selectedIndex].text);
    }

    console.log(dataTotal);

    var data = [{
      x: namesAreasSelected,
      y: crimesSelected,
      z: dataTotal,
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
    Plotly.newPlot('chart3dE1', data, layout);
  }  
  }
  // Grafico por areas 2 ********************************************************************************************
  if (buttonId =="d3chartE2"){
      
    
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

    if(area1.value=='all'||area2.value=='all'||area3.value=='all'||area4.value=='all'||area5.value=='all'){
    
    //data
    let areas=["Rogers Park",
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
    
    let countAreasT1= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT2= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT3= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT4= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    let countAreasT5= Array.apply(null, Array(77)).map(Number.prototype.valueOf,0);
    
    let dataTotal=[];
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    for(let i=0;i<months.length;i++){      
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT1[0]++;break;
            case 2:countAreasT1[1]++;break;
            case 3:countAreasT1[2]++;break;
            case 4:countAreasT1[3]++;break;
            case 5:countAreasT1[4]++;break;
            case 6:countAreasT1[5]++;break;
            case 7:countAreasT1[6]++;break;
            case 8:countAreasT1[7]++;break;
            case 9:countAreasT1[8]++;break;
            case 10:countAreasT1[9]++;break;
            case 11:countAreasT1[10]++;break;
            case 12:countAreasT1[11]++;break;
            case 13:countAreasT1[12]++;break;
            case 14:countAreasT1[13]++;break;
            case 15:countAreasT1[14]++;break;
            case 16:countAreasT1[15]++;break;
            case 17:countAreasT1[16]++;break;
            case 18:countAreasT1[17]++;break;
            case 19:countAreasT1[18]++;break;
            case 20:countAreasT1[19]++;break;
            case 21:countAreasT1[20]++;break;
            case 22:countAreasT1[21]++;break;
            case 23:countAreasT1[22]++;break;
            case 24:countAreasT1[23]++;break;
            case 25:countAreasT1[24]++;break;
            case 26:countAreasT1[25]++;break;
            case 27:countAreasT1[26]++;break;
            case 28:countAreasT1[27]++;break;
            case 29:countAreasT1[28]++;break;
            case 30:countAreasT1[29]++;break;
            case 31:countAreasT1[30]++;break;
            case 32:countAreasT1[31]++;break;
            case 33:countAreasT1[32]++;break;
            case 34:countAreasT1[33]++;break;
            case 35:countAreasT1[34]++;break;
            case 36:countAreasT1[35]++;break;
            case 37:countAreasT1[36]++;break;
            case 38:countAreasT1[37]++;break;
            case 39:countAreasT1[38]++;break;
            case 40:countAreasT1[39]++;break;
            case 41:countAreasT1[40]++;break;
            case 42:countAreasT1[41]++;break;
            case 43:countAreasT1[42]++;break;
            case 44:countAreasT1[43]++;break;
            case 45:countAreasT1[44]++;break;
            case 46:countAreasT1[45]++;break;
            case 47:countAreasT1[46]++;break;
            case 48:countAreasT1[47]++;break;
            case 49:countAreasT1[48]++;break;
            case 50:countAreasT1[49]++;break;
            case 51:countAreasT1[50]++;break;
            case 52:countAreasT1[51]++;break;
            case 53:countAreasT1[52]++;break;
            case 54:countAreasT1[53]++;break;
            case 55:countAreasT1[54]++;break;
            case 56:countAreasT1[55]++;break;
            case 57:countAreasT1[56]++;break;
            case 58:countAreasT1[57]++;break;
            case 59:countAreasT1[58]++;break;
            case 60:countAreasT1[59]++;break;
            case 61:countAreasT1[60]++;break;
            case 62:countAreasT1[61]++;break;
            case 63:countAreasT1[62]++;break;
            case 64:countAreasT1[63]++;break;
            case 65:countAreasT1[64]++;break;
            case 66:countAreasT1[65]++;break;
            case 67:countAreasT1[66]++;break;
            case 68:countAreasT1[67]++;break;
            case 69:countAreasT1[68]++;break;
            case 70:countAreasT1[69]++;break;
            case 71:countAreasT1[70]++;break;
            case 72:countAreasT1[71]++;break;
            case 73:countAreasT1[72]++;break;
            case 74:countAreasT1[73]++;break;
            case 75:countAreasT1[74]++;break;
            case 76:countAreasT1[75]++;break;
            case 77:countAreasT1[76]++;break;
            default:
              break;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT2[0]++;break;
            case 2:countAreasT2[1]++;break;
            case 3:countAreasT2[2]++;break;
            case 4:countAreasT2[3]++;break;
            case 5:countAreasT2[4]++;break;
            case 6:countAreasT2[5]++;break;
            case 7:countAreasT2[6]++;break;
            case 8:countAreasT2[7]++;break;
            case 9:countAreasT2[8]++;break;
            case 10:countAreasT2[9]++;break;
            case 11:countAreasT2[10]++;break;
            case 12:countAreasT2[11]++;break;
            case 13:countAreasT2[12]++;break;
            case 14:countAreasT2[13]++;break;
            case 15:countAreasT2[14]++;break;
            case 16:countAreasT2[15]++;break;
            case 17:countAreasT2[16]++;break;
            case 18:countAreasT2[17]++;break;
            case 19:countAreasT2[18]++;break;
            case 20:countAreasT2[19]++;break;
            case 21:countAreasT2[20]++;break;
            case 22:countAreasT2[21]++;break;
            case 23:countAreasT2[22]++;break;
            case 24:countAreasT2[23]++;break;
            case 25:countAreasT2[24]++;break;
            case 26:countAreasT2[25]++;break;
            case 27:countAreasT2[26]++;break;
            case 28:countAreasT2[27]++;break;
            case 29:countAreasT2[28]++;break;
            case 30:countAreasT2[29]++;break;
            case 31:countAreasT2[30]++;break;
            case 32:countAreasT2[31]++;break;
            case 33:countAreasT2[32]++;break;
            case 34:countAreasT2[33]++;break;
            case 35:countAreasT2[34]++;break;
            case 36:countAreasT2[35]++;break;
            case 37:countAreasT2[36]++;break;
            case 38:countAreasT2[37]++;break;
            case 39:countAreasT2[38]++;break;
            case 40:countAreasT2[39]++;break;
            case 41:countAreasT2[40]++;break;
            case 42:countAreasT2[41]++;break;
            case 43:countAreasT2[42]++;break;
            case 44:countAreasT2[43]++;break;
            case 45:countAreasT2[44]++;break;
            case 46:countAreasT2[45]++;break;
            case 47:countAreasT2[46]++;break;
            case 48:countAreasT2[47]++;break;
            case 49:countAreasT2[48]++;break;
            case 50:countAreasT2[49]++;break;
            case 51:countAreasT2[50]++;break;
            case 52:countAreasT2[51]++;break;
            case 53:countAreasT2[52]++;break;
            case 54:countAreasT2[53]++;break;
            case 55:countAreasT2[54]++;break;
            case 56:countAreasT2[55]++;break;
            case 57:countAreasT2[56]++;break;
            case 58:countAreasT2[57]++;break;
            case 59:countAreasT2[58]++;break;
            case 60:countAreasT2[59]++;break;
            case 61:countAreasT2[60]++;break;
            case 62:countAreasT2[61]++;break;
            case 63:countAreasT2[62]++;break;
            case 64:countAreasT2[63]++;break;
            case 65:countAreasT2[64]++;break;
            case 66:countAreasT2[65]++;break;
            case 67:countAreasT2[66]++;break;
            case 68:countAreasT2[67]++;break;
            case 69:countAreasT2[68]++;break;
            case 70:countAreasT2[69]++;break;
            case 71:countAreasT2[70]++;break;
            case 72:countAreasT2[71]++;break;
            case 73:countAreasT2[72]++;break;
            case 74:countAreasT2[73]++;break;
            case 75:countAreasT2[74]++;break;
            case 76:countAreasT2[75]++;break;
            case 77:countAreasT2[76]++;break;
            default:
              break;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT3[0]++;break;
            case 2:countAreasT3[1]++;break;
            case 3:countAreasT3[2]++;break;
            case 4:countAreasT3[3]++;break;
            case 5:countAreasT3[4]++;break;
            case 6:countAreasT3[5]++;break;
            case 7:countAreasT3[6]++;break;
            case 8:countAreasT3[7]++;break;
            case 9:countAreasT3[8]++;break;
            case 10:countAreasT3[9]++;break;
            case 11:countAreasT3[10]++;break;
            case 12:countAreasT3[11]++;break;
            case 13:countAreasT3[12]++;break;
            case 14:countAreasT3[13]++;break;
            case 15:countAreasT3[14]++;break;
            case 16:countAreasT3[15]++;break;
            case 17:countAreasT3[16]++;break;
            case 18:countAreasT3[17]++;break;
            case 19:countAreasT3[18]++;break;
            case 20:countAreasT3[19]++;break;
            case 21:countAreasT3[20]++;break;
            case 22:countAreasT3[21]++;break;
            case 23:countAreasT3[22]++;break;
            case 24:countAreasT3[23]++;break;
            case 25:countAreasT3[24]++;break;
            case 26:countAreasT3[25]++;break;
            case 27:countAreasT3[26]++;break;
            case 28:countAreasT3[27]++;break;
            case 29:countAreasT3[28]++;break;
            case 30:countAreasT3[29]++;break;
            case 31:countAreasT3[30]++;break;
            case 32:countAreasT3[31]++;break;
            case 33:countAreasT3[32]++;break;
            case 34:countAreasT3[33]++;break;
            case 35:countAreasT3[34]++;break;
            case 36:countAreasT3[35]++;break;
            case 37:countAreasT3[36]++;break;
            case 38:countAreasT3[37]++;break;
            case 39:countAreasT3[38]++;break;
            case 40:countAreasT3[39]++;break;
            case 41:countAreasT3[40]++;break;
            case 42:countAreasT3[41]++;break;
            case 43:countAreasT3[42]++;break;
            case 44:countAreasT3[43]++;break;
            case 45:countAreasT3[44]++;break;
            case 46:countAreasT3[45]++;break;
            case 47:countAreasT3[46]++;break;
            case 48:countAreasT3[47]++;break;
            case 49:countAreasT3[48]++;break;
            case 50:countAreasT3[49]++;break;
            case 51:countAreasT3[50]++;break;
            case 52:countAreasT3[51]++;break;
            case 53:countAreasT3[52]++;break;
            case 54:countAreasT3[53]++;break;
            case 55:countAreasT3[54]++;break;
            case 56:countAreasT3[55]++;break;
            case 57:countAreasT3[56]++;break;
            case 58:countAreasT3[57]++;break;
            case 59:countAreasT3[58]++;break;
            case 60:countAreasT3[59]++;break;
            case 61:countAreasT3[60]++;break;
            case 62:countAreasT3[61]++;break;
            case 63:countAreasT3[62]++;break;
            case 64:countAreasT3[63]++;break;
            case 65:countAreasT3[64]++;break;
            case 66:countAreasT3[65]++;break;
            case 67:countAreasT3[66]++;break;
            case 68:countAreasT3[67]++;break;
            case 69:countAreasT3[68]++;break;
            case 70:countAreasT3[69]++;break;
            case 71:countAreasT3[70]++;break;
            case 72:countAreasT3[71]++;break;
            case 73:countAreasT3[72]++;break;
            case 74:countAreasT3[73]++;break;
            case 75:countAreasT3[74]++;break;
            case 76:countAreasT3[75]++;break;
            case 77:countAreasT3[76]++;break;
            default:
              break;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT4[0]++;break;
            case 2:countAreasT4[1]++;break;
            case 3:countAreasT4[2]++;break;
            case 4:countAreasT4[3]++;break;
            case 5:countAreasT4[4]++;break;
            case 6:countAreasT4[5]++;break;
            case 7:countAreasT4[6]++;break;
            case 8:countAreasT4[7]++;break;
            case 9:countAreasT4[8]++;break;
            case 10:countAreasT4[9]++;break;
            case 11:countAreasT4[10]++;break;
            case 12:countAreasT4[11]++;break;
            case 13:countAreasT4[12]++;break;
            case 14:countAreasT4[13]++;break;
            case 15:countAreasT4[14]++;break;
            case 16:countAreasT4[15]++;break;
            case 17:countAreasT4[16]++;break;
            case 18:countAreasT4[17]++;break;
            case 19:countAreasT4[18]++;break;
            case 20:countAreasT4[19]++;break;
            case 21:countAreasT4[20]++;break;
            case 22:countAreasT4[21]++;break;
            case 23:countAreasT4[22]++;break;
            case 24:countAreasT4[23]++;break;
            case 25:countAreasT4[24]++;break;
            case 26:countAreasT4[25]++;break;
            case 27:countAreasT4[26]++;break;
            case 28:countAreasT4[27]++;break;
            case 29:countAreasT4[28]++;break;
            case 30:countAreasT4[29]++;break;
            case 31:countAreasT4[30]++;break;
            case 32:countAreasT4[31]++;break;
            case 33:countAreasT4[32]++;break;
            case 34:countAreasT4[33]++;break;
            case 35:countAreasT4[34]++;break;
            case 36:countAreasT4[35]++;break;
            case 37:countAreasT4[36]++;break;
            case 38:countAreasT4[37]++;break;
            case 39:countAreasT4[38]++;break;
            case 40:countAreasT4[39]++;break;
            case 41:countAreasT4[40]++;break;
            case 42:countAreasT4[41]++;break;
            case 43:countAreasT4[42]++;break;
            case 44:countAreasT4[43]++;break;
            case 45:countAreasT4[44]++;break;
            case 46:countAreasT4[45]++;break;
            case 47:countAreasT4[46]++;break;
            case 48:countAreasT4[47]++;break;
            case 49:countAreasT4[48]++;break;
            case 50:countAreasT4[49]++;break;
            case 51:countAreasT4[50]++;break;
            case 52:countAreasT4[51]++;break;
            case 53:countAreasT4[52]++;break;
            case 54:countAreasT4[53]++;break;
            case 55:countAreasT4[54]++;break;
            case 56:countAreasT4[55]++;break;
            case 57:countAreasT4[56]++;break;
            case 58:countAreasT4[57]++;break;
            case 59:countAreasT4[58]++;break;
            case 60:countAreasT4[59]++;break;
            case 61:countAreasT4[60]++;break;
            case 62:countAreasT4[61]++;break;
            case 63:countAreasT4[62]++;break;
            case 64:countAreasT4[63]++;break;
            case 65:countAreasT4[64]++;break;
            case 66:countAreasT4[65]++;break;
            case 67:countAreasT4[66]++;break;
            case 68:countAreasT4[67]++;break;
            case 69:countAreasT4[68]++;break;
            case 70:countAreasT4[69]++;break;
            case 71:countAreasT4[70]++;break;
            case 72:countAreasT4[71]++;break;
            case 73:countAreasT4[72]++;break;
            case 74:countAreasT4[73]++;break;
            case 75:countAreasT4[74]++;break;
            case 76:countAreasT4[75]++;break;
            case 77:countAreasT4[76]++;break;
            default:
              break;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          switch (parseInt(dataCrimes[j].CommunityArea)) {
            case 1:countAreasT5[0]++;break;
            case 2:countAreasT5[1]++;break;
            case 3:countAreasT5[2]++;break;
            case 4:countAreasT5[3]++;break;
            case 5:countAreasT5[4]++;break;
            case 6:countAreasT5[5]++;break;
            case 7:countAreasT5[6]++;break;
            case 8:countAreasT5[7]++;break;
            case 9:countAreasT5[8]++;break;
            case 10:countAreasT5[9]++;break;
            case 11:countAreasT5[10]++;break;
            case 12:countAreasT5[11]++;break;
            case 13:countAreasT5[12]++;break;
            case 14:countAreasT5[13]++;break;
            case 15:countAreasT5[14]++;break;
            case 16:countAreasT5[15]++;break;
            case 17:countAreasT5[16]++;break;
            case 18:countAreasT5[17]++;break;
            case 19:countAreasT5[18]++;break;
            case 20:countAreasT5[19]++;break;
            case 21:countAreasT5[20]++;break;
            case 22:countAreasT5[21]++;break;
            case 23:countAreasT5[22]++;break;
            case 24:countAreasT5[23]++;break;
            case 25:countAreasT5[24]++;break;
            case 26:countAreasT5[25]++;break;
            case 27:countAreasT5[26]++;break;
            case 28:countAreasT5[27]++;break;
            case 29:countAreasT5[28]++;break;
            case 30:countAreasT5[29]++;break;
            case 31:countAreasT5[30]++;break;
            case 32:countAreasT5[31]++;break;
            case 33:countAreasT5[32]++;break;
            case 34:countAreasT5[33]++;break;
            case 35:countAreasT5[34]++;break;
            case 36:countAreasT5[35]++;break;
            case 37:countAreasT5[36]++;break;
            case 38:countAreasT5[37]++;break;
            case 39:countAreasT5[38]++;break;
            case 40:countAreasT5[39]++;break;
            case 41:countAreasT5[40]++;break;
            case 42:countAreasT5[41]++;break;
            case 43:countAreasT5[42]++;break;
            case 44:countAreasT5[43]++;break;
            case 45:countAreasT5[44]++;break;
            case 46:countAreasT5[45]++;break;
            case 47:countAreasT5[46]++;break;
            case 48:countAreasT5[47]++;break;
            case 49:countAreasT5[48]++;break;
            case 50:countAreasT5[49]++;break;
            case 51:countAreasT5[50]++;break;
            case 52:countAreasT5[51]++;break;
            case 53:countAreasT5[52]++;break;
            case 54:countAreasT5[53]++;break;
            case 55:countAreasT5[54]++;break;
            case 56:countAreasT5[55]++;break;
            case 57:countAreasT5[56]++;break;
            case 58:countAreasT5[57]++;break;
            case 59:countAreasT5[58]++;break;
            case 60:countAreasT5[59]++;break;
            case 61:countAreasT5[60]++;break;
            case 62:countAreasT5[61]++;break;
            case 63:countAreasT5[62]++;break;
            case 64:countAreasT5[63]++;break;
            case 65:countAreasT5[64]++;break;
            case 66:countAreasT5[65]++;break;
            case 67:countAreasT5[66]++;break;
            case 68:countAreasT5[67]++;break;
            case 69:countAreasT5[68]++;break;
            case 70:countAreasT5[69]++;break;
            case 71:countAreasT5[70]++;break;
            case 72:countAreasT5[71]++;break;
            case 73:countAreasT5[72]++;break;
            case 74:countAreasT5[73]++;break;
            case 75:countAreasT5[74]++;break;
            case 76:countAreasT5[75]++;break;
            case 77:countAreasT5[76]++;break;
            default:
              break;
          }
        }
      }          
    }
    if(iucr1.value!="none"){
      dataTotal.push(countAreasT1);
    }
    if(iucr2.value!="none"){
      dataTotal.push(countAreasT2);
    }
    if(iucr3.value!="none"){
      dataTotal.push(countAreasT3);
    }
    if(iucr4.value!="none"){
      dataTotal.push(countAreasT4);
    }
    if(iucr5.value!="none"){
      dataTotal.push(countAreasT5);
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

    console.log(dataTotal);

    var data = [{
      x: areas,
      y: crimesSelected,
      z: dataTotal,
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
    Plotly.newPlot('chart3dE1', data, layout);
  //ELSE IF----------------------------------------------------------------------------------------------------------
  }else if(area1.value!='none'||area2.value!='none'||area3.value!='none'||area4.value!='none'||area5.value!='none'){
    //data
    let areas=["Rogers Park",
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
    
    let area1T1=0;
    let area1T2=0;
    let area1T3=0;
    let area1T4=0;
    let area1T5=0;

    let area2T1=0;
    let area2T2=0;
    let area2T3=0;
    let area2T4=0;
    let area2T5=0;

    let area3T1=0;
    let area3T2=0;
    let area3T3=0;
    let area3T4=0;
    let area3T5=0;

    let area4T1=0;
    let area4T2=0;
    let area4T3=0;
    let area4T4=0;
    let area4T5=0;

    let area5T1=0;
    let area5T2=0;
    let area5T3=0;
    let area5T4=0;
    let area5T5=0;
    
    let dataTotal=[];
    let months=["2017-enero","2017-febrero","2017-marzo","2017-abril","2017-mayo","2017-junio","2017-julio","2017-agosto","2017-setiembre","2017-octubre","2017-noviembre","2017-diciembre"]
    
    for(let i=0;i<months.length;i++){      
      const dataCrimes = await d3.csv("../data/"+months[i]+".csv");
      for(let j=0;j<dataCrimes.length;j++){
        if(iucr1.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T1++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T1++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T1++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T1++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T1++;
          }
        }
        if(iucr2.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T2++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T2++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T2++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T2++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T2++;
          }
        }
        if(iucr3.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T3++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T3++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T3++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T3++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T3++;
          }
        }
        if(iucr4.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T4++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T4++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T4++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T4++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T4++;
          }
        }
        if(iucr5.value==dataCrimes[j].IUCR){
          if(dataCrimes[j].CommunityArea==area1.value){
            area1T5++;
          }
          if(dataCrimes[j].CommunityArea==area2.value){
            area2T5++;
          }
          if(dataCrimes[j].CommunityArea==area3.value){
            area3T5++;
          }
          if(dataCrimes[j].CommunityArea==area4.value){
            area4T5++;
          }
          if(dataCrimes[j].CommunityArea==area5.value){
            area5T5++;
          }
        }
      }          
    }
    if(iucr1.value!="none"){
      let data1=[]
      if(area1.value!='none'){
        data1.push(area1T1);
      }
      if(area2.value!='none'){
        data1.push(area2T1);
      }
      if(area3.value!='none'){
        data1.push(area3T1);
      }
      if(area4.value!='none'){
        data1.push(area4T1);
      }
      if(area5.value!='none'){
        data1.push(area5T1);
      }
      dataTotal.push(data1);
    }
    if(iucr2.value!="none"){
      let data2=[]
      if(area1.value!='none'){
        data2.push(area1T2);
      }
      if(area2.value!='none'){
        data2.push(area2T2);
      }
      if(area3.value!='none'){
        data2.push(area3T2);
      }
      if(area4.value!='none'){
        data2.push(area4T2);
      }
      if(area5.value!='none'){
        data2.push(area5T2);
      }
      dataTotal.push(data2);
    }
    if(iucr3.value!="none"){
      let data3=[]
      if(area1.value!='none'){
        data3.push(area1T3);
      }
      if(area2.value!='none'){
        data3.push(area2T3);
      }
      if(area3.value!='none'){
        data3.push(area3T3);
      }
      if(area4.value!='none'){
        data3.push(area4T3);
      }
      if(area5.value!='none'){
        data3.push(area5T3);
      }
      dataTotal.push(data3);
    }
    if(iucr4.value!="none"){
      let data4=[]
      if(area1.value!='none'){
        data4.push(area1T4);
      }
      if(area2.value!='none'){
        data4.push(area2T4);
      }
      if(area3.value!='none'){
        data4.push(area3T4);
      }
      if(area4.value!='none'){
        data4.push(area4T4);
      }
      if(area5.value!='none'){
        data4.push(area5T4);
      }
      dataTotal.push(data4);
    }
    if(iucr5.value!="none"){
      let data5=[]
      if(area1.value!='none'){
        data5.push(area1T5);
      }
      if(area2.value!='none'){
        data5.push(area2T5);
      }
      if(area3.value!='none'){
        data5.push(area3T5);
      }
      if(area4.value!='none'){
        data5.push(area4T5);
      }
      if(area5.value!='none'){
        data5.push(area5T5);
      }
      dataTotal.push(data5);      
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
    let namesAreasSelected=[]
    if(area1.value!="none"){      
      title=title+area1.options[area1.selectedIndex].text;
      namesAreasSelected.push(area1.options[area1.selectedIndex].text);
    }
    if(area2.value!="none"){
      title=title+", "
      title=title+area2.options[area2.selectedIndex].text;
      namesAreasSelected.push(area2.options[area2.selectedIndex].text);
    }
    if(area3.value!="none"){
      title=title+", "
      title=title+area3.options[area3.selectedIndex].text;
      namesAreasSelected.push(area3.options[area3.selectedIndex].text);
    }
    if(area4.value!="none"){
      title=title+", "
      title=title+area4.options[area4.selectedIndex].text;
      namesAreasSelected.push(area4.options[area4.selectedIndex].text);
    }
    if(area5.value!="none"){
      title=title+", "
      title=title+area5.options[area5.selectedIndex].text;
      namesAreasSelected.push(area5.options[area5.selectedIndex].text);
    }

    console.log(dataTotal);

    var data = [{
      x: namesAreasSelected,
      y: crimesSelected,
      z: dataTotal,
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
    Plotly.newPlot('chart3dE2', data, layout);
  }
  }
});
