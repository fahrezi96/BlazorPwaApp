let constraints = {
    video: { facingMode: "user" },
    audio: false,
};

const cameraView = document.querySelector("#camera--view");
const cameraOutput = document.querySelector("#camera--output");
const cameraSensor = document.querySelector("#camera--sensor");
const cameraTrigger = document.querySelector("#camera--trigger");
let userMedia;

function cameraStart() {
    userMedia = navigator.mediaDevices.getUserMedia(constraints);
    document.getElementById('camera').classList.remove('hide');
    userMedia
        .then((stream) => {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch((error) => {
            console.error("Oops. Something is broken.", error);
        });
}

cameraTrigger.onclick = () => {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
};

document.getElementById('loadCamera').addEventListener("click", cameraStart, false);
document.getElementById('closeCamera').addEventListener("click", () => {
    document.getElementById('camera').classList.add('hide');
    userMedia
        .then((stream) => {
            stream.getTracks().forEach(function (track) {
                track.stop();
            });
        })
        .catch((error) => {
            console.error("Oops. Something is broken.", error);
        });
}, false);

        //window.addEventListener("load", cameraStart, false);