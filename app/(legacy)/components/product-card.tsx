import Link from "next/link";
import { AllFilterProductsOnlyType } from "../types";
import { LazyImageClickable } from "./lazyImageClickable";
import { Button } from "@/components/ui/button";

interface ReviewCard {
  data: AllFilterProductsOnlyType
}

const ProductCard: React.FC<ReviewCard> = ({
  data
}) => {
  return ( 
    <Link href={`/products/${data?.products.slug}`} 
    className="bg-white group cursor-pointer"
    data-testid="product-card"
    >
      <div>
      <div className="relative flex content-center justify-center h-[150px] w-full">
      <div className="w-full h-auto px-12">
        <LazyImageClickable
          src={data.products.cover_img.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${data.products.cover_img.url}` : data.products.cover_img.url} 
          alt={data.products.name} 
          width={500}
          height={500}
        />
      </div>
    </div>


      <div className="flex flex-col items-center pt-4">
        {data.specs && data.specs.length > 0 &&
          <div className="text-sm text-gray-400 lg:text-lg font-semibold text-center">{data.specs.find((val) => val.slug === 'type')?.value}</div>
        }
        <h2 className="text-lg lg:text-2xl font-bold text-center pb-2 text-black">{data.products.name}</h2>
        {/* {data.sub_sub_categories.length > 0 &&        
          <h2 className="sr-only">{data.name} - {data?.sub_sub_categories[0]?.name}</h2>
        } */}
      </div>
      {/* </div> */}
    {/* </Link> */}
      </div>
      
    <div className="w-full flex justify-center pb-2">
        <Button                                            
        variant="default"
        className="bg-secondary border-foreground border-4 sm:w-2/3 w-screen"
        asChild
        >
            {/* <Link href={`/products/${item.products.slug}`}> */}
                <b>DETAIL</b>
            {/* </Link> */}
        </Button>
      </div>
    </Link>
  );
}

export default ProductCard;
