import { useState } from "react";
import { Upload, FileText } from "lucide-react";

const CsvUploader = () => {
  const [fileName, setFileName] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setFileName(file.name);
  };

  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-center h-full group hover:border-blue-300 transition-all relative overflow-hidden">
      <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity" />
      
      <div className="relative z-10 flex flex-col items-center justify-center text-center">
        <input 
          type="file" 
          accept=".csv" 
          onChange={handleFileChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20" 
        />
        
        {fileName ? (
          <div className="flex flex-col items-center gap-2 animate-in zoom-in-50">
             <div className="bg-emerald-100 p-3 rounded-full text-emerald-600">
                <FileText size={24} />
             </div>
             <div>
                <span className="block font-medium text-slate-700 truncate max-w-[200px]">{fileName}</span>
                <span className="text-xs text-emerald-600 font-medium">Ready to Process</span>
             </div>
          </div>
        ) : (
          <>
            <div className="bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform text-slate-400 group-hover:text-blue-500">
               <Upload size={24} />
            </div>
            <h3 className="text-sm font-semibold text-slate-700">Upload Statement</h3>
            <p className="text-xs text-slate-400 mt-1">Drag & Drop or Click (CSV)</p>
          </>
        )}
      </div>
    </div>
  );
};

export default CsvUploader;