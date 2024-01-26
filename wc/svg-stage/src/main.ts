import { TpictureAnlytics, TshapeItem } from '@react-canvas/models';
import { LitElement, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import {
  clearSvg,
  createRootSvg,
  drowCircle,
  drawRectangle,
  setStageSvgBackground,
} from './utils/utils';

type MosePosition = {
  x: number;
  y: number;
};

type SelectedShape = {
  shape: TshapeItem;
  el: SVGElement;
};

type MouseMoveAction =
  | 'DRUG_SHAPE'
  | 'CREATE_CIRCLE'
  | 'CREATE_RECTANGLE'
  | 'NONE';

@customElement('stage-svg')
export class StageSvg extends LitElement {
  @property()
  version = 'STARTING';

  @property()
  svgStage: SVGSVGElement | undefined;

  @property({ type: Object, attribute: 'data-stage-data' })
  stageDataProp: TpictureAnlytics | undefined;

  @property()
  stageData: TpictureAnlytics | undefined;

  @property({ type: String, attribute: 'data-event-update' })
  updateEventName: string = 'update-stage-data';

  private selectedShape: SelectedShape | undefined;
  private moseMoveAction: MouseMoveAction = 'NONE';

  override connectedCallback() {
    super.connectedCallback();
    this.version = 'CONNECTED';
  }

  override disconnectedCallback() {
    super.disconnectedCallback();
    this.version = 'DISCONNECTED';
  }

  override firstUpdated() {
    this.version = 'FIRST UPDATED';
  }

  override updated(changedProperties: { has: (arg0: string) => boolean }) {
    if (changedProperties.has('stageData')) {
      this.onStageDtaChange();
    }
  }

  onStageDtaChange() {
    this.checkOrCreateStage();
    setStageSvgBackground(this.svgStage as SVGSVGElement, {
      url: this.stageData?.url || '',
      width: this.stageData?.width || 0,
      height: this.stageData?.height || 0,
    });

    clearSvg(this.svgStage);
    this.initShapes();
  }

  checkOrCreateStage() {
    if (!this.svgStage) {
      const svg = createRootSvg();
      this.svgStage = svg;
      this.svgStage.addEventListener('mousemove', (e) => {
        this.onMouseMove(e);
      });
      const svgHolder = this.shadowRoot?.querySelector('.svg-holder');
      svgHolder?.appendChild(svg);
    }
  }

  initShapes() {
    const { shapes } = this.stageData as TpictureAnlytics;
    shapes.forEach((shape) => {
      this.drawShape(shape);
    });
  }

  drawShape(shape: TshapeItem) {
    const { svgStage } = this;
    if (!svgStage) return;
    let shapeEl: SVGElement | null = null;
    switch (shape.type) {
      case 'rectangle':
        shapeEl = drawRectangle(shape);
        break;
      case 'circle':
        shapeEl = drowCircle(shape);
        break;
      default:
        break;
    }
    if (shapeEl) {
      shapeEl.addEventListener('mousedown', () => {
        if (this.stageData.shapes) {
          const shapes = this.stageData?.shapes.map((s) => {
            if (s.id === shape.id) {
              return {
                ...s,
                selected: true,
              };
            }
            return {
              ...s,
              selected: false,
            };
          });
          this.stageData.shapes = [...shapes];
        }
        this.selectedShape = {
          shape,
          el: shapeEl as SVGElement,
        };
        this.moseMoveAction = 'DRUG_SHAPE';
        this.eventDispatch();
      });
      shapeEl.addEventListener('mouseup', this.mouseUp.bind(this));
      svgStage.appendChild(shapeEl);
    }
  }

  mouseUp() {
    this.clearSelectedShape();
    this.moseMoveAction = 'NONE';
    this.eventDispatch();
  }

  drugShape(pos: MosePosition, elToHandele: SelectedShape) {
    const { svgStage } = this;
    const { shape, el } = elToHandele;
    if (!svgStage) return;
    switch (shape.type) {
      case 'rectangle':
        shape.x = pos.x - shape.width / 2;
        shape.y = pos.y - shape.height / 2;
        el.setAttribute('x', shape.x.toString());
        el.setAttribute('y', shape.y.toString());
        break;
      case 'circle':
        shape.x = pos.x;
        shape.y = pos.y;
        el.setAttribute('cx', shape.x.toString());
        el.setAttribute('cy', shape.y.toString());
        break;
      default:
        break;
    }
  }

  onMouseMove(e: MouseEvent) {
    switch (this.moseMoveAction) {
      case 'DRUG_SHAPE':
        if (!this.selectedShape) return;
        this.drugShape(this.getMousePosition(e), this.selectedShape);
        break;
      case 'CREATE_CIRCLE':
        //this.onMouseMoveCreateCercle(e);
        break;
      case 'CREATE_RECTANGLE':
        //this.onMouseMoveCreateRectangle(e);
        break;
      default:
        break;
    }
  }

  getMousePosition(e: MouseEvent): MosePosition {
    const { svgStage } = this;

    if (!svgStage) return { x: 0, y: 0 };
    let p = this.svgStage.createSVGPoint();
    p.x = e.clientX;
    p.y = e.clientY;
    const matrix = this.svgStage.getScreenCTM();
    if (matrix) {
      p = p.matrixTransform(matrix.inverse());
    }

    return {
      x: p.x,
      y: p.y,
    };
  }

  render() {
    return html`
      <style>
        .svg-holder svg {
          fill: red;
        }
      </style>
      <p>Welcome to the Lit tutorial!</p>
      <p>This is the ${this.version} code.</p>
      <div class="svg-holder"></div>
    `;
  }

  private clearSelectedShape() {
    if (!this.selectedShape) return;
    this.updateStageDataShape();
    this.selectedShape.shape.selected = false;
    this.selectedShape = undefined;
  }

  private updateStageDataShape() {
    const { shape } = this.selectedShape as SelectedShape;
    if (!this.stageData.shapes) return;
    const shapes = this.stageData.shapes.map((s) => {
      if (s.id === shape.id) {
        return {
          ...s,
          ...shape,
        };
      }
      return s;
    });
    this.stageData.shapes = [...shapes];
  }

  private eventDispatch() {
    const event = new CustomEvent(this.updateEventName, {
      detail: this.stageData,
      bubbles: true,
      composed: true,
    });
    this.dispatchEvent(event);
  }
}
