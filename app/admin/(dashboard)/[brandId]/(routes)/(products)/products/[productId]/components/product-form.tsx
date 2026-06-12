"use client"

import * as z from "zod"
import axios, { AxiosResponse } from "axios"
import { useCallback, useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { image_catalogues, multipledatasheetproduct, product, size } from "@prisma/client"
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
import Link from "next/link"
import Image from "next/image"
import { Bold, CirclePlus, File, Heading1, Heading2, Heading3, Heading4, Heading5, Heading6, Italic, List, ListOrdered, LucideLink, LucideUnlink, Strikethrough, Trash } from "lucide-react"


import { EditorContent, useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import HeadingTiptap from '@tiptap/extension-heading';
import ImageTiptap from '@tiptap/extension-image';
import LinkTiptap from '@tiptap/extension-link'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import Text from '@tiptap/extension-text'
import TextStyle from '@tiptap/extension-text-style'
import '@/app/css/styles.scss'
import { Toggle } from "@/app/admin/components/ui/toggle"
import { uploadImage } from "@/app/admin/upload-image"
import { uploadDatasheet } from "@/app/admin/upload-datasheet"
import { MAX_SIZE } from "@/app/admin/model/model"


const formSchema = z.object({
  name: z.string().min(1),
  images_catalogues: z.object({ url: z.string() }).array(),
  cover_img_url: z.string().optional(),
  drawing_img_url: z.string().optional(),
  graph_img_url: z.string().optional(),
  impedance_img_url: z.string().optional(),
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
  initialData: product & {
    images_catalogues: image_catalogues[]
    cover_img_url: string
    drawing_img_url: string
    graph_img_url: string
    impedance_img_url: string
    multipleDatasheetProduct: multipledatasheetproduct[]
  } | null;
  sizes: size[];
};

export const ProductForm: React.FC<ProductFormProps> = ({
  initialData,
  sizes,
}) => {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [allDatasheet, setAllDatasheet] = useState<multipledatasheetproduct[]>([]);
  const [selectedDatasheetFile, setSelectedDatasheetFile] = useState<File[]>([]);

  const [coverImgUrl, setCoverImgUrl] = useState<string>('');
  const [coverImg, setCoverImg] = useState<File>();

  const [drawingImgUrl, setDrawingImgUrl] = useState<string>('');
  const [drawingImg, setDrawingImg] = useState<File>();
  
  const [freqResponseUrl, setFreqResponseUrl] = useState<string>('');
  const [freqResponseImg, setfreqResponseImg] = useState<File>();
  
  const [impedanceUrl, setImpedanceUrl] = useState<string>('');
  const [impedanceImg, setImpedanceImg] = useState<File>();
  
  const [imgCataloguesUrl, setImgCataloguesUrl] = useState<image_catalogues[]>([]);
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
    cover_img_url: '',
    drawing_img_url: '',
    graph_img_url: '',
    impedance_img_url: '',
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

      if (initialData && initialData.cover_img_url) {
        setCoverImgUrl(initialData.cover_img_url);
      }
      else{
        setCoverImgUrl('')
      }

      if (initialData && initialData.drawing_img_url) {
        setDrawingImgUrl(initialData.drawing_img_url);
      }
      else{
        setDrawingImgUrl('')
      }

      if (initialData && initialData.graph_img_url) {
        setFreqResponseUrl(initialData.graph_img_url);
      }
      else{
        setFreqResponseUrl('')
      }

      if (initialData && initialData.impedance_img_url) {
        setImpedanceUrl(initialData.impedance_img_url);
      }
      else{
        setImpedanceUrl('')
      }
      
      if (initialData && initialData.images_catalogues) {
        setImgCataloguesUrl(initialData.images_catalogues);
      }
    };
  
    fetchData().catch((error) => {
      console.error("Error fetching data: ", error);
    });
  
  }, [params.productId, initialData, initialData?.multipleDatasheetProduct, initialData?.cover_img_url, initialData?.drawing_img_url, initialData?.graph_img_url, initialData?.impedance_img_url, initialData?.images_catalogues]); 


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

  async function handleDatasheetFileUpload(file: File[]): Promise<multipledatasheetproduct[]> {
    if (file && file.length > 0) {
      let updatedDatasheet = [...allDatasheet];
      try {
        const uploadPromises = file.map(async (value, index) => {
          if(value){
            const formData = new FormData();
            formData.append('file', value);
            const url = await uploadDatasheet(formData, 'productdatasheet');            
            const elementIndex = updatedDatasheet.length - (file.length - index);
            if (updatedDatasheet[elementIndex]) {
              updatedDatasheet[elementIndex].url = url;
            }
          }
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
    if(!file) return
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }
    setCoverImg(file);
  };

  const deleteCoverImage = async () => {
    setCoverImgUrl('')
  }

  async function handleCoverImageUpload(file: File): Promise<string> {
    if (file) {
      let updatedCoverImage = coverImgUrl ?? ''
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadImage(formData, 'productcoverimage');
        updatedCoverImage = url;
        return updatedCoverImage;
      } catch (error) {
        console.error("Error uploading cover image:", error);
        return '';
      }
    }
    return '';
  }


   //DRAWING IMAGE
   const handleDrawingImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }
    setDrawingImg(file);
  };

  const deleteDrawingImage = async () => {
    setDrawingImgUrl('')
  }

  async function handleDrawingImageUpload(file: File): Promise<string> {
    if (file) {
      let updatedDrawingImage = drawingImgUrl ?? ''
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadImage(formData, 'productdrawing');
        updatedDrawingImage = url;
        return updatedDrawingImage;
      } catch (error) {
        console.error("Error uploading drawing image:", error);
        return '';
      }
    }
    return '';
  }


  //FREQUENCY RESPONSE IMAGE
  const handleFrequencyResponseImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }
    setfreqResponseImg(file);
  };

  const deleteFrequencyResponseImage = async () => {
    setFreqResponseUrl('')
  }

  async function handleFrequencyResponseImageUpload(file: File): Promise<string> {
    if (file) {
      let updatedFrequencyResponseImage = freqResponseUrl ?? ''
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadImage(formData, 'productfrequencyresponse');
        updatedFrequencyResponseImage = url;
        return updatedFrequencyResponseImage!;
      } catch (error) {
        console.error("Error uploading frequency response image:", error);
        return '';
      }
    }
    return '';
  }




  //IMPEDANCE IMAGE
  const handleImpedanceImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if(!file) return
    if (file.size > MAX_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }
    setImpedanceImg(file);
  };

  const deleteImpedanceImage = async () => {
    setImpedanceUrl('')
  }

  async function handleImpedanceImageUpload(file: File): Promise<string> {
    if (file) {
      let updatedImpedanceImage = impedanceUrl ?? ''
      try {
        const formData = new FormData();
        formData.append('image', file);
  
        const url = await uploadImage(formData, 'productimpedance');
        updatedImpedanceImage = url;
        return updatedImpedanceImage;
      } catch (error) {
        console.error("Error uploading impedance image:", error);
        return '';
      }
    }
    return '';
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
    if(!tempfile) return
    if (tempfile.size > MAX_SIZE) {
      alert("File size must be less than 2MB");
      e.target.value = "";
      return;
    }
    let temp = imgCatalogues
    temp[index] = tempfile!
    setImgCatalogues(temp);
  };

  async function handleImageCataloguesFileUpload(file: File[]): Promise<image_catalogues[]> {
    if (file && file.length > 0) {
      let updatedImageCatalogues = [...imgCataloguesUrl];
      try {
        const uploadPromises = file.map(async (value, index) => {
          if (value) {
            const formData = new FormData();
            formData.append('image', value);
            const url = await uploadImage(formData, 'productimagecatalogues');
            const elementIndex = updatedImageCatalogues.length - (file.length - index)
            if (updatedImageCatalogues[elementIndex]) {
              updatedImageCatalogues[elementIndex].url = url;
            }
          }
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
        data.cover_img_url = await handleCoverImageUpload(coverImg)
      }
      else{
        data.cover_img_url = coverImgUrl
      }

      if (drawingImg) {
        data.drawing_img_url = await handleDrawingImageUpload(drawingImg)
      }
      else{
        data.drawing_img_url = drawingImgUrl
      }

      if (freqResponseImg) {
        data.graph_img_url = await handleFrequencyResponseImageUpload(freqResponseImg)
      }
      else{
        data.graph_img_url = freqResponseUrl
      }

      if (impedanceImg) {
        data.impedance_img_url = await handleImpedanceImageUpload(impedanceImg)
      }
      else{
        data.impedance_img_url = impedanceUrl
      }

      if (imgCatalogues && imgCatalogues.length > 0) {
        data.images_catalogues = await handleImageCataloguesFileUpload(imgCatalogues)
      }
      else{
        data.images_catalogues = imgCataloguesUrl
      }
      data.description =  editor && editor.getHTML() ? editor.getHTML() : '';

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


  const cleanHTML = initialData?.description
    ?.replace(/<pre><code>/gi, '<p>')
    ?.replace(/<\/code><\/pre>/gi, '</p>')
    ?.replace(/<pre>/gi, '<p>')
    ?.replace(/<\/pre>/gi, '</p>')

  const editor = useEditor({
      immediatelyRender: false,
      extensions: [
        StarterKit,
        HeadingTiptap.configure({
          levels: [1, 2, 3, 4, 5, 6],
        }),
        ImageTiptap,
        BulletList,
        OrderedList,
        LinkTiptap.configure({
          openOnClick: false,
          autolink: true,
          defaultProtocol: 'https',
          protocols: ['http', 'https'],
          isAllowedUri: (url: string, ctx:any) => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`${ctx.defaultProtocol}://${url}`)
  
              // use default validation
              if (!ctx.defaultValidate(parsedUrl.href)) {
                return false
              }
  
              // disallowed protocols
              const disallowedProtocols = ['ftp', 'file', 'mailto']
              const protocol = parsedUrl.protocol.replace(':', '')
  
              if (disallowedProtocols.includes(protocol)) {
                return false
              }
  
              // only allow protocols specified in ctx.protocols
              const allowedProtocols = ctx.protocols.map((p: string | { scheme: string }) => (typeof p === 'string' ? p : p.scheme))
  
              if (!allowedProtocols.includes(protocol)) {
                return false
              }
  
              // disallowed domains
              const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
              const domain = parsedUrl.hostname
  
              if (disallowedDomains.includes(domain)) {
                return false
              }
  
              // all checks have passed
              return true
            } catch (error) {
              return false
            }
          },
          shouldAutoLink: url => {
            try {
              // construct URL
              const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
  
              // only auto-link if the domain is not in the disallowed list
              const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
              const domain = parsedUrl.hostname
  
              return !disallowedDomains.includes(domain)
            } catch (error) {
              return false
            }
          },
  
        }),
        Text,
        TextStyle,
      ],
      editorProps: {
        attributes: {
          class: 'prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-hidden',
        },
      },
      content: cleanHTML ? cleanHTML : '<p></p>',
    });
  
    
  
    const setLink = useCallback(() => {
      const previousUrl = editor!.getAttributes('link').href
      const url = window.prompt('Change the root URL to {temp}. Ex: https://sbacoustics.com/products/sb12pac25-4 => {temp}products/sb12pac25-4', previousUrl)
  
      // cancelled
      if (url === null) {
        return
      }
  
      // empty
      if (url === '') {
        editor!.chain().focus().extendMarkRange('link').unsetLink()
          .run()
  
        return
      }
  
      // update link
      editor!.chain().focus().extendMarkRange('link').setLink({ href: url })
        .run()
    }, [editor])
  
    if (!editor) {
      return null
    }
  

  
  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Cover Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                  {coverImgUrl !== '' ?
                  <>
                  <div className="flex items-center space-x-4">
                      <Image
                      src={coverImgUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${coverImgUrl}` : coverImgUrl}
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
          
          <div className="flex flex-col w-full justify-center rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border gap-4">
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
            {/* <FormField
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
            /> */}
          </div>
        </div>


      <div className="grid grid-cols-1 gap-4 border rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30">
        <div className="font-bold text-base pb-2">Description | <Link href={'/images/admin/description_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline font-normal text-sm  ">See where this will be shown</Link></div>
        {/* <FormControl> */}
          <div>
          <div className="flex gap-2 mb-4 flex-wrap">
            <Toggle
              pressed={editor.isActive('bold')}
              onClick={() => editor.chain().focus().toggleBold().run()}
            >
              <Bold className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('italic')}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            >
              <Italic className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('strike')}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            >
              <Strikethrough className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('bulletList')}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            >
              <List className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={editor.isActive('orderedList')}
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
            >
              <ListOrdered className="w-4 h-4" />
            </Toggle>
            {[1, 2, 3, 4, 5, 6].map((level) => (
              <Toggle
                key={level}
                pressed={editor.isActive('heading', { level })}
                onClick={() => editor.chain().focus().toggleHeading({ level: level as 1 | 2 | 3 | 4 | 5 | 6 }).run()}
              >
                {level === 1 && <Heading1 className="w-4 h-4" />}
                {level === 2 && <Heading2 className="w-4 h-4" />}
                {level === 3 && <Heading3 className="w-4 h-4" />}
                {level === 4 && <Heading4 className="w-4 h-4" />}
                {level === 5 && <Heading5 className="w-4 h-4" />}
                {level === 6 && <Heading6 className="w-4 h-4" />}
              </Toggle>
            ))}
            
            <Toggle
              pressed={editor.isActive('link')}
              onClick={setLink}
            >
                <LucideLink className="w-4 h-4" />
            </Toggle>
            <Toggle
              pressed={!editor.isActive('link')}
              onClick={() => editor.chain().focus().unsetLink().run()}
            >
                <LucideUnlink className="w-4 h-4" />
            </Toggle>
            {/* <Toggle
              onClick={() => editor.chain().focus().setColor('#e60013').run()}
              pressed={false}
              // className={editor.isActive('textStyle', { color: '#ed3237' }) ? 'is-active' : ''}
            >
              <p className="text-primary">Red</p>
            </Toggle>
            <Toggle
              onClick={() => editor.chain().focus().unsetColor().run()}
              pressed={false}
            >
              Black
            </Toggle> */}
          </div>
          <EditorContent editor={editor} className="border p-4 bg-white text-black rounded-md"/>
          </div>
        </div>

          
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Drawing Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                    {drawingImgUrl !== '' ?
                      <>
                        <div className="flex items-center space-x-4">
                          <Image
                          src={drawingImgUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${drawingImgUrl}` : drawingImgUrl}
                          alt={initialData?.name? initialData?.name : ''}
                          width={100}
                          height={100}
                          className="w-32 h-fit"
                          />
                        </div>  
                        <div
                          className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                          onClick={() => deleteDrawingImage()}
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
                          e.target.files && handleDrawingImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    }
                </div>
            </div>
          </div>

          
          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Frequency Response Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                    {freqResponseUrl !== '' ?
                    <>
                    <div className="flex items-center space-x-4">
                      <Image
                      src={freqResponseUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${freqResponseUrl}` : freqResponseUrl}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    </div>
                    <div
                      className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteFrequencyResponseImage()}
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
                          e.target.files && handleFrequencyResponseImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    }
                </div>
            </div>
          </div>


          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
            <div className="text-center pb-2">
              <div className="text-left font-bold">Impedance Image</div>
            </div>
            <div className="space-y-2 p-2">
                <div
                  className="flex items-center justify-between rounded-md shadow-xs"
                >
                    {impedanceUrl !== '' ?
                    <>
                    <div className="flex items-center space-x-4">
                      <Image
                      src={impedanceUrl.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${impedanceUrl}` : impedanceUrl}
                      alt={initialData?.name? initialData?.name : ''}
                      width={100}
                      height={100}
                      className="w-32 h-fit"
                      />
                    </div>
                    <div
                      className="bg-red-500 text-white py-1 px-3 rounded-md cursor-pointer hover:bg-red-600"
                      onClick={() => deleteImpedanceImage()}
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
                          e.target.files && handleImpedanceImageChange(e)
                        }
                        disabled={loading}
                        className="bg-white p-2 rounded-md"
                      />
                    }
                </div>
            </div>
          </div>  
        </div>



        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
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
                      src={value.url.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${value.url}` : value.url}
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
                        if(updatedImageCatalogues[index]){
                          updatedImageCatalogues[index].name = e.target.value;
                        }
                        setImgCataloguesUrl(updatedImageCatalogues);
                      }}
                      required
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

          <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
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
                        if(updatedDatasheet[index]) {
                          updatedDatasheet[index].name = e.target.value;
                        }
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
          <div className="md:grid md:grid-cols-3 gap-4 rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
            
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
                    <FormDescription className="text-white">
                      This product will appear on the homepage slideshow. To be displayed, add the backgorund image through the <b>Featured Products</b> menu. <Link href={'/images/admin/featured_prod_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline">Check placement</Link>
                    </FormDescription>
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
                    <FormDescription className="text-white">
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
                  <FormDescription className="text-white">
                      This will appear in hero section. <Link href={'/images/admin/single_prod_series_placement.png'} target="blank" className="text-[rgba(19,82,219,1)] hover:underline">Check placement</Link>
                    </FormDescription>
                  <FormControl>
                    <Input disabled={loading || !form.watch("isFeatured") } placeholder="What Series" {...field} className="bg-white text-black"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>         
          <Button disabled={loading} type="submit" variant={'default'} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors">
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};
