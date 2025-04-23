console.log("streamCapture.js loaded");

const displayMediaOptions = {
  video: {
    displaySurface: "window",
  },
  audio: false,
};

const videoElem = document.getElementById("video");

const initScreenCapture = () => {
  const startElem = document.getElementById("start");
  const stopElem = document.getElementById("stop");
  if (!videoElem) return;

  // Options for getDisplayMedia()


  // Set event listeners for the start and stop buttons
  startElem.addEventListener(
    "click",
    (evt) => {
      startCapture();
    },
    false
  );

  stopElem.addEventListener(
    "click",
    (evt) => {
      stopCapture();
    },
    false
  );
};

async function startCapture() {
  try {
    videoElem.srcObject = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
  } catch (err) {
    console.error(err);
  }
}

function stopCapture(evt) {
  let tracks = videoElem.srcObject.getTracks();

  tracks.forEach((track) => track.stop());
  videoElem.srcObject = null;
}

initScreenCapture()