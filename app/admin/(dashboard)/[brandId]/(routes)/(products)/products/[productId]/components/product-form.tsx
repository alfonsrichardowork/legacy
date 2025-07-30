"use client"

import * as z from "zod"
import axios, { AxiosResponse } from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { Cover_Image, Drawing_Image, Graph_Image, Image_Catalogues, Impedance_Image, multipleDatasheetProduct, Product, Size } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/app/admin/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/app/admin/components/ui/textarea"
import Link from "next/link"
import { uploadProductDatasheet } from "@/app/admin/upload-product-datasheet"
import Image from "next/image"
import { uploadCoverImage } from "@/app/admin/upload-cover-image"
import { uploadDrawingImage } from "@/app/admin/upload-drawing-image"
import { uploadFrequencyResponseImage } from "@/app/admin/upload-frequency-response-image"
import { uploadImageCatalogues } from "@/app/admin/upload-image-catalogues"
import { uploadImpedanceImage } from "@/app/admin/upload-impedance-image"
import { CirclePlus, File, Trash } from "lucide-react"


const formSchema = z.object({
  name: z.string().min(1),
  images_catalogues: z.object({ url: z.string() }).array(),
  cover_img: z.object({ url: z.string() }).array(),
  drawing_img: z.object({ url: z.string() }).array(),
  graph_img: z.object({ url: z.string() }).array(),
  impedance_img: z.object({ url: z.string() }).array(),
  multipleDatasheetProduct: z.object({ url: z.string() }).array(),
  description: z.string().min(1),
  sizeId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
  isNewProduct: z.boolean().default(false).optional(),
  series: z.string().optional(),
});

type ProductFormValues = z.infer<typeof formSchema>

interface ProductFormProps {
  initialData: Product & {
    images_catalogues: Image_Catalogues[]
    cover_img: Cover_Image[]
    drawing_img: Drawing_Image[]
    graph_img: Graph_Image[]
    impedance_img: Impedance_Image[]
    multipleDatasheetProduct: multipleDatasheetProduct[]
  } | null;
  sizes: Size[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [allDatasheet, setAllDatasheet] = useState<multipleDatasheetProduct[]>([]);
  const [selectedDatasheetFile, setSelectedDatasheetFile] = useState<File[]>([]);

  const [coverImgUrl, setCoverImgUrl] = useState<Cover_Image>();
  const [coverImg, setCoverImg] = useState<File>();

  const [drawingImgUrl, setDrawingImgUrl] = useState<Drawing_Image>();
  const [drawingImg, setDrawingImg] = useState<File>();
  
  const [freqResponseUrl, setFreqResponseUrl] = useState<Graph_Image>();
  const [freqResponseImg, setfreqResponseImg] = useState<File>();
  
  const [impedanceUrl, setImpedanceUrl] = useState<Graph_Image>();
  const [impedanceImg, setImpedanceImg] = useState<File>();
  
  const [imgCataloguesUrl, setImgCataloguesUrl] = useState<Image_Catalogues[]>([]);
  const [imgCatalogues, setImgCatalogues] = useState<File[]>([]);


  const title = initialData ? 'Edit product' : 'Create product';
  const description = initialData ? `For ${initialData.name}` : 'Add a new product';
  const toastMessage = initialData ? 'Product updated.' : 'Product created.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    images_catalogues: [],
    cover_img: [],
    drawing_img: [],
    graph_img: [],
    impedance_img: [],
    multipleDatasheetProduct: [],
    description: '',
    sizeId: '',
    isFeatured: false,
    isArchived: false,
    isNewProduct: false,
    series: '',
  }


