const { assign } = Object;

export interface IVector {
  x: number;
  y: number;
}

export interface IVectorOptions {
  x?: number;
  y?: number;
}

export default class Vector implements IVector {
  x: number = 0;
  y: number = 0;

  constructor(options?: IVectorOptions) {
    assign(this, options);
  }
}
