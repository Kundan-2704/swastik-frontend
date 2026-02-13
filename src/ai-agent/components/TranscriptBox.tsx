export const TranscriptBox = ({ text }: { text: string }) => {
  if (!text) return null;
  return <p className="mt-4 text-gray-600">You said: “{text}”</p>;
};
