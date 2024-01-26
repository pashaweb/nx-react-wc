import { TshapeItem } from "@react-canvas/models";

export const drawRectangle = (shape:TshapeItem) => {
    if(shape.type !== 'rectangle'){
      return null;
    }
    const { x, y, width, height, color } = shape;
    const rectangle = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangle.setAttribute('x', x.toString());
    rectangle.setAttribute('y', y.toString());
    rectangle.setAttribute('width', width.toString());
    rectangle.setAttribute('height', height.toString());
    rectangle.setAttribute('fill', color);
    return rectangle;
  }

  export const drowCircle = (shape:TshapeItem) => {
    if(shape.type !== 'circle'){
      return null;
    }
    const { x, y, radius, color } = shape;
    const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
    circle.setAttribute('cx', x.toString());
    circle.setAttribute('cy', y.toString());
    circle.setAttribute('r', radius.toString());
    circle.setAttribute('fill', color);
    return circle;
  }

  export const createImageElement = (img: { url: string; width: number; height: number; }) => {
    const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
    image.setAttribute('href', img.url);
    image.setAttribute('width', img.width.toString());
    image.setAttribute('height', img.height.toString());
    return image;
  }

  export const clearSvg = (svg: SVGSVGElement) => {
    const children = svg.children;
    const childrenArr = Array.from(children);
    for(const child of childrenArr){
      child.replaceWith(child.cloneNode(false));
      child.remove();
    }
  };


  export const setStageSvgBackground = (svg: SVGSVGElement, img: { url: string; width: number; height: number; }) => {
    svg.setAttribute('width', img.width.toString());
    svg.setAttribute('height', img.height.toString());
    svg.setAttribute('viewBox', `0 0 ${img.width} ${img.height}`);
    const bgImg = createImageElement({ url: img.url, width: img.width, height: img.height });
    svg.appendChild(bgImg);
  }

  export const createRootSvg = () => {
    return document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  }

  //nx g @nx/node:app stage-svg
