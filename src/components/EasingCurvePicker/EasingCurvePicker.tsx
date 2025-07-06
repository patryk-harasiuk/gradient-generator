import { MouseEvent, useEffect, useRef, useState } from "react";
import styles from "./EasingCurvePicker.module.css";
import type { Coordinates } from "../../types";
import { VIEWBOX_SIZE } from "../../const";

const LINEAR_FIRST_CONTROL_POINT = { x: 76, y: 152 };
const LINEAR_SECOND_CONTROL_POINT = { x: 152, y: 76 };

const FUN_FIRST_CONTROL_POINT = { x: -16, y: -16 };
const FUN_SECOND_CONTROL_POINT = { x: 244, y: 244 };

type BezierType = "linear" | "fun";

type Props = {
  firstControlPoint: Coordinates;
  secondControlPoint: Coordinates;
  startPoint: Coordinates;
  endPoint: Coordinates;
  onFirstControlPointChange: (coords: Coordinates) => void;
  onSecondControlPointChange: (coords: Coordinates) => void;
  onStartPointChange: (coords: Coordinates) => void;
  onEndPointChange: (coords: Coordinates) => void;
};

const HANDLE_MARGIN = 16;

const clampWithMargin = (
  value: number,
  min: number,
  max: number,
  margin: number
) => Math.max(min - margin, Math.min(max + margin, value));

export const Bezier = ({
  firstControlPoint,
  secondControlPoint,
  onFirstControlPointChange,
  onSecondControlPointChange,
  endPoint,
  onEndPointChange,
  onStartPointChange,
  startPoint,
}: Props) => {
  const [draggingPointId, setDraggingPointId] = useState<string | null>(null);
  const [bezierType, setBezierType] = useState<BezierType>("linear");

  const handleMouseMove = ({ clientX, clientY }: MouseEvent) => {
    if (!draggingPointId || !svgRef.current) {
      return;
    }

    const svgRect = svgRef.current.getBoundingClientRect();

    const svgX = clientX - svgRect.left;
    const svgY = clientY - svgRect.top;

    const viewBoxX = clampWithMargin(
      (svgX * VIEWBOX_SIZE) / svgRect.width,
      0,
      VIEWBOX_SIZE,
      HANDLE_MARGIN
    );
    const viewBoxY = clampWithMargin(
      (svgY * VIEWBOX_SIZE) / svgRect.height,
      0,
      VIEWBOX_SIZE,
      HANDLE_MARGIN
    );

    if (isStartPoint) onStartPointChange({ x: viewBoxX, y: viewBoxY });

    if (isFirstControlPoint)
      onFirstControlPointChange({ x: viewBoxX, y: viewBoxY });

    if (isSecondControlPoint)
      onSecondControlPointChange({ x: viewBoxX, y: viewBoxY });

    if (isEndPoint) onEndPointChange({ x: viewBoxX, y: viewBoxY });
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

  const setLinear = () => {
    onFirstControlPointChange(LINEAR_FIRST_CONTROL_POINT);
    onSecondControlPointChange(LINEAR_SECOND_CONTROL_POINT);
    setBezierType("linear");
  };

  const setFun = () => {
    onFirstControlPointChange(FUN_FIRST_CONTROL_POINT);
    onSecondControlPointChange(FUN_SECOND_CONTROL_POINT);
    setBezierType("fun");
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.info}>Easing Curve:</span>

      <div className={styles.boxWrapper}>
        <div className={styles.svgWrapper}>
          <svg
            className={styles.svg}
            ref={svgRef}
            viewBox={`0 0 ${VIEWBOX_SIZE} ${VIEWBOX_SIZE}`}
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

      <div className={styles.buttonsWrapper}>
        <EasingCurveButton
          title="Linear"
          onClick={setLinear}
          isActive={bezierType === "linear"}
        />

        <EasingCurveButton
          title="Fun"
          onClick={setFun}
          isActive={bezierType === "fun"}
        />
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

type EasingCurveButtonProps = {
  title: string;
  onClick: () => void;
  isActive?: boolean;
};

const EasingCurveButton = ({
  title,
  onClick,
  isActive,
}: EasingCurveButtonProps) => (
  <button
    onClick={onClick}
    className={`${styles.button} ${isActive && styles.buttonActive}`}
  >
    {title}
  </button>
);
