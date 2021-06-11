var firebaseConfig = {
      apiKey: "AIzaSyBMx9D1918kbCJNE-59SQ7OA2V83WbKTms",
      authDomain: "kwitter-8d5c0.firebaseapp.com",
      databaseURL: "https://kwitter-8d5c0-default-rtdb.firebaseio.com",
      projectId: "kwitter-8d5c0",
      storageBucket: "kwitter-8d5c0.appspot.com",
      messagingSenderId: "392967538450",
      appId: "1:392967538450:web:a2ec54b53dea07bc1d15cb"
};
firebase.initializeApp(firebaseConfig);

Username = localStorage.getItem("Username");
document.getElementById("Hello").innerHTML = "Hi " + Username + "!";

function AddRoom() {
      RoomName = document.getElementById("Room").value;
      firebase.database().ref("/" + RoomName).child(RoomName).update({
            purpose: "Add User"
      });
      localStorage.setItem("RoomName", RoomName);
      window.location = "page.html";
}

function getData() {
      firebase.database().ref("/").on('value', function (snapshot) {
            document.getElementById("Output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  Rooms = childKey;
                  console.log("Room " + Rooms);
                  Row = "<div class='roomname' id='" + Rooms + "' onclick='RedirectToRoom(this.id)'>#" + Rooms + "</div><hr>";
                  document.getElementById("Output").innerHTML += Row;
            });
      });
}
getData();

function RedirectToRoom(Name) {
      console.log(Name);
      localStorage.setItem("RoomName", Name);
      window.location = "page.html";
}

function LogOut() {
      localStorage.removeItem("Username");
      localStorage.removeItem("RoomName");
      window.location = "index.html";
}