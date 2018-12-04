var wszystkieInterwaly = [];

function ruszRobala1D() {
    dodajPunkt1D();
    rysujTabW2D(robal1D);
}

function ruszRobala2D() {
    dodajPunkt2D();
    rysujTabW2D(robal2D);
}

function animujRobala1D() {
    wszystkieInterwaly.push(setInterval(ruszRobala1D, 100));
    document.getElementById("wynik").style="background-color: GreenYellow;";
}

function animujRobala2D() {
    wszystkieInterwaly.push(setInterval(ruszRobala2D, 100));
    document.getElementById("wynik").style="background-color: GreenYellow;";
}

function wstrzymajGre(){
    for (var i = 0; i<wszystkieInterwaly.length; i++){
        clearInterval(wszystkieInterwaly[i]);
    }
    document.getElementById("wynik").style="background-color: LightCoral;";
}