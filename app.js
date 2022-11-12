// button shit 
const videoButton = document.getElementById('main_video-button');
const video = document.getElementById('main_video');

let mediaRecorder;

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
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo;
}
function recordVideo(event) {
    if (event.data && event.data.size > 0) {
        video.srcObject = null;
        let videoUrl = URL.createObjectURL(event.data);
        video.src = videoUrl;
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
