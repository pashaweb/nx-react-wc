import styles from '../app.module.css';
import { TshapeItem } from '@react-canvas/models';
import { ShapesListProps, ShapesListItem } from './ShapesListProps';

export type shapesListItemProps = {
  shape: TshapeItem;
  onSelected: (shapeId: number) => void;
};

export function ShapesList(props: ShapesListProps) {
  const { item, onSelected } = props;

  return (
    <ul className={styles['list-item-shapes']}>
      {item.shapes.map((shape) => {
        return (
          <ShapesListItem key={shape.id} shape={shape} onSelected={onSelected} />
        );
      })}
    </ul>
  );
}
