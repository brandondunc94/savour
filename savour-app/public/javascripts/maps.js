﻿var map;
var infoWindow;
var userMarker;
var filters = [];
var marks = [];

function initMap() {
    filters.push("food", "coffee", "tea");
    var omh = { lat:47.651395, lng:-122.361466};

    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
            var userPos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            var blueMarker = "../images/blue-marker.png";
            if (userMarker == null) {
                userMarker = new google.maps.Marker({
                    position: userPos,
                    map: map,
                    icon: blueMarker,
                    title: "You are here"
                });
                map.setCenter(userPos);
            } else {
                userMarker.setPosition(userPos);
            }
        });
    }

    var mapStyle = [
        {
            featureType: "administrative",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            featureType: "poi",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }/*, {
            featureType: "water",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }, {
            featureType: "road",
            elementType: "labels",
            stylers: [
                { visibility: "off" }
            ]
        }*/
    ];

    map = new google.maps.Map(document.getElementById('map'), {
        zoom: 15,
        center: omh,
        disableDefaultUI: true,
        mapTypeId: "mapStyle"
    });
    map.mapTypes.set("mapStyle", new google.maps.StyledMapType(mapStyle, { name: "Map Style" }));
    google.maps.event.addListener(map, "click", function () {
        if (infoWindow != null) {
            infoWindow.close();
        }
    });
}

// Converts the JSON object we're using in mongodb to a google latlng
function GooglePOS(jsonPos) {
    try {
        var pos = new google.maps.LatLng(jsonPos.LAT, jsonPos.LON);
        return pos;
    }
    catch (err) {
        console.error(err);
        return new google.maps.LatLng();
    }
}

function AddMarker(pos) {
    // TODO validation

    new google.maps.Marker({
        position: pos,
        map: map
    });
}

function AddBubble(str) {
    if (!filters.includes(str)) {
        filters.push(str);
        $("#bubble-bar").append("<div class='actionBox'>" + str + "</div>");
    }
}

$(function () {
    $("#filter-button").click(function () {
        if (filters.length != 0) {
            $("#bubble-bar").toggle();
        }
    });
    $("#search-button").click(function () {
        // TODO: Brandon put code her plz
        var val = $("#filter-search").val();
        if (val != "") {
            AddBubble(val);
            $("#filter-search").val("");
        }
    });
});