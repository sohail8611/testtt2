// This example creates a simple polygon representing the Bermuda Triangle.
function initMap() {
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom: 5,
        center: { lat: 24.886, lng: -70.268 },
        mapTypeId: "terrain",
    });
    // Define the LatLng coordinates for the polygon's path.
    const triangleCoords = [
        { lat: 24.7922, lng: 67.4011 },
        { lat: 24.7958, lng: 67.728 },
        { lat: 24.9197, lng: 67.6072 },
        { lat: 24.8223, lng: 67.4942},
        { lat: 26.9197, lng: 67.6072 },
       
    ];
    // Construct the polygon.
    const bermudaTriangle = new google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.8,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.35,
    });

    bermudaTriangle.setMap(map);
}


// function deleteZoneControl(controlDiv, map) {
//     const controlUI = document.createElement("div");
//     // Set CSS for the control border.
//     controlUI.classList.add('controlUI');
//     controlUI.title = "Delete the zone";
//     controlDiv.appendChild(controlUI);

//     // Set CSS for the control interior.
//     const controlText = document.createElement("div");
//     controlText.classList.add('controlText');
//     controlText.innerHTML = `<i class="fas fa-trash">`;
//     controlUI.appendChild(controlText);

//     controlUI.addEventListener("click", () => {
//         currentOverlay.relatedOverlay.setMap(null);
//         console.log("deleted", currentOverlay.id);
//         let id = currentOverlay.id
//         fetch(`http://localhost:5000/deleteBigZone`, {
//             method: "DELETE",
//             mode: 'cors',
//             headers: {
//                 "Content-Type": "application/json",
//             },
//             body: JSON.stringify({
//                 id
//             }),
//         })
//             .then(res => res.json())
//             .catch((err) => console.log(`delete failed ${err}`))
//             .then(res => console.log('response', res))
//     });
// }




function UseWicketToGoFromGooglePolysToWKT(poly1, poly2) {
    var wicket = new Wkt.Wkt();

    wicket.fromObject(poly1);
    var wkt1 = wicket.write();

    wicket.fromObject(poly2);
    var wkt2 = wicket.write();

    return [wkt1, wkt2];
  }

//   function UseJstsToTestForIntersection(wkt1, wkt2) {
//     // Instantiate JSTS WKTReader and get two JSTS geometry objects
//     var wktReader = new jsts.io.WKTReader();
//     var geom1 = wktReader.read(wkt1);
//     var geom2 = wktReader.read(wkt2);

//     if (geom2.intersects(geom1)) {
//       alert('intersection confirmed!');
//     } else {
//       alert('..no intersection.');
//     }
//   }