import * as React from "react";
import { SVGProps } from "react";

const SvgEye = (props: SVGProps<SVGSVGElement>) => (
  <svg
    viewBox="0 0 23 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M20.779 11.6C18.945 6.91 15.497 4 11.777 4c-3.72 0-7.169 2.91-9.002 7.6a1.088 1.088 0 0 0 0 .8c1.833 4.69 5.281 7.6 9.002 7.6 3.72 0 7.168-2.91 9.002-7.6a1.09 1.09 0 0 0 0-.8ZM11.777 18c-2.886 0-5.6-2.29-7.169-6 1.57-3.71 4.283-6 7.169-6 2.885 0 5.599 2.29 7.168 6-1.57 3.71-4.283 6-7.168 6Zm0-10c-.718 0-1.42.235-2.017.674a3.942 3.942 0 0 0-1.337 1.795 4.38 4.38 0 0 0-.206 2.311 4.14 4.14 0 0 0 .993 2.048 3.54 3.54 0 0 0 1.859 1.095 3.318 3.318 0 0 0 2.097-.228 3.73 3.73 0 0 0 1.629-1.473A4.296 4.296 0 0 0 15.406 12c0-1.06-.382-2.078-1.063-2.828C13.663 8.422 12.74 8 11.777 8Zm0 6c-.36 0-.71-.117-1.008-.337a1.97 1.97 0 0 1-.669-.898 2.19 2.19 0 0 1-.103-1.155 2.07 2.07 0 0 1 .496-1.024c.254-.28.578-.47.93-.548a1.66 1.66 0 0 1 1.048.114c.332.152.615.408.815.737.2.329.306.715.306 1.111 0 .53-.192 1.04-.532 1.414-.34.375-.802.586-1.283.586Z" />
  </svg>
);

export default SvgEye;