  useEffect(() => {
    const fetchData = async () => {
      if (initialData && initialData.multipleDatasheetProduct) {
        setAllDatasheet(initialData.multipleDatasheetProduct);
      }

      if (initialData && initialData.cover_img) {
        setCoverImgUrl(initialData.cover_img[0]);
      }
      else{
        let temp: Cover_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setCoverImgUrl(temp)
      }

      if (initialData && initialData.drawing_img) {
        setDrawingImgUrl(initialData.drawing_img[0]);
      }
      else{
        let temp: Drawing_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setDrawingImgUrl(temp)
      }

      if (initialData && initialData.graph_img) {
        setFreqResponseUrl(initialData.graph_img[0]);
      }
      else{
        let temp: Graph_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setFreqResponseUrl(temp)
      }

      if (initialData && initialData.impedance_img) {
        setImpedanceUrl(initialData.impedance_img[0]);
      }
      else{
        let temp: Impedance_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        setImpedanceUrl(temp)
      }
      
      if (initialData && initialData.images_catalogues) {
        setImgCataloguesUrl(initialData.images_catalogues);
      }
    };
  
    fetchData().catch((error) => {
      console.error("Error fetching data: ", error);
    });
  
  }, [params.productId, initialData, initialData?.multipleDatasheetProduct, initialData?.cover_img, initialData?.drawing_img, initialData?.graph_img, initialData?.impedance_img, initialData?.images_catalogues]); 


