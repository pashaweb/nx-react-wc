import { TpictureAnlytics, TshapeItem } from "./models";

const picks = [
  {
    name: 'Spacecraft',
    url: 'https://live.staticflickr.com/65535/53389652523_77867aaf22_c.jpg',
    id: 1,
    width: 799,
    height: 712,
  },
  {
    name: 'Meteor',
    url: 'https://live.staticflickr.com/65535/53389652123_62aa87433f.jpg',
    id: 2,
    width: 437,
    height: 500,
  },
  {
    name: 'Black Hole',
    url: 'https://live.staticflickr.com/65535/53321377829_e4541f27e6_b.jpg',
    id: 3,
    width: 1024,
    height: 475,
  },
  {
    name: 'Solar System',
    url: 'https://live.staticflickr.com/65535/53367408399_b5e01a4586_b.jpg',
    id: 4,
    width: 1024,
    height: 683,
  },
  {
    name: 'Constellation',
    url: 'https://live.staticflickr.com/65535/53395722120_5b5ded7491.jpg',
    id: 5,
    width: 373,
    height: 500,
  },
  {
    name: 'Interplanetary',
    url: 'https://smd-cms.nasa.gov/wp-content/uploads/2023/05/pia13001-venus-jpg.webp?w=2048&format=webp',
    id: 6,
    width: 769,
    height: 433,
  },
  {
    name: 'Eclipse',
    url: 'https://smd-cms.nasa.gov/wp-content/uploads/2023/05/1-venus-corona-1041-jpg.webp?w=2048&format=webp',
    id: 7,
    width: 985,
    height: 554,
  },
];


//const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple', 'orange', 'brown', 'white', 'gray'];


const geRandomeColor = () => {

  const randomColor = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, 0.7)`;
   // const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

const getCercleRandomePositionAndRadius = (w: number,h: number) => {
    const min = Math.min(w,h);
    const radius = Math.floor(Math.random() * (min / 2));
    const x = Math.floor(Math.random() * (w - radius));
    const y = Math.floor(Math.random() * (h - radius));
    return {x, y, radius};
}

const getRectangleRandomePositionAndSize = (w: number, h: number) => {
  const width = Math.floor(Math.random() * (w / 2));
  const height = Math.floor(Math.random() * (h / 2));
  const x = Math.floor(Math.random() * (w - width));
  const y = Math.floor(Math.random() * (h - height));
  return {x, y, width, height};
}

const getRandomeShape = (id: number, w: number, h: number): TshapeItem => {
    const shapes = ['circle', 'rectangele'];
    const randomShape = shapes[Math.floor(Math.random() * shapes.length)];
    if (randomShape === 'circle') {
        const {x, y, radius} = getCercleRandomePositionAndRadius(w, h);
        return {
            id: id,
            type: 'circle',
            x: x,
            y: y,
            radius: radius,
            color: geRandomeColor(),
            center: 'center',
            selected: false,
        };
    } else {
        const {x, y, width, height} = getRectangleRandomePositionAndSize(w, h);
        return {
            id: id,
            type: 'rectangele',
            x: x,
            y: y,
            width: width,
            height: height,
            color: geRandomeColor(),
            center: 'left-top',
            selected: false,
        };
    }
}

const withShapes: TpictureAnlytics[] = picks.map((pick) => {

    const shapes:TshapeItem[] = [];
    const numOfShapes = Math.floor(Math.random() * 10 + 1);
    for (let i = 0; i < numOfShapes; i++) {
        const shape = getRandomeShape(i, pick.width, pick.height);
        shapes.push(shape);
    }
  return {
    ...pick,
    shapes: shapes,
    selected: false,
    selectedShapeId: null,
  };
});

export const getDemo= ()=> withShapes;

console.log(withShapes);
 