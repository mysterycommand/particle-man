import Vector, { IVector } from './vector';

const { assign } = Object;

export interface IParticle {
  pos: IVector;
  vel: IVector;
  acc: IVector;
}

export interface IParticleOptions {
  pos?: Vector;
  vel?: Vector;
  acc?: Vector;
}

export default class Particle implements IParticle {
  pos: Vector = new Vector();
  vel: Vector = new Vector();
  acc: Vector = new Vector();

  constructor(options?: IParticleOptions) {
    assign(this, options);
  }
}
