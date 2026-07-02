import React from 'react';

export default function SkeletonLoader() {
  return (
    <div className="space-y-6 animate-pulse">
      {/* Cards Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-slate-50 border border-slate-200/80 p-4 rounded-2xl space-y-2">
            <div className="h-4 bg-slate-200 rounded w-1/3" />
            <div className="flex items-center gap-2 mt-2">
              <div className="h-6 w-6 rounded-lg bg-slate-200" />
              <div className="h-6 bg-slate-200 rounded w-1/2" />
            </div>
          </div>
        ))}
      </div>

      {/* Editor Skeleton */}
      <div className="space-y-2">
        <div className="h-4 bg-slate-200 rounded w-24" />
        <div className="h-48 bg-slate-50 border border-slate-200/80 rounded-2xl p-4 space-y-3">
          <div className="h-4 bg-slate-200 rounded w-3/4" />
          <div className="h-4 bg-slate-200 rounded w-5/6" />
          <div className="h-4 bg-slate-200 rounded w-2/3" />
          <div className="h-4 bg-slate-200 rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}
