import { TshapeItem, TpictureAnlytics, Trectengele, Tcircle, Tposition } from '@react-canvas/models';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';


type OffsetValues = {
  offsetX: number;
  offsetY: number;
};

@customElement('stage-svg')
export class StageSvg extends LitElement {

  @property({type: String, attribute: 'data-uid'})
  uid:string = 'my-element';

  @property()
  canvas: HTMLCanvasElement | undefined;

  @property()
  ctx: CanvasRenderingContext2D | undefined;

  @property({ type: Object, attribute: 'picture-anlytics' })
  pictureAnlytics!: TpictureAnlytics;

  @property()
  offsetValues: OffsetValues = { offsetX: 0, offsetY: 0 };

  @property()
  drugSape:boolean = false;

  drowAll() {
    console.log('drowPictureAnlytics');
    if (this.pictureAnlytics) {
      const { width, height } = this.pictureAnlytics;

      this.canvas?.setAttribute('width', width.toString());
      this.canvas?.setAttribute('height', height.toString());
      this.ctx?.clearRect(0, 0, width, height);
      this.drowBackgroundImg(this.pictureAnlytics.url);
      this.pictureAnlytics.shapes.forEach(shape => {
          this.drowShape(shape);
        });
    }
  }

  drowBackgroundImg(url: string) {
    if (this.canvas) {
      this.canvas.style.backgroundImage = `url(${url})`;
    }
  }

  calculateMousePosition(e: MouseEvent) {
    const { offsetX, offsetY } = this.offsetValues = {... this.calulateCanvasOffset()};
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    return { x, y };
  }

  onMouseDown = (e: MouseEvent) => {
    const { x, y } = this.calculateMousePosition(e);
    const shaps = [...this.pictureAnlytics.shapes];
    shaps.reverse();
    let selectedShapeId = null;
    for (let i = 0; i < shaps.length; i++) {
      const shape = shaps[i];
      if (this.ifCoordinatesInShape(x, y, shape)) {
        selectedShapeId = shape.id;
        break;
      }
    };
    if(selectedShapeId!==null) {
      this.pictureAnlytics.selectedShapeId = selectedShapeId;
      this.drugSape = true;
      this.drowAll();
    }


    console.log('onMouseDown', x, y);
  };

  onMouseMove = (e: MouseEvent) => {
    const { x, y } = this.calculateMousePosition(e);
    if(this.drugSape) {
      const shape = this.pictureAnlytics.shapes.find(shape => shape.id === this.pictureAnlytics.selectedShapeId);
      if(shape && shape.type === 'rectangle') {
        shape.x = x - shape.width / 2;
        shape.y = y - shape.height / 2;
      }
      if(shape && shape.type === 'circle') {
        shape.x = x;
        shape.y = y;
      }
      this.drowAll();
    }
  };

  onMouseUp = () => {

    if(this.drugSape) {
      //console.log('onMouseUp', `update-picture-anlytics-${this.uid}`,this.pictureAnlytics.shapes );

      this.dispatchEvent(new CustomEvent(`update-picture-anlytics-${this.uid}`, {
        detail: this.pictureAnlytics,
        bubbles: true,
        composed: true
      }));
      this.drugSape = false;
    }

  };

  calulateCanvasOffset() {
    const canvasOffset = this.canvas?.getBoundingClientRect();
    const offsetX = canvasOffset?.left || 0;
    const offsetY = canvasOffset?.top || 0;
    return { offsetX, offsetY };
  }


  drowrectangle(shape: { type: "rectangle"; } & Trectengele & Tposition & { id: number; color: string; selected: boolean; }) {
    if (this.ctx) {
      this.ctx.fillStyle = shape.color;
      this.ctx.strokeStyle = 'black';
      this.ctx.beginPath();
      this.ctx.lineWidth = 5;
      this.ctx.rect(shape.x, shape.y, shape.width, shape.height);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  drowCircle(shape: { type: "circle"; } & Tcircle & Tposition & { id: number; color: string; selected: boolean; }) {
    if (this.ctx) {
      this.ctx.fillStyle = shape.color;
      this.ctx.strokeStyle = 'black';
      this.ctx.beginPath();
      this.ctx.arc(shape.x, shape.y, shape.radius, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    }
  }

  drowShape(shape: TshapeItem) {
    switch (shape.type) {
      case 'circle':
        this.drowCircle(shape);
        break;
      case 'rectangle':
        this.drowrectangle(shape);
        break;
    }
  }

  override firstUpdated() {
    this.canvas = this.shadowRoot?.getElementById(`canvas-${this.uid}`) as HTMLCanvasElement;
    this.ctx = this.canvas?.getContext('2d') as CanvasRenderingContext2D;

    console.log(this.canvas, "this.ctx");
    this.canvas?.addEventListener('mousedown', this.onMouseDown);
    this.canvas?.addEventListener('mousemove', this.onMouseMove);
    this.canvas?.addEventListener('mouseup', this.onMouseUp);
    this.offsetValues = {... this.calulateCanvasOffset()};
  }

  override updated(changedProperties: { has: (arg0: string) => boolean; }) {
    if(changedProperties.has('pictureAnlytics')) {
      this.drowAll();
    }
  }

  ifCoordinatesInCircle(x: number, y: number, shape: { type: "circle"; } & Tcircle & Tposition & { id: number; color: string; selected: boolean; }) {
    const distance = Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2));
    console.log('ifCoordinatesInCircle', distance, shape.radius);
    return distance <= shape.radius;
  }

  ifCoordinatesInrectangle(x: number, y: number, shape: { type: "rectangle"; } & Trectengele & Tposition & { id: number; color: string; selected: boolean; }) {
    return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
  }

  ifCoordinatesInShape(x: number, y: number, shape: TshapeItem) {
    console.log('ifCoordinatesInShape', shape.id, shape.type,);
    switch (shape.type) {
      case 'circle':
        return this.ifCoordinatesInCircle(x, y, shape);
      case 'rectangle':
        return this.ifCoordinatesInrectangle(x, y, shape);
    }
  }


  override render() {
    return html`
    <style>
      :host {
        display: block;
        padding: 25px;
        color: var(--my-element-text-color, #000);
      }
      #canvas {
        border: 1px solid black;
      }
    </style>

    <h4>Try to move shapes ${this.uid}</h4>
    <canvas id="canvas-${this.uid}" width=300 height=300></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'stage-svg': StageSvg;
  }
}
