export interface PlayerCardProps {
  cx: number;
  cy: number;
  color: string;
  clipId: string;
  avatarUrl?: string;
  width?: number;
  height?: number;
  radius?: number;
}

export const PLAYER_CARD_WIDTH = 30;
export const PLAYER_CARD_HEIGHT = 30;
export const PLAYER_CARD_RADIUS = 5;

// Clean default avatar SVG (data URI)
const DEFAULT_AVATAR =
  "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%2364748b'><path d='M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z'/></svg>";

export function PlayerCard({
  cx,
  cy,
  color,
  clipId,
  avatarUrl,
  width = PLAYER_CARD_WIDTH,
  height = PLAYER_CARD_HEIGHT,
  radius = PLAYER_CARD_RADIUS,
}: PlayerCardProps) {
  const x = cx - width / 2;
  const y = cy - height / 2;
  const imageHref = avatarUrl || DEFAULT_AVATAR;

  return (
    <g>
      {/* All content clipped to the rounded-rect card shape */}
      <g clipPath={`url(#${clipId})`}>
        {/* Dark card background */}
        <rect x={x} y={y} width={width} height={height} fill="#0f172a" />

        {/* Subtle team-color tint overlay on background */}
        <rect x={x} y={y} width={width} height={height} fill={color} opacity={0.25} />

        {/* Player Image (Custom photo from DB or default avatar image) */}
        <image
          href={imageHref}
          x={x}
          y={y}
          width={width}
          height={height}
          preserveAspectRatio="xMidYMid slice"
        />
      </g>

      {/* Team-color border — drawn outside clip so it frames the card cleanly */}
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        rx={radius}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
      />
    </g>
  );
}
