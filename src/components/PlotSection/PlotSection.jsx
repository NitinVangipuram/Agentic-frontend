import React from 'react'
import styles from "./PlotSection.module.css";

const PlotSection = () => {

  const plots = [
    { src: "/download1.png", alt: "Plot1" },
    { src: "/download2.png", alt: "Plot2" },
    { src: "/download3.png", alt: "Plot3" },
    { src: "/download4.jpeg", alt: "Plot4" },
  ];

  return (
    <div className={styles.grid}>
      {
        plots.map((plot, index)=>{
          return(
            <div>              
              <img src={plot['src']} alt={plot['alt']}></img>
          </div>
          );
        })
      }
    </div>
  )
}

export default PlotSection
