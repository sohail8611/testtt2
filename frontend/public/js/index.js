let map, techCoord, areaCoord, mapObj;
let subZoneOverlays = new Array();
let zoneOverlaysAfter = new Array();
let subZoneOverlaysaAfter = new Array();
let currentOverlay = new Object();
let selectedShape;
let drawingManager;
let BZone = false;
let isPolyEditable = false;

function initMap() {

    map = new google.maps.Map(document.getElementById("map"), {
        zoom: 10,
        center: { lat: 24.9729, lng: 67.0643 },
        mapTypeId: "terrain",
    
    });

    let polyOptions = {
        strokeWeight: 0,
        fillOpacity: 0.45,
        editable: true,
        draggable: true
    };
    drawingManager = new google.maps.drawing.DrawingManager({
        drawingControl: false,
  
        markerOptions: {
            draggable: true
        },
        polygonOptions: polyOptions,
        map: map
    });
   
    const zone = document.getElementById("zone")

    google.maps.event.addDomListener(zone, 'click', drawZone);
    google.maps.event.addDomListener(delelePoly, 'click', deleteZone);
    google.maps.event.addDomListener(subZone, 'click', drawSubZone);

    function ToggleEditButton() {
        isPolyEditable = true;
        return isPolyEditable;
    }


    google.maps.event.addListener(drawingManager, 'overlaycomplete', overlayDone);
  //  loadMarkers();
    loadZones();
    loadSubZones();

}
function drawSubZone() {
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    BZone = false;
}
function drawZone() {
    drawingManager.setDrawingMode(google.maps.drawing.OverlayType.POLYGON);
    BZone = true;
}
//load the markers from the database
// function loadMarkers() {
//     fetch('http://localhost:5000/getMarkers')
//         .then(response => response.json())
//         .then(data => {
//             let techCoord = data.marker;
//             for (let i = 0; i < techCoord.length; i++) {
//                 new google.maps.Marker({
//                     position: techCoord[i],
//                     map,
//                     title: techCoord[i].techname
//                 });
//             }
//         })
// }

// get the zone from the database

function loadZones() {
    fetch('http://localhost:5000/getArea')
        .then(response => response.json())
        .then(data => {
            setMapData(data)
        })
}

// get the sub zones from the database
function loadSubZones() {
    fetch('http://localhost:5000/getSubZones')
        .then(response => response.json())
        .then(data => {           
            setSubZones(data)
        })
}

// to make the json object
function mapToObject(overlayType) {
    var tmpMap = new Object;
    var tmpOverlay, paths;
    tmpMap.overlays = new Array();

    for (var i = 0; i < overlayType.length; i++) {
        if (overlayType[i].getMap() == null) {
            continue;
        }
        tmpOverlay = new Object;

        if (overlayType[i].type !== "marker") {
            tmpOverlay.paths = new Array();
            paths = overlayType[i].getPaths();
            for (var j = 0; j < paths.length; j++) {
                tmpOverlay.paths[j] = new Array();
                for (var k = 0; k < paths.getAt(j).length; k++) {
                    if (paths.getAt(j).length >= 3) {
                        tmpOverlay.paths[j][k] = { lat: paths.getAt(j).getAt(k).lat(), lng: paths.getAt(j).getAt(k).lng() };
                    }
                }
            }
        }
    }
    if (tmpOverlay.paths[0].length >= 3) {
        return tmpOverlay;
    }
    else {
        alert("Zone should have three polylines")
        return undefined
    }


}

// insert zone in the database
const insertZone = function (zone) {
    let [zoneID, poly] = zone    
    if (poly != undefined) {

        fetch(`http://localhost:5000/insertBigZone`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                zoneID, poly
            }),
        })
            .then(res => res.json())
            .catch((err) => console.log(`Fetch failed ${err}`))
            .then(res => console.log('response', res))
    }

}


// insert sub zone in the database
const insertSubZone = function (subzone) {
    let [polyID, poly, outerPolyID] = subzone
    var result = JSON.stringify(mapToObject(subZoneOverlays));

    // the sub polygon is valid 
    if (poly != undefined) {
        fetch(`http://localhost:5000/insertSubZone`, {
            method: "POST",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                polyID, poly, outerPolyID
            }),
        })
            .then(res => res.json())
            .catch((err) => console.log(`Fetch failed ${err}`))
            .then(res => console.log('response', res))
    }
}

function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}


