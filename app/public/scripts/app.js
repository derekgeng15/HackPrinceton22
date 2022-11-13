BASE = "http://localhost:3000";
function downloadBlob(blob, name = 'file.txt') {
    // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
    const blobUrl = URL.createObjectURL(blob);

    // Create a link element
    const link = document.createElement("a");

    // Set link's href to point to the Blob URL
    link.href = blobUrl;
    link.download = name;

    // Append link to the body
    document.body.appendChild(link);

    // Dispatch click event on the link
    // This is necessary as link.click() does not work on the latest firefox
    link.dispatchEvent(
        new MouseEvent('click', {
            bubbles: true,
            cancelable: true,
            view: window
        })
    );

    // Remove link from body
    document.body.removeChild(link);
}

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
    mediaRecorder = new MediaRecorder(window.stream, { mimeType: 'video/webm;codecs=vp9,opus' });
    mediaRecorder.start();
    mediaRecorder.ondataavailable = recordVideo;
}
// async function saveFile(blob) {

//     const buffer = Buffer.from(await blob.arrayBuffer());

//     fs.writeFile('video.webm', buffer, () => console.log('video saved!'));

// }
async function sendBlob(bloburl) {
    let options = {
        method: 'POST', // specify this is a POST request, not a PUT or POST
        headers: {
            "Accept": "application/json", // request the response in JSON format
            'Content-Type': 'application/json'
        },
        body: 
            JSON.stringify({"text": bloburl})
    }
    try {
        console.log(options)
        const response = await fetch(BASE + "/vidsaver/Derek", options).then((response) => response.json());
        console.log(response)
    } catch (error) {
        console.log(error);
    }
};
function recordVideo(event) {
    if (event.data && event.data.size > 0) {
        blob = event.data;
        bloburl = URL.createObjectURL(blob)
        console.log(bloburl);
        // sendBlob(bloburl)
    }
}
function stopRecording() {
    mediaRecorder.stop();
}


function storeVar(value) {
    let amount = value;
    // some stuff 
}

init();

finalButton = document.getElementById("finalize-button")
finalButton.onclick = function () {
    finalize();
    document.getElementById('stories-button').style.visibility='visible';
    console.log('finalize clicked');
};
function finalize() {
    // const blob = new Blob(recordedBlobs, {type: 'video/mp4'});
    // blob.lastModifiedDate = new Date();
    // blob.name = "test.mp4"
    // const url = URL.createObjectURL(blob);
    // console.log(url);
    
}



BASE = "http://localhost:3000"
async function getQuestion() {
    const options = {
        method: 'GET', // specify this is a GET request, not a PUT or POST
        headers: {
            "Accept": "application/json" // request the response in JSON format
        }
    }
    try {
        const response = await fetch(BASE + "/question", options).then((response) => response.json());
        console.log(response.question)
        document.getElementById("cool_q").innerText = response.question
    } catch (error) {
        console.log(error);
    }
};

getQuestion()