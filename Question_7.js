 

class Shape {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  area() {
    return 0; 
  }
}

//Triangle subclass
class Triangle extends Shape {
  area() {
    return 0.5 * this.width * this.height;
  }
}

// Rectangle subclass
class Rectangle extends Shape {
  area() {
    return this.width * this.height;
  }
}


const triangle = new Triangle(5, 4);
const rectangle = new Rectangle(6, 3);

console.log(`Triangle Area: ${triangle.area()}`);
console.log(`Rectangle Area: ${rectangle.area()}`);