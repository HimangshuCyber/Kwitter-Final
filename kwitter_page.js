const firebaseConfig = { 
      apiKey: "AIzaSyCqnacU7NqV72icuW43shtTLJbk1bN3AIs", 
      authDomain: "himangshukwitter.firebaseapp.com", 
      databaseURL: "https://himangshukwitter-default-rtdb.firebaseio.com", 
      projectId: "himangshukwitter", 
      storageBucket: "himangshukwitter.appspot.com", 
      messagingSenderId: "1076469463787", 
      appId: "1:1076469463787:web:a54685d11983554b6f9cae" 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
//YOUR FIREBASE LINKS
user_name = localStorage.getItem('userName');
room_name = localStorage.getItem('room_name')
function send() {
      msg = document.getElementById('msg').value;
      firebase.database().ref(room_name).push({
            name: user_name,
            message: msg,
            like: 0
      });

      document.getElementById('msg').value = "";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; childData = childSnapshot.val(); if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        //Start code
                        console.log(firebase_message_id);
                        console.log(message_data);
                        Username = message_data['name'];
                        message = message_data['message'];
                        like = message_data['like'];
                        name_with_tag = "<h4>" + Username + "<img class='user_tick' src='tick.png'></h4>";
                        message_with_tag = "<h4 class='message_h4'>" + message + "</h4>";
                        like_button = "<button class='btn btn-waring' id='+firebase_message_id +' value='+like+' onclick = 'update_like(this.id)' >";
                        span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: " +like+ "</span></button><hr>";
                        row = name_with_tag + message_with_tag + like_button + span_with_tag;
                        document.getElementById('output').innerHTML += row;
                        //End code
                  }
            });
      });
}
getData();

function logout() {
      localStorage.removeItem('userName');
      localStorage.removeItem('room_name');

      window.location = "index.html";
}
function update_like(message_id) {
      console.log(message_id);
      button_id = message_id;
      likes = document.getElementById(button_id).value;
      update_likes = Number(likes) + 1;
      console.log(update_likes);
      firebase.database().ref(room_name).child(message_id).update({
            likes: update_likes,
      });
}
