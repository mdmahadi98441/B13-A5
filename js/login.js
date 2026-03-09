document.getElementById("sing-btn").addEventListener('click',function(){

    const inputUsername = document.getElementById("input-username")
    const username = inputUsername.value
    console.log(username)

    const inputPassword = document.getElementById("input-password")
    const password = inputPassword.value
    console.log(password)



    if(username == 'admin' && password == 'admin123'){
        alert('sing in sucessful')
        window.location.assign("home.html")
    }else{
        alert('please try again')
    }
})