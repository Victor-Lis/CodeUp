import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Input } from "../ui/input";

type InputTextProps = {
  control: any;
  name: string;
};

export default function InputText({ control, name }: InputTextProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={() => (
        <FormItem>
          <FormControl>
            <Input type="text" />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
