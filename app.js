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
        // alert(firebase.auth().currentUser.email + '\n' + firebase.auth().currentUser.displayName);
        let profileImg = document.getElementById('profileImg');
        profileImg.src = firebase.auth().currentUser.photoURL;
        profileImg.title = firebase.auth().currentUser.displayName;

    }
}

//calling auth state changed
onFirebaseStateChanged();
