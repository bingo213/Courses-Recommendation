import * as React from "react";
import { SVGProps } from "react";

const SvgClipboard = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 30 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M18.75 17.5h-7.5a1.25 1.25 0 0 0 0 2.5h7.5a1.25 1.25 0 0 0 0-2.5Zm0-5h-5a1.25 1.25 0 0 0 0 2.5h5a1.25 1.25 0 0 0 0-2.5Zm2.5-7.5h-1.475a3.75 3.75 0 0 0-3.525-2.5h-2.5A3.75 3.75 0 0 0 10.225 5H8.75A3.75 3.75 0 0 0 5 8.75v15a3.75 3.75 0 0 0 3.75 3.75h12.5A3.75 3.75 0 0 0 25 23.75v-15A3.75 3.75 0 0 0 21.25 5ZM12.5 6.25A1.25 1.25 0 0 1 13.75 5h2.5a1.25 1.25 0 0 1 1.25 1.25V7.5h-5V6.25Zm10 17.5A1.25 1.25 0 0 1 21.25 25H8.75a1.25 1.25 0 0 1-1.25-1.25v-15A1.25 1.25 0 0 1 8.75 7.5H10v1.25A1.25 1.25 0 0 0 11.25 10h7.5A1.25 1.25 0 0 0 20 8.75V7.5h1.25a1.25 1.25 0 0 1 1.25 1.25v15Z" />
  </svg>
);

export default SvgClipboard;
