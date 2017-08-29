import Vector, { IVector } from './vector';
import Particle, { IParticle } from './particle';

const { assign } = Object;

export interface IField {
  size: number;
  origin: IVector;
  particles: Array<IParticle>;
}

export interface IFieldOptions {
  size?: number;
  origin?: IVector;
  particles?: Array<IParticle>;
}

export default class Field implements IField {
  size: number = 1000;
  origin: IVector = new Vector();
  particles: Array<IParticle> = [];

  constructor(options?: IFieldOptions) {
    assign(this, options);
  }
}
