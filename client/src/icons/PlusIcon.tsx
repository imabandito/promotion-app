interface IPlusIconProps {
  extraClass?: string;
}

export const PlusIcon = ({ extraClass = '' }: IPlusIconProps) => {
  return (
    <svg
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={extraClass}
    >
      <path
        d="M8.5 0C7.8823 0 7.38158 0.500739 7.38158 1.11842V7.38161H1.11842C0.500739 7.38161 0 7.88232 0 8.50003C0 9.11773 0.500739 9.61845 1.11842 9.61845H7.38158V15.8816C7.38158 16.4993 7.8823 17 8.5 17C9.1177 17 9.61842 16.4993 9.61842 15.8816V9.61845H15.8816C16.4993 9.61845 17 9.11773 17 8.50003C17 7.88232 16.4993 7.38161 15.8816 7.38161H9.61842V1.11842C9.61842 0.500739 9.1177 0 8.5 0Z"
        fill="#fff"
      />
    </svg>
  );
};
