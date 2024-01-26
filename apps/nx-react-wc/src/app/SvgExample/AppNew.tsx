import { useStagesStore } from './stores/stagesStoreCreator';
import WcDrawWrapper from './components/WcDrawWrapper';

export const AppNew = () => {
  const {
    stages,
    selectedStage,
    setSelectedStage,
    resetSelectedStage,
    selectedStageId,
  } = useStagesStore((state) => state);
  return (
    <>
      <div>ID: {selectedStageId}</div>
      <ul>
        {stages.map((stage) => {
          return (
            <li key={stage.id}>
              <div>
                <h1>{stage.name}</h1>
                <div>
                  <button onClick={() => setSelectedStage(stage.id)}>
                    setActive
                  </button>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
      {selectedStage !== null ? (
        <div>
          <h1>{selectedStage.name}</h1>
          <div>
            <button onClick={() => resetSelectedStage()}>resetActive</button>
            <WcDrawWrapper data={selectedStage} />
          </div>
        </div>
      ) : (
        <div>no selected stage</div>
      )}
      <div></div>
    </>
  );
};