  //MULTIPLE DATASHEET
  const addDatasheetCounter = () => {
    //@ts-ignore
    setAllDatasheet((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
      },
    ]);
  };

  const reduceDatasheetCounter = (index: number) => {
    setAllDatasheet((prev) => prev.filter((_, i) => i !== index));
  };

  const handleDatasheetFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = selectedDatasheetFile
    temp[index] = tempfile!
    setSelectedDatasheetFile(temp);
  };

  async function handleDatasheetFileUpload(file: File[]): Promise<multipleDatasheetProduct[]> {
    if (file && file.length > 0) {
      let updatedDatasheet = [...allDatasheet];
      try {
        const uploadPromises = file.map(async (value, index) => {
          const formData = new FormData();
          formData.append('file', value);
          const url = await uploadProductDatasheet(formData);
          updatedDatasheet[Number(index)].url = url;
        });
        await Promise.all(uploadPromises);
        return updatedDatasheet;
      } catch (error) {
        console.error("Error uploading files:", error);
        return [];
      }
    }  
    return [];
  }
  
  
  //COVER IMAGE
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setCoverImg(file);
  };

  const deleteCoverImage = async () => {
    let temp: Cover_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setCoverImgUrl(temp)
  }

  async function handleCoverImageUpload(file: File): Promise<Cover_Image> {
    if (file) {
      let temp: Cover_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.productId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadCoverImage(formData);
        temp.url = url;
        return temp;
      } catch (error) {
        console.error("Error uploading cover image:", error);
        let temp: Cover_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        return temp;
      }
    }
    let temp: Cover_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


   //DRAWING IMAGE
   const handleDrawingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setDrawingImg(file);
  };

  const deleteDrawingImage = async () => {
    let temp: Drawing_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setDrawingImgUrl(temp)
  }

  async function handleDrawingImageUpload(file: File): Promise<Drawing_Image> {
    if (file) {
      let temp: Drawing_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.productId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadDrawingImage(formData);
        temp.url = url;
        return temp;
      } catch (error) {
        console.error("Error uploading drawing image:", error);
        let temp: Drawing_Image = {
          id: Math.random().toString(),
          //@ts-ignore
          productId: params.productId,
          url: '',
          createdAt: new Date(),
          updatedAt: new Date()
        }
        return temp;
      }
    }
    let temp: Drawing_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


  //FREQUENCY RESPONSE IMAGE
  const handleFrequencyResponseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setfreqResponseImg(file);
  };

  const deleteFrequencyResponseImage = async () => {
    let temp: Graph_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setFreqResponseUrl(temp)
  }

  async function handleFrequencyResponseImageUpload(file: File): Promise<Graph_Image> {
    if (file) {
      let temp: Graph_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.productId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadFrequencyResponseImage(formData);
        temp.url = url;
        return temp!;
      } catch (error) {
        console.error("Error uploading frequency response image:", error);
        return temp;
      }
    }
    let temp: Graph_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }




  //IMPEDANCE IMAGE
  const handleImpedanceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImpedanceImg(file);
  };

  const deleteImpedanceImage = async () => {
    let temp: Impedance_Image = {
      id: '',
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    setImpedanceUrl(temp)
  }

  async function handleImpedanceImageUpload(file: File): Promise<Impedance_Image> {
    if (file) {
      let temp: Impedance_Image = {
        id: Math.random().toString(),
        //@ts-ignore
        productId: params.productId,
        url: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadImpedanceImage(formData);
        temp.url = url;
        return temp!;
      } catch (error) {
        console.error("Error uploading impedance image:", error);
        return temp;
      }
    }
    let temp: Impedance_Image = {
      id: Math.random().toString(),
      //@ts-ignore
      productId: params.productId,
      url: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }
    return temp;
  }


  //MULTIPLE IMAGE CATALOGUES
  const addImageCataloguesCounter = () => {
    //@ts-ignore
    setImgCataloguesUrl((prev) => [
      ...prev,
      {
        id: Math.random().toString(), // Using a random id for uniqueness
        productId: params.productId,
        url: "",
        name: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  };

  const reduceImageCataloguesCounter = (index: number) => {
    setImgCataloguesUrl((prev) => prev.filter((_, i) => i !== index));
  };

  const handleImageCataloguesFileChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const tempfile = e.target.files?.[0];
    let temp = imgCatalogues
    temp[index] = tempfile!
    setImgCatalogues(temp);
  };

  async function handleImageCataloguesFileUpload(file: File[]): Promise<Image_Catalogues[]> {
    if (file && file.length > 0) {
      let updatedImageCatalogues = [...imgCataloguesUrl];
      try {
        const uploadPromises = file.map(async (value, index) => {
          const formData = new FormData();
          formData.append('image', value);
          const url = await uploadImageCatalogues(formData);
          updatedImageCatalogues[Number(index)].url = url;
        });
        await Promise.all(uploadPromises);
        return updatedImageCatalogues;
      } catch (error) {
        console.error("Error uploading image catalogues:", error);
        return [];
      }
    }  
    return [];
  }


  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
        
      if (selectedDatasheetFile && selectedDatasheetFile.length > 0) {
        data.multipleDatasheetProduct = await handleDatasheetFileUpload(selectedDatasheetFile)
      }
      else{
        data.multipleDatasheetProduct = allDatasheet
      }

      if (coverImg) {
        data.cover_img[0] = await handleCoverImageUpload(coverImg)
      }
      else{
        data.cover_img[0] = coverImgUrl!
      }

      if (drawingImg) {
        data.drawing_img[0] = await handleDrawingImageUpload(drawingImg)
      }
      else{
        data.drawing_img[0] = drawingImgUrl!
      }

      if (freqResponseImg) {
        data.graph_img[0] = await handleFrequencyResponseImageUpload(freqResponseImg)
      }
      else{
        data.graph_img[0] = freqResponseUrl!
      }

      if (impedanceImg) {
        data.impedance_img[0] = await handleFrequencyResponseImageUpload(impedanceImg)
      }
      else{
        data.impedance_img[0] = impedanceUrl!
      }

      if (imgCatalogues && imgCatalogues.length > 0) {
        data.images_catalogues = await handleImageCataloguesFileUpload(imgCatalogues)
      }
      else{
        data.images_catalogues = imgCataloguesUrl
      }

      let response: AxiosResponse;
      if (initialData) {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_PRODUCT}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        //@ts-ignore
        const API_EDITED2 = API_EDITED.replace('{productId}', params.productId)
        response = await axios.patch(API_EDITED2, data);
      } else {
        const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_ADD_PRODUCT}`;
        //@ts-ignore
        const API_EDITED = API.replace('{brandId}', params.brandId)
        response = await axios.post(API_EDITED, data);
      }
      if(response.data === 'duplicate'){
        toast.error("Duplicate Product")
      }
      else if(response.data === 'expired_session'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Session expired, please login again");
      }
      else if(response.data === 'invalid_token'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("API Token Invalid, please login again");
      }
      else if(response.data === 'unauthorized'){
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/`);
        router.refresh();
        toast.error("Unauthorized!");
      }
      else{
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/products`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };


  
  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Cover Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  {coverImgUrl && (coverImgUrl!.url !== undefined && coverImgUrl.url !== '') ?
                  <>
                  <div className="flex items-center space-x-4">
                      <Image
                      src={coverImgUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      priority
                      />
                  </div>
                  <div
                  className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                  onClick={() => deleteCoverImage()}
                >
                  <Trash width={20} height={20} />
                </div>
                </>
                :
                    <Input
                      type="file"
                      accept="image/*"
                      name="file"
                      onChange={(e) =>
                        e.target.files && handleCoverImageChange(e)
                      }
                      disabled={loading}
                      className="bg-white p-2 rounded-md"
                      required
                    />
                    }
                </div>
            </div>
          </div>
          
          <div className="flex flex-col w-full justify-center rounded-lg p-4 bg-white/50 gap-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Product name" {...field} className="bg-white text-black"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Size</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white text-black">
                        <SelectValue defaultValue={field.value} placeholder="Select a size" className="bg-white"/>
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent  className="bg-white text-black">
                      {sizes.map((size) => (
                        <SelectItem key={size.id} value={size.id}>{size.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Description</FormLabel>
                  <FormDescription className="text-black">For lists only. Give a new space (enter) for each list. If empty, type: - | <Link href={'/images/admin/single_prod_desc_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline">Check placement</Link></FormDescription>
                  <FormControl>
                    <Textarea disabled={loading} placeholder="Product description" {...field} className="bg-white text-black" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>


          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Drawing Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {drawingImgUrl && (drawingImgUrl!.url !== undefined && drawingImgUrl.url !== '') && (
                      <Image
                      src={drawingImgUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    )}
                    {(!drawingImgUrl || (drawingImgUrl.url === '')) && (
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleDrawingImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    )}
                  </div>
                  {drawingImgUrl && (drawingImgUrl!.url !== undefined && drawingImgUrl.url !== '') && (
                    <div
                      className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteDrawingImage()}
                    >
                      <Trash width={20} height={20} />
                    </div>
                  )}
                </div>
            </div>
          </div>

          
          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Frequency Response Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {freqResponseUrl && (freqResponseUrl!.url !== undefined && freqResponseUrl.url !== '') && (
                      <Image
                      src={freqResponseUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    )}
                    {(!freqResponseUrl || (freqResponseUrl.url === '')) && (
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleFrequencyResponseImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    )}
                  </div>
                  {freqResponseUrl && (freqResponseUrl!.url !== undefined && freqResponseUrl.url !== '') && (
                    <div
                      className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteFrequencyResponseImage()}
                    >
                      <Trash width={20} height={20} />
                    </div>
                  )}
                </div>
            </div>
          </div>


          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Impedance Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {impedanceUrl && (impedanceUrl!.url !== undefined && impedanceUrl.url !== '') && (
                      <Image
                      src={impedanceUrl!.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    )}
                    {(!impedanceUrl || (impedanceUrl.url === '')) && (
                      <Input
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleImpedanceImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    )}
                  </div>
                  {impedanceUrl && (impedanceUrl!.url !== undefined && impedanceUrl.url !== '') && (
                    <div
                      className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteImpedanceImage()}
                    >
                      <Trash width={20} height={20} />
                    </div>
                  )}
                </div>
            </div>
          </div>  
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left pb-2 font-bold">Image Catalogues</div>
              <div
                onClick={addImageCataloguesCounter}
                className="flex gap-2 items-center justify-center bg-foreground w-fit text-background py-2 px-4 rounded-md hover:bg-primary-dark cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add Image Catalogues
              </div>
            </div>
            {imgCataloguesUrl.map((value, index) => (
              <div className="space-y-2 rounded-lg shadow-md p-2" key={index}>
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Image
                      src={value.url}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                        className="w-32 h-fit"
                      />
                    )}
                    {value.url === '' && (
                      <Input
                        id={`image-catalogues-${index}`}
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleImageCataloguesFileChange(e, index)
                        }
                        disabled={loading}
                        className="border bg-white p-2 rounded-md"
                      />
                    )}
                    <Input
                      type="text"
                      defaultValue={value.name}
                      placeholder="Input this image name"
                      onChange={(e) => {
                        const updatedImageCatalogues = [...imgCataloguesUrl];
                        updatedImageCatalogues[index].name = e.target.value;
                        setImgCataloguesUrl(updatedImageCatalogues);
                      }}
                      className="border text-black bg-white p-2 rounded-md w-48"
                    />
                  </div>
                  <div
                    className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                    onClick={() => reduceImageCataloguesCounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="rounded-lg p-4 bg-white/50">
            <div className="text-center pb-2 flex justify-between items-center">
              <div className="text-left pb-2 font-bold">Datasheet</div>
              <div
                onClick={addDatasheetCounter}
                className="flex items-center gap-2 justify-center bg-foreground w-fit text-background py-2 px-4 rounded-md hover:bg-primary-dark cursor-pointer"
              >
                <CirclePlus width={20} height={20} />Add Datasheet
              </div>
            </div>
            {allDatasheet.map((value, index) => (
              <div className="space-y-2 shadow-md rounded-lg p-2" key={index}>
                <div
                  key={value.id}
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  <div className="flex items-center space-x-4">
                    {value.url !== '' && (
                      <Link
                        target="_blank"
                        href={value.url}
                        className="text-blue-600 font-medium hover:underline transition-colors whitespace-nowrap flex items-center gap-2"
                      >
                        <File width={20} height={20}/> View File
                      </Link>
                    )}
                    {value.url === '' && (
                      <Input
                        id={`file-${index}`}
                        type="file"
                        accept=".pdf"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleDatasheetFileChange(e, index)
                        }
                        disabled={loading}
                        className="border bg-white p-2 rounded-md"
                      />
                    )}
                    <Input
                      type="text"
                      defaultValue={value.name}
                      placeholder="PDF File name"
                      onChange={(e) => {
                        const updatedDatasheet = [...allDatasheet];
                        updatedDatasheet[index].name = e.target.value;
                        setAllDatasheet(updatedDatasheet);
                      }}
                      required
                      className="border text-black bg-white p-2 rounded-md w-48"
                    />
                  </div>
                  <div
                    className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                    onClick={() => reduceDatasheetCounter(index)}
                  >
                    <Trash width={20} height={20} />
                  </div>
                </div>  
              </div>
            ))}
          </div>
        </div>
          <div className="md:grid md:grid-cols-3 gap-4 rounded-lg p-4 bg-white/50">
            
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center shadow-md space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      Featured
                    </FormLabel>
                    <FormDescription className="text-black">
                      This product will appear on the homepage slideshow. To be displayed, add the backgorund image through the <b>Featured Products</b> menu. <Link href={'/images/admin/featured_prod_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline">Check placement</Link>
                    </FormDescription>
                    {/* <div className="text-xs font-semibold">Note: To be displayed, you need to add the backgorund image through the &quot;Featured Products&quot; menu.</div> */}
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center shadow-md space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      Archived
                    </FormLabel>
                    <FormDescription className="text-black">
                      This product will not appear anywhere in the website.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            {/* <FormField
              control={form.control}
              name="isNewProduct"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center shadow-md space-x-3 space-y-0 rounded-md p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel className="font-bold text-base">
                      New Product
                    </FormLabel>
                    <FormDescription>
                     This product will appear in <b>New Products</b> page.
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            /> */}
            <FormField
              control={form.control}
              name="series"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-bold text-base">Series</FormLabel>
                  <FormDescription className="text-black">
                      This will appear in hero section. <Link href={'/images/admin/single_prod_series_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline">Check placement</Link>
                    </FormDescription>
                  <FormControl>
                    <Input disabled={loading} placeholder="What Series" {...field} className="bg-white text-black"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
          <Button disabled={loading} className="ml-auto" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
