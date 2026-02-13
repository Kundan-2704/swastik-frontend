import { useVoiceAgent } from "./hooks/useVoiceAgent";
import { VoiceButton } from "./components/VoiceButton";
import { TranscriptBox } from "./components/TranscriptBox";
import { AgentReply } from "./components/AgentReply";
import { AgentProducts } from "./components/AgentProducts";

export const AIAgentPanel = () => {
  const {
    listening,
    transcript,
    reply,
    products,
    loading,
    startListening,
  } = useVoiceAgent();

  return (
    <div className="p-6 border rounded-lg">
      <VoiceButton listening={listening} onClick={startListening} />
      {loading && <p className="mt-3">Thinking...</p>}
      <TranscriptBox text={transcript} />
      <AgentReply reply={reply} />
      <AgentProducts products={products} />
    </div>
  );
};
