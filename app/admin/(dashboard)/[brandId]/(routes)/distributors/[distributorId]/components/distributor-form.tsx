"use client"

import * as z from "zod"
import axios from "axios"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { toast } from "react-hot-toast"
import { distributors } from "@prisma/client"
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
import { Calendar } from "@/components/ui/calendar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/app/admin/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/app/admin/components/ui/popover"
import { ChevronDownIcon } from "lucide-react"
import { GetCountries, GetState, GetCity } from "react-country-state-city";
import { City, Country, State } from "react-country-state-city/dist/esm/types"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/app/admin/components/ui/select"


const formSchema = z.object({
  name: z.string().min(1),
  contactPerson: z.string().optional(),
  phoneNumber: z.string().min(1),
  email: z.string().optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  joinDate: z.date(),
  active: z.boolean(),
});

type DistributorFormValues = z.infer<typeof formSchema>

interface DistributorFormProps {
  initialData: distributors | null;
};

export const DistributorForm: React.FC<DistributorFormProps> = ({
  initialData
}) => {

  const [country, setCountry] = useState<Country | null>(initialData && initialData.country ? JSON.parse(initialData.country) : null);
  const [currentState, setcurrentState] = useState<State | null>(initialData && initialData.state ? JSON.parse(initialData.state) : null);
  const [city, setCity] = useState<City | null>(initialData && initialData.city ? JSON.parse(initialData.city) : null);
  const [countriesList, setCountriesList] = useState<Country[]>([]);
  const [stateList, setStateList] = useState<State[]>([]);
  const [citiesList, setCitiesList] = useState<City[]>([]);

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
 
  const [loading, setLoading] = useState(false);

  const title = initialData ? 'Edit Distributor' : 'Add Distributor';
  const toastMessage = initialData ? 'Distributor updated.' : 'Distributor added.';
  const action = initialData ? 'Save changes' : 'Create';

  const defaultValues = initialData ? {
    ...initialData,
  } : {
    name: '',
    contactPerson: '',
    phoneNumber: '',
    email: '',
    country: '',
    state: '',
    city: '',
    joinDate: new Date(),
    active: false,
  }

  const form = useForm<DistributorFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues
  });
  const [date, setDate] = useState<Date | undefined>(initialData?.joinDate ?? new Date())
  const [open, setOpen] = useState(false)
  const [checkedActive, setCheckedActive] = useState<boolean| "indeterminate">(initialData?.active ?? false)

  const onSubmit = async (data: DistributorFormValues) => {
    try {
      setLoading(true);
      data.joinDate = date ?? new Date()
      data.active = checkedActive === true
      data.country = country ? JSON.stringify(country) : ""
      data.state = currentState ? JSON.stringify(currentState) : ""
      data.city = city ? JSON.stringify(city) : ""
      const API=`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}${process.env.NEXT_PUBLIC_ADMIN_UPDATE_ADD_DISTRIBUTOR}`;
      //@ts-ignore
      const API_EDITED = API.replace('{brandId}', params.brandId)
      //@ts-ignore
      const API_EDITED2 = API_EDITED.replace('{distributorId}', params.distributorId)
      const response = await axios.patch(API_EDITED2, data);
      
      if(response.data === 'duplicate'){
        toast.error("Duplicate Distributor")
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
        router.push(`${process.env.NEXT_PUBLIC_ADMIN_FOLDER_URL}/${params.brandId}/distributors`);
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
            <div className="rounded-lg p-4 gap-4 flex items-center w-full bg-background shadow-lg shadow-primary-foreground/30 border">
              <div className="w-full">
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Company Name
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Name" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="contactPerson"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Contact Person
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Contact Person" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Phone Number" {...field}/>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="joinDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Join Date
                        </FormLabel>
                        <FormControl>
                          <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                id="date"
                                className="w-48 justify-between font-normal"
                              >
                                {date ? date.toLocaleDateString() : "Select date"}
                                <ChevronDownIcon />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                              <Calendar
                                mode="single"
                                selected={date}
                                captionLayout="dropdown"
                                onSelect={(date) => {
                                  setDate(date)
                                  setOpen(false)
                                }}
                              />
                            </PopoverContent>
                          </Popover>
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
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Email
                        </FormLabel>
                        <FormControl>
                          <Input disabled={loading} placeholder="Email" {...field}/>
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
                <div className="py-2">
                  <FormField
                    control={form.control}
                    name="active"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-bold text-base flex gap-2">
                          Active?
                        </FormLabel>
                        <FormControl>
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="active"
                              defaultChecked={checkedActive}
                              onCheckedChange={setCheckedActive}
                            />
                            <Label htmlFor="active">Active</Label>
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

