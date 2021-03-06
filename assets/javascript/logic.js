//Create firebase link
// Initialize Firebase
var config = {
    apiKey: "AIzaSyBvEiU0jb5KA1tcd5O2qUivXXw7l4Hp-0Q",
    authDomain: "trainscheduler-29851.firebaseapp.com",
    databaseURL: "https://trainscheduler-29851.firebaseio.com",
    projectId: "trainscheduler-29851",
    storageBucket: "trainscheduler-29851.appspot.com",
    messagingSenderId: "449852379869"
};
firebase.initializeApp(config);
//variable for firebase database
var database = firebase.database();
//initial variables for input
var trainName = "";
var destination = "";
var firstTrainTime = "";
var frequency = 0;
var minutesSinceFirstArrival = 0;
//button event for submit action
$("#run-search").on("click", function(event) {
    event.preventDefault()
    //variales to pull user input from textbox
    var trainName = $("#trainName").val().trim();
    var destination = $("#destination").val().trim();
    var trainTime = moment($("#trainTime").val().trim(), "HH:mm").subtract(10, "years").format("X");
    var frequency = $("#frequency").val().trim();
    //variable to create local temporary object to hold input data
    var trainInput = {
        name: trainName,
        destination: destination,
        time: trainTime,
        frequency: frequency
    };
    //Call to upload input data to the database
    database.ref().push(trainInput);
    //Console log to check input data
    console.log(trainInput.trainName);
    console.log(trainInput.destination);
    console.log(trainInput.trainTime);
    console.log(trainInput.frequency);

    //Alert
    alert("Train successfully added.");

    //Clear the textboxes after employee input
    $("#trainName").val("");
    $("#destination").val("");
    $("#trainTrain").val("");
    $("#frequency").val("");

    return false;
});
//Add firebase event for adding trains to database and add row into HTML when a user adds an entry
database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log(childSnapshot.val());
    //Store everything into a variable
    var tName = childSnapshot.val().train;
    var tDestination = childSnapshot.val().destination;
    var tTrainTime = childSnapshot.val().time;
    var tFrequency = childSnapshot.val().frequency;

    //Check stored info
    console.log("train name: " + trainName);
    console.log("destination: " + destination);
    console.log("train time: " + trainTime);
    console.log("frequency: " + frequency);

    // Calculate the minutes until arrival using math
    // For minutes til arrival, take the current time in unix and subtract the Train time
    // and find the modules between the difference and the frequency.
    var differenceTimes = moment().diff(moment.unix(tTrainTime), "minutes");
    var tRemainder = moment().diff(moment.unix(tTrainTime), "minutes") % tFrequency;
    var tMinutes = tFrequency - tRemainder;

    // To calculate the arrival time, add the tMinutes to the currrent time
    var tArrival = moment().add(tMinutes, "m").format("hh:mm A");

  console.log(tMinutes);
  console.log(tArrival);
  console.log(moment().format("hh:mm A"));
  console.log(tArrival);
  console.log(moment().format("X"));


    // //Reformat the time info
    // var trainTimeReformat = moment.unix(trainTime).format("HH:mm");
    // //variable to calculate next arrival time
    // var nextArrival = moment().add(minutesAway, "minutes").format("HH:mm");

    // console.log("Next arrival: " + nextArrival);
    // //variable to calculate minutes away (current time subtracted from trainTime - show in minutes)
    // var firstTrainTime = moment(trainTime);

    // /* Sample Code for changing unix timestamp into moment js time
    // //change from unix to moment js time
    // const unixTimestamp = +new Date();
    // const exampleTime = moment.unix(unixTimestamp);
    // exampleTime.format('HH:mm')
    // */

    // //variable for time now
    // var timeNow = moment().format("HH:mm");
    // console.log("current time: " + timeNow);
    // //variables to calculate math for minutes Away data
    // var minutesSinceLastArrival = moment().diff(moment.unix(firstTrainTime), 'minutes') % frequency;

    // /* Original code for changing minutes away data - saved as reference. Revised version implemented above
    // //variables to calculate math for minutes Away data
    // var minutesSinceFirstArrival = moment().diff(moment.unix(firstTrainTime), 'minutes');
    // //redefine variable
    // var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
    // */

    // var minutesAway = frequency - minutesSinceLastArrival;
    // console.log("Minutes away: " + minutesAway);

    //Add input data to table in HTML
    $("#trains > tbody").append("<tr><td>" + tName + "</td><td>" + tDestination + "</td><td>"
  + tFrequency + "</td><td>" + tArrival + "</td><td>" + tMinutes + "</td></tr>");
});