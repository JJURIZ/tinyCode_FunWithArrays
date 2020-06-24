'use strict'
/* -----Variables-----*/

let wordBoxOne = document.getElementById("boxOne"),
    wordBoxTwo = document.getElementById("boxTwo"),
    dispCurScore = document.getElementById("currentScore"),

    popButton = document.getElementById("popButton"),
    shiftButton = document.getElementById("shiftButton"),
    popUnshiftButton = document.getElementById("popUnshiftButton"),
    shiftPushButton = document.getElementById("shiftPushButton"),
    reverseButton = document.getElementById("reverseButton"),
    sortButton = document.getElementById("sortButton"),
    spliceButton = document.getElementById("spliceButton"),
    spliceStart = document.getElementById("spliceStart"),
    spliceLength = document.getElementById("spliceLength"),
    startButton = document.getElementById("startButton"),
    resetWordButton = document.getElementById("resetWordButton"),
    switchButton = document.getElementById("switchButton"),

    words = [
        "ACROBAT", "CRACKER", "AMOUNT", "HOLIDAY", "TOAD",
        "SCARY", "EAGER", "FESTIVE", "SAND", "NIFTY",
        "FETCH", "PEEL", "THIN", "WEALTHY", "BETTER",
        "CAMP", "PICTURE", "HARSH", "USED", "SPRAY"
    ],

    wordCheck = [],
    randWord = [],
    wordOne = [],
    wordTwo = [];


/*-----State-----*/

let curScore = 0;
let boxSelected = 0;


/*-----Functions------*/

let strWordOne = () => {
    let joinWord = wordOne.join("");
    return joinWord;

};

let strWordTwo = () => {
    let joinWord = wordTwo.join("");
    return joinWord;
};

let spltString = (word) => {
    let spltString = word.split("");
    return spltString;
}

let setBoxes = () => {
    wordBoxOne.innerText = strWordOne();
    wordBoxTwo.innerText = strWordTwo();
};

let clearSplice = () => {
    spliceStart.value = "";
    spliceLength.value = "";
}

let curScoreTracker = () => {
    if (wordCheck.length === 0) {
        return
    } else {
        curScore += 1;
        dispCurScore.innerText = curScore;
    }
}

let shuffle = (array) => {
    for (let i = wordOne.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [wordOne[i], wordOne[j]] = [wordOne[j], wordOne[i]];
        wordOne = array;
    }
}

let selectWord = () => {
    let randomValue = words[Math.floor(Math.random() * words.length)];
    wordCheck = spltString(randomValue);
    wordOne = [...wordCheck];
    shuffle(wordOne);
    randWord = [...wordOne];
}

let winCheck = () => {
    if (JSON.stringify(wordOne) === JSON.stringify(wordCheck) && wordCheck.length !== 0 || JSON.stringify(wordTwo) === JSON.stringify(wordCheck) && wordCheck.length !== 0) {
        setTimeout(function() {
            alert(`You've one in ${curScore} clicks!`)
                // Change this to an onscreen alert. 
        }, 100);
    } else {
        return
    }

};

let boxOneActive = () => {
    let elem = document.querySelector("#boxOne");
    elem.style.backgroundColor = '#FFFFFF';
    elem.style.boxShadow = '-1px -1px 10px 0 #47A644';
    let elem2 = document.querySelector("#boxTwo");
    elem2.style.backgroundColor = '#CECFDB';
    elem2.style.boxShadow = 'none';
};

let boxTwoActive = () => {
    let elem = document.querySelector("#boxTwo");
    elem.style.backgroundColor = '#FFFFFF';
    elem.style.boxShadow = '-1px -1px 10px 0 #47A644';
    let elem2 = document.querySelector("#boxOne");
    elem2.style.backgroundColor = '#CECFDB';
    elem2.style.boxShadow = 'none';
}


/*-----Event Listeners-----*/

startButton.addEventListener('click', function() {
    selectWord();
    wordBoxOne.innerText = strWordOne(wordOne);
    wordBoxTwo.innerText = "";
    wordTwo = [];
    curScore = 0;
    dispCurScore.innerText = curScore;
    boxOneActive();
    clearSplice();
});

resetWordButton.addEventListener('click', function() {
    wordOne = [...randWord],
        wordTwo = [];
    wordBoxTwo.innerText = "";
    wordBoxOne.innerText = strWordOne();
    curScore = 0;
    dispCurScore.innerText = curScore;
    clearSplice();
});

switchButton.addEventListener('click', function() {
    boxSelected === 0 ? boxSelected = 1 : boxSelected = 0;
    if (boxSelected === 0) {
        boxOneActive();
    } else {
        boxTwoActive();
    }
});

popButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        let word = wordOne.pop();
        wordTwo.push(word);
    } else {
        let word = wordTwo.pop();
        wordOne.push(word);
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

shiftButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        let word = wordOne.shift();
        wordTwo.push(word);
    } else {
        let word = wordTwo.shift();
        wordOne.push(word);
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

popUnshiftButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        let word = wordOne.pop();
        wordTwo.unshift(word);
    } else {
        let word = wordTwo.pop();
        wordOne.unshift(word);
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

shiftPushButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        let word = wordOne.shift();
        wordTwo.unshift(word);
    } else {
        let word = wordTwo.shift();
        wordOne.unshift(word);
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

reverseButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        wordOne.reverse();
    } else {
        wordTwo.reverse();
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

sortButton.addEventListener('click', function() {
    if (boxSelected === 0) {
        wordOne.sort();
    } else {
        wordTwo.sort();
    }
    setBoxes();
    curScoreTracker();
    winCheck();
});

spliceButton.addEventListener('click', function() {
    let startValue = parseFloat(spliceStart.value);
    let lengthValue = parseFloat(spliceLength.value);
    let newWord = wordOne.splice(startValue, lengthValue);

    let length = strWordOne().length;
    console.log(length);

    if (boxSelected === 0) {
        wordTwo = wordTwo.concat(newWord);
    } else {
        wordOne = wordOne.concat(newWord);
    }
    setBoxes();
    curScoreTracker();
    winCheck();
    clearSplice();
});