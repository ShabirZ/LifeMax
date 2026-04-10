import { useState } from "react";
import { Upload, FileText, Loader2, CheckCircle, AlertCircle } from "lucide-react";

const CsvUploader = ({ onUpload }) => {
  const [fileName, setFileName] = useState(null);
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [message, setMessage] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);
    setStatus("uploading");
    setMessage(null);

    try {
      const result = await onUpload(file);
      setStatus("success");
      setMessage(`Imported ${result.imported} transaction${result.imported !== 1 ? "s" : ""}${result.skipped ? `, skipped ${result.skipped}` : ""}`);
    } catch (err) {
      setStatus("error");
      setMessage(err.message ?? "Upload failed");
    }

    // reset input so same file can be re-uploaded if needed
    e.target.value = "";
  };

  const reset = () => {
    setFileName(null);
    setStatus("idle");
    setMessage(null);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center h-full group hover:border-blue-300 transition-all relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />

      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        {status === "idle" && (
          <>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-blue-500">
              <Upload size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">Upload Statement</h3>
            <p className="text-xs text-slate-400 mt-1">Drag & Drop or Click (CSV)</p>
          </>
        )}

        {status === "uploading" && (
          <div className="flex flex-col items-center gap-2">
            <Loader2 size={24} className="animate-spin text-blue-500" />
            <span className="text-sm text-slate-600 truncate max-w-[200px]">{fileName}</span>
            <span className="text-xs text-slate-400">Importing...</span>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in-50" onClick={reset}>
            <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
              <CheckCircle size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">{message}</span>
            <span className="text-xs text-slate-400 cursor-pointer hover:underline">Upload another</span>
          </div>
        )}

        {status === "error" && (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in-50" onClick={reset}>
            <div className="bg-red-100 p-3 rounded-full text-red-500">
              <AlertCircle size={24} />
            </div>
            <span className="text-sm font-medium text-slate-700">{message}</span>
            <span className="text-xs text-slate-400 cursor-pointer hover:underline">Try again</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default CsvUploader;
