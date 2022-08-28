//YOUR FIREBASE LINKS
var firebaseConfig = {
      apiKey: "AIzaSyDx7x6b8sFz9D2WynLYLVSYLx4trgOvlzM",
      authDomain: "kwitter-c862b.firebaseapp.com",
      databaseURL: "https://kwitter-c862b-default-rtdb.firebaseio.com",
      projectId: "kwitter-c862b",
      storageBucket: "kwitter-c862b.appspot.com",
      messagingSenderId: "420013019039",
      appId: "1:420013019039:web:58c893e79a5cd6fa17b7aa",
      measurementId: "G-15XMG0P5BV"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("user_name");
    room_name = localStorage.getItem("room_name");

    function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            like:0,
            message:msg,
            name:user_name,
      })
       }


function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
name = message_data['name'];
like = message_data['like'] ;
message = message_data['message'];
name_with_tage = "<h4> "+ name +"<img class='user_tick' src='tick.png'>";
message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
like_button = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
like_span = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";
row = name_with_tage + message_with_tag + like_button + like_span;

document.getElementById("output").innerHTML += row;


//End code
      } });  }); }
getData();

function updateLike(message_id){
      console.log("clicked on like button - " + message_id);
      button_id = message_id;
       likes = document.getElementById(button_id).value;
       updated_likes = Number(likes) + 1;
       console.log(updated_likes);


      firebase.database().ref(room_name).child(message_id).update
      ({
             like : updated_likes
             });
}






function logout(){
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
    }
    
