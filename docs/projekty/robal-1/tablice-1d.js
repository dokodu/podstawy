
var dlugoscRobala = 30;
var robal1D = [];
function dodajPunkt1D() {
    // losujemy kierunek 1 lub -1
    var k = (Math.random() > 0.5) ? 1 : -1;
    // szukamy ostatniego punktu w tablicy, 0 gdy jest pusta
    var ostPunkt = 0;
    if (robal1D.length > 0) {
        ostPunkt = robal1D[robal1D.length - 1];
    }
    // wyliczamy nowy punkt
    var nowyPunkt = ostPunkt + k;
    // dodajemy wyliczony punkt do tablicy
    robal1D.push(nowyPunkt);
    if (robal1D.length > dlugoscRobala) {
        robal1D.shift();
    }
    //console.log("punkty na linii: ", robal1D);
}

