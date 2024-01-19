import { getDemo } from '@react-canvas/models';
const data = getDemo();
window.appData = data;
setTimeout(() => {
const el = document.querySelector('nx-react-wc-root');
el.setStageData(window['appData'][0]);
}, 0);
