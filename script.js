var now = new Date()
var konec = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 16, 0, 0);
var arrival = new Date()

var x = setInterval(function() {

    var razlikaDoKonca = new Date(konec - new Date())
    var razlikaOdzacetka = new Date(new Date() - arrival)

    var h = Math.floor((razlikaDoKonca % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m = Math.floor((razlikaDoKonca % (1000 * 60 * 60)) / (1000 * 60));
    var s = Math.floor((razlikaDoKonca % (1000 * 60)) / 1000);

    var h1 = Math.floor((razlikaOdzacetka % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var m1 = Math.floor((razlikaOdzacetka % (1000 * 60 * 60)) / (1000 * 60));
    var s1 = Math.floor((razlikaOdzacetka % (1000 * 60)) / 1000);
    
    document.getElementById("secondsBarL").style.width = "" + s / 0.6 + "vw";
    document.getElementById("minutesBarL").style.width = "" + m / 0.6 + "vw";
    document.getElementById("hoursBarL").style.width = "" + h / 0.08 + "vw";

    document.getElementById("secondsBarP").style.width = "" + s1 / 0.6 + "vw";
    document.getElementById("minutesBarP").style.width = "" + m1 / 0.6 + "vw";
    document.getElementById("hoursBarP").style.width = "" + h1 / 0.08 + "vw";
    

    if (h > 0){
    document.getElementById("timeLeft").innerHTML = h + ":" + addZero(m) + ":" + addZero(s);
    }
    else{
    document.getElementById("timeLeft").innerHTML = addZero(m) + ":" + addZero(s);
    }
    if (h1 > 0){
    document.getElementById("timePassed").innerHTML = h1 + ":" + addZero(m1) + ":" + addZero(s1);
    }
    else{
    document.getElementById("timePassed").innerHTML = addZero(m1) + ":" + addZero(s1);
    }
}, 1000);

var y = setInterval(function() {
    var n = new Date()
    var dnevi = ['Ponedeljek', 'Torek', 'Sreda', 'Četrtek', 'Petek', 'Sobota', 'Nedelja'];
    document.getElementById("todaysDate").innerHTML = dnevi[n.getDay() - 1] + ", " + n.getDate() + "." + (n.getMonth() + 1) + "." + n.getFullYear() + "<br>" + n.getHours() + "." + n.getMinutes();
}, 1000);

function getArrival() {
    arrival = document.getElementById("arrival").value
    arrival = new Date(now.getFullYear(), now.getMonth(), now.getDate(), arrival.split(":")[0], arrival.split(":")[1], 0);
    konec = new Date(now.getFullYear(), now.getMonth(), now.getDate(), arrival.getHours() + 8, arrival.getMinutes(), 0);
    document.getElementById("arrivalDeparture").innerHTML = "Arrived at " + arrival.getHours() + "." +  arrival.getMinutes() + ", leaving at " + konec.getHours() + "." + konec.getMinutes();
}
var getJSON = function(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
        callback(null, xhr.response);
        } else {
        callback(status, xhr.response);
        }
    };
    xhr.send();
};
function addZero(n){
    if (n < 10){
    return "0" + n.toString();
    }
    return n;
}

var getBusTimes = setInterval(function() {
    getJSON('https://prominfo.projekti.si/lpp_rc/api/704151', function(err, data) {
    if (err !== null){
        alert('Something went wrong: ' + err);
    }
    else{
        var text = "In"
        for(var i=0; i<data.arrivals[0].arrivals.length; i++){
        var minutes = data.arrivals[0].arrivals[i].minutes
        if (i == data.arrivals[0].arrivals.length - 2){
            text = text + " " + minutes + " and"
        }
        else if (i == data.arrivals[0].arrivals.length - 1){
            text = text + " " + minutes + " minutes."
        }
        else{
            text = text + " " + minutes + ","
        }
        }
        document.getElementById("bus").innerHTML = text;
    }
    });
}, 10000);

function onLoad(){
    getJSON('https://prominfo.projekti.si/lpp_rc/api/704151', function(err, data) {
    if (err !== null){
        alert('Something went wrong: ' + err);
    }
    else{
        var text = "In"
        for(var i=0; i<data.arrivals[0].arrivals.length; i++){
        var minutes = data.arrivals[0].arrivals[i].minutes
        if (i == data.arrivals[0].arrivals.length - 2){
            text = text + " " + minutes + " and"
        }
        else if (i == data.arrivals[0].arrivals.length - 1){
            text = text + " " + minutes + " minutes."
        }
        else{
            text = text + " " + minutes + ","
        }
        }
        document.getElementById("bus").innerHTML = text;
    }
    });
}