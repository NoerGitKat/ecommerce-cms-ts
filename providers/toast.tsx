"use client";

import { FC } from "react";
import { Toaster } from "react-hot-toast";

const ToasterProvider: FC = (): JSX.Element => {
  return <Toaster />;
};

export default ToasterProvider;
