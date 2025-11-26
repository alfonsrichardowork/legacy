import { Phone } from "lucide-react";
import { Separator } from "../../../../components/ui/separator";
import { distributors } from "@prisma/client";

type Props = {
  distributors: distributors[]
};

export default function DistributorsClient({ distributors }: Props) {
    const segmentedDistributor = distributors.reduce((acc, dist) => {
    // Combine all three as a single key
    const key = `${JSON.parse(dist.city).name} - ${JSON.parse(dist.state).name}`;

    if (!acc[key]) {
        acc[key] = [];
    }

    acc[key].push(dist);
    return acc;
    }, {} as Record<string, distributors[]>);
  return (
    <>
  <div className="bg-white -z-10">
  <div className="relative w-full container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-16 h-fit">
        <div className="pb-4">
          <div className='text-4xl font-bold text-black pb-4'>
            List Distributors
          </div>
          <Separator className='bg-foreground w-56 h-2'/>
        </div>
      </div>


    <div className="flex flex-wrap justify-center gap-4 container mx-auto xl:px-36 lg:px-20 px-10 pb-8">
        {Object.entries(segmentedDistributor).map(([location, group]) => (
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
        ))}
      </div>
    </div>
    </>
  );
}