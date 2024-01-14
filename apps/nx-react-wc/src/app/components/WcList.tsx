import { usePictureAnaliticsStore } from "../stores/userePicturesList";
import WcDrowWrapper from "./WcDrowWrapper";



export const WcList = () => {
    const list = usePictureAnaliticsStore(state => state.list);
  return (
    <>
        <h1>WcList</h1>
        <ul>
          {
            list.map((item) => {
              return <li key={item.id}>
                <img src={item.url} width='50px' />
                {item.name} {item.selected ? 'selected' : ''}
            <div>
                <WcDrowWrapper data={item} />
            </div>
              </li>
            })
          }
        </ul>
    </>
    

  )
}
