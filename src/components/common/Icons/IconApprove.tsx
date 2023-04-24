import { HTMLAttributes } from "react";

const IconApprove = (props: HTMLAttributes<HTMLOrSVGElement>) => {
  const { className, ...rest } = props;
  return (
    <svg
      {...rest}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path
        d="M6.46046 15C6.97616 15 7.37812 14.7955 7.65114 14.3629L14.7194 3.15506C14.9166 2.84045 15 2.54944 15 2.27416C15 1.53483 14.4691 1 13.7411 1C13.2405 1 12.9296 1.18876 12.6262 1.68427L6.42254 11.8303L3.27519 7.77978C2.99458 7.43371 2.69122 7.2764 2.26652 7.2764C1.53088 7.2764 1 7.8191 1 8.55843C1 8.88876 1.09859 9.17978 1.37161 9.50225L5.28494 14.418C5.61105 14.8191 5.97508 15 6.46046 15Z"
        fill="white"
      />
    </svg>
  );
};

export default IconApprove;