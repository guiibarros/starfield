const canvas = document.querySelector('canvas');
const context2D = canvas.getContext('2d');
const fps = 60;

class Star {
  constructor() {
    this.x = Math.random() * (canvas.width + canvas.width) - canvas.width;
    this.y = Math.random() * (canvas.height + canvas.height) - canvas.height;
    this.z = Math.random() * canvas.width;
    this.pz = this.z;
    this.zSpeed = 10;
    this.opacity = 1;
    this.color = '#fff';
    this.radius = 2;
  }

  update() {
    this.pz = this.z;
    this.z -= this.zSpeed;
    
    if (this.z < 1) {
      this.z = canvas.width;
      this.x = Math.random() * (canvas.width + canvas.width) - canvas.width;
      this.y = Math.random() * (canvas.height + canvas.height) - canvas.height;
      this.opacity = 0;
      this.pz = this.z;
    }

    this.opacity = Math.min(1, this.opacity + 0.05);
  }

  draw() {
    const sx = map_range(this.x / this.z, 0, 1, 0, canvas.width);
    const sy = map_range(this.y / this.z, 0, 1, 0, canvas.height);

    const psx = map_range(this.x / this.pz, 0, 1, 0, canvas.width);
    const psy = map_range(this.y / this.pz, 0, 1, 0, canvas.height);

    context2D.beginPath();
    context2D.moveTo(psx, psy);
    context2D.lineTo(sx, sy);
    context2D.strokeStyle = this.color;
    context2D.stroke();
    context2D.closePath()
  }
}

// Processing map function
function map_range(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

const stars = [...new Array(400)].map(star => star = new Star());

function update() {
  stars.forEach(star => star.update());
}

function draw() {
  context2D.clearRect(0, 0, canvas.width, canvas.height)

  context2D.save();
  context2D.translate(canvas.width / 2, canvas.height / 2);
  stars.forEach(star => star.draw());
  context2D.restore();
}

setInterval(() => {
  update();
  draw();
}, 1000/fps);