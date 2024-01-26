
import { useStagesStore } from '../stores/stagesStoreCreator';

export const WcList = () => {
  const { stages } = useStagesStore((state) => state);
  return (
    <>sta
      <h1>WcList</h1>
      <ul>
        {stages.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.url} width="50px" alt='stage' />
              {item.name} {item.selected ? 'selected' : ''}

            </li>
          );
        })}
      </ul>
    </>
  );
};
