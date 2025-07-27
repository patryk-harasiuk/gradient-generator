import { Coordinates } from "../types";

/**
 * Calculates the y-value on a cubic Bézier curve for a given t.
 * @param {number} t - Linear progress (0 to 1).
 * @param {Coordinates} coordinates - The y-coordinates of the control points.
 * @returns {number} The eased progress (y-value) between 0 and 1.
 */
const getCubicBezier = (t: number, coordinates: Coordinates[]) => {
  const [startPoint, firstPoint, secondPoint, endPoint] = coordinates;

  const u = 1 - t;

  // Cubic Bezier Curve formula
  return (
    Math.pow(u, 3) * startPoint.y +
    3 * Math.pow(u, 2) * t * firstPoint.y +
    3 * u * Math.pow(t, 2) * secondPoint.y +
    Math.pow(t, 3) * endPoint.y
  );
};

export const generateGradientStops = (
  stepsCount: number,
  startPoint: Coordinates,
  firstPoint: Coordinates,
  secondPoint: Coordinates,
  endPoint: Coordinates
) => {
  const stops = [];

  for (let step = 0; step <= stepsCount; step++) {
    const maxY = startPoint.y;
    const progress = step / stepsCount;
    const easedY = getCubicBezier(progress, [
      startPoint,
      firstPoint,
      secondPoint,
      endPoint,
    ]);

    const percent = Math.floor((1 - easedY / maxY) * 100);
    stops.push(percent);
  }

  return stops;
};
