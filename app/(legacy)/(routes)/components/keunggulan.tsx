import { superior } from '@prisma/client';
import SwiperCarouselKeunggulan from '../../components/swipercarouselkeunggulan';
import { use } from 'react';

export default function Keunggulan({superiorPromise}: {superiorPromise: Promise<superior[]>}) {
  const superiorData = use(superiorPromise);

  return (
    <>
      <SwiperCarouselKeunggulan unggulan={superiorData}/>
    </>
  );
};