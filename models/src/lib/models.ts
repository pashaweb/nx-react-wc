export type Trectengele = {
  width: number;
  height: number;

};

export type Tcircle = {
  radius: number;
};

export const CenterTypes = ['center', 'left-top', 'right-top', 'left-bottom', 'right-bottom'] as const;
export const ShapeTypes = ['circle', 'rectangele'] as const;

export type Tposition = {
  x: number;
  y: number;
  center: typeof CenterTypes[number];
};

//export  type TshapeWithPosition<T> = T & Tposition;
export  type TshapeWithPosition = {
  type: 'circle'
} & Tposition & Tcircle | {
  type: 'rectangle'
} & Tposition & Trectengele;


export type TshapeCercle = {
  type : 'circle'
} & Tcircle;

export type TshapeRectangele = {
  type : 'rectangele'
} & Trectengele;

export type Tshape = TshapeCercle | TshapeRectangele;

export type TshapeItem = TshapeWithPosition & {
  id: number;
  color: string;
  selected: boolean;
};


export type TpictureAnlytics = {
  id: number;
  url: string;
  name: string;
  width: number;
  height: number;
  shapes: TshapeItem[];
  selected: boolean;
  selectedShapeId: number | null;
};

const shapeCercle: TshapeItem = {
  id: 1,
  type: 'circle',
  x: 100,
  y: 100,
  radius: 50,
  color: 'red',
  center: 'center',
  selected: false,
};

const shapeRectangele: TshapeItem = {
  id: 2,
  type: 'rectangle',
  x: 200,
  y: 200,
  width: 100,
  height: 100,
  color: 'blue',
  center: 'left-top',
  selected: false,
};



export function models(): string {
  console.log('models');
  console.log(shapeCercle);
  console.log(shapeRectangele);
  return 'models';
}

