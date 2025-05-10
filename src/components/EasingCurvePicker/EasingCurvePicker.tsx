import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./EasingCurvePicker.module.css";

type Props = {
  viewBoxWidth: number;
  viewBoxHeight: number;
  precision: number;
};

type Coordinates = {
  x: number;
  y: number;
};

const DEFAULT_START_POINT: Coordinates = { x: 0, y: 228 };
const DEFAULT_FIRST_CONTROL_POINT: Coordinates = { x: 76, y: 152 };
const DEFAULT_SECOND_CONTROL_POINT: Coordinates = { x: 152, y: 76 };
const DEFAULT_END_POINT: Coordinates = { x: 228, y: 0 };

export const Bezier = ({ viewBoxHeight, viewBoxWidth, precision }: Props) => {
  const [startPoint, setStartPoint] =
    useState<Coordinates>(DEFAULT_START_POINT);
  const [firstControlPoint, setFirstControlPoint] = useState<Coordinates>(
    DEFAULT_FIRST_CONTROL_POINT
  );

  console.log(precision, "precision");

  const [secondControlPoint, setSecondControlPoint] = useState<Coordinates>(
    DEFAULT_SECOND_CONTROL_POINT
  );

  const [endPoint, setEndPoint] = useState<Coordinates>(DEFAULT_END_POINT);

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

  console.log(
    generateGradientStops(
      precision,
      startPoint,
      firstControlPoint,
      secondControlPoint,
      endPoint
    ),
    "generated gradeint stops"
  );

  console.log(
    bezierToGradientStops(
      startPoint,
      firstControlPoint,
      secondControlPoint,
      endPoint,
      precision,
      precision - 1
    ),
    "bezierToGradientStops"
  );

  return (
    <div className={styles.wrapper}>
      <span className={styles.info}>Easing Curve:</span>

      <div className={styles.boxWrapper}>
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

function bezierToGradientStops(
  p0: Coordinates,
  p1: Coordinates,
  p2: Coordinates,
  p3: Coordinates,
  precision: number,
  numStops = 10
) {
  const stops = [];

  // Sample points along the curve
  for (let i = 0; i <= numStops; i++) {
    const t = i / numStops;

    // Calculate point on cubic Bézier curve
    // The y-value represents the easing progression
    const y = getCubicBezier(t, p0, p1, p2, p3);

    // Position in gradient (percentage)
    const position = t * 100;

    // Map y-value to color interpolation
    const colorIndex = Math.floor(y * (precision - 2));
    const colorRatio = y * (precision - 2) - colorIndex;

    console.log(colorIndex, "colorIndex");
    console.log(colorRatio, "colorRatio");

    // Get interpolated color
    // const color = colors[colors.length - 1];

    stops.push(`${position.toFixed(2)}%`);
  }

  return stops;
}

const getCubicBezier = (
  t: number,
  startPoint: Coordinates,
  firstPoint: Coordinates,
  secondPoint: Coordinates,
  endPoint: Coordinates
) => {
  const u = 1 - t;

  // This is Cubic Bezier Curve formula
  return (
    Math.pow(u, 3) * startPoint.y +
    3 * Math.pow(u, 2) * t * firstPoint.y +
    3 * u * Math.pow(t, 2) * secondPoint.y +
    Math.pow(t, 3) * endPoint.y
  );
};

// const colors = [...]; // np. 6 kolorów
// const stepsCount = colors.length - 1; // czyli 5

// for (let i = 0; i <= stepsCount; i++) { // <= bo chcemy złapać i=0 i i=stepsCount
//   const t = i / stepsCount;
//   // t będzie: 0, 0.2, 0.4, 0.6, 0.8, 1 (czyli 0%...100%)

const generateGradientStops = (
  stepsCount: number,
  startPoint: Coordinates,
  firstPoint: Coordinates,
  secondPoint: Coordinates,
  endPoint: Coordinates
) => {
  const stops = [];

  for (let step = 0; step <= stepsCount; step++) {
    const maxY = DEFAULT_START_POINT.y;
    const progress = step / stepsCount;
    console.log(stepsCount, "stepsCount");
    console.log(progress, "progress");
    const easedY = getCubicBezier(
      progress,
      startPoint,
      firstPoint,
      secondPoint,
      endPoint
    );

    const percent = Math.round((1 - easedY / maxY) * 100);
    stops.push(percent);
  }

  return stops;
};
