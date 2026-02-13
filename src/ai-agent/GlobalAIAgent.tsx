import { useState } from "react";
import { AIAgentPanel } from "./AIAgentPanel";

export const GlobalAIAgent = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white px-4 py-3 rounded-full shadow-lg"
      >
        🎤 Ask Expert
      </button>

      {/* Agent Drawer */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[350px] bg-white border rounded-xl shadow-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <p className="font-semibold">Handloom Expert</p>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>

          <AIAgentPanel />
        </div>
      )}
    </>
  );
};
