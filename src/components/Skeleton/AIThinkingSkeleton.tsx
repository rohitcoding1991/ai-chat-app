export default function AIThinkingSkeleton() {
  return (
    <div className="w-full flex gap-3 md:gap-4 flex-row justify-start">
      <div className="flex-shrink-0">
        {/* Avatar */}
        <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-400/20 ring-2 ring-purple-400/30">
          <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse" />
        </div>
      </div>

      <div className="flex flex-col space-y-2 bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-sm">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <p className="font-semibold text-sm text-purple-300">AI Assistant</p>
          <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
          <span className="text-xs text-white/40">now</span>
        </div>

        {/* Thinking Animation - ChatGPT style */}
        <div className="flex items-center space-x-2 py-1">
          <div className="flex space-x-1">
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "0ms", animationDuration: "1s" }}
            />
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "200ms", animationDuration: "1s" }}
            />
            <div
              className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"
              style={{ animationDelay: "400ms", animationDuration: "1s" }}
            />
          </div>
          <span className="text-sm text-white/60 animate-pulse">Thinking...</span>
        </div>
      </div>
    </div>
  );
}
