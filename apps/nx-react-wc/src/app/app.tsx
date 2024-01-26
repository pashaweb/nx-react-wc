import styles from './app.module.css';
import WcDrawWrapper from './components/WcDrawWrapper';
import { usePictureAnaliticsStore } from './stores/userePicturesList';
import { TpictureAnlytics } from '@react-canvas/models';

export type ShapesListProps = {
  item: TpictureAnlytics;
  onSelected: (shapeId: number) => void;
};

function ShapesList(props: ShapesListProps) {
  const { item, onSelected } = props;

  return (
    <ul className={styles['list-item-shapes']}>
      {item.shapes.map((shape) => {
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
}

export function App() {
  const list = usePictureAnaliticsStore((state) => state.list);
  const selectPicture = usePictureAnaliticsStore(
    (state) => state.setSelectedPictureId
  );
  const currentPicture = usePictureAnaliticsStore(
    (state) => state.selectedPicture
  );
  const updateListItem = usePictureAnaliticsStore(
    (state) => state.updateListItem
  );

  const isSelected = (id: number) => {
    let result = false;
    if (!currentPicture) return result;
    if (currentPicture?.id === id) {
      result = true;
    }
    return result;
  };
  const handeleShapeClick = (id: number) => {
    console.log('handeleShapeClick', id);
    if (!currentPicture) return;
    const newItem: TpictureAnlytics = { ...currentPicture };

    newItem.shapes.forEach((shape) => {
      shape.selected = false;
      if (shape.id === id) {
        shape.selected = !shape.selected;
      }
    });
    updateListItem(newItem);
  };
  return (
    <>
      <h1>Welcome to nx-react-wc!</h1>
      <main className={styles.container}>
        <div>
          <ul className={styles.list}>
            {list.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => selectPicture(item.id)}
                  className={
                    isSelected(item.id)
                      ? `${styles['list-item']} ${styles['list-item-selected']}`
                      : `${styles['list-item']}`
                  }
                >
                  <div className={styles['list-item-link']}>
                    <img src={item.url} width="50px" alt='sds' />
                    {item.name} {item.selected ? 'selected' : ''}
                  </div>
                  {isSelected(item.id)
                    ? ShapesList({ item, onSelected: handeleShapeClick })
                    : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div>{currentPicture && <WcDrawWrapper data={currentPicture} />}</div>
      </main>
    </>

    // <div>
    //   <h1>Welcome to nx-react-wc!</h1>
    //   <button onClick={handellClick}>randomize</button>
    //   <WcDrowWrapper data={refData.current} />

    // </div>
  );
}

export default App;
