
var dlugoscRobala = 4;
var robal2D = [];
var kierunek = { x: 1, y: 0 }

function aktualizujWynik() {
    document.getElementById("wynik").value = robal2D.length - 1;
}

function wyznaczKierunek(e) {
    var kodZnaku = window.event ? window.event.keyCode : e.keyCode;
    //console.log("kod", kodZnaku, "znak", String.fromCharCode(kodZnaku));
    var znakKlawisza = String.fromCharCode(kodZnaku)
    if (znakKlawisza == "a" || kodZnaku == 37 /* strzalka w lewo */) {
        kierunek.x = -1;
        kierunek.y = 0;
    } else if (znakKlawisza == "d" || kodZnaku == 39 /* strzalka w prawo */) {
        kierunek.x = 1;
        kierunek.y = 0;
    } else if (znakKlawisza == "s" || kodZnaku == 40 /* strzalka w dol */) {
        kierunek.x = 0;
        kierunek.y = 1;
    } else if (znakKlawisza == "w" || kodZnaku == 38 /* strzalka w gore */) {
        kierunek.x = 0;
        kierunek.y = -1;
    } else {
        kierunek.x = 1;
        kierunek.y = 0;
    }
    // każde naciśnięcie klawisza dodatkowo wydłuża robala, a co 50 przyspiesza
    if (dlugoscRobala % 50 == 0){
        // przyspieszamy
        animujRobala2D();
        console.log(dlugoscRobala+" - szybciej!");
    }
    dlugoscRobala++;
}

function losujKierunek() {
    console.log("Losowa zmiana kierunku!");
    var kierunekLosowy = { x: 1, y: 0 };
    if (Math.random() > 0.5) {
        kierunekLosowy.x = Math.random() > 0.5 ? 1 : -1;
        kierunekLosowy.y = 0;
    } else {
        kierunekLosowy.x = 0;
        kierunekLosowy.y = Math.random() > 0.5 ? 1 : -1;
    }
    return kierunekLosowy;
}

function wznaczNowyPunkt(ostPunkt,kierunek,czyLosowy){
    var nowyPunkt2D = {
        x: ostPunkt.x + kierunek.x,
        y: ostPunkt.y + kierunek.y,
        losowy: czyLosowy
    }
    return nowyPunkt2D;
}

function dodajPunkt2D() {
    // szukamy ostatniego punktu w tablicy, 0 gdy jest pusta
    var ostPunkt = { x: 0, y: 0 };
    if (robal2D.length > 0) {
        ostPunkt = robal2D[robal2D.length - 1];
    }
    // wyliczamy nowy punkt
    var nowyPunkt2D;
    if (Math.random() < 0.1) {
        // losujemy kierunek
        var kierunekLosowy = losujKierunek();
        nowyPunkt2D = wznaczNowyPunkt(ostPunkt,kierunekLosowy,true);
        if (sprawdzCzyRobalMaWolnaDroge(nowyPunkt2D)){
            kierunek = kierunekLosowy;
        } else {
            // jednak ignorujemy ten wylosowany bo blokuje robala
            nowyPunkt2D = wznaczNowyPunkt(ostPunkt,kierunek,false);
        }
    } else {
        nowyPunkt2D = wznaczNowyPunkt(ostPunkt,kierunek,false);
    }

    if (sprawdzCzyRobalMaWolnaDroge(nowyPunkt2D)) {
        // dodajemy wyliczony punkt do tablicy
        robal2D.push(nowyPunkt2D);
        if (robal2D.length > dlugoscRobala) {
            robal2D.shift();
        }
        //logujTab2D("Punkty na plaszczyznie: ", robal2D);
    } else {
        if (sprawdzCzySaWolneDrogi(ostPunkt)){
            console.log("Chwilowa blokada!");
        } else {
            console.log("Całkowita blokada, GAME OVER!");
            wstrzymajGre();
        }
    }
    aktualizujWynik();
}

function sprawdzCzySaWolneDrogi(ostPunkt) {
    // sprawdzamy wszystkie 4 kierunki:
    return /* w lewo */ sprawdzCzyRobalMaWolnaDroge({x: ostPunkt.x - 1, y: ostPunkt.y + 0 })
    || /* w prawo */ sprawdzCzyRobalMaWolnaDroge({x: ostPunkt.x + 1, y: ostPunkt.y + 0 })
    || /* w dol */ sprawdzCzyRobalMaWolnaDroge({x: ostPunkt.x + 0, y: ostPunkt.y - 1 })
    || /* w gore */ sprawdzCzyRobalMaWolnaDroge({x: ostPunkt.x + 0, y: ostPunkt.y + 1 });
}

function sprawdzCzyRobalMaWolnaDroge(nowyPunkt) {
    // robal moze isc dalej jak sie zmiesci sie w kanwie
    var ograniczenia = podajOgraniczeniaKanwy();
    if (nowyPunkt.x <= ograniczenia.xMin) {
        //console.log("Zderzenie z lewa sciana: ", nowyPunkt.x, "<=", ograniczenia.xMin);
        return false;
    } else if (nowyPunkt.x >= ograniczenia.xMax) {
        //console.log("Zderzenie z prawa sciana: ", nowyPunkt.x, ">=", ograniczenia.xMax);
        return false;
    } else if (nowyPunkt.y <= ograniczenia.yMin) {
        //console.log("Zderzenie z gorna sciana: ", nowyPunkt.y, "<=", ograniczenia.yMin);
        return false;
    } else if (nowyPunkt.y >= ograniczenia.yMax) {
        //console.log("Zderzenie z dolna sciana: ", nowyPunkt.y, ">=", ograniczenia.yMax);
        return false;
    }
    // robal moze isc dalej jak sie nie zaplacze, 
    // czyli nowy punkt nie nalezy do tablicy punktw robala
    for (var i = 0; i < robal2D.length; i++) {
        var p = robal2D[i];
        if (nowyPunkt.x == p.x && nowyPunkt.y == p.y) {
            // console.log("Zaplatanie: ", p);
            return false;
        }
    }
    return true;
}