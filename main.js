Webcam.set({
    width: 320,
    height: 240,
    image_format: 'jpeg',
    jpeg_quality: 90
 });
 console.log(ml5.version);
 Webcam.attach( "#cam" );
 function Take(){
    Webcam.snap( function(data_uri) {
        // display results in page
        document.getElementById('pic').innerHTML = 
         '<img id="img" src="'+data_uri+'"/>';
    } );
 }
 classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/kui_L3kDq/model.json", onModelReady);
 function onModelReady(){
     console.log("model loaded");
 }
function predict(){
   img=document.getElementById("img");
   classifier.classify(img,got_result);
}
function got_result(error,results){
    if(error){
        console.error(error);
    }
    else{
        console.log(results);
        prediction1=results[0].label;
        prediction2=results[1].label;
        speak();
        document.getElementById("result_emotion_name_1").innerHTML=prediction1;
        document.getElementById("result_emotion_name_2").innerHTML=prediction2;
    }
}
function speak(){
    synth=window.speechSynthesis;
    speak_data="The computer thinks you are holding up the "+prediction1+" sign but it also think you might be holding up the "+prediction2+" sign.";
    speak_object=new SpeechSynthesisUtterance(speak_data);
    synth.speak(speak_object);
}