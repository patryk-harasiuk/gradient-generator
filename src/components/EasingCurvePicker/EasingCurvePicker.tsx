import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./EasingCurvePicker.module.css";

type Props = {
  viewBoxWidth: number;
  viewBoxHeight: number;
};

type Coordinates = {
  x: number;
  y: number;
};

// 232

export const Bezier = ({ viewBoxHeight, viewBoxWidth }: Props) => {
  const [startPoint, setStartPoint] = useState<Coordinates>({ x: 0, y: 230 });
  const [firstControlPoint, setFirstControlPoint] = useState<Coordinates>({
    x: 57,
    y: 172,
  });

  const [secondControlPoint, setSecondControlPoint] = useState<Coordinates>({
    x: 172,
    y: 57,
  });

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!draggingPointId || !svgRef.current) {
      return;
    }

    const svgRect = svgRef.current.getBoundingClientRect();

    if (
      clientX >= svgRect.left &&
      clientX <= svgRect.right &&
      clientY >= svgRect.top &&
      clientY <= svgRect.bottom
    ) {
      const svgX = clientX - svgRect.left;
      const svgY = clientY - svgRect.top;

      const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;
      const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

      if (isStartPoint) setStartPoint({ x: viewBoxX, y: viewBoxY });

      if (isFirstControlPoint)
        setFirstControlPoint({ x: viewBoxX, y: viewBoxY });

      if (isSecondControlPoint)
        setSecondControlPoint({ x: viewBoxX, y: viewBoxY });

      if (isEndPoint) setEndPoint({ x: viewBoxX, y: viewBoxY });
    }
  };

  const handleMouseDown = (pointId: string) => {
    setDraggingPointId(pointId);
  };

  const handleMouseUp = () => {
    setDraggingPointId(null);
  };

  useEffect(() => {
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  const [endPoint, setEndPoint] = useState<Coordinates>({ x: 230, y: 0 });

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [draggingPointId, setDraggingPointId] = useState<string | null>(null);

  const isStartPoint = draggingPointId === "firstStartPoint";
  const isFirstControlPoint = draggingPointId === "firstControlPoint";
  const isSecondControlPoint = draggingPointId === "secondControlPoint";
  const isEndPoint = draggingPointId === "endPoint";

  const instructions = `
    M ${startPoint.x},${startPoint.y}
    C ${firstControlPoint.x},${firstControlPoint.y}
      ${secondControlPoint.x},${secondControlPoint.y}
      ${endPoint.x},${endPoint.y}
  `;

  return (
    <div className={styles.wrapper}>
      <div className={styles.svgWrapper}>
        <svg
          className={styles.svg}
          ref={svgRef}
          viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <ConnectingLine from={startPoint} to={firstControlPoint} />

          <ConnectingLine from={secondControlPoint} to={endPoint} />

          <Curve instructions={instructions} />
          <Handle
            coordinates={firstControlPoint}
            onMouseDown={() => handleMouseDown("firstControlPoint")}
          />

          <Handle
            coordinates={secondControlPoint}
            onMouseDown={() => handleMouseDown("secondControlPoint")}
          />
        </svg>
      </div>
    </div>
  );
};

type ConnectingLineProps = {
  from: Coordinates;
  to: Coordinates;
};

const ConnectingLine = ({ from, to }: ConnectingLineProps) => (
  <line
    x1={from.x}
    y1={from.y}
    x2={to.x}
    y2={to.y}
    stroke="var(--color-gray-700)"
    strokeDasharray="5,5"
    strokeWidth={2}
  />
);

type CurveProps = {
  instructions: string;
};

const Curve = ({ instructions }: CurveProps) => (
  <path
    d={instructions}
    fill="none"
    stroke="white"
    strokeWidth={5}
    strokeLinecap="round"
    style={{ inset: "8px", position: "absolute" }}
  />
);

type HandleProps = {
  coordinates: Coordinates;
  onMouseDown: VoidFunction;
};

const Handle = ({ coordinates: { x, y }, onMouseDown }: HandleProps) => (
  <ellipse
    cx={x}
    cy={y}
    rx={8}
    ry={8}
    fill="rgb(255, 255, 255)"
    stroke="black"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    style={{ cursor: "-webkit-grab", transform: "translate(-50%, -50%);" }}
  />
);
