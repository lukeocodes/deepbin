import classNames from "@/util/classNames";

const DeepgramLogo = ({ className }: { className: string }) => {
  return (
    <svg
      className={classNames(className, "")}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M7.1046 16H0.611791C0.394428 16 0.285747 15.7391 0.438389 15.5862L4.6208 11.4033C4.6672 11.3571 4.72948 11.3317 4.7942 11.3317H7.15466C8.97905 11.3317 10.5226 9.91308 10.5775 8.10133C10.6337 6.21797 9.10849 4.66955 7.22671 4.66955H4.69773V7.76687C4.69773 7.90035 4.58783 8.00957 4.4535 8.00957H0.244228C0.109903 8.00957 0 7.90035 0 7.76687V0.2427C0 0.109215 0.109903 0 0.244228 0H7.22671C11.7071 0 15.3449 3.65628 15.2765 8.12438C15.2093 12.5136 11.5227 16 7.1046 16Z"
        fill="#000"
      />
    </svg>
  );
};

export default DeepgramLogo;
