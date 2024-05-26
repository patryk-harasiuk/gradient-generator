import { MouseEvent, useRef, useState } from "react";

type Props = {
  viewBoxWidth: number;
  viewBoxHeight: number;
};

type Coordinates = {
  x: number;
  y: number;
};

const Bezier = ({ viewBoxHeight, viewBoxWidth }: Props) => {
  const [startPoint, setStartPoint] = useState<Coordinates>({ x: 10, y: 10 });
  const [controlPoint, setControlPoint] = useState<Coordinates>({
    x: 190,
    y: 100,
  });
  const [endPoint, setEndPoint] = useState<Coordinates>({ x: 10, y: 190 });

  const svgRef = useRef<SVGSVGElement | null>(null);

  const [draggingPointId, setDraggingPointId] = useState<string | null>(null);

  const isStartPoint = draggingPointId === "startPoint";
  const isControlPoint = draggingPointId === "controlPoint";
  const isEndPoint = draggingPointId === "endPoint";

  const instructions = `
      M ${startPoint.x},${startPoint.y}
      Q ${controlPoint.x},${controlPoint.y}
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

    if (isControlPoint) setControlPoint({ x: viewBoxX, y: viewBoxY });

    if (isEndPoint) setEndPoint({ x: viewBoxX, y: viewBoxY });
  };

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${viewBoxWidth} ${viewBoxHeight}`}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{ width: "100%", overflow: "visible" }}
    ></svg>
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
    y2={from.y}
    stroke="rgb(200, 200, 200)"
    strokeDasharray="5,5"
    strokeWidth={2}
  />
);
