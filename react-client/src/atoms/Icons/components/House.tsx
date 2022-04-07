import * as React from "react";
import { SVGProps } from "react";

const SvgHouse = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m25 10-7.5-6.575a3.75 3.75 0 0 0-5 0L5 10a3.75 3.75 0 0 0-1.25 2.825V23.75A3.75 3.75 0 0 0 7.5 27.5h15a3.75 3.75 0 0 0 3.75-3.75V12.812A3.749 3.749 0 0 0 25 10Zm-7.5 15h-5v-6.25a1.25 1.25 0 0 1 1.25-1.25h2.5a1.25 1.25 0 0 1 1.25 1.25V25Zm6.25-1.25A1.25 1.25 0 0 1 22.5 25H20v-6.25A3.75 3.75 0 0 0 16.25 15h-2.5A3.75 3.75 0 0 0 10 18.75V25H7.5a1.25 1.25 0 0 1-1.25-1.25V12.812a1.25 1.25 0 0 1 .425-.937l7.5-6.563a1.25 1.25 0 0 1 1.65 0l7.5 6.563a1.25 1.25 0 0 1 .425.937V23.75Z" />
  </svg>
);

export default SvgHouse;
