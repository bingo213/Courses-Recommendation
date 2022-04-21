import * as React from "react";
import { SVGProps } from "react";

const SvgHiddenEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M21.71 3.29a1 1 0 0 0-1.42 0l-18 18a1 1 0 0 0 0 1.42.998.998 0 0 0 1.42 0l18-18a1 1 0 0 0 0-1.42Z" />
    <path d="M21.92 11.6C19.9 6.91 16.1 4 12 4s-7.9 2.91-9.92 7.6a1 1 0 0 0 0 .8C4.1 17.09 7.9 20 12 20s7.9-2.91 9.92-7.6a1 1 0 0 0 0-.8ZM12 18c-3.18 0-6.17-2.29-7.9-6C5.83 8.29 8.82 6 12 6c3.18 0 6.17 2.29 7.9 6-1.73 3.71-4.72 6-7.9 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
  </svg>
);

export default SvgHiddenEye;
