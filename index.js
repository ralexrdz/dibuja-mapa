// VARIABLE GLOBAL
let map
let pointsArray

// DOM READY
document.addEventListener('DOMContentLoaded', function () {
  map = L.map('mapid').setView([19.4, -99.4], 10)

  L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.streets'
  }).addTo(map)
  agregaCapas()
})

function onMapClick(e) {
  pointsArray.push([e.latlng.lat, e.latlng.lng])
  console.log(pointsArray)
}

function startPolygon() {
  pointsArray = []
  document.getElementById('start-polygon').setAttribute('disabled', true)
  document.getElementById('draw-polygon').removeAttribute('disabled')
  map.on('click', onMapClick)
}

function finishPolygon() {
  document.getElementById('draw-polygon').setAttribute('disabled', true)
  document.getElementById('start-polygon').removeAttribute('disabled')
  map.off('click', onMapClick)
  let color = document.getElementById('color').value
  drawPolygon(pointsArray, '#' + color)
  // L.polygon(pointsArray,{}).addTo(map)
}

function showLocation () {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(moveToLocation)
  } else {
    console.log('No tienes acceso a GPS')
  }
}

function drawPolygon (points, color) {
  let coords = points.map(p => `[${p}]`).join(',<br>')
  L.polygon(points, { color: color }).bindPopup(coords).addTo(map)
}

function moveToLocation (position) {
  console.log(position)
  map.flyTo([position.coords.latitude, position.coords.longitude], 16)
}

function agregaCapas () {
  if (pines.length > 0) {
    console.log('pines', pines.length)
  }
  if (poligonos.length > 0) {
    console.log('poligonos', poligonos.length)
    poligonos.forEach(poly => {
      drawPolygon(poly.coords, poly.color)
    })
  }
  if (lineas.length > 0) {
    console.log('lineas', lineas.length)

  }
}