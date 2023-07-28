import { useState } from "react";
import useMount from "./useMount";

const useOrigin = (): string => {
  const { isMounted } = useMount();
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "";

  if (!isMounted) return "";

  return origin;
};

export default useOrigin;
