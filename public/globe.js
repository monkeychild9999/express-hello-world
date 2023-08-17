//allgemeines Item-Objekt
function Item(id, name, klasse) {
    this.id = id;   //beginnend bei 1
    this.name = name;
    this.klasse = klasse;   //0: Blau, 1: Lila, 2: Rot, 3: Gelb, 4: Mystery
}

//allgemeines Kisten-Objekt
function Kiste(id, name, items) {
    this.id = id;   //beginnend bei 1
    this.name = name;
    this.items = items;   //Array mit allen Items, die in der Kisten erscheinen sollen
}

//einzelne Items
function Item1(farbe, zertifiziert) {
    this.item = new Item(1, "Item1", 0);
    this.farbe = farbe; //0: standard, 1: weiß, 2: grau, 3: schwarz, 4: pink, 5: lila, 6: blau, 7: hellblau, 8: türkis, 9: hellgrün, 10: grün, 11: gelb, 12: gold, 13: orange, 14: rot
    this.zertifiziert = zertifiziert;
}
function Item2(farbe, zertifiziert) {
    this.item = new Item(2, "Item2", 1);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item3(farbe, zertifiziert) {
    this.item = new Item(3, "Item3", 2);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item4(farbe, zertifiziert) {
    this.item = new Item(4, "Item4", 3);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}
function Item5(farbe, zertifiziert) {
    this.item = new Item(5, "Item5", 4);
    this.farbe = farbe;
    this.zertifiziert = zertifiziert;
}


//Variablen
var random;
var laufbandItems = [];
var inventar = [];
var laufbandOpen = false;
var rollingBlocked = false;
var itemDetailsOpen = false;

function roll(kiste) {
    if(rollingBlocked === false) {
        rollingBlocked = true;
        openLaufband();
        fillLaufband(kiste);

        var laufband = document.getElementById("laufband");
        laufband.style.top = "-14000px";

        //Animation
        random = Math.floor((Math.random()*2000)+10000);    //10000-12000

        var laufbandKeyframes = "@-webkit-keyframes roll_ani {0% {top: -14000px} 100% {top: " + (-14000+random) + "px}}";

        //Animation hinzufügem
        var laufbandKeyframesTextNode = document.createTextNode(laufbandKeyframes);
        document.getElementsByTagName("style")[0].appendChild(laufbandKeyframesTextNode);

        laufband.style.webkitAnimationName = "roll_ani";
        laufband.style.webkitAnimationDuration = "5s";
        laufband.addEventListener("webkitAnimationEnd", rollEndingListener);
    }
}
function rollEndingListener() {
    rollingBlocked = false;

    //Laufband-Animation entfernen
    var laufband = document.getElementById("laufband");
    laufband.style.removeProperty("-webkit-animation-name");
    laufband.style.removeProperty("-webkit-animation-duration");

    //nach Animation wollen wir die aktuelle Position festsetzen
    laufband.style.top = (-14000+random) + "px";

    //Position speichern
    var position = 14000-random;
    var whichItem = Math.floor((position+350)/200);

    //Item zum Inventar hinzufügen
    addItemToInv(laufbandItems[whichItem]);
    laufband.removeEventListener("webkitAnimationEnd", rollEndingListener);

    //Animation des aktuellen Items (größeres Div, das wieder verschwindet)
    var biggerDivElem = document.createElement("div");
    biggerDivElem.setAttribute("class", "bigBlock");
    biggerDivElem.style.backgroundColor = document.getElementById("blockNr" + whichItem).style.backgroundColor;
    biggerDivElem.addEventListener("webkitAnimationEnd", function (e) {
        biggerDivElem.parentNode.removeChild(biggerDivElem);
    });
    biggerDivElem.innerHTML = laufbandItems[whichItem].item.name + "<br>";
    switch(laufbandItems[whichItem].farbe) {
        case 0:
            biggerDivElem.innerHTML += "farblos<br>";
            break;
        case 1:
            biggerDivElem.innerHTML += "weiß<br>";
            break;
        case 2:
            biggerDivElem.innerHTML += "grau<br>";
            break;
        case 3:
            biggerDivElem.innerHTML += "schwarz<br>";
            break;
        case 4:
            biggerDivElem.innerHTML += "pink<br>";
            break;
        case 5:
            biggerDivElem.innerHTML += "lila<br>";
            break;
        case 6:
            biggerDivElem.innerHTML += "blau<br>";
            break;
        case 7:
            biggerDivElem.innerHTML += "hellblau<br>";
            break;
        case 8:
            biggerDivElem.innerHTML += "türkis<br>";
            break;
        case 9:
            biggerDivElem.innerHTML += "hellgrün<br>";
            break;
        case 10:
            biggerDivElem.innerHTML += "grün<br>";
            break;
        case 11:
            biggerDivElem.innerHTML += "gelb<br>";
            break;
        case 12:
            biggerDivElem.innerHTML += "gold<br>";
            break;
        case 13:
            biggerDivElem.innerHTML += "orange<br>";
            break;
        case 14:
            biggerDivElem.innerHTML += "rot<br>";
            break;
    }
    if(laufbandItems[whichItem].zertifiziert === 1) {
        biggerDivElem.innerHTML += "zertifiziert";
    }

    document.body.appendChild(biggerDivElem);

    //Laufband schließen
    openLaufband();
}

function openLaufband() {
    if(laufbandOpen === false) {
        document.getElementById("laufband_background").style.display = "inline";
        laufbandOpen = true;
    }
    else {
        document.getElementById("laufband_background").style.display = "none";
        laufbandOpen = false;
    }
}
function fillLaufband(kiste) {
    var divElem;
    var randomKlasse;

    var items = kiste.items;
    var seltenheit0 = [];
    var seltenheit1 = [];
    var seltenheit2 = [];
    var seltenheit3 = [];
    var seltenheit4 = [];
    var aktuellesItem;
    laufbandItems.splice(0, 75);    //alle vorherigen Items löschen

    for(var j = 0; j < items.length; j++) {
        switch(items[j].item.klasse) {
            case 0:
                seltenheit0.push(items[j]);
                break;
            case 1:
                seltenheit1.push(items[j]);
                break;
            case 2:
                seltenheit2.push(items[j]);
                break;
            case 3:
                seltenheit3.push(items[j]);
                break;
            case 4:
                seltenheit4.push(items[j]);
                break;
        }
    }

    for(var i = 0; i < 75; i++) {
        //Block erstellen
        divElem = document.createElement("div");
        divElem.setAttribute("id", "blockNr" + i);
        divElem.setAttribute("class", "block");
        document.getElementById("laufband").appendChild(divElem);
        document.getElementById("blockNr" + i).style.top = 200*i + "px";

        randomKlasse = Math.floor((Math.random()*100)+1);   //1-100
        if(randomKlasse <= 55) {
            document.getElementById("blockNr" + i).style.backgroundColor = "blue";

            aktuellesItem = seltenheit0[randomItem(seltenheit0)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 83 && randomKlasse > 55) {
            document.getElementById("blockNr" + i).style.backgroundColor = "mediumpurple";

            aktuellesItem = seltenheit1[randomItem(seltenheit1)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 95 && randomKlasse > 83) {
            document.getElementById("blockNr" + i).style.backgroundColor = "red";

            aktuellesItem = seltenheit2[randomItem(seltenheit2)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else if(randomKlasse <= 99 && randomKlasse > 95) {
            document.getElementById("blockNr" + i).style.backgroundColor = "yellow";

            aktuellesItem = seltenheit3[randomItem(seltenheit3)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
        else {
            document.getElementById("blockNr" + i).style.backgroundColor = "purple";

            aktuellesItem = seltenheit4[randomItem(seltenheit4)];
            aktuellesItem.farbe = randomColor();
            aktuellesItem.zertifiziert = certifyItem();
            document.getElementById("blockNr" + i).innerHTML = aktuellesItem.item.name;

            laufbandItems.push(aktuellesItem);
        }
    }

}
function randomItem(seltenheit) {
    return Math.floor(Math.random()*seltenheit.length); //Item der Seltenheitsklasse bestimmen
}
function randomColor() {
    if(Math.floor(Math.random()*4) === 0) {
        return Math.floor(Math.random()*14)+1;    //1-14
    }
    else {
        return 0;
    }
}
function certifyItem() {
    if(Math.floor(Math.random()*4) === 0) {
        return 1;
    }
    else {
        return 0;
    }

}

//***** Inventar *****
function addItemToInv(item) {
    var itemAlreadyInInventory = false;

    for(var i = 0; i < inventar.length; i++) {
        if(inventar[i].item.id === item.item.id) {
            var anzahlDiv = document.getElementById("inv_flexItemAnzahlID" + item.item.id);
            anzahlDiv.innerHTML = (parseInt(anzahlDiv.innerHTML)+1).toString();

            itemAlreadyInInventory = true;
            i = inventar.length;
        }
    }

    if(itemAlreadyInInventory === false) {
        var itemDivElem = document.createElement("div");
        itemDivElem.setAttribute("id", "inv_flexItemID" + item.item.id);
        itemDivElem.setAttribute("class", "inv_flexItem");
        itemDivElem.setAttribute("onclick", "openItemDetails(" + item.item.id + ", event)");
        itemDivElem.innerHTML = item.item.name;
        document.getElementById("inv_flexContainer").appendChild(itemDivElem);

        var itemAnzahlDivElem = document.createElement("div");
        itemAnzahlDivElem.setAttribute("id", "inv_flexItemAnzahlID" + item.item.id);
        itemAnzahlDivElem.setAttribute("class", "inv_flexItemAnzahl");
        itemAnzahlDivElem.innerHTML = 1;
        itemDivElem.appendChild(itemAnzahlDivElem);

        switch(item.item.klasse) {
            case 0:
                itemDivElem.style.boxShadow = "0 0 89px -11px rgba(0,168,168)";
                itemDivElem.onmouseover = function (ev) { itemDivElem.style.boxShadow = "0 0 89px 21px rgba(0,168,168)"; };
                itemDivElem.onmouseleave = function (ev) { itemDivElem.style.boxShadow = "0 0 89px -11px rgba(0,168,168)"; };
                break;
            case 1:
                itemDivElem.style.boxShadow = "0 0 89px -11px rgba(3,17,168)";
                itemDivElem.onmouseover = function (ev) { itemDivElem.style.boxShadow = "0 0 89px 21px rgba(3,17,168)"; };
                itemDivElem.onmouseleave = function (ev) { itemDivElem.style.boxShadow = "0 0 89px -11px rgba(3,17,168)"; };
                break;
            case 2:
                itemDivElem.style.boxShadow = "0 0 89px -11px rgba(168,6,0)";
                itemDivElem.onmouseover = function (ev) { itemDivElem.style.boxShadow = "0 0 89px 21px rgba(168,6,0)"; };
                itemDivElem.onmouseleave = function (ev) { itemDivElem.style.boxShadow = "0 0 89px -11px rgba(168,6,0)"; };
                break;
            case 3:
                itemDivElem.style.boxShadow = "0 0 89px -11px rgba(167,168,4)";
                itemDivElem.onmouseover = function (ev) { itemDivElem.style.boxShadow = "0 0 89px 21px rgba(167,168,4)"; };
                itemDivElem.onmouseleave = function (ev) { itemDivElem.style.boxShadow = "0 0 89px -11px rgba(167,168,4)"; };
                break;
            case 4:
                itemDivElem.style.boxShadow = "0 0 89px -11px rgba(168,0,122)";
                itemDivElem.onmouseover = function (ev) { itemDivElem.style.boxShadow = "0 0 89px 21px rgba(168,0,122)"; };
                itemDivElem.onmouseleave = function (ev) { itemDivElem.style.boxShadow = "0 0 89px -11px rgba(168,0,122)"; };
                break;
        }
    }

    inventar.push(item);
}
function openItemDetails(itemID, event) {
    if(itemDetailsOpen === false) {
        document.getElementById("inv_itemDetails").style.display = "inline";

        //Position festlegen
        if(event.clientY > window.innerHeight-295) {
            document.getElementById("inv_itemDetails").style.top = (window.innerHeight-385) + "px";
        }
        else {
            document.getElementById("inv_itemDetails").style.top = event.clientY + "px";
        }
        if(event.clientX > window.innerWidth-195) {
            document.getElementById("inv_itemDetails").style.left = (window.innerWidth-205) + "px";
        }
        else {
            document.getElementById("inv_itemDetails").style.left = event.clientX + "px";
        }
        itemDetailsOpen = true;

        //Detail-Div füllen
        for(var i = 0; i < inventar.length; i++) {
            if(inventar[i].item.id === itemID) {
                if(inventar[i].zertifiziert === 1) {
                    document.getElementById("certified").innerHTML = "zertifiziert";
                }

                switch(inventar[i].farbe) {
                    case 0:
                        document.getElementById("color0").innerHTML = "farblos<br>";
                        break;
                    case 1:
                        document.getElementById("color1").innerHTML = "<b>weiß</b><br>";
                        break;
                    case 2:
                        document.getElementById("color2").innerHTML = "<b style='color: gray'>grau</b><br>";
                        break;
                    case 3:
                        document.getElementById("color3").innerHTML = "<b style='color: black'>schwarz</b><br>";
                        break;
                    case 4:
                        document.getElementById("color4").innerHTML = "<b style='color: pink'>pink</b><br>";
                        break;
                    case 5:
                        document.getElementById("color5").innerHTML = "<b style='color: darkviolet'>lila</b><br>";
                        break;
                    case 6:
                        document.getElementById("color6").innerHTML = "<b style='color: blue'>blau</b><br>";
                        break;
                    case 7:
                        document.getElementById("color7").innerHTML = "<b style='color: cornflowerblue'>hellblau</b><br>";
                        break;
                    case 8:
                        document.getElementById("color8").innerHTML = "<b style='color: turquoise'>türkis</b><br>";
                        break;
                    case 9:
                        document.getElementById("color9").innerHTML = "<b style='color: lightgreen'>hellgrün</b><br>";
                        break;
                    case 10:
                        document.getElementById("color10").innerHTML = "<b style='color: green'>grün</b><br>";
                        break;
                    case 11:
                        document.getElementById("color11").innerHTML = "<b style='color: yellow'>gelb</b><br>";
                        break;
                    case 12:
                        document.getElementById("color12").innerHTML = "<b style='color: gold'>gold</b><br>";
                        break;
                    case 13:
                        document.getElementById("color13").innerHTML = "<b style='color: orange'>orange</b><br>";
                        break;
                    case 14:
                        document.getElementById("color14").innerHTML = "<b style='color: red'>rot</b><br>";
                        break;
                }

            }
        }
    }
    else {
        document.getElementById("inv_itemDetails").style.display = "none";
        itemDetailsOpen = false;

        //Detail-Div leeren
        document.getElementById("certified").innerHTML = "";
        for(var j = 0; j < 15; j++) {
            document.getElementById("color" + j).innerHTML = "";
        }
    }
}
