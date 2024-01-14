import styles from './app.module.css';
import WcDrowWrapper from "./components/WcDrowWrapper";
import { WcList } from './components/WcList';
import { usePictureAnaliticsStore } from "./stores/userePicturesList";




export function App() {
  const list = usePictureAnaliticsStore(state => state.list);
  const selectPicture = usePictureAnaliticsStore(state => state.setSelectedPictureId);
  const currentPicture = usePictureAnaliticsStore(state => state.selectedPicture);


  return (
    <>
  

      <h1>Welcome to nx-react-wc!</h1>
     <main className={styles.container}>
      <div>
        <ul className={styles.list} >
          {
            list.map((item) => {
              return <li key={item.id} onClick={() => selectPicture(item.id)}>
                <img src={item.url} width='50px' />
                {item.name} {item.selected ? 'selected' : ''}
              </li>
            })
          }
        </ul>
      </div>

      <div>
        {
          currentPicture && <WcDrowWrapper data={currentPicture} />
        }
      </div>
      </main>
      <WcList />
      
    

    
    </>

    
    // <div>
    //   <h1>Welcome to nx-react-wc!</h1>
    //   <button onClick={handellClick}>randomize</button>
    //   <WcDrowWrapper data={refData.current} />

     
    // </div>
  );
}

export default App;


