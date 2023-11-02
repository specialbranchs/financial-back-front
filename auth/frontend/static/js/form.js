var backButton = document.getElementById("back");
var nextButton = document.getElementById("next");
var number = document.getElementById("number");

var i = 0;

var sections = document.getElementById('financial')
var sectionArr = sections.getElementsByTagName('section')
var lnOfSec = sectionArr.length
let textString = ['Info', "Parsonal", "Professional", "Political", "Mamla", "Evaluation"]
number.innerHTML = textString[0];
for (var cj = 1; cj < lnOfSec; cj++) {
    addClass(sectionArr[cj], 'd-none')
}
addClass(backButton, 'd-none')

const sectionClass = (index) => {
    for (var cj = 0; cj < lnOfSec; cj++) {
        if (cj === index) {
            removeClass(sectionArr[cj], 'd-none')
        } else {
            addClass(sectionArr[cj], 'd-none')
        }
    }
}
const nextItem = () => {

    i++;
    if (i == lnOfSec - 1) {
        addClass(nextButton, 'd-none')
    }
    removeClass(backButton, 'd-none')
    number.innerHTML = textString[i];

    sectionClass(i)

}

const backItem = () => {
    i--;
    if (i == 0) {
        addClass(backButton, 'd-none')
    }
    removeClass(nextButton, 'd-none')
    number.innerHTML = textString[i];
    sectionClass(i)

}



function hasClass(el, className) {
    if (el.classList)
        return el.classList.contains(className);
    return !!el.className.match(new RegExp('(\\s|^)' + className + '(\\s|$)'));
}

function addClass(el, className) {
    if (el.classList)
        el.classList.add(className)
    else if (!hasClass(el, className))
        el.className += " " + className;
}

function removeClass(el, className) {
    if (el.classList)
        el.classList.remove(className)
    else if (hasClass(el, className)) {
        var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
        el.className = el.className.replace(reg, ' ');
    }
}