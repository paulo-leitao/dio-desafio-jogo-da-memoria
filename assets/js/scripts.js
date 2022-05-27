let cards = document.querySelectorAll('.card');
let shuffleCards = document.getElementById('shuffle');
let congrats = document.getElementsByClassName('container');
let cardIsFlipped = false;
let lockCards = false;
let confettiOn = false;
let matchCount = 0;


let firstCard, secondCard;

shuffle();

function flipCard() {
    if (lockCards) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if(!cardIsFlipped){
        cardIsFlipped = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    cardIsFlipped = false;
    compareCards();
}

function compareCards() {
    if (firstCard.dataset.card === secondCard.dataset.card) {
        // console.log(firstCard.dataset.card);
        disableCards();
        addToCount();
        return;
    }
    flipCardOver();
}

function flipCardOver(){
    lockCards = true;
    setTimeout(()=>{
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');
        resetState();
    },1000)
}

function disableCards(){
    firstCard.removeEventListener('click',flipCard);
    secondCard.removeEventListener('click',flipCard);
    resetState();
}

function resetState(){
    [cardIsFlipped , lockCards] = [false,false];
    [firstCard , secondCard] = [null, null];
};

function shuffle() {
    cards.forEach((card)=>{
        let randomOrder = Math.floor(Math.random() * 16);
        card.style.order = randomOrder;
        card.classList.add('animation')
        setTimeout(() => {
            card.classList.remove('animation')
        }, 2000);
    });
    matchCount = 0;
    counter.textContent = 0;
    finished();
    cards.forEach((card)=>{
        card.classList.remove('flipped');
        card.addEventListener('click',flipCard);
    });
    resetState();
}

function addToCount(){
    const counter = document.getElementById('counter');
    matchCount++
    counter.textContent = `${matchCount}`;
    counter.classList.add('match');
    setTimeout(()=>{counter.classList.remove('match')},200);
    if(matchCount === 8){
        confettiOn = true;
        finished();
        return;
    }
}

function finished(){
    if(confettiOn){
        congrats[0].style.visibility = 'visible';
        confettiOn = false;
        return;
    }
    congrats[0].style.visibility = 'hidden';
}

shuffleCards.addEventListener('click', shuffle);

cards.forEach((card)=>{
    card.addEventListener('click',flipCard);
});