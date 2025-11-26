"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { superior } from "@prisma/client"
import { useParams, useRouter } from "next/navigation"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/admin/components/ui/form"
import { Separator } from "@/components/ui/separator"
import { Heading } from "@/app/admin/components/ui/heading"
import Image from "next/image"
import { Trash } from "lucide-react"
import { uploadImage } from "@/app/admin/upload-image"


const formSchema = z.object({
  name: z.string().min(1),
  url: z.string().optional()
});

type SuperiorFormValues = z.infer<typeof formSchema>

interface SuperiorFormProps {
  initialData: superior | null;
};

export const SuperiorForm: React.FC<SuperiorFormProps> = ({
  initialData
}) => {
  const params = useParams();
  const router = useRouter();
 
  const [superiorImage, setSuperiorImage] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File>();
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Superiority' : 'Add Superiority';
  const toastMessage = initialData ? 'Superiority updated.' : 'Superiority added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    url: ''
  }

  useEffect(() => {
  const fetchData = async () => {
    if (initialData && initialData.url) {
      setSuperiorImage(initialData.url);
    }
    else{
      setSuperiorImage('')
    }
  };
  
  fetchData().catch((error) => {
    console.error("Error fetching superiority: ", error);
  });
  }, [params.superiorId, initialData, initialData?.url]);

  const deleteImage = async () => {
    setSuperiorImage('')
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file);
  };

  async function handleImageUpload (file: File): Promise<string> {
    if (file) {
      let updatedsuperiorImage = superiorImage;
      try {
        const formData = new FormData();
        formData.append('image', file);

        const url = await uploadImage(formData, 'other');
        updatedsuperiorImage = url
        return updatedsuperiorImage;
        } catch (error) {
        console.error("Error uploading superior image:", error);
        return '';
      }
    }
    return '';
  };


  const form = useForm<SuperiorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: SuperiorFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.url = await handleImageUpload(selectedFile);
      }
      else{
        data.url = superiorImage
      }

      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ADD_SUPERIOR}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      //@ts-ignore
      const API_EDITED2 = API_EDITED.replace('{superiorId}', params.superiorId)
      const response = await axios.patch(API_EDITED2, data);
           
      if(response.data === 'duplicate'){
        toast.error("Duplicate Superior")
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
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/superior`);
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
        <Heading title={title} description='' />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 bg-background shadow-lg shadow-primary-foreground/30 border">
                <div className="text-left font-bold pb-2">Cover Image</div>
                <div className="flex space-x-4 justify-between items-center">
                  {superiorImage && (
                    <Image alt={'Superiority Image'} src={superiorImage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${superiorImage}` : superiorImage} width={200} height={200} className="w-52 h-fit" priority/>
                  )}
                  {!superiorImage && (
                  <Input
                    id={`file`}
                    type="file"
                    accept="image/*"
                    name="file"
                    onChange={(e) =>
                      e.target.files && handleFileChange(e) // Ensure your file upload function can handle image files
                    }
                    required
                    disabled={loading}
                    className="border border-gray-300 p-2 rounded-md"
                  />
                  )}
                  {superiorImage && superiorImage !== '' && (
                  <Button
                    variant={"destructive"}
                    onClick={() => deleteImage()}
                  >
                    <Trash width={20} height={20} />
                  </Button>
                )}
                </div>
            </div>


            <div className="rounded-lg p-4 gap-4 flex items-center w-full bg-background shadow-lg shadow-primary-foreground/30 border">
              <div className="w-full">
                <div>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Name
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Judul" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          <Button disabled={loading} className="w-full flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors" type="submit" variant={'secondary'}>
            {action}
          </Button>
        </form>
      </Form>
    </>
  );
};

