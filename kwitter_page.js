var firebaseConfig = {
    apiKey: "AIzaSyBEFBRr9LoIKa0n9_WjMZe4BcWc7WbpiJM",
    authDomain: "let-s-chat-web-app-3ee81.firebaseapp.com",
    databaseURL: "https://let-s-chat-web-app-3ee81-default-rtdb.firebaseio.com",
    projectId: "let-s-chat-web-app-3ee81",
    storageBucket: "let-s-chat-web-app-3ee81.appspot.com",
    messagingSenderId: "211492660817",
    appId: "1:211492660817:web:9029121cc89e7994017a70",
    measurementId: "G-000TDPR43G"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  room_name = localStorage.getItem("roomname");
  user_name = localStorage.getItem("username");

  function send_msg() {
      message = document.getElementById("send_message").value;
      firebase.database().ref(room_name).push({
          msg: message,
          name: user_name,
          like: 0
      });
      document.getElementById("send_message").value = "";
  }

  function logOut() {
    window.location = "kwitter.html";
    localStorage.removeItem("username");
    localStorage.removeItem("roomname");
}

function getData() {
    firebase.database().ref("/"+room_name).on('value', function(snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function(childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if(childKey != "purpose") {
                firebase_message_id = childKey;
                message_data = childData;
                //Start code
                console.log(firebase_message_id);
                console.log(message_data);
                sender_name = message_data['name'];
                sender_message = message_data['msg'];
                sender_like = message_data['like'];
                name_tag = "<h3>" + sender_name + "<img src='tick.png' class='user_tick' </h3> <hr>";
                msg_tag = "<h4>" + sender_message + "</h4> <hr>";
                like_btn = "<button id='"+firebase_message_id+"' class='btn btn-primary' onclick='update_like(this.id)' value='"+sender_like+"'> <hr>";
                span_likeTag = "<span class='glyphicon glyphicon-thumbs-up'> Like: '"+sender_like+"' </span> </button> <hr>"
                row = name_tag + msg_tag + like_btn + span_likeTag;
                document.getElementById("output").innerHTML += row;
                //End code
            }
        });
    });
}
getData();

function update_like(message_id) {
    console.log(message_id);
    new_like = document.getElementById(message_id).value;
    no_of_likes = Number(new_like) + 1;
    firebase.database().ref(room_name).child(message_id).update({
        like: no_of_likes
    });
}