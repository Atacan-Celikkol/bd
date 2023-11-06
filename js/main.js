function parseURLParams() {
    let params = new URLSearchParams(window.location.search);
    let name = atob(params.get('a'));
    let message = params.get('b') ? atob(params.get('b')) : "";
    let encodedDate = params.get('c') ? atob(params.get('c')) : "";
    const decodedDateStr = atob(encodedDate);
    let date = new Date(decodedDateStr).getTime();

    document.getElementById('birthday-name').textContent = name;
    // document.getElementById('custom-message').textContent = message;
}

// Kutlama animasyonunu başlatma
function startCelebration() {
    const firstContainer = document.querySelector('.first-container');

    firstContainer.classList.add('disappear');

    const container = document.querySelector('.fireworks-container')
    const fireworks = new Fireworks(container)

    fireworks.start()

    fireworks.setOptions({
        hue: {
            min: 150,
            max: 345
        },
        delay: {
            min: 30,
            max: 60
        },
        rocketsPoint: {
            min: 50,
            max: 50
        },
        opacity: 0.5,
        acceleration: 0.9999999,
        friction: 0.97,
        gravity: 1.5,
        particles: 100,
        trace: 7,
        traceSpeed: 1.5,
        explosion: 6,
        intensity: 30,
        flickering: 22,
        lineStyle: 'round',
        lineWidth: {
            explosion: {
                min: 1,
                max: 4
            },
            trace: {
                min: 1,
                max: 2
            }
        },
        autoresize: true,
        brightness: {
            min: 50,
            max: 80,
            decay: {
                min: 0.015,
                max: 0.03
            }
        },
        boundaries: {
            x: 50,
            y: 50,
            width: container.clientWidth,
            height: container.clientHeight,
            visible: false
        },
        sound: {
            enabled: true,
            files: [
                'https://fireworks.js.org/sounds/explosion0.mp3',
                'https://fireworks.js.org/sounds/explosion1.mp3',
                'https://fireworks.js.org/sounds/explosion2.mp3'
            ],
            volume: {
                min: 2,
                max: 50
            }
        },
        mouse: {
            click: true,
            move: false,
            max: 3
        }
    });
}

function updateCountdown(targetDate) {
    const now = new Date();
    const distance = targetDate - now;

    // Eğer kutlama tarihi geçmemişse geri sayımı yap
    if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days + "d ";
        document.getElementById('hours').textContent = hours + "h ";
        document.getElementById('minutes').textContent = minutes + "m ";
        document.getElementById('seconds').textContent = seconds + "s ";
    } else {
        startCelebration();
        clearInterval(interval);
    }
}

const targetDate = new Date('Nov 7, 2023 00:20:00').getTime();
// let now = new Date();
// const targetDate = now.setSeconds(now.getSeconds() + 3);

// Her saniye geri sayımı güncelle
const interval = setInterval(() => {
    updateCountdown(targetDate);
}, 1000);


// Sayfa yüklendiğinde URL parametrelerini çözme
window.onload = function () {
    parseURLParams();
};
