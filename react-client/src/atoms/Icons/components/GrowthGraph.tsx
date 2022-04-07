import * as React from "react";
import { SVGProps } from "react";

const SvgGrowthGraph = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M8.75 20a1.875 1.875 0 0 0 1.875-1.875.963.963 0 0 0 0-.188l3.488-3.487h.574l2.013 2.012v.1a1.875 1.875 0 1 0 3.75 0v-.1L25 11.875A1.875 1.875 0 1 0 23.125 10a.963.963 0 0 0 0 .188L18.613 14.7h-.2l-2.163-2.2a1.875 1.875 0 1 0-3.75 0l-3.75 3.75a1.875 1.875 0 1 0 0 3.75Zm16.875 5H4.375V3.75a1.25 1.25 0 0 0-2.5 0v22.5a1.25 1.25 0 0 0 1.25 1.25h22.5a1.25 1.25 0 0 0 0-2.5Z" />
  </svg>
);

export default SvgGrowthGraph;
