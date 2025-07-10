import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { Textarea } from "../ui/textarea";

type InputTextProps = {
  control: any;
  name: string;
  label: string;
};

export default function InputTextArea({ control, name, label }: InputTextProps) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && (
            <label className="block mb-1 font-medium capitalize" htmlFor={name}>
              {label}
            </label>
          )}
          <FormControl>
            <Textarea
              id={name}
              placeholder="Ex: [1, 2, 3]"
              className="font-mono min-h-[100px]"
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
