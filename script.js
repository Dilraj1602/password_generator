console.log("Hello World");

const slidervalue = document.querySelector("[slider]");
const passwordLength = document.querySelector("[passwordLength]");
const displayPassword = document.querySelector("[displayPassword]");
const copytext = document.querySelector("[copy]");
const uppercasecheck = document.querySelector("[uppercase]");
const lowercasecheck = document.querySelector("[lowercase]");
const numberscheck = document.querySelector("[number]");
const symbolscheck = document.querySelector("[symbol]");
const indicator = document.querySelector("[indicator]");
const generatebtn = document.querySelector("[generatePassword]");
const allcheckbox = document.querySelectorAll("input[type=checkbox]");

const symbolsArr = "!@#$%^&*()_+{}|:<>?~";

let password = "";
let length = 10;
let checkcount = 0;
handleslider();

function handleslider() {
    slidervalue.value = length;
    passwordLength.innerText = length;
}

function setcolor(color) {
    indicator.style.backgroundColor = color;
}

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min) + min); 
}

function getRndNumber() {
    return getRndInteger(0, 10);
}

function getUpperCase() {
    return String.fromCharCode(getRndInteger(65, 91));
}

function getLowercase() {
    return String.fromCharCode(getRndInteger(97, 123)); 
}

function getSymbol() {
    let idx = getRndInteger(0, symbolsArr.length);
    return symbolsArr[idx];
}

function calcStrength() {
    let count = 0;
    allcheckbox.forEach((checkbox) => {
        if (checkbox.checked) {
            count++;
        }
    });

    if (count >= 3 && password.length >= 10) {
        setcolor("#0f0");
    } else if (count >= 3 && password.length < 10) {
        setcolor("#ff0");
    } else {
        setcolor("#f00");
    }
}

slidervalue.addEventListener("input", () => {
    length = slidervalue.value;
    handleslider();
});

async function copyContent() {
    try {
        await navigator.clipboard.writeText(displayPassword.textContent);
        setTimeout(() => {
            alert("Password Copied");
        }, 2000);
    } catch (e) {
        setTimeout(() => {
            alert("Failed to Copy");
        }, 2000);
    }
}

copytext.addEventListener("click", () => {
    if (!displayPassword.innerText) {
        return;
    }
    copyContent();
});

function shufflefn(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
}

generatebtn.addEventListener("click", () => {
    password = "";
    checkcount = 0;
    let arr = [];

    if (uppercasecheck.checked) {
        arr.push(getUpperCase());
        checkcount++;
    }
    if (lowercasecheck.checked) {
        arr.push(getLowercase());
        checkcount++;
    }
    if (numberscheck.checked) {
        arr.push(getRndNumber());
        checkcount++;
    }
    if (symbolscheck.checked) {
        arr.push(getSymbol());
        checkcount++;
    }
    if (checkcount === 0) {
        alert("Please select at least one option");
        return;
    }

    if (checkcount > length) {
        length = checkcount;
        handleslider();
    }

    for (let i = arr.length; i < length; i++) {
        const x = getRndInteger(0, checkcount);
        if (uppercasecheck.checked && x === 0) arr.push(getUpperCase());
        else if (lowercasecheck.checked && x === 1) arr.push(getLowercase());
        else if (numberscheck.checked && x === 2) arr.push(getRndNumber());
        else if (symbolscheck.checked && x === 3) arr.push(getSymbol());
    }

    shufflefn(arr);
    password = arr.join("");
    displayPassword.innerText = password;
    calcStrength();
});
