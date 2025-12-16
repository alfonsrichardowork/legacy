import { Suspense } from "react"
import GAListener from "../../components/GAListener"
import Script from "next/script"

export default function ProductLayout({
    children,
  }: {
    children: React.ReactNode
  }) {

    return(
        <>
            <div className="bg-white w-full items-end justify-start">
                {children}
            </div>
        </>
    )
}