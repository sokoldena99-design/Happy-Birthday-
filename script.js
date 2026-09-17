const textToType = `Карина, с днём рождения тебя! ❤️

Хочу сказать тебе несколько приятных слов, потому что ты заслуживаешь действительно хорошего поздравления. Ты очень особенный человек, и я надеюсь, что впереди у тебя будет много моментов, которые будут приносить тебе настоящее удовольствие и хорошее настроение. 🥹❤️

Желаю тебе всегда оставаться собой, не менять себя ради кого-то и делать то, что действительно нравится именно тебе. Пусть в жизни будет больше приятных событий, ярких впечатлений, красивых моментов и просто всего того, что делает тебя счастливее. ✨❤️

Пусть у тебя будет как можно больше поводов радоваться, наслаждаться каждым моментом и просто чувствовать себя хорошо. 🫶🏻💗

В общем, Карина, поздравляю тебя! 🎂🥳
Надеюсь, впереди тебя ждёт много всего интересного, необычного и действительно приятного. 💗✨

С днём рождения! ❤️🎉
Ещё раз всего самого приятного тебе! 🥰`;

let typingIndex = 0;
let fontCheckInterval;

document.addEventListener('DOMContentLoaded', () => {
    const inputField = document.getElementById('password-input');

    inputField.addEventListener('input', function (e) {
        let value = this.value.replace(/[^0-9]/g, '');
        if (value.length > 8) {
            value = value.slice(0, 8);
        }
        if (value.length > 4) {
            value = value.slice(0, 2) + '.' + value.slice(2, 4) + '.' + value.slice(4);
        } else if (value.length > 2) {
            value = value.slice(0, 2) + '.' + value.slice(2);
        }
        this.value = value;
    });
});

function checkPassword() {
    const input = document.getElementById('password-input').value.trim();
    const correctWord = "19.09.2007";

    if (input === correctWord) {
        document.getElementById('screen-password').classList.remove('active');
        document.getElementById('screen-heart').classList.add('active');
        
        setTimeout(() => {
            document.getElementById('btn-next-heart').style.display = 'block';
        }, 3000);
    } else {
        document.getElementById('error-msg').innerText = "Неправильно, спробуй ще!";
    }
}

function goToEnvelope() {
    document.getElementById('screen-heart').classList.remove('active');
    document.getElementById('screen-envelope').classList.add('active');
}

function openEnvelope() {
    const wrapper = document.querySelector('.envelope-wrapper');
    wrapper.classList.add('open');

    setTimeout(() => {
        document.getElementById('screen-envelope').classList.remove('active');
        document.getElementById('screen-letter').classList.add('active');
        
        if (document.fonts && document.fonts.ready) {
            document.fonts.ready.then(() => {
                setTimeout(startTyping, 500);
            });
        } else {
            setTimeout(startTyping, 1000);
        }
    }, 1500);
}

function startTyping() {
    const textContainer = document.getElementById('letter-text');
    const paperElement = document.getElementById('paper-scroll');
    const btnAfterText = document.getElementById('btn-after-text');
    
    textContainer.innerHTML = '';
    typingIndex = 0;
    
    btnAfterText.style.opacity = '0';
    btnAfterText.style.visibility = 'hidden';

    paperElement.classList.remove('allow-scroll');

    const cursor = document.createElement('span');
    cursor.className = 'cursor';
    textContainer.appendChild(cursor);

    function typeChar() {
        if (typingIndex >= textToType.length) {
            cursor.style.display = 'none';
            paperElement.classList.add('allow-scroll');
            btnAfterText.style.opacity = '1';
            btnAfterText.style.visibility = 'visible';
            paperElement.scrollTop = paperElement.scrollHeight;
            return;
        }

        const char = textToType[typingIndex];
        
        cursor.insertAdjacentText('beforebegin', char);
        typingIndex++;
        
        paperElement.scrollTop = paperElement.scrollHeight;
        
        let speed = 50;
        
        if (char === '.' || char === '!' || char === '?' || char === '🎂' || char === '🥳' || char === '🎉') {
            speed = 400;
        } else if (char === ',' || char === ';' || char === ':') {
            speed = 200;
        } else if (char === '\n') {
            speed = 300;
        }

        setTimeout(typeChar, speed);
    }

    typeChar();
}

// Функція показує маленьке серце з написом, потім переходить до фото
function showHeartAgain() {
    document.getElementById('screen-letter').classList.remove('active');
    document.getElementById('screen-heart-again').classList.add('active');
    
    setTimeout(() => {
        const heartSmall = document.getElementById('heart-small');
        heartSmall.classList.add('hide');
        
        setTimeout(() => {
            document.getElementById('screen-heart-again').classList.remove('active');
            document.getElementById('screen-photos').classList.add('active');
            startPhotoSlideshow();
        }, 1500);
    }, 5000);
}

// Функція плавної зміни фото
function startPhotoSlideshow() {
    const photos = document.querySelectorAll('.photo');
    let currentIndex = 0;
    
    // Кожні 3 секунди змінюємо фото
    setInterval(() => {
        photos[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % photos.length;
        photos[currentIndex].classList.add('active');
    }, 3000);
}