import React from "react";

export const CheckBox = React.forwardRef(({ intermediate, ...rest }, ref) => {
  const defaultRef = React.useRef();
  const resolvedRef = ref || defaultRef;

  React.useEffect(() => {}, [resolvedRef, intermediate]);
  return <input type="checkbox" ref={resolvedRef} {...rest} />;
});
