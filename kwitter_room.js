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

userName = localStorage.getItem('userName');
function add_room(){
      room_name = document.getElementById('room_name').value;
      if(room_name == ''){
            document.getElementById('error_label').style.fontSize = "24px";
      }
      else{
            firebase.database().ref("/").child(room_name).update(
                  {
                        purpose: "adding life"
                  }
            );
            localStorage.setItem("room_name", room_name);
            window.location = 'kwitter_page.html';    
      }
}
function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}
function getData() {firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      //Start code
      console.log(Room_names);
      row = "<div class='room_name' id=" + Room_names + " onclick='redirectToRoomName(this.id)' ><span id='X'>#</span>" + Room_names + "</div><hr>";
      document.getElementById('output').innerHTML += row;

      //End code
      });});}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout() {
      localStorage.removeItem("user_name");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}