import React, { useState } from "react";
import { ComponentList } from "@/components/componentList";
import { Preview } from "@/components/preview";
import { CssEditor } from "@/components/cssEditor";

export default function Home() {
  const [html, setHtml] = useState(`<h2>Lorem ipsum dolor sit amet</h2>
    <p>Consectetur adipiscing elit, sed do eiusmod tempor incididunt u </p>
    <button>Est laborum</button>`);
  const [customCss, setCustomCss] = useState(`button{
    background:red;
    color:white;
    border-radius:8px;}`);

  return (
    <main className="flex items-center justify-center w-screen h-screen overflow-hidden text-gray-900 bg-gray-100">
      <ComponentList
        html={html}
        setHtml={setHtml}
        customCss={customCss}
        setCustomCss={setCustomCss}
      />
      <Preview html={html} customCss={customCss} />
      <CssEditor customCss={customCss} setCustomCss={setCustomCss} />
    </main>
  );
}