function overlayDone(event) {
    event.overlay.setEditable(false);
    if (BZone) {
        let zoneOverlays = new Array();
        event.overlay.type = event.type;
        zoneOverlays.push(event.overlay);
        AttachClickListener(event.overlay);
        let polyID = uuidv4()
        let poly = JSON.stringify(mapToObject(zoneOverlays));
        let zonewithID = [polyID, poly]
        zoneOverlaysAfter.push([event.overlay, polyID])

        insertZone(zonewithID);
        drawingManager.setDrawingMode(null);
    }
    else {
        event.overlay.type = "subzone";
        drawingManager.setDrawingMode(null);

        //checking if this new overlay is inside any of the previously drawn overlays
        let isInsideZone = false;
        for (let index = 0; index < zoneOverlaysAfter.length; index++) {
            let outerPolyPaths = zoneOverlaysAfter[index][0];
            let outerPolyID = zoneOverlaysAfter[index][1];
            if (isPolygonInsidePolygon(event.overlay.getPath(), outerPolyPaths)) {
                isInsideZone = true;
                subZoneOverlays.push(event.overlay)
                let polyID = uuidv4()
                let poly = JSON.stringify(mapToObject(subZoneOverlays));
                let subZonewithIDs = [polyID, poly, outerPolyID]
                AttachClickListener(event.overlay);

                insertSubZone(subZonewithIDs)
            }
        }
        if (!isInsideZone) {
            alert("Subzone should be inside any zone")
            event.overlay.getPath().clear();
        }
    }
}

function setSelection(shape, pid, path, fid) {
    clearSelection();
    shape.setEditable(true);
    shape.setDraggable(true);
    //  isPolyEditable = true;
    currentOverlay.relatedOverlay = shape;
    currentOverlay.id = pid;
    if (shape.type === 'polygon') {
        updatePolygon(shape, pid, path);
        currentOverlay.type = 'polygon'
    }
    if (shape.type === 'subzone') {
        updateSubPolygon(shape, pid, fid, path);
        currentOverlay.type = 'subzone';
    }
    selectedShape = shape;
}


function clearSelection() {
    if (selectedShape) {
        //   isPolyEditable = false;
        if (selectedShape.type !== 'marker') {
            selectedShape.setEditable(false);
            selectedShape.setDraggable(false);
        }
        selectedShape = null;
    }
}
//primary key id  (pid)   foreign key id (fid)
function AttachClickListener(overlay, pid, path, fid) {
    google.maps.event.addListener(overlay, "click", function (clkEvent) {
       
        setSelection(overlay, pid, path, fid);
     
    });
    google.maps.event.addListener(map, 'click', clearSelection);
}


function updatePolygon(shape, id, path) {
    google.maps.event.addListener(shape.getPath(), 'set_at', processVertex);
    google.maps.event.addListener(shape.getPath(), 'insert_at', processVertex);
    google.maps.event.addListener(shape, 'dragend', processVertexDragend);

    let paths;
    let isZonehasSubZones = true
    let isZoneBoundaryCrossed = false
    function processVertex(e) {
        // it means this zone has subzones
        let poly = [];
        let parentIDCount = 0;

        subZoneOverlaysaAfter.forEach((element) => {
            let zoneID = element[2];
            if (id === zoneID) {
                poly.push(element[0]);
                isZonehasSubZones = false;
                parentIDCount++;
                // this subzone is inside the Updated zone            
            }
        })
        console.log(parentIDCount)
        let polyinside = 0;
        for (let i=0; i < poly.length; i++) {
            if (isPolygonInsidePolygon(poly[i].getPath(), shape)) {
                isZonehasSubZones = true;
                polyinside++
            }
            else {
                shape.setPath(path[0])
                shape.setEditable(false)

            }
        }
        if (isZonehasSubZones && polyinside === parentIDCount) {
            let tmpOverlay = new Object;
            tmpOverlay.paths = new Array();
            tmpOverlay.paths[0] = new Array();           
            for (var k = 0; k < this.getLength(); k++) {
                tmpOverlay.paths[0][k] = { lat: this.getAt(k).lat(), lng: this.getAt(k).lng() };
            }
            paths = JSON.stringify(tmpOverlay);
            fetch(`http://localhost:5000/updateBigZone`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id, paths
                }),
            })
                .then(res => res.json())
                .catch((err) => console.log(`Fetch failed ${err}`))
                .then(res => console.log('response', res))
        }
    }
    function processVertexDragend(e) {
        // it means this zone has subzones
        let poly = [];
        let parentIDCount = 0;

        subZoneOverlaysaAfter.forEach((element) => {
            let zoneID = element[2];
            if (id === zoneID) {
                poly.push(element[0]);
                isZonehasSubZones = false;
                parentIDCount++;
                // this subzone is inside the Updated zone            
            }
        })
        console.log(parentIDCount)
        let polyinside = 0;
        for (let i=0; i < poly.length; i++) {
            if (isPolygonInsidePolygon(poly[i].getPath(), shape)) {
                isZonehasSubZones = true;
                polyinside++
            }
            else {
                alert("Can't update the polygon")
                shape.setPath(path[0])

            }
        }
        if (isZonehasSubZones && polyinside === parentIDCount) {
            let tmpOverlay = new Object;
            tmpOverlay.paths = new Array();
            tmpOverlay.paths[0] = new Array();
            console.log(this)
            for (var k = 0; k < this.getPath().getLength(); k++) {
                tmpOverlay.paths[0][k] = { lat: this.getPath().getAt(k).lat(), lng: this.getPath().getAt(k).lng() };
            }
            paths = JSON.stringify(tmpOverlay);
            fetch(`http://localhost:5000/updateBigZone`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    id, paths
                }),
            })
                .then(res => res.json())
                .catch((err) => console.log(`Fetch failed ${err}`))
                .then(res => console.log('response', res))
        }
    }
}


