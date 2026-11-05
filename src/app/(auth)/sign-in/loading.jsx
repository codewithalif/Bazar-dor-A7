import React from "react";
import { ClipLoader } from "react-spinners";

const Loading = () => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#f0f5f0]">
      <ClipLoader
        color="#16a34a"
        size={50}
        speedMultiplier={1}
      />

      <p className="text-sm font-medium text-gray-600">
        লোড হচ্ছে, অপেক্ষা করুন...
      </p>
    </div>
  );
};

export default Loading;