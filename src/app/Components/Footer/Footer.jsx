
import React from "react";

const Footer = () => {
  return (
    <footer className="flex flex-col items-center gap-2 border-t border-gray-300 px-4 py-4 text-center text-sm text-gray-800 sm:flex-row sm:justify-between sm:text-left md:px-6">
      <p>
        বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
      </p>

      <p className="text-gray-600">
        সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
      </p>
    </footer>
  );
};

export default Footer;