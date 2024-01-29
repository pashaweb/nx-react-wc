import styles from './svg-stage-react.module.css';
import { TpictureAnlytics, TshapeItem } from '@react-canvas/models';
import React, { useRef, useState } from 'react';

/* eslint-disable-next-line */
export type SvgStageReactProps = {
  stageData: TpictureAnlytics;
  onUpdated: (data: TpictureAnlytics) => void;
  onDrugged: (shape: TshapeItem) => void;
};

type ShapeAction = 'DRUG' | 'RESIZE' | 'NONE';
type ShapeActionData = {
  action: ShapeAction;
  shapeId: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

type MosePosition = {
  x: number;
  y: number;
};

function getMousePosition(
  e: {
    clientX: number;
    clientY: number;
  },
  svgStage: SVGSVGElement
): MosePosition {
  if (!svgStage) return { x: 0, y: 0 };
  let p = svgStage.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  const matrix = svgStage.getScreenCTM();
  if (matrix) {
    p = p.matrixTransform(matrix.inverse());
  }

  return {
    x: p.x,
    y: p.y,
  };
}

export function SvgStageReact(props: SvgStageReactProps) {
  const [shapeAction, setShapeAction] = useState<ShapeActionData | null>(null);
  const { stageData } = props;
  const { shapes, url, width, height } = stageData;
  const selectShape = (shape: TshapeItem) => {
    const newAction: ShapeActionData = {
      action: 'DRUG',
      shapeId: shape.id,
      x: shape.x,
      y: shape.y,
      width: shape.type === 'rectangle' ? shape.width : shape.radius * 2,
      height: shape.type === 'rectangle' ? shape.height : shape.radius * 2,
    };
    const newData: TpictureAnlytics = { ...stageData };
    newData.shapes.forEach((shape) => {
      shape.selected = false;
    });
    shape.selected = true;
    props.onUpdated(newData);
    setShapeAction(newAction);
  };
  const realiseShape = () => {
    if (!shapeAction) return;
    const newShapeAction: ShapeActionData = { ...shapeAction };
    newShapeAction.action = 'NONE';
    setShapeAction(newShapeAction);
  };

  function drugShape(event: React.MouseEvent<SVGSVGElement>, shapeId: number) {
    const pos = getMousePosition(
      {
        clientX: event.clientX,
        clientY: event.clientY,
      },
      svgRef.current as SVGSVGElement
    );

    //console.log('onMouseMoveHandler', pos, shapeId);
    const newShape = shapes.find((shape) => shape.id === shapeId);
    if (!newShape) return;
    const shape = { ...newShape };
    if (shape.type === 'rectangle') {
      pos.x -= shape.width / 2;
      pos.y -= shape.height / 2;
    }
    shape.y = pos.y;
    shape.x = pos.x;
    props.onDrugged(shape);
  }

  const onMouseMoveHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    console.log('onMouseMoveHandler', shapeAction);
    if (!shapeAction) return;
    const { action: actionType, shapeId } = shapeAction;
    //const shapeType = shapes.find((shape) => shape.id === shapeId)?.type;
    if (actionType === 'DRUG') {
      drugShape(event, shapeId);
    }
  };
  const svgRef = useRef<SVGSVGElement | null>(null);

  return (
    <div className={styles['container']}>
      <h1>Welcome to SvgStageReact!</h1>
      <svg
        onMouseMove={(event) => onMouseMoveHandler(event)}
        ref={svgRef}
        className={styles['stage-svg']}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox={`0 0 ${width} ${height}`}
      >
        <image
          width={width}
          height={height}
          href={url}
          preserveAspectRatio="none"
        />
        {shapes.map((shape) => {
          if (shape.selected) {
            return null
          }
          if (shape.type === 'rectangle') {
            return (
              <rect
                key={shape.id}
                onMouseDown={() => selectShape(shape)}
                onMouseUp={() => realiseShape()}
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                fill={shape.color}
                stroke='black'
                strokeWidth={1}
              />
            );
          }
          if (shape.type === 'circle') {
            return (
              <circle
                key={shape.id}
                onMouseDown={() => selectShape(shape)}
                onMouseUp={() => realiseShape()}
                cx={shape.x}
                cy={shape.y}
                r={shape.radius}
                fill={shape.color}
                stroke='black'
                strokeWidth={1}
              />
            );
          }
          return null;
        })}
        {
          shapes
            .filter((shape) => shape.selected)
            .map((shape) => {
              if (shape.type === 'rectangle') {
                return (
                  <rect
                    key={shape.id}
                    onMouseDown={() => selectShape(shape)}
                    onMouseUp={() => realiseShape()}
                    x={shape.x}
                    y={shape.y}
                    width={shape.width}
                    height={shape.height}
                    fill={shape.color}
                    stroke='red'
                    strokeWidth={2}
                  />
                );
              }
              if (shape.type === 'circle') {
                return (
                  <circle
                    key={shape.id}
                    onMouseDown={() => selectShape(shape)}
                    onMouseUp={() => realiseShape()}
                    cx={shape.x}
                    cy={shape.y}
                    r={shape.radius}
                    fill={shape.color}
                    stroke='red'
                    strokeWidth={2}
                  />
                );
              }
              return null;
            })
        }
      </svg>

      <pre>{JSON.stringify(shapeAction, null, 2)}</pre>
    </div>
  );
}

export default SvgStageReact;
