import Barchart from '../components/Barchart/Barchart';
import LineChart, { LineData, LineChartRef } from '../components/LineChart/LineChart';
import styles from './home-page.module.css';
import { useEffect, useRef } from 'react';
export const demoData: LineData[] = [
    [0, 10],
    [5, 40],
    [20, 50],
    [35, 40],
    [50, 80],
    [65, 60],
    [80, 20],
    [95, 30],
    [100, 10],
    [105, 40],
    [120, 50],
    [200, 10],
    [205, 40],
    [265, 60],
    [280, 20],
    [300, 10],
    [350, 40],
    [480, 20],
    [495, 30]
];

export const demoData2: LineData[] = [

    [20, 50],
    [35, 40],
    [50, 67],
    [65, 60],
    [80, 20],
    [95, 30],
    [100, 10],
    [105, 23],
    [120, 50],
    [200, 10],
    [205, 40],
    [265, 56],

];


export function HomePage() {
    const chart = useRef<LineChartRef | null>(null);
    const setData = (data: LineData[]) => {
        if (chart.current) {
            chart.current.setData(data);
        }
    }
    const lineCharRef = useRef<LineData[]>(demoData);

    useEffect(() => {
        setData(demoData);
    }, []);

    return (
        <div>
            <h1>Home Page</h1>
            <div className={styles['buttons-container']}>
                <button onClick={() => {
                    setData(demoData);
                }}>Data 1</button>
                <button onClick={() => {
                    setData(demoData2);
                }}>Data 2</button>
            </div>
            <main>
                <ul>
                    <li>
                        <LineChart width={500} height={200} ref={chart} />

                    </li>
                    <li>
                        <Barchart sampleProp='fsfsd' />

                    </li>
                </ul>
            </main>
        </div>
    );
}
