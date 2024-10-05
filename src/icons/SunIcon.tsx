interface ISunIconProps {
  extraClass?: string;
}

export const SunIcon = ({ extraClass = '' }: ISunIconProps) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="25"
      height="25"
      viewBox="0 0 48 48"
      className={extraClass}
    >
      <linearGradient
        id="SVGID_1__xctFOOIVorz0_gr1"
        x1="30.718"
        x2="17.282"
        y1="17.282"
        y2="30.718"
        gradientUnits="userSpaceOnUse"
      >
        <stop offset="0" stopColor="#fee460"></stop>
        <stop offset=".15" stopColor="#fee97f"></stop>
        <stop offset=".436" stopColor="#fff3b6"></stop>
        <stop offset=".684" stopColor="#fff9de"></stop>
        <stop offset=".88" stopColor="#fffdf6"></stop>
        <stop offset="1" stopColor="#fff"></stop>
      </linearGradient>
      <circle
        cx="24"
        cy="24"
        r="9.5"
        fill="url(#SVGID_1__xctFOOIVorz0_gr1)"
      ></circle>
      <line
        x1="24"
        x2="24"
        y1="5.5"
        y2="8.5"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="10.919"
        x2="13.04"
        y1="10.919"
        y2="13.04"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="5.5"
        x2="8.5"
        y1="24"
        y2="24"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="10.919"
        x2="13.04"
        y1="37.081"
        y2="34.96"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="24"
        x2="24"
        y1="42.5"
        y2="39.5"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="37.081"
        x2="34.96"
        y1="37.081"
        y2="34.96"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="42.5"
        x2="39.5"
        y1="24"
        y2="24"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <line
        x1="37.081"
        x2="34.96"
        y1="10.919"
        y2="13.04"
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
      ></line>
      <path
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M26.853,33.064C25.953,33.347,24.994,33.5,24,33.5c-5.247,0-9.5-4.253-9.5-9.5 c0-1.121,0.194-2.196,0.55-3.194"
      ></path>
      <path
        fill="none"
        stroke="#fac400"
        strokeLinecap="round"
        strokeMiterlimit="10"
        strokeWidth="3"
        d="M20.206,15.288C21.368,14.781,22.651,14.5,24,14.5c5.247,0,9.5,4.253,9.5,9.5 c0,1.098-0.186,2.152-0.529,3.133"
      ></path>
    </svg>
  );
};
