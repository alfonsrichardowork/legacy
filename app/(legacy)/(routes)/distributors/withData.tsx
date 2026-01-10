import { distributors } from "@prisma/client";
import { Phone } from "lucide-react";
import { use } from "react";

export default function DistributorsWithData({distributorsDataPromise}: {distributorsDataPromise: Promise<distributors[]>}) {
  const distributosData = use(distributorsDataPromise);
  const segmentedDistributor = distributosData.reduce((acc, dist) => {
    const key = `${JSON.parse(dist.city).name} - ${JSON.parse(dist.state).name}`;
    if (!acc[key]) {
        acc[key] = [];
    }
    acc[key].push(dist);
    return acc;
    }, {} as Record<string, distributors[]>);

  return (
    Object.entries(segmentedDistributor).map(([location, group]) => (
      <div key={location} className="w-full lg:w-[49%]">
        <div className="border-2 rounded-lg p-4 shadow-lg border-secondary bg-white h-full">
          <h2 className="text-3xl font-bold text-black mb-6">{location}</h2>
          {group.map((d) => (
            <div key={d.id} className="mb-2">
              <h3 className="font-bold text-xl text-background">{d.name}</h3>
              <div className="flex items-center gap-1 text-black">
                <Phone size={18} />
                <a
                  href={`tel:${d.phoneNumber}`}
                  className="text-blue-600 hover:underline"
                >
                  {d.phoneNumber}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    ))
  );
}