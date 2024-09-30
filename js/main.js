// HTML element
var passSign = document.querySelector('#passSign')
var nameSign = document.querySelector('#nameSign')
var emailSign = document.querySelector('#emailSign')
var signBtn = document.querySelector('#signBtn')
var hint = document.querySelector('#hint')
var passLog = document.querySelector('#passLog')
var emailLog = document.querySelector('#emailLog')
var logBtn = document.querySelector('#logBtn')
var error = document.querySelector('#error')
var person = document.querySelector('#person')


// varibles
var nameRegex = /^[A-Z][a-z]{5,15}$/
var emailRegex = /^[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+$/
var passRegex = /^[A-Za-z0-9]{5,15}$/
var userList = JSON.parse(localStorage.getItem('users')) || [];
var userName = JSON.parse(localStorage.getItem('username'))
if (person !== null) {
    person.innerHTML = userName
}

// function
function validate(regex, element) {
    if (regex.test(element.value)) {
        element.classList.add("is-valid")
        element.classList.remove("is-invalid")
        return true
    } else {
        element.classList.remove("is-valid")
        element.classList.add("is-invalid")
        return false
    }
}

function addUser() {
    if (passSign.value === '' || nameSign.value === '' || emailSign.value === '') {

        hint.innerHTML = `<span class="text-danger"> All inputs are requires </span>`;
    } else {

        if (validate(nameRegex, nameSign) &&
            validate(emailRegex, emailSign) &&
            validate(passRegex, passSign)) {

            for (var i = 0; i < userList.length; i++) {
                if (userList[i].email == emailSign.value) {
                    hint.innerHTML = `<span class="text-danger"> Email already exist</span>`
                    return false
                }
            }

            var user = {
                name: nameSign.value,
                email: emailSign.value,
                password: passSign.value,
            }
            // location.href = ' \index.html'
            userList.push(user)
            localStorage.setItem('users', JSON.stringify(userList))
            hint.innerHTML = `<span class="text-success">succes</span>`
        }
    }
}





function log() {
    if (passLog.value === '' || emailLog.value === '') {

        error.innerHTML = `<span class="text-danger"> All inputs are requires </span>`;
    } else {

        for (var i = 0; i < userList.length; i++) {

            if (userList[i].email !== emailLog.value &&
                userList[i].password !== passLog.value) {
                error.innerHTML = '<span class="text-danger"> incorrect email or password</span>'
                return


            } else {
                location.href = '\home.html'
                localStorage.setItem('username', JSON.stringify(userList[i].name))
                return

            }

        }
    }
}

// event
if (signBtn !== null) {
    signBtn.addEventListener('click', function () {
        addUser();
    })
}

if (logBtn !== null) {
    logBtn.addEventListener('click', function () {
        log()
    })
}
if (nameSign !== null) {
    nameSign.addEventListener('input', function () {
        validate(nameRegex, nameSign)

    })
}
if (passSign !== null) {
    passSign.addEventListener('input', function () {

        validate(passRegex, passSign)

    })
}
if (emailSign !== null) {
    emailSign.addEventListener('input', function () {
        validate(emailRegex, emailSign)

    })
}




