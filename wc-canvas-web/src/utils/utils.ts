import { TshapeItem } from "@react-canvas/models";

export const drowRectangle = (shape:TshapeItem) => {
    if(shape.type !== 'rectangele'){
      return null;
    }
    const { x, y, width, height, color } = shape;
    const rectangele = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    rectangele.setAttribute('x', x.toString());
    rectangele.setAttribute('y', y.toString());
    rectangele.setAttribute('width', width.toString());
    rectangele.setAttribute('height', height.toString());
    rectangele.setAttribute('fill', color);
    return rectangele;
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
  
  export const createIamgeElement = (img: { url: string; width: number; height: number; }) => {
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