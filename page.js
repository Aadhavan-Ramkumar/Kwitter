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
RoomName = localStorage.getItem("RoomName");

function SendMessage() {
      Message = document.getElementById("Message").value;
      firebase.database().ref(RoomName).push({
            Name: Username,
            Message: Message,
            Like: 0
      });

      document.getElementById("Message").value = "";
}

function getData() {
      firebase.database().ref("/" + RoomName).on('value', function (snapshot) {
            document.getElementById("Output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key;
                  childData = childSnapshot.val();
                  if (childKey != "purpose") {
                        MessageID = childKey;
                        MessageData = childData;
                        console.log(MessageID);
                        console.log(MessageData);
                        if (MessageData['Name'] != undefined) {
                              Name = MessageData['Name'];
                              NameTag = "<h4>" + Name + "<img class='tick' src='Tick.png'</h4>";
                              if (MessageData['Message'] != undefined) {
                                  Message = MessageData['Message'];
                                  MessageTag = "<h4 class='message'>" + Message + "</h4>";
                                  if (MessageData['Like'] != undefined) {
                                      Like = MessageData['Like'];
                                      LikeButton = "<button class='btn btn-warning' id='" + MessageID + "' value=" + Like + " onclick='UpdateLike(this.id)'>";
                                      SpanTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: " + Like + "</span></button><hr>";
                                      Row = NameTag + MessageTag + LikeButton + SpanTag;
                                      document.getElementById("Output").innerHTML += Row;
                                  }
                              }
                          }
                  }
            });
      });
}
getData();

function UpdateLike(MessageID) {
      console.log("Liked - " + MessageID);
      ButtonID = MessageID;
      Likes = document.getElementById(ButtonID).value;
      UpdatedLikes = Number(Likes) + 1;
      console.log(UpdatedLikes);

      firebase.database().ref(RoomName).child(MessageID).update({
            Like: UpdatedLikes
      });
}

function LogOut() {
      localStorage.removeItem("Username");
      localStorage.removeItem("RoomName");
      window.location = "index.html";
}