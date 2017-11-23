let isFirstTime = true;
let emotions = [];
let expressions = [];
const video = $('#video')[0];
const startBtn = $('#start')[0];

// SDK Needs to create video and canvas nodes in the DOM in order to function
// Here we are adding those nodes a predefined div.
const divRoot = $('#affdex_elements')[0];
const width = 640;
const height = 480;
const faceMode = affdex.FaceDetectorMode.LARGE_FACES;
// Construct a CameraDetector and specify the image width / height and face detector mode.
const detector = new affdex.CameraDetector(divRoot, width, height, faceMode);

// Enable detection of all Expressions, Emotions and Emojis classifiers.
detector.detectAllEmotions();
detector.detectAllExpressions();

// Add a callback to notify when the detector is initialized and ready for runing.
detector.addEventListener('onInitializeSuccess', function() {
    // Display canvas instead of video feed because we want to draw the feature points on it
    $('#face_video_canvas').css('display', 'block');
    $('#face_video').css('display', 'none');
});

// Add a callback to notify when camera access is denied
detector.addEventListener('onWebcamConnectFailure', function() {
    console.log('Webcam access denied');
});

// Add a callback to receive the results from processing an image.
// The faces object contains the list of the faces detected in an image.
// Faces object contains probabilities for all the different expressions, emotions and appearance metrics
detector.addEventListener('onImageResultsSuccess', function(faces, image, timestamp) {
    if (isFirstTime) {
        video.play();
        console.log('Detect success');
        isFirstTime = false;
    }
    console.log('Timestamp: ' + video.currentTime);
    if (faces.length > 0) {
        faces[0].emotions.timestamp = video.currentTime;
        emotions.push(faces[0].emotions);
        faces[0].expressions.timestamp = video.currentTime;
        expressions.push(faces[0].expressions);
    }
});

video.addEventListener('ended', function() {
    onStop();
}, true);

startBtn.addEventListener('onclick', function() {
    onStart();
});

// function executes when Start button is pushed.
function onStart() {
    if (detector && !detector.isRunning) {
        detector.start();
    }
    $('#start').hide();
}

// function executes when the Stop button is pushed.
function onStop() {
    if (detector && detector.isRunning) {
        detector.removeEventListener();
        detector.stop();
    }
    const name = decodeURI(location.pathname).split('\/')[1];
    const num = decodeURI(location.pathname).split('\/')[2];
    console.log(name, num);

    sendData(name, num);
    saveData(name, num);
};

function sendData(name, num) {
    const url = 'http://localhost:8080/' + name + '/' + num;
    const data = JSON.stringify({
        emotions,
        expressions,
    });

    console.log(data);

    $.ajax({
        type: 'POST',
        url: url,
        data: data,
        dataType: 'text/json',
        success: function(res) {
            console.log(res);
        },
    });
};

function saveData(name, num) {
    const data = JSON.stringify({
        emotions,
        expressions,
    });
    localStorage.setItem(name + '_' + num, data);
};
