import * as React from "react";
import { SVGProps } from "react";

const SvgClose = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M15.71 8.29a1.001 1.001 0 0 0-1.42 0L12 10.59l-2.29-2.3a1.004 1.004 0 0 0-1.42 1.42l2.3 2.29-2.3 2.29a1 1 0 0 0 0 1.42.998.998 0 0 0 1.42 0l2.29-2.3 2.29 2.3a.997.997 0 0 0 1.095.219.999.999 0 0 0 .325-.22 1 1 0 0 0 0-1.42L13.41 12l2.3-2.29a1.001 1.001 0 0 0 0-1.42Zm3.36-3.36A10 10 0 1 0 4.93 19.07 10 10 0 1 0 19.07 4.93Zm-1.41 12.73A8 8 0 1 1 20 12a7.95 7.95 0 0 1-2.34 5.66Z" />
  </svg>
);

export default SvgClose;
