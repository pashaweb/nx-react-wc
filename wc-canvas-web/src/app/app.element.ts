import { Tcircle, TpictureAnlytics, Tposition, Trectengele, TshapeItem } from "@react-canvas/models";

type TSelectedShape = {
  shape: TshapeItem | null;
  element: SVGElement | null;
  coefX: number;
  coefY: number;
}


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

const drowCircle = (shape:TshapeItem) => {
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

const createIamgeElement = (img: { url: string; width: number; height: number; }) => {
  const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  image.setAttribute('href', img.url);
  image.setAttribute('width', img.width.toString());
  image.setAttribute('height', img.height.toString());
  return image;
}

const clearSvg = (svg: SVGSVGElement) => {
  const children = svg.children;
  const childrenArr = Array.from(children); 
  for(const child of childrenArr){
    child.replaceWith(child.cloneNode(false));
    child.remove();
  }

};

export class AppElement extends HTMLElement {
  public static observedAttributes = [
    'title',
    'subtitle',
    'description',
    'image',
    'link',
    'data-uid'

  ];

  public test = 'test';
  public stageData: TpictureAnlytics | undefined;
  public uid = 'app-element';

  private selectedShape: TSelectedShape = {
    shape: null,
    element: null,
    coefX: 1,
    coefY: 1,
  };

  private appTabIndex = 1;

  public setSelectedShape(shape: TshapeItem | null) {
    this.selectedShape.shape = shape;
    if (this.selectedShape.element) {
      this.selectedShape.element.setAttribute('stroke', 'none');
    }
    if (this.selectedShape.shape) {
      const element = this.svg?.querySelector(`[data-id="shape-${this.selectedShape.shape.id}"]`) as SVGElement;
      element.setAttribute('stroke', 'red');
      this.selectedShape.element = element;
    }
  }

  constructor() {
    super();
    console.log('constructor');
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name: string) {
    console.log(`Attribute ${name} has changed.`);
    this.render();
  }

  public svg: SVGSVGElement | null= null;


  public setStageData(stageData: TpictureAnlytics) {
    console.log('setStageData', stageData);
  
    if(this.svg){
      clearSvg(this.svg as SVGSVGElement);
    }
    this.stageData = stageData;
    this.drowAll(this.stageData);
  }



  drowShape(shape: TshapeItem, host: Element) {
    const { type } = shape;
    let element

    switch (type) {
      case 'rectangele':
        element = drowRectangle(shape);
        break;
      case 'circle':
        element = drowCircle(shape);
        break;
      default:
        break;
    }
    if (element && host) {
      element.setAttribute('data-id', `shape-${shape.id}`);
      element.setAttribute('tabindex', this.appTabIndex.toString());
      this.appTabIndex++;
      element.addEventListener('mousedown', () => {
        
        console.log('mouseDown', shape);
        this.setSelectedShape(shape);
      });

      element.addEventListener('focus', () => {
        console.log('focus', shape);
        this.setSelectedShape(shape);
      });

      element.addEventListener('mouseup', () => {
        console.log('mouseUp', shape);
        this.setSelectedShape(null);
      });

      
      host.appendChild(element);
    }
  }

  

  setBackGroundImage(img:{
    url:string;
    width:number;
    height:number;
  }, hostSvg: SVGElement) {
    const image = createIamgeElement(img);
    hostSvg.setAttribute('width', (img.width ).toString());
    hostSvg.setAttribute('height', (img.height ).toString());
    hostSvg.setAttribute('viewBox', `0 0 ${img.width} ${img.height}`);
    hostSvg.appendChild(image);
  }

  private handeleMouseMove = (pos:{x:number, y:number}, moveObj: TSelectedShape) => {
    if(!moveObj.shape || !moveObj.element){
      return;
    }

    let { x, y } = pos;
    const { element,  shape} = moveObj;
    const { type } = shape;
    
    type === 'rectangele' ? (x -= shape.width / 2) : (x );
    type === 'rectangele' ? (y -= shape.height / 2) : (y);
    shape.x = x;
    shape.y = y;
    const xAttrKey = type === 'circle' ? 'cx' : 'x';
    const yAttrKey = type === 'circle' ? 'cy' : 'y';
    if (element) {
      element.setAttribute(xAttrKey, x.toString());
      element.setAttribute(yAttrKey, y.toString());
    }
  }

  createSvgRoot (host:Element){
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('id', `svg-${this.uid}`);
    host.appendChild(svg);
    svg.addEventListener('mousemove', (event) => {
      const pos = this.mousePos(event, svg);
      this.handeleMouseMove(pos, this.selectedShape);
    });
    return svg;
  }


  drowAll(data: TpictureAnlytics) {
    if(!this.svg){
      const host = document.querySelector(`#holder-${this.uid}`) as Element;
      const svg = this.createSvgRoot(host);
      this.svg = svg;
    }

    const { width, height, url } = data
    this.setBackGroundImage({ url, width, height }, this.svg);
    const shapes:TshapeItem[]  = data.shapes|| [] ;
    for (const shape of shapes) {
      this.drowShape(shape, this.svg);
    }
  }

  mousePos(event: MouseEvent, svg: SVGSVGElement) {
    let p = svg.createSVGPoint();
    p.x = event.clientX;
    p.y = event.clientY;
    const matrix = svg.getScreenCTM();
    if (matrix){
      p = p.matrixTransform(matrix.inverse());
    }
    
    return {
      x: p.x,
      y: p.y
    }
  }
    

  private cssTempleate = `
    <style>
    .app{
      @import url("https://fonts.googleapis.com/css?family=Roboto:300,400,500");
      color:black;
      font-family: Roboto, sans-serif;
      h1{
        color:red;
      }
      svg text{
        fill:blue;
      }
      svg rect, svg circle{
        cursor:grab;
      }

    }
    </style>`;

  render(){
    this.innerHTML = `
    ${this.cssTempleate}
    <div class="app">
        <header class="flex">test
          <h1 class='test'>
            This is a web component with SVG
          </h1>
        </header>
        <div id="holder-${this.uid}">
        </div>
      </div>
    `;
  }
}
customElements.define('nx-react-wc-root', AppElement);
