const carouselText = [
    { text: "Wang Yi Ching" },
    { text: "Front-End Developer" }
]

$(document).ready(async function() {
    dynamicTyping(carouselText, "#featureText")
});

async function typeSentence(sentence, eleRef, delay = 100) {
    const letters = sentence.split("");
    let i = 0;
    while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++
    }
    return;
}

async function deleteSentence(eleRef) {
    const sentence = $(eleRef).html();
    const letters = sentence.split("");
    while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
    }
}

async function dynamicTyping(carouselList, eleRef) {
    var i = 0;
    while (true) {
        await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++
        if (i >= carouselList.length) { i = 0; }
    }
}

function waitForMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
}