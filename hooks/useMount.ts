import { useEffect, useState } from "react";
import prismaDB from "@/lib/prisma";

const useMount = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return { isMounted };
};

export default useMount;
