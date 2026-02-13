export const AgentReply = ({ reply }: { reply: string }) => {
  if (!reply) return null;
  return <p className="mt-4 font-medium">{reply}</p>;
};
