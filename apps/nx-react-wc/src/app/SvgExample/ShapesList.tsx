import styles from './SapesList.module.css';
import { TpictureAnlytics } from '@react-canvas/models';

export type ShapesListProps = {
  item: TpictureAnlytics;
  onSelected: (shapeId: number) => void;
};
export const ShapesList = (props: ShapesListProps) => {
  const { item, onSelected } = props;
  const { shapes } = item;
  return (
    <ul className={styles['list-item-shapes']}>
      {shapes.map((shape) => {
        return (
          <li key={shape.id}>
            <button onClick={() => onSelected(shape.id)}>
              id: {shape.selected ? 1 : 0}, x: {Math.floor(shape.x)}, y:{' '}
              {Math.floor(shape.y)}
            </button>
          </li>
        );
      })}
    </ul>
  );
};
