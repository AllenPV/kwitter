const config = {
    apiKey: "AIzaSyBrQvYWF09oGcBg_IyI--iD_ZThKKTNa4E",
    authDomain: "chat-app-d7c9f.firebaseapp.com",
    databaseURL: "https://chat-app-d7c9f-default-rtdb.firebaseio.com",
    projectId: "chat-app-d7c9f",
    storageBucket: "chat-app-d7c9f.appspot.com",
    messagingSenderId: "167230524572",
    appId: "1:167230524572:web:d516688efc12fe86823159"
  };
firebase.initializeApp(config);
var Username = localStorage.getItem("Username");
document.getElementById("User_Name").innerHTML = "Welcome " + Username + "!";

function Add_Room_Name() {
    Room_name = document.getElementById("Room_name").value;
    firebase.database().ref("/").child(Room_name).update({
        purpose: "Adding Room Name"
    });
    localStorage.setItem("Room_name", Room_name);
    window.location = "kwitter_page.html";
}

function Get_Data() {
    firebase.database().ref("/").on('value',
        function (snapshot) {
            document.getElementById("output").innerHTML = "";
            snapshot.forEach(function (childSnapshot) {
                childKey = childSnapshot.key;
                Room_names = childKey
                console.log("Room_name -" + Room_names);
                row = "<div class = 'Room_name'id = " + Room_names + "onclick = 'redirectToRoomName(this.id)'>#"+Room_names+"</div><hr>";
                document.getElementById("output").innerHTML += row;
            });
        });
}
Get_Data();

function redirectToRoomName(name)
{
    console.log(name);
    localStorage.setItem("Room_name",name);
    window.location("kwitter_page.html");
}
function Logout()
{
    localStorage.removeItem("User_Name");
    localStorage.removeItem("Room_name");
    window.location = "Login_page.html"
}
