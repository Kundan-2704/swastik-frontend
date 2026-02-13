type Props = {
  listening: boolean;
  onClick: () => void;
};

export const VoiceButton = ({ listening, onClick }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-3 rounded-full text-white ${
        listening ? "bg-red-600" : "bg-black"
      }`}
    >
      {listening ? "Listening..." : "🎤 Ask by Voice"}
    </button>
  );
};
