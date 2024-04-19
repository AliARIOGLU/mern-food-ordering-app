import { ControllerRenderProps, FieldValues } from "react-hook-form";

import { FormItem, FormControl, FormLabel } from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";

type CuisineCheckboxProps = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

export const CuisineCheckbox = ({ cuisine, field }: CuisineCheckboxProps) => {
  const onCheckChangeHandle = (checked: string | boolean) => {
    if (checked) {
      field.onChange([...field.value, cuisine]);
    } else {
      field.onChange(field.value.filter((val: string) => val !== cuisine));
    }
  };

  return (
    <FormItem className="flex flex-row items-center space-x-1 space-y-0 mt-2 hover:cursor-pointer">
      <FormControl>
        <Checkbox
          className="bg-white"
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => onCheckChangeHandle(checked)}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal hover:cursor-pointer">
        {cuisine}
      </FormLabel>
    </FormItem>
  );
};
