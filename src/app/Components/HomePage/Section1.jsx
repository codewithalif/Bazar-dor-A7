import Link from "next/link";

const unitLabels = {
kg: "প্রতি কেজি",
piece: "প্রতি পিস",
liter: "প্রতি লিটার",
packet: "প্রতি প্যাকেট",
box: "প্রতি বক্স",
};

const formatNumber = (value) =>
Number(value ?? 0).toLocaleString("bn-BD", {
maximumFractionDigits: 2,
});

const Section1 = ({ item }) => {
const isUp = item?.change?.dir === "up";

return (
<Link
href={`/home/${item.id}`}
      className="block w-full min-w-0 rounded-xl border border-[#E1E9E2] bg-[#FAFCFA] p-3 transition hover:shadow-md sm:p-4"
    >
      <div className="flex min-w-0 items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F0F5F0] text-xl">
        {item.image || item.categoryIcon || "🛒"}
      </div>
      <div className="min-w-0 flex-1">
      <h3 className="truncate text-sm font-bold text-[#202B25]">
        {item.nameBn}
      </h3>

      <p className="mt-0.5 text-[11px] text-gray-500">
        {unitLabels[item.unit] || `প্রতি ${item.unit}`}
      </p>
    </div>
  </div>

  <div className="mt-4 flex min-w-0 items-end justify-between gap-2">
    <div className="min-w-0">
      <p className="text-[11px] text-gray-500">
        আজকের দাম
      </p>

      <p className="mt-0.5 break-words text-sm font-bold text-[#202B25] sm:text-base">
        {formatNumber(item.today)} টাকা
      </p>
    </div>

    <span
      className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold ${
        isUp
          ? "bg-red-50 text-red-600"
          : "bg-green-50 text-green-600"
      }`}
    >
      {isUp ? "▲" : "▼"} {formatNumber(item.change?.pct)}%
    </span>
  </div>
</Link>


);
};

export default Section1;