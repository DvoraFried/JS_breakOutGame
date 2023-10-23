let modal = document.getElementById('formPage');
const massage = document.getElementById('massage');
localStorage.setItem("playerStatus", "guest");
var new_user;
//=============================================================
window.onclick = function (event) {
    if (event.target == modal) {
        noneLogIn();
    }
}
//=============================================================

//=============================================================
function signIn() {
    let inputName = document.getElementById("name").value;
    let inputPassword = document.getElementById("password").value;
    new_user = { 'name': inputName, 'password': inputPassword };
    let users = JSON.parse(localStorage.getItem('users'));
    
    if (inputName && inputPassword) {
        if (!users) {
            users = []
        }
        let myUser = users.find(user => user.name === inputName && user.password === inputPassword);

        if (!myUser) {
            users.push(new_user);
            localStorage.setItem('users', JSON.stringify(users))
            message.innerText = " Your name has been successfully saved in the system ";
        }
        else {
            message.innerText = "The user is already registered in the system"
        }       
        localUser();
    }
    else {
        message.innerText = "You need to fill in all the details"
    }
    massage.style.display = 'none';
}
//=============================================================

//=============================================================
function logIn() {
    let inputName = document.getElementById("name").value;
    let inputPassword = document.getElementById("password").value;
    let users = JSON.parse(localStorage.getItem('users'));
    new_user = { 'name': inputName, 'password': inputPassword };

    if (inputName && inputPassword) {
        if (!users) {
            users = []
        }
        let myUser = users.find(user => user.name === inputName)
        if (myUser) {
            if (myUser.password == inputPassword) {
                message.innerText = " Login was successful ";               
                localUser();
            }
            else {
                message.innerText = " There is an error in the code, please try again ";
            }
        }
        else {
            message.innerText = " You are not registered in the system, for registration Click 'sign in' ";
        }
    }
    else {
        message.innerText = "You need to fill in all the details"
    }
}
//=============================================================

//=============================================================
function localUser() {
    localStorage.setItem('my_user', JSON.stringify(new_user));
    localStorage.setItem("playerStatus", "member");
    setTimeout(noneLogIn, 2500);
    const nameText = document.getElementById('user');
    nameText.innerText = 'welcome ' + new_user.name + '!';
}
//=============================================================

//=============================================================
function goToGame() {
    if (localStorage.getItem("playerStatus") == 'member') {
        window.location = "../htmls/breackoutGame.html";
    }
    else {
        blockLogIn();
    }
}
//=============================================================

//=============================================================
function signOut() {
    localStorage.setItem("playerStatus", 'guest')
    localStorage.removeItem('my_user');
}
//=============================================================

//=============================================================
function blockLogIn() {
    modal.style.display = 'block';
}
//=============================================================

//=============================================================
function noneLogIn() {
    modal.style.display = 'none';
}
//=============================================================
