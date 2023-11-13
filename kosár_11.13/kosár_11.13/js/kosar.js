function validateInput(event) {
    // ne lehessen 2 karakternél hosszabb számot beleírni
    let inputValue = document.getElementById("mennyiseg").value;
    if(inputValue.length >= 2){
        return false; //nem enged tovább beleírni
    }
    // ne lehessen negatív számot beleírni
    return event.charCode != 8 && event.charCode == 0 || (event.charCode >= 48 && event.charCode <= 57);
}

// minuszos gombra kattintáskor kivon 1-et a mennyiségből
function minusOne(){
    // ha a mennyiség elérte a 0-át akkor az értéket tartsa 0-nál és ne engedje lejebb menni
    if(document.getElementById("mennyiseg").value == 0){
        document.getElementById("mennyiseg").value == 0;
    }
    // ha az érték 0-nál nagyobb vonjon ki belőle 1-et
    else{
        document.getElementById("mennyiseg").value -= 1;
    }
}

//plusszos gombbra kattintáskor hozzáad a mennyiséghez 1-et
function plusOne(){
    // maximum 99-ig lehet emelni a mennyiséget
    if(document.getElementById("mennyiseg").value == 99){
        document.getElementById("mennyiseg").value = 99;
    }
    else{
        //parseInt kell, mert különben stringként kezeli és 1-eseket rak egymás után
        document.getElementById("mennyiseg").value = parseInt(document.getElementById("mennyiseg").value) + 1;
    }
}

//---------------------------
// mennyiség változtatásánál változzon a termék ár része is
function arValtozas(){
    document.getElementById("ar").innerHTML = document.getElementById("mennyiseg").value * 1000 + " Ft";
}