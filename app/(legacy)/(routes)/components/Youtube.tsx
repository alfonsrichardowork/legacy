import { Play } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export function Youtube() {
  const videoData = [
    { id: '0tSGZBU71gc', title: 'COMING SOON LEGACY LIMITED EDITION BY SINAR BAJA ELECTRIC' },
    { id: 'MdXTBWAba6I', title: 'Tur Pabrik SBE' },
    { id: 'xbs1qcUuAZc', title: 'ACR Rhyme Desibel Lumajang' },
    { id: 'oxL7PB9yZ70', title: 'ACR Rhyme Desibel Ngawi' },
    { id: 'D8z5V0Y4kIs', title: 'Toys Paradise Rhyme' },
    { id: 'M8QOSdspAqs', title: 'Showroom Lokal SBE Surabaya' },
    // { id: 'KIV-nLkEeKE', title: 'ACR Rhyme SMEX' },
  ];
  return (
      <div className="container mx-auto xl:px-36 lg:px-20 px-10 pb-4 pt-4 h-fit">
        <div className="w-full justify-center flex">
          <Link href="https://youtube.com/@acrspeaker-rhymeproaudio?si=jABUOuZOZV6axnPt" target="_blank">
            <div className="sm:flex block items-center hover:bg-slate-200 p-4 rounded-lg w-fit">
              <div className="sm:mr-4 flex justify-center sm:pb-0 pb-2">
                <Image src="/images/legacy/acryoutubeprofile.jpg" alt="ACR Rhyme Youtube" className="rounded-full" width={100} height={100} />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-black pb-2 text-center">YOUTUBE CHANNEL</h2>
                <div className="text-xl text-black text-center">ACR Speaker - Rhyme Pro Audio</div>
              </div>
            </div>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 items-center pt-8">
          {videoData.map((video, index) => (
            <Link
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-1 block ${index >= 3 ? 'sm:block hidden' : ''} group`}
              >
                <div className="w-full lg:h-60 h-40 rounded-lg relative overflow-hidden">
                  <Image
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                    className="object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-secondary-foreground/40 flex items-center justify-center rounded-lg">
                    <Play width={30} height={30} className="text-secondary group-hover:text-white duration-200 ease-in-out" />
                  </div>
                </div>
              </Link>
          ))}
        </div>
      </div>
  );
};