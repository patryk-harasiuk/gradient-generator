import { useRef, useState } from "react";

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

  const svgRef = useRef<SVGElement | null>(null);

  const [draggingPointId, setDraggingPointId] = useState<string | null>(null);

  const isStartPoint = draggingPointId === "startPoint";
  const isControlPoint = draggingPointId === "controlPoint";
  const isEndPoint = draggingPointId === "endPoint";

  // handleMouseDown(pointId) {
  //     this.setState({ draggingPointId: pointId });
  //   }

  //   handleMouseUp() {
  //     this.setState({ draggingPointId: null });
  //   }

  const handleMouseDown = (pointId: string) => {
    setDraggingPointId(pointId);
  };

  const handleMouseUp = () => {
    setDraggingPointId(null);
  };

  const handleMouseMove = ({
    clientX,
    clientY,
  }: {
    clientX: number;
    clientY: number;
  }) => {
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
};
