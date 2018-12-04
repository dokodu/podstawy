function logujTab2D(nazwa, tab) {
    var opis = "[";
    for (var i = 0; i < tab.length; i++) {
        opis = opis + "(" + tab[i].x + "," + tab[i].y + "), ";
    }
    console.log(nazwa, opis + "]");
}

