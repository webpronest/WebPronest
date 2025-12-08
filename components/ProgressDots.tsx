function ProgressDots() {
  return (
    <div className="flex gap-2 mt-3">
      <Dot delay="0" />
      <Dot delay="150" />
      <Dot delay="300" />
    </div>
  );
}

function Dot({ delay }: { delay: string }) {
  return (
    <div
      className="w-2.5 h-2.5 bg-gray-500 rounded-full animate-bounce"
      style={{ animationDelay: `${delay}ms` }}
    ></div>
  );
}
export default ProgressDots;