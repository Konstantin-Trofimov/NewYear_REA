


function snowfallAnimation () {
    const snowfallWrapper = document.querySelector('.new-year__content');
    let windowWidth = window.innerWidth;

    const canvas = document.getElementById('snowfall-code1');
    const ctx = canvas.getContext('2d');
    canvas.width = snowfallWrapper.offsetWidth;
    canvas.height = snowfallWrapper.offsetHeight;

    const canvas2 = document.getElementById('snowfall-code2');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = snowfallWrapper.offsetWidth;
    canvas2.height = snowfallWrapper.offsetHeight;

    ctx2.shadowOffsetX = 1;
    ctx2.shadowOffsetY = 1;
    ctx2.shadowBlur = 0;
    ctx2.shadowColor = 'white';

    class Symbol {
        constructor(x, y, fontSize, canvasHeight){
            this.characters = '020220❄';
            this.x = x;
            this.y = y;
            this.fontSize = fontSize;
            this.text = 'A';
            this.canvasHeight = canvasHeight;
        }
        draw(context, context2){
            context.font = this.fontSize + 'px monospace';
            this.text = this.characters.charAt(Math.floor(Math.random() * this.characters.length));
            context.fillStyle = this.color;
            context.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
            context2.fillText(this.text, this.x * this.fontSize, this.y * this.fontSize);
            if (this.y * this.fontSize > this.canvasHeight && Math.random() > 0.97){
                this.y = 0;
            }
            else {
                this.y += 0.9;
            }
        }
    }

    class Effect {
        constructor(canvasWidth, canvasHeight){
            this.fontSize = this.fontSizeChange();
            this.canvasWidth = canvasWidth;
            this.canvasHeight = canvasHeight;
            this.columns = this.canvasWidth/this.fontSize;
            this.symbols = [];
            this.#initialize();
            this.fontSizeChange();
        }
        #initialize(){
            for (let i = 0; i < this.columns; i++) {
                this.symbols[i] = new Symbol(i, 0, this.fontSize, this.canvasHeight);
            }
        }
        resize(width, height){
            this.canvasWidth = width;
            this.canvasHeight = height;
            this.columns = this.canvasWidth/this.fontSize;
            this.symbols = [];
            this.#initialize();
        }

        fontSizeChange() {
            let fontSize = 30;
            if (windowWidth <= 768) {
                fontSize = 20;
            } 
            else if (windowWidth <= 425) {
                fontSize = 14;
            }
            return fontSize;
        }
    }

    const effect = new Effect(canvas.width, canvas.height);
    let lastTime = 0;
    const fps = 18;
    const nextFrame = 1000/fps;
    let timer = 0;

    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
    
        var gradient = ctx.createLinearGradient(0, 0, 0, 500);
        gradient.addColorStop(0, "rgba(24,98,206,0.1)");
        gradient.addColorStop(1, "rgba(37,187,239,0.1)");
        
        if (timer > nextFrame){
            ctx.textAlign = "center";
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.font = effect.fontSize + 'px monospace';
            ctx.fillStyle = '#FFFF';
            ctx.fillStyle = '#FFFF';

            ctx2.textAlign = "center";
            ctx2.clearRect(0, 0, canvas.width, canvas.height);
            ctx2.font = effect.fontSize + 'px monospace';
            ctx2.fillStyle = 'white';

            effect.symbols.forEach(symbol => symbol.draw(ctx, ctx2));
            timer = 0;
        } else {
            timer += deltaTime;
        }
        requestAnimationFrame(animate);
    }
    animate(0);

    window.addEventListener('resize', function(){
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        canvas2.width = window.innerWidth;
        canvas2.height = window.innerHeight;
        effect.resize(canvas.width, canvas.height);
    })
}

let christmasBallsConfig = [
    {
        emergenceDate: new Date('2021-12-20'),
        selector: 'new-year__ball_green'
    },
    {
        emergenceDate: new Date('2021-12-21'),
        selector: 'new-year__ball_red-small'
    },
    {
        emergenceDate: new Date('2021-12-22'),
        selector: 'new-year__ball_purple'
    },
    {
        emergenceDate: new Date('2021-12-23'),
        selector: 'new-year__ball_blue'
    },
    {
        emergenceDate: new Date('2021-12-24'),
        selector: 'new-year__ball_red-big'
    },
    {
        emergenceDate: new Date('2021-12-25'),
        selector: 'new-year__ball_yellow'
    }
];

function showChristmasBall (selector, emergenceDate, currentDate) {
    let elment = document.querySelector(`.${selector}`); 
    
    if (currentDate >= emergenceDate) {
        elment.style.display = 'block';
    }
}

function christmasBalls() {
    let date = new Date('2022-12-01');

    christmasBallsConfig.forEach(ball => showChristmasBall(ball.selector, ball.emergenceDate, date));
}

document.addEventListener('DOMContentLoaded', () => {
    christmasBalls();
    snowfallAnimation();
})