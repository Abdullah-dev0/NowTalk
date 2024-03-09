"use client";

import React from "react";
import { Button } from "./ui/button";
import { useTheme } from "next-themes";

const ToggleButton = () => {
   const { theme, setTheme } = useTheme();
   const handler = () => {
      setTheme("dark" === theme ? "light" : "dark");
   };
   return (
      <div>
         <Button onClick={handler}>Toggle</Button>
      </div>
   );
};

export default ToggleButton;