function isPolygonInsidePolygon(innerPolygon, outerPolygon) {
    var pointsInside = 0;
    var pointsOutside = 0;
    innerPolygon.getArray().map(function (x) {
        (google.maps.geometry.poly.containsLocation(x, outerPolygon)) ? pointsInside++ : pointsOutside++;
    });
    if (!pointsOutside > 0) {
        return true
    }
    else {
        return false
    }
};

function updateSubPolygon(shape, pid, fid, path) {
    google.maps.event.addListener(shape.getPath(), 'set_at', processVertex);
    google.maps.event.addListener(shape.getPath(), 'insert_at', processVertex);
    google.maps.event.addListener(shape, 'dragend', processVertexDragend);

    let paths;
    function processVertexDragend(e) {
        let zonePoly;
        // console.log(e)
        zoneOverlaysAfter.forEach((element) => {
            let zoneID = element[1];
          
            if (fid === zoneID) {
                zonePoly = element[0]
            }
        })
        if (isPolygonInsidePolygon(this.getPath(), zonePoly)) {
            let tmpOverlay = new Object;
            tmpOverlay.paths = new Array();
            tmpOverlay.paths[0] = new Array();
            for (var k = 0; k < this.getPath().getLength(); k++) {
                tmpOverlay.paths[0][k] = { lat: this.getPath().getAt(k).lat(), lng: this.getPath().getAt(k).lng() };
            }
            paths = JSON.stringify(tmpOverlay);

            fetch(`http://localhost:5000/updateSubZone`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pid, paths
                }),
            })
                .then(res => res.json())
                .catch((err) => console.log(`Fetch failed ${err}`))
                .then(res => console.log('response', res))
        }
        else {
            shape.setPath(path[0])
            shape.setEditable(false);
        }
    }
    function processVertex(e) {       
        let zonePoly;
        zoneOverlaysAfter.forEach((element) => {
            let zoneID = element[1];
            if (fid === zoneID) {
                zonePoly = element[0]
            }
        })
        if (isPolygonInsidePolygon(this, zonePoly)) {

            let tmpOverlay = new Object;
            tmpOverlay.paths = new Array();
            tmpOverlay.paths[0] = new Array();
            for (var k = 0; k < this.getLength(); k++) {
                tmpOverlay.paths[0][k] = { lat: this.getAt(k).lat(), lng: this.getAt(k).lng() };
            }
            paths = JSON.stringify(tmpOverlay);

            fetch(`http://localhost:5000/updateSubZone`, {
                method: "PUT",
                mode: 'cors',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    pid, paths
                }),
            })
                .then(res => res.json())
                .catch((err) => console.log(`Fetch failed ${err}`))
                .then(res => console.log('response', res))

        }
        else {
            shape.setPath(path[0]);
            shape.setEditable(false);

        }
    }
}


function deleteZone() {
    currentOverlay.relatedOverlay.setMap(null);
    console.log("deleted", currentOverlay.id);
    let id = currentOverlay.id
    if (currentOverlay.type == 'polygon') {
        fetch(`http://localhost:5000/deleteBigZone`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            }),
        })
            .then(res => res.json())
            .catch((err) => console.log(`delete failed ${err}`))
            .then(res => console.log('response', res))
    }
    if (currentOverlay.type == 'subzone') {
        fetch(`http://localhost:5000/deleteSubZone`, {
            method: "DELETE",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id
            }),
        })
            .then(res => res.json())
            .catch((err) => console.log(`delete failed ${err}`))
            .then(res => console.log('response', res))
    }

}



function setMapData(jsonString) {
    for (let i = jsonString.areas.length - 1; i >= 0; i--) {
       
        let path = JSON.parse(jsonString.areas[i].positions).paths
        let poly = new google.maps.Polygon({
            paths: path,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        })
        poly.setMap(map);
        let zoneid = jsonString.areas[i].id;
        AttachClickListener(poly, zoneid, path);
        poly.type = "polygon"
        zoneOverlaysAfter.push([poly, zoneid])

    }
}

function setSubZones(jsonString) {
    for (let i = jsonString.subzones.length - 1; i >= 0; i--) {
        let path = JSON.parse(jsonString.subzones[i].positions).paths
        let poly = new google.maps.Polygon({
            paths: path,
            strokeColor: "#FF0000",
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: "#FF0000",
            fillOpacity: 0.35,
        })
        poly.setMap(map);
        poly.type = "subzone";
        let subzoneid = jsonString.subzones[i].id;
        let parentzoneid = jsonString.subzones[i].zoneid;
        AttachClickListener(poly, subzoneid, path, parentzoneid);
        //save the overlay in the array
        subZoneOverlaysaAfter.push([poly, subzoneid, parentzoneid])
    }
}



