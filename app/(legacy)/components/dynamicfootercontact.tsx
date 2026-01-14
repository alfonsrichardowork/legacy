"use client"

import { contacts } from "@prisma/client";
import { Phone } from "lucide-react";
import { useEffect, useState } from "react";
import getAllContact from "../actions/get-all-contact";

export default function DynamicContactFooter() {
    const [loading, setLoading] = useState<boolean>(true)
    const [allContact, setAllContact] = useState<contacts[]>([])
     useEffect( () => {
        async function fetchData(){
            const contactData: contacts[] = await getAllContact();
            setAllContact(contactData)
            setLoading(false)
        }
        fetchData()
      }, []);
    return (
        !loading && allContact && allContact.length > 0 && allContact.map((val: contacts, idx: number) => 
            <div key={idx} className="py-0.5">
                <h4 className="text-xs text-white md:pb-1 font-light block md:text-left text-center">
                    {val.type}: {val.address}
                </h4>
                <h4 className="text-xs text-white md:pb-1 pb-2 font-light flex items-center gap-1 md:justify-start justify-center">
                    <Phone size={12} />: {val.phone.split('||').join(', ')}
                </h4>
            </div>
        )
    )
}