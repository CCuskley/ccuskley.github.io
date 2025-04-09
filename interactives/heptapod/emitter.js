// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Smoke Particle System

// A class to describe a group of Particles
// An ArrayList is used to manage the list of Particles

class Emitter {
  constructor(x, y) {
    this.particles = []; // Initialize the arraylist
    this.origin = createVector(x, y); // Store the origin point
  }

  run(rmode) {
    for (let particle of this.particles) {
      particle.run(rmode);
    }
    //this.particles = this.particles.filter((particle) => !particle.isDead());
  }

  // Method to add a force vector to all particles currently in the system
  applyForce(force) {
    // Enhanced loop!!!
    for (let particle of this.particles) {
      particle.applyForce(force);
    }
  }

  addParticle(cBound,textPoint,pType,isVisible) {
    if (pType) {
      this.particles.push(new Protrusion(this.origin.x,this.origin.y,cBound,textPoint))
    } else {
      this.particles.push(new Particle(this.origin.x, this.origin.y,cBound,textPoint,isVisible));
    }
    
  }
}
