// button shit 
const videoButton = document.getElementById('main_video-button');
const finalButton = document.getElementById('finalize-button');
const video = document.getElementById('main_video');

let mediaRecorder;
let recordedBlobs;
videoButton.onclick = () => {
    switch (videoButton.textContent) {
        case 'Record':
            videoButton.textContent = 'Stop';
            startRecording();
            break;
        case 'Stop':
            videoButton.textContent = 'Record';
            stopRecording();
            break;
    }
}

async function init() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({
            audio: true,
            video: true
        });
        startWebCamera(stream);
        video.muted = true; 
    } catch (err) {
        console.log('Error retrieving media device.');
        console.log(err);
    }
}

function startWebCamera(stream) {
    video.srcObject = stream;
    window.stream = stream;
}

function startRecording() {
    if (video.srcObject == null) {
        video.srcObject = window.stream;
    }
    mediaRecorder = new MediaRecorder(window.stream, {mimeType: 'video/webm;codecs=vp9,opus'});
    console.log(mediaRecorder);
    video.muted = false; 
    mediaRecorder.start();
    
    mediaRecorder.ondataavailable = recordVideo;
}
function recordVideo(event) {
    if (event.data && event.data.size > 0) {
        video.srcObject = null;
        let videoURL = URL.createObjectURL(event.data);
        video.src = videoURL;
        console.log(videoURL);
        console.log(video.src);
    }
}
function stopRecording() {
    mediaRecorder.stop();
}

function storeVar(value){
    let amount = value;
    // some stuff 
}

init();

finalButton.onclick = function () {finalize()};
function finalize() {
    const blob = new Blob(recordedBlobs, {type: 'video/mp4'});
    blob.lastModifiedDate = new Date();
    blob.name = "test.mp4"
    const url = URL.createObjectURL(blob);
    console.log(url);
    document.getElementById("test-url").innerHTML = url;
    
}



BASE = "http://localhost:3000";
async function getQuestion() {
    const options = { 
      method: 'GET', // specify this is a GET request, not a PUT or POST
      headers: {
        "Accept" : "application/json" // request the response in JSON format
      }
    }
    try {
        // the final fetch request
        const response = await fetch(BASE + "/question", options).then((response)=>response.json());
        console.log(response.question)
        document.getElementById("cool_q").innerText = response.question
    } catch (error){
      console.log(error);
    }
  };
getQuestion()