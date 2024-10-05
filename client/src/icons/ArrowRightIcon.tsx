interface IArrowRightIconProps {
  extraClass?: string;
}

export const ArrowRightIcon = ({ extraClass = '' }: IArrowRightIconProps) => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={extraClass}
    >
      <path
        d="M17 12L5 12"
        stroke="#25282B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11 18L5 12L11 6"
        stroke="#25282B"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
