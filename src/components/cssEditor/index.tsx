export function CssEditor({
  customCss,
  setCustomCss,
}: {
  customCss: string;
  setCustomCss: React.Dispatch<React.SetStateAction<string>>;
}) {
  return (
    <div className="flex-col items-center justify-center hidden w-2/3 h-screen overflow-hidden bg-gray-900 shadow-lg lg:flex ">
      <h1 className="mt-4 text-2xl font-bold text-white">Custom CSS Editor</h1>
      <textarea
        className="editor w-[95%] h-[95%] bg-gray-900 text-gray-100 font-mono placeholder-gray-500 placeholder-opacity-50 resize-none outline-none border border-gray-700 rounded p-2"
        placeholder="Enter custom CSS here"
        value={customCss}
        onChange={(e) => setCustomCss(e.target.value)}
      />
    </div>
  );
}
