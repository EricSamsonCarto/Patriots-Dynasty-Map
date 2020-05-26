/* DATA REQUESTS */
var Patriots1 = $.ajax({
  url: "https://gist.githubusercontent.com/EricSamsonCarto/2d9a467900c64cce8f157a165aa33ee1/raw/02b5a2ec003d9ee12f1d8670396896bd0aa6a39c/FootballTeams4.geojson",
  dataType: "json",
  success: console.log("Patriots1 data successfully loaded."),
  error: function(xhr) {
    alert(`Patriots1: ${xhr.statusText}`);
  }
});
  
$.when(Patriots1).done(function() {
  var map = L.map("map",{
  }).setView([39.072825, -92.598557], 4);

L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
	subdomains: 'abcd',
	maxZoom: 6,
  minZoom: 4,
}).addTo(map);


// Set up styles for polygons
function subteStyle(feature) {
  return {
    "color": feature.properties.COLOR,
    "weight": 1.3
  };
}     
  
// Create necessary panes in correct order 
map.createPane("FootballPane");
map.createPane("PicPane");
  
  // Add requested external GeoJSON to map
  var Patriots = L.geoJSON(Patriots1.responseJSON, {
    style: subteStyle,
    fillOpacity: 0.75,
    pane: "FootballPane",
  }).addTo(map);
  
 Patriots.bindPopup(function (e) {
    let desc = `<div style="font-family: montserrat, sans-serif;">
<div style="text-align:center;color:${e.feature.properties.COLOR};">
	<font size="3">${e.feature.properties.TEAM_0}</font>
	</div>
<div style="text-align:center">
Patriots vs The ${e.feature.properties.TEAM}:<br>
<b>From 2001 to Present</b>
</div>
<hr style="margin:0;padding:0;">

<div style="text-align:center">
Total Games: <font size="2"><b>${e.feature.properties.TOTALGAMES}</b></font>
</div>

<div style="text-align:center">
Winning Percentage: <font size="2"><b>${e.feature.properties.WinningPercentage2}%</b></font>
</div>

<div id="chart">
  <canvas id="myChart"></canvas>
</div> 
<div style="text-align:center">
Point Differential: <b>+${e.feature.properties.PointDifferential}</b>
</div>
<div id="chart">
  <canvas id="myChart2"></canvas>
</div> 

<div style="text-align:center; color:${e.feature.properties.COLOR};">
<font size="3">
<a href="${e.feature.properties.BESTMOMENT}" target="_blank" style="text-align:center; color:${e.feature.properties.COLOR}; text-decoration:none;">Hightlights</a>
</font>
</div>
<br>
</div>
`
return desc;
   
}).addTo(map);
  
//CHARTS WITHIN POPUPS
  
Patriots.on('popupopen', function (e) {
  
  
console.log('propagatedFrom', e.propagatedFrom);
  
  var win = e.propagatedFrom.feature.properties.WINS;
  var loss = e.propagatedFrom.feature.properties.LOSSES;
  var color = e.propagatedFrom.feature.properties.COLOR;
  var Scored = e.propagatedFrom.feature.properties.POINTS_SCORED;
  var Scored2 = e.propagatedFrom.feature.properties.POINTS_OPP;
  
  var data = {
  labels: [
    "Losses",
    "Wins",
  ],
  datasets: [{
    data: [loss, win],
    backgroundColor: [
      "#B0B7BC",
      "#002244",
    ]
  }]
};
var ctx = $("#myChart");
var myChart = new Chart(ctx, {
  type: 'pie',
  data: data,
  options: {
         legend: {
            display: false
         }}
});
  
  var data2 = {
  labels: [
    "Points Allowed",
    "Points Scored",
  ],
  datasets: [{
    data: [Scored2, Scored],
    backgroundColor: [
      "#B0B7BC",
      "#002244",
    ]
  }]
};
var ctx2 = $("#myChart2");
var myChart2 = new Chart(ctx2, {
  type: 'pie',
  data: data2,
  options: {
         legend: {
            display: false
         }}
});
  
  });
  
///TEAM LOGOS OVER POLYGONS
  
var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/washingtonredskins.png',
imageBounds = [[37.912420, -78.539668], [35.856460, -76.100251]];

var overlay = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay.setOpacity(.70)
overlay.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/newenglandpatriots.png',
imageBounds = [[45.419945, -74.005206], [42.549512, -68.995864]];

var overlay2 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay2.setOpacity(.70)
overlay2.addTo(map);
  
   var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/newyorkgiants.png',
imageBounds = [[43.379935, -75.421532], [42.046349, -73.637020]];

var overlay3 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay3.setOpacity(.70)
overlay3.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/newyorkjets.png',
imageBounds = [[41.158388, -74.807525], [40.391126, -73.680544]];

var overlay4 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay4.setOpacity(.70)
overlay4.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/philadelphiaeagles.png',
imageBounds = [[40.431636, -75.800993], [39.222755, -74.108507]];

var overlay5 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay5.setOpacity(.70)
overlay5.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/baltimoreravens.png',
imageBounds = [[41.269788, -78.454560], [39.692282, -76.248478]];

