function start(id) {
    document.getElementById('chatArea').removeAttribute('style');
    document.getElementById('chatBegin').setAttribute('style','display:none');
    hideChatList();
    
}

function newChat() {
    document.getElementById('leftBox').classList.remove('d-none', 'd-md-block');
    document.getElementById('rightBox').classList.add('d-none');
}

function hideChatList() {
    document.getElementById('leftBox').classList.add('d-none', 'd-md-block');
    document.getElementById('rightBox').classList.remove('d-none');
}

function onKeyDown() {
    document.addEventListener('keydown',function(key) {
        if(key.keyCode === 13){
         sendMessage();
        }
        
    })
    
}

function sendMessage() {

    let sentMessage = ` <div class="row justify-content-end">
                            
    <div class="col-6 col-sm-7 col-md-7">
        <p class="chatSent float-right">${document.getElementById('textMessage').value}
        <span class="time float-right"> 2:00 am</span>
    </p>
    </div>
    <div class="col-2 col-sm-1 col-md-1">
        <img src="/images/profileImage.png" class="chatImg" alt="">
    </div>
</div>`;
    document.getElementById('message').innerHTML += sentMessage;
    document.getElementById('textMessage').value = "";
    document.getElementById('textMessage').focus();

    document.getElementById('message').scrollTo(0,document.getElementById('message').clientHeight);

}

let mess = document.getElementById('textMessage');
let faArr = document.getElementById('rightArrow');
mess.addEventListener('onchange',function(){
    if (mess.value !='') {
        faArr.setAttribute('class','fa fa-arrow-right');
        
    }
})


//firebase work
function signIn(){
    let provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider);
}

function signOut(){
    firebase.auth().signOut();
}

function onFirebaseStateChanged(){
    firebase.auth().onAuthStateChanged(onStateChanged);
}

function onStateChanged(user){
    if (user) {

        let userProfile = {
            email:'',
            name:'',
            photoURL:''
        }
        userProfile.email = firebase.auth().currentUser.email;
        userProfile.name = firebase.auth().currentUser.displayName;
        userProfile.photoURL = firebase.auth().currentUser.photoURL;


        let db = firebase.database().ref('users');
        let flag = false;
        db.on('value',function(users){
            users.forEach(function(data) {
                let user = data.val();
                if(user.email === userProfile.email)
                flag = true;

            })
            if(flag === false){
                firebase.database().ref('users').push(userProfile,callback);
            }
            else{
                let profileImg = document.getElementById('profileImg');
                profileImg.src = firebase.auth().currentUser.photoURL;
                profileImg.title = firebase.auth().currentUser.displayName;
        
                let signInLink = document.getElementById('signInLink');
                let signOutLink = document.getElementById('signOutLink');
        
                signInLink.style = 'display:none';
                signOutLink.style = '';   
            }
        })


    }
    else{
        let profileImg = document.getElementById('profileImg');
        profileImg.src = '/images/profileImage.png';
        profileImg.title = '';

        let signInLink = document.getElementById('signInLink');
        let signOutLink = document.getElementById('signOutLink');

        signInLink.style = '';
        signOutLink.style='display:none';

    }
}

function callback(error) {
    if(error){
        alert(error);
    }
    else{

        let profileImg = document.getElementById('profileImg');
        profileImg.src = firebase.auth().currentUser.photoURL;
        profileImg.title = firebase.auth().currentUser.displayName;

        let signInLink = document.getElementById('signInLink');
        let signOutLink = document.getElementById('signOutLink');

        signInLink.style = 'display:none';
        signOutLink.style = '';
    }
}

//calling auth state changed
onFirebaseStateChanged();


//populate friend list 
function populateFriendList() {
    let lstFriend = document.getElementById('listFriend');
    lstFriend.innerHTML = `<div class="text-center"> <span class="spinner-border text-primary mt-5" style="width:7rem;height:7rem"> </span> </div>`

    let db = firebase.database().ref('users');
    let list = '';
    db.on('value',function(users){
        if (users.hasChildren()) {
            list = ` <li class="list-group-item" style="background-color: #f8f8f8;">
            <input type="text" placeholder="Search or new chat" class="form-control form-round">
        </li>`
        }

        users.forEach(function(data){
            let user = data.val();
            list += ` <li class="list-group-item list-group-item-action" onclick="start(this)">
            <div class="row">
                <div class="col-md-2">
                    <img src="${user.photoURL}" class="rounded-circle usersImg" alt="">
                </div>
                <div class="col-md-10" style="cursor: pointer;">
                    <div class="name">${user.name}</div>
                </div>

            </div>
        </li>`
        });

        lstFriend.innerHTML = list 
    })





}