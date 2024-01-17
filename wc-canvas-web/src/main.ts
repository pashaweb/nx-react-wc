import { getDemo } from '@react-canvas/models'
import './app/app.element';
const data = getDemo();
window['appData'] = data;
console.log('data', window['appData'] );