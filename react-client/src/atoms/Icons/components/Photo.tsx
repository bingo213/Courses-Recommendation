import * as React from "react";
import { SVGProps } from "react";

const SvgPhoto = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 25 25"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M19.75 6.75h-1.28l-.32-1a3 3 0 0 0-2.84-2h-5.12A3 3 0 0 0 7.35 5.8l-.32 1H5.75a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-8a3.002 3.002 0 0 0-3-3.05Zm1 11a1 1 0 0 1-1 1h-14a1 1 0 0 1-1-1v-8a1 1 0 0 1 1-1h2a1 1 0 0 0 1-.68l.54-1.64a1 1 0 0 1 .95-.68h5.12a1 1 0 0 1 .95.68l.54 1.64a1 1 0 0 0 .9.68h2a1 1 0 0 1 1 1v8Zm-8-9a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm0 6a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
  </svg>
);

export default SvgPhoto;
