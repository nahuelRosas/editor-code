import parse from "html-react-parser";

export function Preview({
  html,
  customCss,
}: {
  html: string;
  customCss: string;
}) {
  return (
    <div className="flex-col items-center justify-center w-screen h-screen bg-white shadow-lg">
      <h1 className="text-4xl font-bold">HTML Viewer</h1>
      <style>{`#html-content { ${customCss}}`}</style>
      <div
        id="html-content"
        className="viewer w-[100%] h-[100%] overflow-auto bg-gray-50 text-gray-900 font-mono border border-gray-700 rounded p-2"
      >
        {parse(html)}
      </div>
    </div>
  );
}
