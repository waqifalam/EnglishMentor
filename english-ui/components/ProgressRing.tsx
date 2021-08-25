import React, { useEffect, useState } from "react";

interface Props {
  radius: number;
  stroke: number;
  time: number;
}

const ProgressRing: React.FC<Props> = ({ radius, stroke, time }) => {
  const [progress, setProgress] = useState(0);
  const [normalisedRadius] = useState(radius - stroke * 2);
  const [circumference] = useState(normalisedRadius * 2 * Math.PI);

  const strokeDashoffset = circumference - progress / 100 * circumference;

  const timeInterval = Math.floor(100 / time);

  useEffect(() => {
      const interval = setInterval(() => {
        setProgress(progress => progress + timeInterval);
          if (progress === 100) {
            clearInterval(interval)
            setProgress(0);
          }
      }, 1000);

      return () => clearInterval(interval)
  }, [])

  return (
    <svg
      height={radius * 2}
      width={radius * 2}
    >
      <circle
        stroke="white"
        fill="transparent"
        strokeWidth={ stroke }
        strokeDasharray={ circumference + ' ' + circumference }
        style={ { strokeDashoffset } }
        r={ normalisedRadius }
        cx={ radius }
        cy={ radius }
      />
    </svg>
  );
};

export default ProgressRing;
