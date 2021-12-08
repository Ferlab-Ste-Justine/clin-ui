import React from "react";
import cx from "classnames";
import { IconProps } from ".";

const ExternalLinkIcon = ({
  className = "",
  width = "16",
  height = "16",
  fill = "white"
}: IconProps) => (
  <svg
  className={cx('anticon', className)}
    width={width}
    height={height}
    viewBox="0 0 16 16"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.25 13.75V2.25C14.25 1.97344 14.0266 1.75 13.75 1.75H2.25C1.97344 1.75 1.75 1.97344 1.75 2.25V7.875C1.75 7.94375 1.80625 8 1.875 8H2.75C2.81875 8 2.875 7.94375 2.875 7.875V2.875H13.125V13.125H8.125C8.05625 13.125 8 13.1813 8 13.25V14.125C8 14.1938 8.05625 14.25 8.125 14.25H13.75C14.0266 14.25 14.25 14.0266 14.25 13.75ZM6.63437 10.2078L7.45 11.0234C7.4666 11.04 7.48751 11.0515 7.51035 11.0567C7.53318 11.0619 7.55702 11.0607 7.57916 11.053C7.6013 11.0454 7.62085 11.0317 7.63558 11.0134C7.65031 10.9952 7.65964 10.9732 7.6625 10.95L7.99063 8.14688C8 8.06719 7.93281 7.99844 7.85156 8.00781L5.04844 8.33594C4.94531 8.34844 4.90156 8.475 4.975 8.54844L5.79375 9.36719L1.79062 13.3703C1.74219 13.4188 1.74219 13.4984 1.79062 13.5469L2.45312 14.2094C2.50156 14.2578 2.58125 14.2578 2.62969 14.2094L6.63437 10.2078Z"
    />
  </svg>
);
export default ExternalLinkIcon;
