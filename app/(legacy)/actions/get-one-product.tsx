import { AllCategory, FilesProp, SingleProducts, Size  } from "@/app/(legacy)/types";
import { redirect } from "next/navigation";

const API=`${process.env.NEXT_PUBLIC_ROOT_URL}/${process.env.NEXT_PUBLIC_FETCH_ONE_PRODUCT}`;

const getProduct = async (productSlug: string): Promise<SingleProducts> => {
  const API_EDITED = API.replace('{productSlug}', productSlug)
  const response = await fetch(API_EDITED);
  if (!response.ok) {
    redirect('/');
    // throw new Error('Failed to fetch one product');
  }


  const data = await response.json();
  if (!data) {
    redirect('/');
  }
  let prod_cat: AllCategory[] = []
  let prod_sub_cat: AllCategory[] = []
  let prod_sub_sub_cat: AllCategory[] = []
  let all_image_catalogues : Array<FilesProp> = []
  let all_datasheet : Array<FilesProp> = []

   if (data && data.product){
    if(data.product.allCat){
      for (let i = 0; i < data.product.allCat.length; i++) {
        let temp: AllCategory = {
          id: data.product.allCat[i]?.id ?? '',
          name: data.product.allCat[i]?.category.name ?? '',
          slug: data.product.allCat[i]?.category.slug ?? ''
        }
        if(data.product.allCat[i]?.category.type === "Category"){
          prod_cat.push(temp)
        }
        else if(data.product.allCat[i]?.category.type === "Sub Category"){
          prod_sub_cat.push(temp)
        }
        else{
          prod_sub_sub_cat.push(temp)
        }
      }
    }

    data.product.images_catalogues && data.product.images_catalogues.length > 0 && data.product.images_catalogues.map((img: any) => {
      all_image_catalogues.push({
        name: img.name,
        url: img.url,
        productId: img.id
      })
    })

    data.product.multipleDatasheetProduct && data.product.multipleDatasheetProduct.length > 0 && data.product.multipleDatasheetProduct.map((img: any) => {
      all_datasheet.push({
        name: img.name,
        url: img.url,
        productId: img.id
      })
    })


    let size = {} as Size;
    if(data.product.size!=null){
      let size2: Size = {
        label: data.product.size.value,
        value: Number(data.product.size.name)
      }
      size = size2  
    }

   
    let product: SingleProducts = {
      coverImg: data.product.cover_img_url,
      size: size,
      images_Catalogues: all_image_catalogues,
      drawing: data.product.drawing_img_url,
      graph: data.product.graph_img_url,
      impedance: data.product.impedance_img_url,
      categories: prod_cat,
      sub_categories: prod_sub_cat,
      sub_sub_categories: prod_sub_sub_cat,
      datasheet: all_datasheet,
      specification: data.specifications,
      id: data.product.id,
      name: data.product.name,
      desc: data.product.description,
      slug: data.product.slug,
    }
    return product;
  }
  let product: SingleProducts = {
      coverImg: data.product.cover_img_url,
    size: {
      value:0,
      label:'',
    },
    images_Catalogues: all_image_catalogues,
    drawing: data.product.drawing_img_url,
    graph: data.product.graph_img_url,
    impedance: data.product.impedance_img_url,
    categories: prod_cat,
    sub_categories: prod_sub_cat,
    sub_sub_categories: prod_sub_sub_cat,
    datasheet: all_datasheet,
    specification: [],
    id: "",
    name: "",
    desc: "",
    slug: "",
  }
  return product;
};

export default getProduct;

