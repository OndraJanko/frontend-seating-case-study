// svg from https://coolshap.es/
export default function LogoShape() {
  return (
    <svg
      height="60"
      width="60"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Logo Shape</title>
      <g clipPath="url(#cs_clip_1_misc-2)">
        <mask
          height="200"
          id="cs_mask_1_misc-2"
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M158 0c23.196 0 42 18.804 42 42v90h-64V64H68V0h90zM42 200c-23.196 0-42-18.804-42-42V68h64v68h68v64H42zM32 64C14.327 64 0 49.673 0 32 0 14.327 14.327 0 32 0c17.673 0 32 14.327 32 32 0 17.673-14.327 32-32 32z"
            fill="#fff"
          />
          <path
            d="M132 100c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32zM200 168c0-17.673-14.327-32-32-32-17.673 0-32 14.327-32 32 0 17.673 14.327 32 32 32 17.673 0 32-14.327 32-32z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#cs_mask_1_misc-2)">
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint0_linear_748_5052)" />
          <g filter="url(#filter0_f_748_5052)">
            <path d="M130 0H69v113h61V0z" fill="#FF58E4" />
            <path
              d="M196 91H82v102h114V91z"
              fill="#0CE548"
              fillOpacity="0.35"
            />
            <path d="M113 80H28v120h85V80z" fill="#FFE500" fillOpacity="0.74" />
          </g>
        </g>
      </g>
      <g style={{ mixBlendMode: "overlay" }} mask="url(#cs_mask_1_misc-2)">
        <path
          d="M200 0H0v200h200V0z"
          fill="gray"
          stroke="transparent"
          filter="url(#cs_noise_1_misc-2)"
        />
      </g>
      <defs>
        <filter
          height="310"
          id="filter0_f_748_5052"
          width="278"
          x="-27"
          y="-55"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur
            result="effect1_foregroundBlur_748_5052"
            stdDeviation="27.5"
          />
        </filter>
        <linearGradient
          id="paint0_linear_748_5052"
          gradientUnits="userSpaceOnUse"
          x1="186.5"
          x2="37"
          y1="37"
          y2="186.5"
        >
          <stop stopColor="#0E6FFF" stopOpacity="0.51" />
          <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59" />
        </linearGradient>
        <clipPath id="cs_clip_1_misc-2">
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
      <defs>
        <filter
          height="100%"
          id="cs_noise_1_misc-2"
          width="100%"
          x="0%"
          y="0%"
          filterUnits="objectBoundingBox"
        >
          <feBlend result="out3" in="SourceGraphic" in2="out2" />
        </filter>
      </defs>
    </svg>
  );
}
