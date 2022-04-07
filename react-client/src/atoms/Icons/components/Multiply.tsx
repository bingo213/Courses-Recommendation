import * as React from "react";
import { SVGProps } from "react";

const SvgMultiply = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="m6.7 6 3.15-3.15c.2-.2.2-.5 0-.7-.2-.2-.5-.2-.7 0L6 5.3 2.85 2.15c-.2-.2-.5-.2-.7 0-.2.2-.2.5 0 .7L5.3 6 2.15 9.15c-.1.1-.15.2-.15.35 0 .3.2.5.5.5.15 0 .25-.05.35-.15L6 6.7l3.15 3.15c.1.1.2.15.35.15.15 0 .25-.05.35-.15.2-.2.2-.5 0-.7L6.7 6Z" />
  </svg>
);

export default SvgMultiply;
