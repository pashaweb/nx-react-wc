import { TshapeItem, TpictureAnlytics, Trectengele, Tcircle, Tposition } from '@react-canvas/models';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';


type OffsetValues = {
  offsetX: number;
  offsetY: number;
};


@customElement('my-element')
export class MyElement extends LitElement {

  @property({type: String, attribute: 'data-uid'})
  uid:string = 'my-element';

  @property()
  canvas: HTMLCanvasElement | undefined;

  @property()
  ctx: CanvasRenderingContext2D | undefined;

  @property()
  stageData!: TpictureAnlytics;

  @property()
  offsetValues: OffsetValues = { offsetX: 0, offsetY: 0 };

  @property()
  drugSape:boolean = false;

  @property({ type: String, attribute: 'data-event-update' })
  updateEventName: string = 'update-stage-data';

  drowAll() {
    if (this.stageData) {
      const { width, height } = this.stageData;

      this.canvas?.setAttribute('width', width.toString());
      this.canvas?.setAttribute('height', height.toString());
      this.ctx?.clearRect(0, 0, width, height);
      this.drowBackgroundImg(this.stageData.url);
      const selectedShape = this.stageData.shapes.find(shape => shape.id === this.stageData.selectedShapeId);
      const shapes = [...this.stageData.shapes];
      if(selectedShape) {
        shapes.splice(shapes.indexOf(selectedShape), 1);
        shapes.push(selectedShape);
      }
      
      this.stageData.shapes.forEach(shape => {
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
    const shaps = [...this.stageData.shapes];
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
      this.stageData.selectedShapeId = selectedShapeId;
      for (let i = 0; i < shaps.length; i++) {
        const shape = shaps[i];
        shape.selected = shape.id === selectedShapeId;
      }

      this.drugSape = true;
      this.drowAll();
      this.eventDispatch();
    }
  };

  onMouseMove = (e: MouseEvent) => {
    const { x, y } = this.calculateMousePosition(e);
    if(this.drugSape) {
      const shape = this.stageData.shapes.find(shape => shape.id === this.stageData.selectedShapeId);
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
      for (let i = 0; i < this.stageData.shapes.length; i++) {
        const shape = this.stageData.shapes[i];
        shape.selected = false;
      }
      this.stageData.selectedShapeId = null;
      this.eventDispatch();
      this.drugSape = false;
      this.drowAll();
    }

  };

  private eventDispatch() {
    const event = new CustomEvent(this.updateEventName, {
      detail: this.stageData,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }

  calulateCanvasOffset() {
    const canvasOffset = this.canvas?.getBoundingClientRect();
    const offsetX = canvasOffset?.left || 0;
    const offsetY = canvasOffset?.top || 0;
    return { offsetX, offsetY };
  }


  drowrectangle(shape: { type: "rectangle"; } & Trectengele & Tposition & { id: number; color: string; selected: boolean; }) {
    if (this.ctx) {
      this.ctx.fillStyle = shape.color;
      this.ctx.strokeStyle = shape.selected ? 'red' : 'black';;
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
      this.ctx.strokeStyle = shape.selected ? 'red' : 'black';
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
    this.canvas?.addEventListener('mousedown', this.onMouseDown);
    this.canvas?.addEventListener('mousemove', this.onMouseMove);
    this.canvas?.addEventListener('mouseup', this.onMouseUp);
    this.offsetValues = {... this.calulateCanvasOffset()};
  }

  override updated(changedProperties: { has: (arg0: string) => boolean; }) {
    if(changedProperties.has('stageData')) {
      this.drowAll();
    }
  }

  ifCoordinatesInCircle(x: number, y: number, shape: { type: "circle"; } & Tcircle & Tposition & { id: number; color: string; selected: boolean; }) {
    const distance = Math.sqrt(Math.pow(x - shape.x, 2) + Math.pow(y - shape.y, 2));
    return distance <= shape.radius;
  }

  ifCoordinatesInrectangle(x: number, y: number, shape: { type: "rectangle"; } & Trectengele & Tposition & { id: number; color: string; selected: boolean; }) {
    return x >= shape.x && x <= shape.x + shape.width && y >= shape.y && y <= shape.y + shape.height;
  }

  ifCoordinatesInShape(x: number, y: number, shape: TshapeItem) {
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

    <h4>Try to move shapes ${this.uid} This IS canvas</h4>
    <canvas id="canvas-${this.uid}" width=300 height=300></canvas>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
