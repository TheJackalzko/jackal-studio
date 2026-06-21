interface Props {
  flip?: boolean
  fromDark?: boolean
}

export default function MembraneDivider({ flip = false, fromDark = true }: Props) {
  const fill = fromDark ? '#F2EDE3' : '#0A0F0D'

  return (
    <div
      className="membrane-divider pointer-events-none"
      style={{ transform: flip ? 'scaleY(-1)' : 'none', marginBottom: '-2px' }}
    >
      <svg
        viewBox="0 0 1440 90"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        style={{ width: '100%', height: '90px', display: 'block' }}
      >
        <path
          d="M0 45 C180 10, 320 80, 480 50 C640 20, 760 70, 960 45 C1100 25, 1260 72, 1440 40 L1440 90 L0 90 Z"
          fill={fill}
          opacity="1"
        />
        <path
          d="M0 60 C200 30, 380 85, 560 55 C740 25, 900 80, 1080 52 C1220 30, 1360 75, 1440 50 L1440 90 L0 90 Z"
          fill={fill}
          opacity="0.5"
        />
      </svg>
    </div>
  )
}
