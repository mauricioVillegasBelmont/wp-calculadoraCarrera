import React, { useEffect, useState, lazy, Suspense, useRef, useMemo } from "react";

import {type SectionContentSchema, type CostosSchema} from "../../data/context/ContentContext";

// import Chart from 'react-apexcharts'
const Chart = lazy(() => import('react-apexcharts'));
import FormatCurrency from "../../Utils/FormatCurrency";
import { useUserCarreraContext } from "../../data/hooks/UserDataHook";



interface ChartComponentProps {
  contents: SectionContentSchema;
  costos : CostosSchema;
  type:"bar" | "line" | "area" | "pie" | "donut" | "radialBar" | "scatter" | "bubble" | "heatmap" | "candlestick" | "boxPlot" | "radar" | "polarArea" | "rangeBar" | "rangeArea" | "treemap";
  // data:number[];
  chartId?: string,
}

interface optionsSchemaType{
  xaxis: {
    categories: string[],
  }
  yaxis?: any;
  tooltip?: any;
  colors: string[];
  chart?: any;
  dataLabels?: any;
  plotOptions?: any;
  responsive?: any[];
}

interface seriesSchemaType{
  name: string,
  data: number[],
}



export default function ChartComponent(props:ChartComponentProps) {
  const {contents, costos, type="bar", chartId = "my-chart"} = props;
  const {
    CostoCredito,
  } = costos;
  
  const currentCarrera = useUserCarreraContext()
  if(!currentCarrera) return '';
  const {
    desglose = [],
  } = currentCarrera

  const chartRef = useRef<HTMLElement>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  
  const [series,setSeries] = useState<seriesSchemaType[]>([]);
  const [width, setWidth] = useState(0);
  const [isPrinting, setIsPrinting] = useState(false);
  const [printImage, setPrintImage] = useState<string | null>(null);
  
  

  const optionsSchema:optionsSchemaType = {
    colors:['#77B944'],
    chart: {
      fontFamily: 'Sarabun, sans-serif',
      redrawOnParentResize: true
    },
    xaxis: {
      categories: [],
    },
    dataLabels: {
      enabled: true,
      offsetY: -20,
      align: 'center',
      verticalAlign: 'middle',
      style: {
        fontSize: '12px',
        colors: ["#000000"],
      }
    },
    plotOptions: {
      bar: {
        dataLabels: {
          position: 'top', // top, center, bottom
          dataLabels: {
            style: {
              transform: 'rotate(90deg)',
            }
          }
        },
      },
    },
    responsive: [{
      breakpoint: 480,
      options: {
        dataLabels: {
          style: {
            fontSize: '8px',
            fontWeight: 'normal',
          },
        },
      }
    }],
  }

  const [options,setOptions] = useState<optionsSchemaType>(
    optionsSchema
  );


  const CurrencyFormat = useMemo(() => ({
    decimals: 0 as 0 | 1 | 2,
    notation: width > 480 ? 'standard' : 'compact'
  }), [width]);
  const formatter = (value:number)=>{
    return FormatCurrency(value, CurrencyFormat)
  }
  const printFormatter = (value:number)=>{
    return FormatCurrency(value, {
      decimals: 0,
      notation: 'standard'
    })
  }

  const handleRef = (el: HTMLDivElement | null) => {
    if (el) {
      chartRef.current = el;
      setWidth(Math.round(el.offsetWidth));

      if (!resizeObserverRef.current) {
        const observer = new ResizeObserver((entries) => {
          if(Math.round(entries[0].contentRect.width) === width) return
          setWidth(Math.round(entries[0].contentRect.width));
        });
        observer.observe(el);
        resizeObserverRef.current = observer;
      }
    } else {
      if (resizeObserverRef.current && chartRef.current) {
        resizeObserverRef.current.unobserve(chartRef.current);
        resizeObserverRef.current = null;
      }
      chartRef.current = null;
    }
  };
  

  // Actualizar opciones cuando cambia el ancho o el formato
  useEffect(() => {
    setOptions(prev => ({
      ...prev,
      yaxis: {
        ...prev.yaxis,
        show: width > 480,
        labels: {
          ...prev.yaxis?.labels,
          show: width > 480,
          formatter: formatter
        }
      },
      tooltip: {
        ...prev.tooltip,
        y: {
          ...prev.tooltip?.y,
          formatter: formatter
        }
      },
      dataLabels: {
        ...prev.dataLabels,
        formatter: formatter
      },
      chart: {
        ...prev.chart,
        width: width,
        height: width * (9 / 16)
      }
    }));
  }, [width, isPrinting, CurrencyFormat]);

  // Actualizar series y categorías
  useEffect(() => {
    const SemestralCost = desglose.map(costo => CostoCredito * costo);
    const cat = desglose.map((_, index) => `S${index + 1}`);

    setSeries([{ name: 'Costo', data: SemestralCost }]);
    setOptions(prev => ({
      ...prev,
      xaxis: {
        ...prev.xaxis,
        categories: cat
      }
    }));
  }, [desglose, CostoCredito]);

  // Manejo de impresión
  useEffect(() => {
    const handleBeforePrint = async () => {
      setIsPrinting(true);
      setWidth(800)
    };

    const handleAfterPrint = () => {
      setWidth(chartRef.current?.offsetWidth as number)
      setIsPrinting(false);
      setPrintImage(null);
    };

    window.addEventListener('beforeprint', handleBeforePrint);
    window.addEventListener('afterprint', handleAfterPrint);

    return () => {
      window.removeEventListener('beforeprint', handleBeforePrint);
      window.removeEventListener('afterprint', handleAfterPrint);
    };
  }, [chartId]);


  return (
    <>
    <h2 className="text-head2 text-emerald-950 font-bold mb-4">{contents.title}</h2>
    <Suspense fallback={<div>Cargando gráfico...</div>}>
      <div ref={handleRef} className="w-full" style={{ textAlign: 'center' }}>
        <Chart
          options={options} 
          series={series} 
          type={type} 
          width={isPrinting ? 800 : width} 
          height={isPrinting ? 600 : width*(9/16)}
        />
      </div>
    </Suspense>
    </>
  )
}