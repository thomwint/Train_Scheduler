// Initialize Firebase
const config = {
  apiKey: "AIzaSyDfJ3fRv6FZZrKSKqK9VMbfPiRaqQJeBmM",
  authDomain: "train-scheduler-a4476.firebaseapp.com",
  databaseURL: "https://train-scheduler-a4476.firebaseio.com",
  projectId: "train-scheduler-a4476",
  storageBucket: "",
  messagingSenderId: "1087108895896"
};
firebase.initializeApp(config);
//Variable to hold the database reference
const database = firebase.database();

//Initial values
let trainName = "";
let destination = "";
let trainTime = 0;
let frequency = 0;
//On submit, grab user input and push to database
$("#add-employee-btn").click(event => {
  event.preventDefault();

  trainName = $("#train-name-input")
    .val()
    .trim();
  destination = $("#destination-input")
    .val()
    .trim();
  trainTime = moment(
    $("#time-input")
      .val()
      .trim(),
    "HH:mm"
  )
    .subtract(10, "years")
    .format("X");
  frequency = $("#frequency-input")
    .val()
    .trim();
  //Push to the database
  database.ref().push({
    trainName: trainName,
    destination: destination,
    trainTime: trainTime,
    frequency: frequency,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });
  //Let the user know their input was successful and added to the html page
  alert("Train added successfully");

  //Clear the input form
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#time-input").val("");
  $("#frequency-input").val("");
});
//grab the last child from the database
database.ref().on("child_added", childSnap => {
  let train = childSnap.val().trainName;
  let trainDestination = childSnap.val().destination;
  let timeTrain = childSnap.val().trainTime;
  let trainFrequency = childSnap.val().frequency;

  //Calculate times
  let diffTime = moment().diff(moment.unix(timeTrain), "minutes");
  let timeRemainder = diffTime % trainFrequency;
  let minutesAway = trainFrequency - timeRemainder;
  let nextArrival = moment()
    .add(minutesAway, "m")
    .format("hh:mm A");
  //append the database and calc information to the new row
  let newRow = $("<tr>").append(
    $("<td>").text(train),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(minutesAway)
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
