import { useMemo } from 'react';
import type { LandUsageItem } from '../types/farmer';
import { describeArc } from '../utils/chartUtils';

const COLORS = ['#4CAF50', '#FF9800', '#F44336', '#2196F3', '#9C27B0', '#607D8B'];

export const useLandUsageSegments = (landUsage: LandUsageItem[]) => {
  return useMemo(() => {
    const totalArea = landUsage.reduce((sum, item) => sum + item.value, 0);

    let currentAngle = 0;

    const segments = landUsage.map((item, index) => {
      const percentage = totalArea > 0 ? (item.value / totalArea) * 100 : 0;
      const angle = (percentage / 100) * 360;

      const segment = {
        ...item,
        percentage,
        color: COLORS[index % COLORS.length],
        startAngle: currentAngle,
        endAngle: currentAngle + angle,
        path: describeArc(50, 50, 40, currentAngle, currentAngle + angle),
      };

      currentAngle += angle;
      return segment;
    });

    const largestSegment =
      segments.length > 0
        ? segments.reduce((prev, curr) => (prev.percentage > curr.percentage ? prev : curr))
        : null;

    return { segments, largestSegment };
  }, [landUsage]);
};
