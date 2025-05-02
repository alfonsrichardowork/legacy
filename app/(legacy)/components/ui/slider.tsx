"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

interface SliderProps extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  onValueChange?: (value: number[]) => void;
  opensheetvalmin?: number;
  opensheetvalmax?: number;
  resetclicked?: string;
  unit?: string;
}

const Slider = React.forwardRef<React.ElementRef<typeof SliderPrimitive.Root>, SliderProps>(
  ({ className, onValueChange, opensheetvalmin = 0, opensheetvalmax = 0, resetclicked, unit, ...props }, ref) => {
    
    const [sliderValue, setSliderValue] = React.useState<number[]>([props.min!, props.max!]);
    const [minVal, setMinVal] = React.useState<number>(props.value ? props.value[props.min!] : 0);
    const [maxVal, setMaxVal] = React.useState<number>(props.value ? props.value[props.max!] : 0);

    React.useEffect(() => {
      if (props.value) {
        setSliderValue([props.min!, props.max!]);
        setMinVal(props.value[props.min!]);
        setMaxVal(props.value[props.max!]);
      }
    }, [props.value, props.min, props.max]); // Runs when props change

    React.useEffect(() => {
      if (resetclicked === "true" && props.value) {
        setSliderValue([0, props.value.length - 1]);
        setMinVal(props.value[0]);
        setMaxVal(props.value[props.value.length - 1]);
      }
    }, [resetclicked, props.value]);

    const handleValueChange = (value: number[]) => {
      setSliderValue(value);
      setMinVal(props.value ? props.value[value[0]] : 0);
      setMaxVal(props.value ? props.value[value[1]] : 0);

      if (onValueChange) {
        onValueChange(value);
      }
    };

    return (
      <>
        <SliderPrimitive.Root
          ref={ref}
          className={cn("relative flex w-full touch-none select-none items-center", className)}
          {...props}
          value={sliderValue}
          onValueChange={handleValueChange}
        >
          <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-slate-300">
            <SliderPrimitive.Range className="absolute h-full bg-foreground" />
          </SliderPrimitive.Track>
          {sliderValue.map((_, index) => (
            <React.Fragment key={index}>
              <SliderPrimitive.Thumb className="block h-4 w-4 rounded-full bg-[rgba(19,82,219,1)] ring-offset-background transition-colors hover:shadow-lg hover:cursor-pointer" />
            </React.Fragment>
          ))}
        </SliderPrimitive.Root>
        <div className="w-full text-center text-sm text-black">
          {minVal} {unit} - {maxVal} {unit}
        </div>
      </>
    );
  }
);

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