var overlay6 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay6.setOpacity(.70)
overlay6.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/buffalobills.png',
imageBounds = [[43.402269, -78.983153], [42.024426, -76.264337]];

var overlay7 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay7.setOpacity(.70)
overlay7.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/pittsburghsteelers.png',
imageBounds = [[40.883616, -80.782815], [39.326119, -78.809531]];

var overlay8 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay8.setOpacity(.70)
overlay8.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/carolinapanthers.png',
imageBounds = [[37.234773, -81.873248], [34.045758, -78.731979]];

var overlay9 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay9.setOpacity(.70)
overlay9.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/jacksonvillejaguars.png',
imageBounds = [[31.974913, -84.155131], [29.643415, -81.228753]];

var overlay10 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay10.setOpacity(.70)
overlay10.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/tampabaybuccaneers.png',
imageBounds = [[28.848659, -82.462202], [27.607150, -80.900520]];

var overlay11 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay11.setOpacity(.70)
overlay11.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/miamidolphins.png',
imageBounds = [[26.927279, -81.590871], [25.305630, -79.763118]];

var overlay12 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay12.setOpacity(.70)
overlay12.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/atlantafalcons.png',
imageBounds = [[34.727588, -86.142870], [32.148246, -82.870609]];

var overlay13 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay13.setOpacity(.70)
overlay13.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/neworleanssaints.png',
imageBounds = [[33.476793, -92.462164], [29.795205, -88.307790]];

var overlay14 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay14.setOpacity(.70)
overlay14.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/tennesseetitans.png',
imageBounds = [[37.001624, -88.865623], [34.543291, -85.850209]];

var overlay15 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay15.setOpacity(.70)
overlay15.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/cincinnatibengals.png',
imageBounds = [[39.779318, -84.828459], [38.220037, -82.652657]];

var overlay16 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay16.setOpacity(.70)
overlay16.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/clevelandbrowns.png',
imageBounds = [[41.279507, -82.857032], [40.183326, -81.329211]];

var overlay17 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay17.setOpacity(.70)
overlay17.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/detroitlions.png',
imageBounds = [[43.905159, -85.676449], [42.041071, -82.862506]];

var overlay18 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay18.setOpacity(.70)
overlay18.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/greenbaypackers.png',
imageBounds = [[45.925163, -90.204053], [43.768969, -87.305336]];

var overlay19 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay19.setOpacity(.70)
overlay19.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/chicagobears.png',
imageBounds = [[42.713702, -89.963704], [40.555192, -86.787458]];

var overlay20 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay20.setOpacity(.70)
overlay20.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/indianapoliscolts.png',
imageBounds = [[40.593017, -87.588649], [38.848041, -85.407381]];

var overlay21 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay21.setOpacity(.70)
overlay21.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/minnesotavikings.png',
imageBounds = [[47.862334, -98.351675], [44.682355, -93.060834]];

var overlay22 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay22.setOpacity(.70)
overlay22.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/kansascitychiefs.png',
imageBounds = [[41.313533, -97.329178], [36.584862, -90.852914]];

var overlay23 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay23.setOpacity(.70)
overlay23.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/dallascowboys.png',
imageBounds = [[35.526345, -101.325258], [31.666476, -96.815758]];

var overlay24 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay24.setOpacity(.70)
overlay24.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/houstontexans.png',
imageBounds = [[30.776777, -97.452102], [28.584706, -93.980692]];

var overlay25 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay25.setOpacity(.70)
overlay25.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/denverbroncos.png',
imageBounds = [[44.906171, -110.653376], [38.947852, -101.875153]];

var overlay26 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay26.setOpacity(.70)
overlay26.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/arizonacardinals.png',
imageBounds = [[36.546172, -114.252905], [31.509936, -108.1246702]];

var overlay27 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay27.setOpacity(.70)
overlay27.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/losangeleschargers.png',
imageBounds = [[33.894102, -117.423558], [32.641769, -114.792806]];

var overlay28 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay28.setOpacity(.90)
overlay28.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/losangelesrams.png',
imageBounds = [[36.043787, -118.854277], [34.160957, -115.813293]];

var overlay29 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay29.setOpacity(.70)
overlay29.addTo(map);
  
   var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/oaklandraiders.png',
imageBounds = [[40.598305, -121.818011], [38.088822, -118.810378]];

var overlay30 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay30.setOpacity(.70)
overlay30.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/seattleseahawks.png',
imageBounds = [[47.954088, -122.813720], [42.883126, -115.016283]];

var overlay31 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay31.setOpacity(.70)
overlay31.addTo(map);
  
  var imageUrl = 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/3352342/sanfrancisco49ers.png',
imageBounds = [[38.929033, -124.028213], [37.061122, -121.783732]];

var overlay31 = L.imageOverlay(imageUrl, imageBounds, {
  pane: "PicPane",
});
overlay31.setOpacity(.70)
overlay31.addTo(map);
  
  });