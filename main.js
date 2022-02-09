var SpeechRecognition = window.webkitSpeechRecognition;

var recognition = new SpeechRecognition();

function speak(){
    var synth = window.speechSynthesis;

   // voice=window.speechSynthesis.getVoices();

    speak_data ="Show a Elephant, monkey, teddy bear or rabbit. Results may not be accurate, but that is the best we can do!!";

    console.log("AI spoken successfully");

    var utterThis = new SpeechSynthesisUtterance(speak_data);

    //utterance.voice=voices[1];

    synth.speak(utterThis);
}

Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:720
});

camera= document.getElementById("camera");

Webcam.attach( '#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/> ';
        //console.log(data_uri);
    });
}
console.log('ml5 version',ml5.version);

classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QtcFFC-sG/model.json',modelLoaded);

function modelLoaded(){
    console.log('Model Loaded');
}

function check(){
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, results){
    if(error){
        console.log(error);
    }else{
        console.log(results);
        prediction=results[0].label;
        accuracy=(results[0].confidence.toFixed(3))*100; 
        console.log("AI spoken successfully again");
        speak_data="The image is identified as a "+prediction+" and the accuracy is "+accuracy+"%";
        var synth=window.speechSynthesis;
        var utterThis = new SpeechSynthesisUtterance(speak_data);
        synth.speak(utterThis);
        document.getElementById("result_object_name").innerHTML = results[0].label;
        document.getElementById("result_object_accuracy").innerHTML = (results[0].confidence.toFixed(3))*100+"%"; 
    }
}

