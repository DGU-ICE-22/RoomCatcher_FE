function changePhone1() {
    
    const phone1 = document.getElementById("phone1").value
    if(phone1.length === 3) {
        document.getElementById("phone2").focus()
    }
}

function changePhone2() {

    const phone2 = document.getElementById("phone2").value
    if(phone2.length === 4) {
        document.getElementById("phone3").focus()
    }
}

function changePhone3() {

    const phone1 = document.getElementById("phone1").value
    const phone2 = document.getElementById("phone2").value
    const phone3 = document.getElementById("phone3").value

    if (phone1.length === 3 && phone2.length === 4 && phone3.length === 4) {
        document.getElementById("token__button").style = "background-color: #FFFFFF; color: #0068ff; cursor: pointer;"
        document.getElementById("token__button").removeAttribute("disabled")
    }
}

function getToken() {
    const token = String(Math.floor(Math.random() * 1000000)).padStart(6, "0")
    document.getElementById("token").innerText = token

    document.getElementById("token__button").style = "background-color: #ffffff; cusor: default;"
    document.getElementById("token__button").setAttribute("disabled", "ture")
    document.getElementById("token__timer__finish").style = "background-color: #0068ff; color:#ffffff cursor: pointer"
    document.getElementById("token__timer__button").removeAttribute("disabled")
    getTokenTimer()
}

let interval
function getTokenTimer() {
    
}