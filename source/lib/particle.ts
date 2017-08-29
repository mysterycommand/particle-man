import Vector, { IVector } from './vector';

export interface IParticle {
  pos: IVector;
  vel: IVector;
  acc: IVector;
}

export default class Particle implements IParticle {
  pos = new Vector();
  vel = new Vector();
  acc = new Vector();
}
