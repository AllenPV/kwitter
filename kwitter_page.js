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
User_name = localStorage.getItem("Username");
Room_name = localStorage.getItem("Room_name");

function send() {
    message = document.getElementById("msg").value;
    firebase.database().ref(Room_name).push({
        Name: User_name,
        message: message,
        like: 0
    });
    document.getElementById("msg").value = "";
}

function Get_Data() {
    firebase.database().ref("/" + Room_name).on('value', function (snapshot) {
        document.getElementById("output").innerHTML = "";
        snapshot.forEach(function (childSnapshot) {
            childKey = childSnapshot.key;
            childData = childSnapshot.val();
            if (childKey != "purpose") {
                firebase_message_id = childKey;
                console.log(firebase_message_id);
                message_data = childData;
                console.log(message_data);
                Name = message_data['Name'];
                message = message_data['message']
                like = message_data['like'];
                row = "<h4>" + Name + "<img src = 'Tick.png' class = 'user_tick'></h4><h4 class = 'message_h4'>" + message +
                    "</h4><button class = 'btn btn-warning'id = '" + firebase_message_id +
                    " ' value = '" + like + " ' onclick = 'updateLike(this.id)'><span class = 'glyphicon glyphicon-thumbs-up'>Like : " +
                    like + "</span></button><hr>";
                document.getElementById("output").innerHTML = row;
            }
        });
    });
    
}
Get_Data();


function updateLike(message_id) {
    button_id = message_id;
    likes = document.getElementById(button_id).value;
    Likes_in_no = Number(likes) + 1;
    console.log(Likes_in_no);
    firebase.database().ref(Room_name).child(message_id).update({
        Name: User_name,
        message: message,
        like: Likes_in_no
    });

}

function Logout() {
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location.replace("Login_page.html");
}