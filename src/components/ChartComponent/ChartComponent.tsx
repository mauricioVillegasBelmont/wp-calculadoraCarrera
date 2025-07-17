import React, { useEffect, useState } from "react";
import Chart from 'react-apexcharts'
import Costos from "../../data/costos";

import FormatCurrency from "../../Utils/FormatCurrency";

interface ChartComponentProps {
  type:"bar" | "line" | "area" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
  data:number[];
  width?: number;
}

interface optionsSchemaType{
  xaxis: {
    categories: string[],
  }
  yaxis?: any;
  tooltip?: any;
}

interface seriesSchemaType{
  name: string,
  data: number[],
}



export default function ChartComponent(props:ChartComponentProps) {
  const optionsSchema:optionsSchemaType = {
    xaxis: {
      categories: [],
    },
    yaxis: {
      labels: {
        formatter: function (value:number) {
          const currency = FormatCurrency(value,{decimals:0});
          return currency
        },
      },
    },
    tooltip: {
      y: {
        formatter: function (value:number) {
          const currency = FormatCurrency(value,{decimals:0});
          return currency
        },
      },
    }
  }

  const [options,setOptions] = useState<optionsSchemaType>(
    optionsSchema
  );
  const [series,setSeries] = useState<seriesSchemaType[]>([]);
  const {
    CostoCredito,
  } = Costos;
  const {type="bar", data, width= 350} = props;
  const cat = data.map((_,index)=>`semestre ${index+1}`)

  useEffect(() => {
    const SemestralCost = data.map((costo)=> CostoCredito * costo)
    setOptions(
      {
        ...options,

        xaxis: {
          ...options.xaxis,
          categories: cat
        },
      }
    )
    setSeries([
      {
        name: 'Costo',
        data: SemestralCost
      }
    ])
  },[data])


  return (
    <Chart 
      options={options} 
      series={series} 
      type={type} 
      width={width} 
      height={width*(9/16)}
      
    />
  )
}