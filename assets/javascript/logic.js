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
  //variable for firebase
  var database = firebase.database();
  //initial variables for input
  var trainName = "";
  var destination = "";
  var firstTrainTime = "";
  var frequency = 0;
  //button event for submit action
  $("#run-search").on("click", function(event) {
      event.preventDefault();
      //variales to pull user input from textbox
      var trainName = $("#trainName").val().trim();
      var destination = $("#destination").val().trim();
      var trainTime = moment($("#trainTime").val().trim(), "HH:mm").format("X");
      var frequency = $("#frequency").val().trim();
      //variable to create local temporary object to hold input data
      var trainInput = {
          train: trainName,
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

      //Clear the textboxes after employee input
      $("#trainName").val("");
      $("#destination").val("");
      $("#trainTrain").val("");
      $("#frequency").val("");

  });
  //Add firebase event to add employee data to database
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
      console.log(childSnapshot.val());
      //Store everything into a variable
      var trainName = childSnapshot.val().train;
      var destination = childSnapshot.val().destination;
      var trainTime = childSnapshot.val().time;
      var frequency = childSnapshot.val().frequency;
      //Check stored info
      console.log(trainName);
      console.log(destination);
      console.log(trainName);
      console.log(frequency);
      //Reformat/prettify the time info
      var trainTimePretty = moment(trainTime).format("HH:mm");
      //variable to calculate next arrival time
      var nextArrival = nowMoment.add(minutesAway, "minutes");
      var formatNextArrival = nextArrival.format("HH:mm");
      console.log("Next arrival: " + nextArrival);
      //variable to calculate minutes away (current time subtracted from trainTime - show in minutes)
      var firstTrainTime = moment(firstTrainTime, 'HH:mm');
      //variable for time now
      var timeNow = moment();
      //variables to calculate math for minutes Away data
      var minutesSinceFirstArrival = nowMoment.diff(firstTrainMoment, 'minutes');
      var minutesSinceLastArrival = minutesSinceFirstArrival % frequency;
      var minutesAway = frequency - minutesSinceLastArrival;
      console.log("Minutes away: " + minutesAway);
      //Add input data to table in HTML
      //$("#trains > tbody").append("<tr><td>" + trainName + "<tr><td>" + destination + "<tr><td>" + frequency "<tr><td>" + nextArrival + "<tr><td>" + minutesAway + "<tr><td>");
  	});
