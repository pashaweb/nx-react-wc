
import styles from './Barchart.module.css';
import { useEffect, useRef } from "react";
import * as d3 from 'd3';

export type BarchartProps = {


  /**
   * A sample prop that you can edit...
   */
  sampleProp?: string;

};

export function Barchart(props: BarchartProps) {
  const { sampleProp } = props;
  const ref = useRef<SVGSVGElement | null>(null);


  useEffect(() => {
    const margin = { top: 30, right: 30, bottom: 70, left: 60 },
      width = 1000 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page 
    const svg = d3
      .select(ref.current!)
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    // Parse the Data
    d3.csv(
      "https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/OneCatSeveralNumOrdered.csv"
    ).then(function (data) {

      const rowData = data.map((d) => {

        const enteris = Object.entries(d);
        const lastKey = enteris.pop();
        const ret = [lastKey[1], enteris];
        return ret
      });
      // X axis
      const x = d3
        .scaleBand()
        .range([0, width])
        .domain(data.map((d) => {
          return d.Country;
        }))
        .padding(0.3);
      svg
        .append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("transform", "translate(-10,0)rotate(-45)")
        .style("text-anchor", "end");

      // Add Y axis
      const y = d3.scaleLinear().domain([0, 13000]).range([height, 0]);
      svg.append("g").call(d3.axisLeft(y));

      // Bars
      svg
        .selectAll("mybar")
        .data(data)
        .join("rect")
        .attr("x", (d) => x(d.Country)!)
        .attr("y", (d) => y(Number(d['2010']) ? Number(d['2010']) : 0))
        .attr("width", x.bandwidth())
        .attr("height", (d) => height - y(Number(d['2010']) ? Number(d['2010']) : 0))
        .attr("fill", "#5f0f40");
    });
    return () => {
      svg.remove();
    }
  }, [props]);

  return (
    <div className={styles['container']}>

      <h1>Welcome to Barchart! {sampleProp}</h1>
      <p>Feel free to explore and edit the code to see how it works!</p>
      <svg width={1000} height={400} id="barchart" ref={ref} />
    </div>

  );
}

export default Barchart;