import { useEffect, useState } from 'react';
import { usePictureAnaliticsStore } from '../stores/userePicturesList';
import WcDrawWrapper from './WcDrawWrapper';

export const WcList = () => {
  const list = usePictureAnaliticsStore((state) => state.list);
  const [list2, setList2] = useState(list);
  useEffect(() => {
    setList2(list);
  }, [list]);
  return (
    <>
      <h1>WcList</h1>
      <ul>
        {list.map((item) => {
          return (
            <li key={item.id}>
              <img src={item.url} width="50px" />
              {item.name} {item.selected ? 'selected' : ''}
              <div>
                <WcDrawWrapper data={item} />
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
};
