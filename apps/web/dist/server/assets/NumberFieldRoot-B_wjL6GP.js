import { jsx } from "react/jsx-runtime";
import { NumberField } from "@base-ui/react";
import { c as cn } from "./router-6tBd5Pa3.js";
const NumberFieldRoot = ({
  className,
  ...props
}) => {
  return /* @__PURE__ */ jsx(
    NumberField.Root,
    {
      "data-slot": "number-field-root",
      ...props,
      className: cn("inline-flex flex-col gap-1", className)
    }
  );
};
export {
  NumberFieldRoot as N
};
