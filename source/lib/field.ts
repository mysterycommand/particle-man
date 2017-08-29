import Vector, { IVector } from './vector';
import Particle, { IParticle } from './particle';

export interface IField {
  size: number;
  origin: IVector;
  particles: Array<IParticle>;
}

export default class Field implements IField {
  public particles: Array<IParticle>;

  constructor(public size: number = 1000, public origin: IVector = new Vector()) {
    this.particles = new Array(size).fill(Particle);
    console.log(this.particles);
  }
}
