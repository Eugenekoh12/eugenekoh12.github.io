const randGenFive = {"fiveLettersA":["abode","abhor","abide","above","abort","about","abyss","abuse","abuzz","ached","aches","acids","acorn","actor","acted","acute","adapt","adieu","adept","adios","admin","admit","adopt","adobe","adore","adorn","adult","aegis","aeons","aesir","after","agape","agate","agent","afoul","affix","after","again","ahead","aided","aimed","aired","alibi","alloy","alate","alarm","alien","alike","algae","album","alley","allow","aloft","alone","aloud","alter","aloof","along","alter","amber","amble","amour","ample","amuse","amuck","anger","angle","angst","angry","annoy"],"fiveLettersB":["babel","bacon","badge","badly","bagel","baize","bahut","bahts","bails","baits","baker","bakes","baldy","balls","bulky","balky","baron","bands","barfs","barks","bares","bards","bared","barks","based","basic","basil","basks","baste","bathe","batch","baths","baulk","baton","beaks","beams","beaks","beach","beams","beans","beard","bears","beast","beats","beaut","beefs","beefy","befit","beers","beeps","beets","began","begun","beget","being","beige","belly","belle","bells","below","belts","bench","bento","berth","beryl","besot","bicep","bidet","bikes","biker"],"fiveLettersC":["cabal","cabby","cabin","cable","cache","cacti","cadet","cafes","caged","cages","cagey","caked","cakes","cakey","calyx","camel","cameo","camps","canal","candy","caned","caner","canes","canoe","canon","capes","carat","carbo","carbs","cards","cared","cares","caret","cargo","carol","carps","carry","carte","carts","carve","cased","casks","casts","caste","casts","catch","cater","catty","cause","caved","caves","cedar","cease","cawed","ceded","celeb","cello","cells","celts","cents","chair","chain","chalk","chaos","chant","champ","charm","chart","chase","chasm"],"specialCharacters":[".",",","!","@","&","*","-","+"]}
let randGenCount = 0;
let randGenFinal = "";
for (i = 0; i < 3; i++) {
    let randGenFiveABC = Math.floor(Math.random() * 3);
    if (randGenFiveABC == 0) {
        randGenChosen = randGenFive.fiveLettersA
    };
    if  (randGenFiveABC == 1) {
        randGenChosen = randGenFive.fiveLettersB
    };
    if  (randGenFiveABC == 2) {
        randGenChosen = randGenFive.fiveLettersC
    };
    let randGenDataABC = randGenChosen[Math.floor(Math.random() * randGenChosen.length)];
    let randGenCapital = Math.floor(Math.random() * 2);
    if (randGenCapital == 0) {
        randGenDataABC = randGenDataABC.charAt(0).toUpperCase() + randGenDataABC.slice(1);
    }
    let randGenDataSpecial = randGenFive.specialCharacters[Math.floor(Math.random() * randGenFive.specialCharacters.length)];
    randGenCount += 1;
    randGenFinal += randGenDataABC;
    if (randGenCount < 3) {
        randGenFinal += randGenDataSpecial;
    };
};
document.getElementById("randomPw").innerHTML = randGenFinal;