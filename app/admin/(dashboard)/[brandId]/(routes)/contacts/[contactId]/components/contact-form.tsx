"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { contacts, distributors } from "@prisma/client"
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
import { ChevronDownIcon, CirclePlus, Trash } from "lucide-react"
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { City, Country, State } from "react-country-state-city/dist/esm/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/admin/components/ui/select"
import { uploadImage } from "@/app/admin/upload-image"
import Image from "next/image"
import Link from "next/link"


const formSchema = z.object({
  type: z.string().min(1),
  locationUrl: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  address: z.string().optional(),
  img: z.string().optional(),
  phone: z.string().optional()
});

type ContactFormValues = z.infer<typeof formSchema>

interface ContactFormProps {
  initialData: contacts | null;
};

export const ContactForm: React.FC<ContactFormProps> = ({
  initialData
}) => {

  const [country, setCountry] = useState<Country | null>(initialData && initialData.country ? JSON.parse(initialData.country) : null);
  const [currentState, setcurrentState] = useState<State | null>(initialData && initialData.state ? JSON.parse(initialData.state) : null);
  const [city, setCity] = useState<City | null>(initialData && initialData.city ? JSON.parse(initialData.city) : null);
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [stateList, setStateList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);
  const [allPhone, setAllPhone] = useState<string[]>([])
  useEffect(() => {
    GetCountries().then((result) => {
      setCountriesList(result);
    });
  }, []);
  useEffect(() => {
    if (country)
      GetState(parseInt(country.id.toString())).then((result) => {
        setStateList(result);
      });
  }, [country]);
  useEffect(() => {
    if (country && currentState)
      GetCity(parseInt(country.id.toString()), parseInt(currentState.id.toString())).then((result) => {
        setCitiesList(result);
      });
  }, [country, currentState]);

  const params = useParams();
  const router = useRouter();
  const [contactImage, setContactImage] = useState<string>()
  const [selectedFile, setSelectedFile] = useState<File>();
 
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Contact' : 'Add Contact';
  const toastMessage = initialData ? 'Contact updated.' : 'Contact added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    type: '',
    locationUrl: '',
    country: '',
    state: '',
    city: '',
    address: '',
    img: '',
    phone: '',
  }
  

  useEffect(() => {
    const fetchData = async () => {
      if (initialData && initialData.img) {
        setContactImage(initialData.img);
      }
      else{
        setContactImage('')
      }
      if(initialData && initialData.phone.split('||').length > 0) {
        setAllPhone(initialData.phone.split('||'))
      }
    };
    fetchData().catch((error) => {
        console.error("Error fetching about us: ", error);
      });
  }, [params.brandId, initialData, initialData?.img]);
    
      const deleteImage = async () => {
        setContactImage('')
      };
    
      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        setSelectedFile(file);
      };
    
    async function handleImageUpload (file: File): Promise<string> {
      if (file) {
        let updatedAboutUsImage = contactImage;
        try {
          const formData = new FormData();
          formData.append('image', file);
  
          const url = await uploadImage(formData, 'other');
          updatedAboutUsImage = url
          return updatedAboutUsImage;
          } catch (error) {
          console.error("Error uploading about us image:", error);
          return '';
        }
      }
      return '';
    };

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setLoading(true);

      if (selectedFile) {
        data.img = await handleImageUpload(selectedFile);
      }
      else{
        data.img = contactImage
      }

      if(allPhone.length > 0) {
        data.phone = allPhone.filter(val => val !== "").join("||");
      }
      else{
        data.phone = ''
      }

      data.country = country ? JSON.stringify(country) : ""
      data.state = currentState ? JSON.stringify(currentState) : ""
      data.city = city ? JSON.stringify(city) : ""
      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ADD_CONTACT}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      //@ts-ignore
      const API_EDITED2 = API_EDITED.replace('{contactId}', params.contactId)
      const response = await axios.patch(API_EDITED2, data);
      
      if(response.data === 'duplicate'){
        toast.error("Duplicate Contact")
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
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/contacts`);
        router.refresh();
        toast.success(toastMessage);
      }
    } catch (error: any) {
      toast.error('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  function removeRowFromGroup(rowIndex: number) {
    setAllPhone(prev => prev.filter((_, idx) => idx !== rowIndex));
  }

  function updateRow(
    rowIndex: number,
    value: string
  ) {
    setAllPhone((prev) =>
      prev.map((g, idx) =>
        idx === rowIndex
          ? value
          : g,
      )
    )
  }

  function addRowToGroup() {
    setAllPhone([...allPhone, ''])
  }

  return (  
    <>
      <div className="flex items-center justify-between">
        <Heading title={title} description='' />
      </div>
      <Separator />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-lg p-4 gap-4 flex items-center w-full bg-background shadow-lg shadow-primary-foreground/30 border">
              <div className="w-full">
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="type"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Type
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Type" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <div className="text-left font-bold pb-2">Contact Image Location</div>
                    <div className="flex space-x-4 justify-between items-center">
                      {contactImage && (
                        <Image alt={'About Us Image'} src={contactImage.startsWith('/uploads/') ? `${process.env.NEXT_PUBLIC_ROOT_URL}${contactImage}` : contactImage} width={200} height={200} className="w-52 h-fit" priority/>
                      )}
                      {!contactImage && (
                      <Input
                        id={`file`}
                        type="file"
                        accept="image/*"
                        name="file"
                        onChange={(e) =>
                          e.target.files && handleFileChange(e) // Ensure your file upload function can handle image files
                        }
                        // required
                        disabled={loading}
                        className="border border-gray-300 p-2 rounded-md"
                      />
                      )}
                      {contactImage && contactImage !== '' && (
                      <Button
                        variant={"destructive"}
                        onClick={() => deleteImage()}
                      >
                        <Trash width={20} height={20} />
                      </Button>
                    )}
                    </div>
                </div>
                 <div className="py-2">
                  <FormField
                    control={form.control}
                    name="locationUrl"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Location Url
                        </FormLabel>
                        <div className="text-sm font-bold">Steps:</div>
                        <div className="text-sm">
                          <div className="flex gap-1">1.Open <Link href={`https://www.google.com/maps`} target="_blank" className="underline hover:text-[rgba(19,82,219,1)]/80 text-[rgba(19,82,219,1)]">Google Map</Link></div>
                          <div>2.Input the location name</div>
                          <div>3.Klik Share</div>
                          <div>4.embed a map</div>
                          <div>5.COPY HTML</div>
                        </div>
                        <FormControl>
                          <Input disabled={loading} placeholder="Url" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
            <div className="rounded-lg p-4 gap-4 flex items-center w-full bg-background shadow-lg shadow-primary-foreground/30 border">
              <div className="w-full">   
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="address"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Address
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Address" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2 justify-between items-center">
                          <div>
                            Phone Number
                          </div>
                          <div className="flex items-center justify-start">
                            <div
                              onClick={() => addRowToGroup()}
                              className="flex gap-2 bg-green-500 text-white hover:bg-green-600 transition-colors p-2 rounded-lg hover:cursor-pointer justify-center items-center"
                            >
                              <CirclePlus width={20} height={20} />
                            </div>
                          </div>
                        </FormLabel>
                        <FormControl>
                          <div className="space-y-2 border-2 rounded-md p-2">

                            {allPhone.map((row, rowIndex) => 
                                <div key={rowIndex}>
                                  <div className="grid gap-3 grid-cols-6">
                                    <div className="grid gap-2 col-span-5">
                                      <Input
                                        id={`value-${rowIndex}`}
                                        value={row}
                                        onChange={(e) => updateRow(rowIndex, e.target.value)}
                                        placeholder={`Phone Number ${rowIndex+1}`}
                                        className="h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                                      />
                                    </div>
                                    <div className="grid gap-2 col-span-1">
                                      <div
                                        onClick={() => removeRowFromGroup(rowIndex)}
                                        aria-label={`Remove phone number ${rowIndex + 1}`}
                                        className="bg-red-500 rounded-xl p-2 hover:cursor-pointer hover:bg-red-400 text-white flex items-center justify-center duration-150 transition ease-in-out"
                                      >
                                        <Trash width={20} height={20} />
                                      </div>
                                    </div>
                                  </div>


                                  
                                </div>
                              )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>




                

                







                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Country
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Select                              
                              onValueChange={(value) => {
                                const parsed = JSON.parse(value);
                                setCountry(parsed);
                                field.onChange(parsed.name);
                                setcurrentState(null)
                                setCity(null)
                              }}
                              value={country ? JSON.stringify(country) : ""}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a Country"/>
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px] overflow-y-auto">
                              <SelectGroup>
                                {countriesList.map((_country) => (
                                <SelectItem key={_country.id} value={JSON.stringify(_country)}>
                                  {_country.name}
                                </SelectItem>
                              ))}
                              </SelectGroup>
                            </SelectContent>
                              
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="state"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          State
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Select
                              onValueChange={(value) => {
                                const parsed = JSON.parse(value);
                                setcurrentState(parsed);
                                field.onChange(parsed.name);
                                setCity(null)
                              }}
                              value={currentState ? JSON.stringify(currentState) : ""}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a State"/>
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px] overflow-y-auto">
                              <SelectGroup>
                                {stateList.map((_state) => (
                                <SelectItem key={_state.id} value={JSON.stringify(_state)}>
                                  {_state.name}
                                </SelectItem>
                              ))}
                              </SelectGroup>
                            </SelectContent>
                              
                            </Select>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="city"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          City
                        </FormLabel>
                        <FormControl>
                          <div>
                            <Select      
                              onValueChange={(value) => {
                                const parsed = JSON.parse(value);
                                setCity(parsed);
                                field.onChange(parsed.name);
                              }}
                              value={city ? JSON.stringify(city) : ""}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select a City"/>
                              </SelectTrigger>
                              <SelectContent className="max-h-[300px] overflow-y-auto">
                              <SelectGroup>
                                {citiesList.map((_city) => (
                                <SelectItem key={_city.id} value={JSON.stringify(_city)}>
                                  {_city.name}
                                </SelectItem>
                              ))}
                              </SelectGroup>
                            </SelectContent>
                              
                            </Select>
                          </div>
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

