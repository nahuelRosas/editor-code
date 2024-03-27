import { useState } from "react";
import parse from "html-react-parser";
import { analyzeComponents, renderComponentTree } from "../utils";

export function ComponentList({
  html,
  setHtml,
  customCss,
  setCustomCss,
}: {
  html: string;
  setHtml: React.Dispatch<React.SetStateAction<string>>;
  customCss: string;
  setCustomCss: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex-col items-center justify-center hidden w-2/3 h-screen overflow-hidden bg-gray-900 shadow-lg sm:flex">
      <div
        className="flex items-center justify-between w-full h-16 p-2 font-bold text-white bg-gray-800"
        onClick={() => setVisible(!visible)}
      >
        <button className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
          {visible ? "Show List" : "Show HTML"}
        </button>
      </div>
      {visible ? (
        <textarea
          className="editor w-[95%] h-[95%] bg-gray-900 text-gray-100 font-mono placeholder-gray-500 placeholder-opacity-50 resize-none outline-none border border-gray-700 rounded p-2"
          placeholder="Paste your HTML here"
          value={html}
          onChange={(e) => setHtml(e.target.value)}
        />
      ) : (
        <div className="viewer w-[95%] h-[95%] overflow-auto bg-gray-800 text-gray-100 font-mono border border-gray-700 rounded p-2">
          {renderComponentTree({
            components: analyzeComponents({ element: parse(html) }),
          })}
        </div>
      )}
      <div className="flex-col items-center justify-center w-full h-screen overflow-hidden bg-gray-900 shadow-lg lg:hidden">
        <h1 className="mt-4 text-2xl font-bold text-white">
          Custom CSS Editor
        </h1>
        <textarea
          className="editor w-[95%] h-[95%] bg-gray-900 text-gray-100 font-mono placeholder-gray-500 placeholder-opacity-50 resize-none outline-none border border-gray-700 rounded p-2"
          placeholder="Enter custom CSS here"
          value={customCss}
          onChange={(e) => setCustomCss(e.target.value)}
        />
      </div>
    </div>
  );
}
