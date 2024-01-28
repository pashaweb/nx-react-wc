import { useCallback, useState } from 'react';
import styles from './app.module.css';
import { TpictureAnlytics } from '@react-canvas/models';
import { useStagesStore } from './stores/stagesStoreCreator';
import { ShapesList } from './components/ShapesList';
import WcDrawWrapperCanvas from './components/WcDrawWrapperCanvas';
export function Canvas() {

  const [selectedStage, _setSelectedStage] = useState<TpictureAnlytics | null>(null);



  const {
    stages,
    selectedStageId,
    setSelectedStage,
    updateStage
  } = useStagesStore((state) => state);



  const isSelected = (id: number) => {
    let result = false;
    if (!selectedStage) return result;
    if (selectedStageId === id) {
      result = true;
    }
    return result;
  };

  const handeleShapeClick = useCallback(
    (id: number) => {
      console.log('handeleShapeClick', id);
      if (!selectedStage) return;
      const newItem: TpictureAnlytics = { ...selectedStage };

      newItem.shapes.forEach((shape) => {
        shape.selected = false;
        if (shape.id === id) {
          shape.selected = !shape.selected;
        }
      })
      updateStage(newItem);
    }, [selectedStage, updateStage]
  );

  const handeleStageSelection = useCallback(
    (id: number) => {
      const stage = stages.find((item) => item.id === id);
      if (!stage) return;
      _setSelectedStage(stage);
      setSelectedStage(id);
    }, [setSelectedStage, stages]
  );

  return (
    <>
      <h1>Welcome to nx-react-wc!</h1>
      <main className={styles.container}>
        <div>
          <ul className={styles.list}>
            {stages.map((item) => {
              return (
                <li
                  key={item.id}
                  onClick={() => handeleStageSelection(item.id)}
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
                    ? <ShapesList item={item} onSelected={handeleShapeClick} />
                    : null}
                </li>
              );
            })}
          </ul>
        </div>

        <div>{selectedStage && <WcDrawWrapperCanvas data={selectedStage} uid={selectedStageId} />}</div>
      </main>

    </>
  );
}

export default Canvas;
