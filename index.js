/**@type{HTMLCanvasElement} */

const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let agentsArray = [];
let numOfAgents = canvas.width * 0.1;
const microphone = new Microphone();
let samples;
class Agent {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 8;
    this.sound;
    this.hue = 1;
    this.counter = 0;
    this.scaler = 1;
  }
  draw(index) {
    this.hue = this.sound * 10;
    console.log(this.hue);
    ctx.fillStyle = `hsl(${this.hue}, 50%, 50%)`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
  changeSize(value) {
    this.sound = value * 190;
    if (this.sound > this.size) {
      this.size = this.sound;
    } else {
      this.size -= this.size * 0.01;
    }
  }
  circularMovement() {
    if (this.counter > 360) {
      this.counter = 0;
    }
    this.x += Math.sin((this.counter / 180) * Math.PI);
    this.y += Math.cos((this.counter / 180) * Math.PI);

    this.counter++;
  }
}

for (let i = 0; i < numOfAgents; i++) {
  agentsArray.push(
    new Agent(Math.random() * canvas.width, Math.random() * canvas.height)
  );
}

function animate() {
  if (microphone.initialized) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    samples = microphone.getSamples();

    agentsArray.forEach((agent, index) => {
      agent.draw();
      agent.circularMovement();
      agent.changeSize(samples[index]);
    });
  }
  requestAnimationFrame(animate);
}
animate();
window.addEventListener("resize", (e) => {
  canvas.width = e.target.innerWidth;
  canvas.height = e.target.innerHeight;
});
