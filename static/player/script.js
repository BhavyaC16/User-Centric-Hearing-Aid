var headphone = document.getElementById("headphone");
// headphone.style.display = "none";

var infotext = document.getElementById("info-text");

var left = document.getElementById("left");
left.style.display = "none";

var help1 = document.getElementById("help-1");
// left.style.display = "none";
var help2 = document.getElementById("help-2");
help2.style.display = "none";
var help3 = document.getElementById("help-3");
help3.style.display = "none";

var right = document.getElementById("right");
right.style.display = "none";

var both = document.getElementById("both");
both.style.display = "none";

var yes = document.getElementById("can-hear");
yes.style.display = "none";

var no = document.getElementById("cannot-hear");
no.style.display = "none";

var barely = document.getElementById("hear");
barely.style.display = "none";

var calibrate = document.getElementById("calibrate");
// calibrate.style.display = "none";

var startTest = document.getElementById("start-test");
// startTest.style.display = "none";

var bttn = document.getElementById("startbttn");
bttn.remove();

var chartContainer = document.getElementById("chartContainer");
chartContainer.style.display="none";

var left_hearing = [0, 0, 0, 0, 0, 0];
var right_hearing = [0, 0, 0, 0, 0, 0];
var both_hearing = [0, 0, 0, 0, 0, 0];

var count_track = 1;


function start(){
  // var bttn = document.getElementById("startbttn");
  // bttn.remove();
  headphone.style.display = "block";
  left.style.display = "block";
  right.style.display = "block";
  startTest.style.display = "block";
  calibrate.style.display = "block";
  infotext.innerHTML = "Calibrate your device!";
  playCalibAudio();
}

function playCalibAudio(){
	both.style.display = "block";
	track.src = "/static/audio/calibrate.wav";
	track.load();
	track.play();
}

function start_test(){
  infotext.innerHTML = "Progress: "+count_track+" of 18";
  help1.style.display = "none";
	left.style.display = "none";
  right.style.display = "none";
  startTest.style.display = "none";
  calibrate.style.display = "none";
  yes.style.display = "block";
  no.style.display = "block";
  barely.style.display = "block";
  help2.style.display = "block";
  playAudio();
}

let track = document.createElement('audio');

var filenum = ["5", "6", "7", "8", "9", "10", "11", "12"];
var freq = ["250", "500", "1000", "2000", "4000", "8000"];
var side = ["B", "L", "R"];
var decibels = [0, 10, 20, 30, 40, 50, 60, 70];

var filename = "B-250-5.wav";
var track_filenum = 0;
var track_freq = 0;
var track_side = 0;


function playAudio(){
	if(track_filenum===0){
		document.getElementById("can-hear").disabled = true;
	}
	else{
		document.getElementById("can-hear").disabled = false;
	}
	if(track_filenum===7){
		document.getElementById("cannot-hear").disabled = true;
	}
	else{
		document.getElementById("cannot-hear").disabled = false;
	}
	
	filename = side[track_side]+"-"+freq[track_freq]+"-"+filenum[track_filenum]+".wav"
	console.log("Playing", filename);
  	track.src = "/static/audio/"+filename;
  	if(track_side===0){
  		left.style.display = "block";
  		right.style.display = "block";
  	}
  	else if(track_side===1){
  		left.style.display = "block";
  		both.style.display = "none";
  		right.style.display = "none";
  	}
  	else{
  		right.style.display = "block";
  		both.style.display = "none";
  		left.style.display = "none";
  	}
  	track.load();
  	track.play();
}

function gotonextfreq(){
  count_track+=1;
  infotext.innerHTML = "Progress: "+count_track+" of 18";
	if(track_side===0){
		both_hearing[track_freq] = decibels[track_filenum];
	}
	else if(track_side===1){
		left_hearing[track_freq] = decibels[track_filenum];
	}
	else{
		right_hearing[track_freq] = decibels[track_filenum];
	}
	if(track_freq<5){
		track_freq+=1;
		track_filenum = 0;
		playAudio();
	}
	else{
		console.log("here 1");
		if(track_side<2){
			console.log("here 2");
			track_side+=1;
			track_freq = 0;
			track_filenum = 0;
			playAudio();
		}
		else{
			console.log("TEST ENDED");
			console.log(both_hearing);
			console.log(left_hearing);
			console.log(right_hearing);
			displayTestReport();
		}
	}
}

function canHear(){
	if(track_filenum>0){
		track_filenum-=1;
		playAudio();
	}
}

function cannotHear(){
	if(track_filenum<7){
		track_filenum+=1;
		playAudio();
	}
}

function displayTestReport(){
  infotext.innerHTML = "Test Completed!";
  help2.style.display = "none";
  help3.style.display = "block";
	headphone.style.display="none";
	left.style.display = "none";
	right.style.display = "none";
	yes.style.display = "none";
	no.style.display = "none";
	barely.style.display = "none";

	chartContainer.style.display = "block"

var Both = {
  x: ["250", "500", "1000", "2000", "4000", "8000"],
  y: both_hearing,
  mode: 'lines+markers',
  marker: {
    color: 'rgb(51, 153, 255)',
    size: 8
  },
  line: {
    color: 'rgb(51, 153, 255)',
    width: 1
  },
  name: 'Both Ears',
};

var Left = {
  x: ["250", "500", "1000", "2000", "4000", "8000"],
  y: left_hearing,
  mode: 'lines+markers',
  marker: {
    color: 'rgb(0, 204, 102)',
    size: 8
  },
  line: {
    color: 'rgb(0, 204, 102)',
    width: 1
  },
  name: 'Left Ear',
};

var Right = {
  x: ["250", "500", "1000", "2000", "4000", "8000"],
  y: right_hearing,
  mode: 'lines+markers',
  marker: {
    color: 'rgb(255, 80, 80)',
    size: 8
  },
  line: {
    color: 'rgb(255, 80, 80)',
    width: 1
  },
  name: 'Right Ear',
};

var data = [Both, Left, Right];

var layout = {
  title: 'Hearing Test Audiogram',
  yaxis: { autorange: "reversed", range: [-10, 70], showgrid: true,  title: 'dB'},
  xaxis:{showgrid: true, title: 'Frequency (Hz)', type: 'log'}
};

Plotly.newPlot('chartContainer', data, layout);
Plotly.relayout("chartContainer", 'yaxis.range', [70, -10]);
 }

