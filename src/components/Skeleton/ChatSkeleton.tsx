export default function ChatSkeleton() {
  return (
    <div className="w-full flex flex-col gap-6 md:gap-8 pr-4 pb-8 px-2 pt-4 animate-pulse">
      {/* User Message Skeleton */}
      <div className="w-full flex gap-3 md:gap-4 flex-row justify-end">
        <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px] flex flex-col space-y-2 bg-cyan-600/30 rounded-2xl p-3 md:p-4 border border-cyan-400/20 backdrop-blur-sm">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-4 w-12 md:w-16 bg-cyan-300/20 rounded" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-full max-w-[90%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-4 w-full max-w-[70%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {/* Avatar Skeleton */}
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-cyan-400/20 ring-2 ring-cyan-400/30">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-blue-500/40 animate-pulse" />
          </div>
        </div>
      </div>

      {/* AI Assistant Message Skeleton */}
      <div className="w-full flex gap-3 md:gap-4 flex-row justify-start">
        <div className="flex-shrink-0">
          {/* Avatar Skeleton */}
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-400/20 ring-2 ring-purple-400/30">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse" />
          </div>
        </div>

        <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px] flex flex-col space-y-2 bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-sm">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-4 w-20 md:w-24 bg-purple-300/20 rounded" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>

          {/* Content Skeleton with shimmer effect */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-full max-w-[95%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-4 w-full max-w-[85%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-4 w-full max-w-[75%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* User Message Skeleton */}
      <div className="w-full flex gap-3 md:gap-4 flex-row justify-end">
        <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px] flex flex-col space-y-2 bg-cyan-600/30 rounded-2xl p-3 md:p-4 border border-cyan-400/20 backdrop-blur-sm">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-4 w-12 md:w-16 bg-cyan-300/20 rounded" />
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-full max-w-[80%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>

        <div className="flex-shrink-0">
          {/* Avatar Skeleton */}
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-cyan-400/20 ring-2 ring-cyan-400/30">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-cyan-500/40 to-blue-500/40 animate-pulse" />
          </div>
        </div>
      </div>

      {/* AI Assistant Message Skeleton */}
      <div className="w-full flex gap-3 md:gap-4 flex-row justify-start">
        <div className="flex-shrink-0">
          {/* Avatar Skeleton */}
          <div className="h-8 w-8 md:h-10 md:w-10 rounded-full bg-purple-400/20 ring-2 ring-purple-400/30">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-purple-500/40 to-pink-500/40 animate-pulse" />
          </div>
        </div>

        <div className="w-full max-w-[90%] sm:max-w-[80%] md:max-w-[550px] flex flex-col space-y-2 bg-white/5 rounded-2xl p-3 md:p-4 border border-white/5 backdrop-blur-sm">
          {/* Header Skeleton */}
          <div className="flex items-center space-x-3">
            <div className="h-4 w-20 md:w-24 bg-purple-300/20 rounded" />
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <div className="h-3 w-8 bg-white/10 rounded" />
          </div>

          {/* Content Skeleton */}
          <div className="space-y-2 mt-2">
            <div className="h-4 w-full max-w-[90%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-4 w-full max-w-[80%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
            <div className="h-4 w-full max-w-[70%] bg-white/10 rounded overflow-hidden relative">
              <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
