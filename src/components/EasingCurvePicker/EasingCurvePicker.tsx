import { MouseEvent, useRef, useState } from "react";

type Props = {
  viewBoxWidth: number;
  viewBoxHeight: number;
};

type Coordinates = {
  x: number;
  y: number;
};

export const Bezier = ({ viewBoxHeight, viewBoxWidth }: Props) => {
  const [startPoint, setStartPoint] = useState<Coordinates>({ x: 0, y: 232 });
  const [firstControlPoint, setFirstControlPoint] = useState<Coordinates>({
    x: 58,
    y: 174,
  });

  const [secondControlPoint, setSecondControlPoint] = useState<Coordinates>({
    x: 174,
    y: 58,
  });

  const [endPoint, setEndPoint] = useState<Coordinates>({ x: 232, y: 0 });

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

  const handleMouseDown = (pointId: string) => {
    setDraggingPointId(pointId);
  };

  const handleMouseUp = () => {
    setDraggingPointId(null);
  };

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!draggingPointId || !svgRef.current) {
      return;
    }

    const svgRect = svgRef.current.getBoundingClientRect();

    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    const viewBoxX = (svgX * viewBoxWidth) / svgRect.width;
    const viewBoxY = (svgY * viewBoxHeight) / svgRect.height;

    if (isStartPoint) setStartPoint({ x: viewBoxX, y: viewBoxY });

    if (isFirstControlPoint) setFirstControlPoint({ x: viewBoxX, y: viewBoxY });

    if (isSecondControlPoint)
      setSecondControlPoint({ x: viewBoxX, y: viewBoxY });

    if (isEndPoint) setEndPoint({ x: viewBoxX, y: viewBoxY });
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        width: "100%",
        overflow: "visible",
        border: "3px solid var(--color-gray-300)",
        borderRadius: "6px",
        display: "block",
      }}
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
    stroke="rgb(200, 200, 200)"
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
    stroke="rgb(213, 0, 249)"
    strokeWidth={5}
  />
);

type HandleProps = {
  coordinates: Coordinates;
  onMouseDown: VoidFunction;
};

const Handle = ({ coordinates, onMouseDown }: HandleProps) => (
  <ellipse
    cx={coordinates.x}
    cy={coordinates.y}
    rx={8}
    ry={8}
    fill="rgb(255, 255, 255)"
    stroke="rgb(244, 0, 137)"
    strokeWidth={2}
    onMouseDown={onMouseDown}
    style={{ cursor: "-webkit-grab" }}
  />
);
