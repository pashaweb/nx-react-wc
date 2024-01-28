import styles from '../app.module.css';
import { TpictureAnlytics } from '@react-canvas/models';
import { shapesListItemProps } from './ShapesList';

export type ShapesListProps = {
  item: TpictureAnlytics;
  onSelected: (shapeId: number) => void;
};
export const ShapesListItem = (props: shapesListItemProps) => {
  const { shape, onSelected } = props;
  console.log("shapesListItem was rendered at", new Date().toLocaleTimeString());
  return (
    <li
      key={shape.id}
      onClick={() => onSelected(shape.id)}
      className={shape.selected
        ? `${styles['list-item']} ${styles['list-item-selected']}`
        : `${styles['list-item']}`}
    >
      x:{Math.floor(shape.x)} y:{Math.floor(shape.y)}
    </li>
  );
};
