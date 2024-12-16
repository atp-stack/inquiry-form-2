import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const formSchema = z.object({
  agentName: z.string().min(2, 'Agent name is required'),
  authorName: z.string().min(2, 'Author name is required'),
  bookTitle: z.string().min(2, 'Book title is required'),
  package: z.string().min(1, 'Please select a package'),
  concerns: z.array(z.string()).min(1, 'Select at least one concern'),
  followUp: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

const concerns = [
  { id: 'manuscript-review', label: 'Manuscript Review' },
  { id: 'cover-design', label: 'Cover Design' },
  { id: 'marketing-support', label: 'Marketing Support' },
  { id: 'editing', label: 'Editing' },
  { id: 'distribution', label: 'Distribution' },
  { id: 'others', label: 'Others' },
];

const packages = [
  { value: 'standard', label: 'Standard Package' },
  { value: 'premium', label: 'Premium Package' },
  { value: 'custom', label: 'Custom Package' },
];

export function PublishingInquiryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: '',
      authorName: '',
      bookTitle: '',
      package: '',
      concerns: [],
      followUp: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="agentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Agent Name</FormLabel>
                <FormControl>
                  <Input {...field} className="border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="authorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Author Name</FormLabel>
                <FormControl>
                  <Input {...field} className="border-gray-300" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="bookTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="package"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Package</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select a package" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {packages.map((pkg) => (
                    <SelectItem key={pkg.value} value={pkg.value}>
                      {pkg.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem>
          <FormLabel>Concerns</FormLabel>
          <div className="grid grid-cols-2 gap-4 mt-2">
            {concerns.map((item) => (
              <FormField
                key={item.id}
                control={form.control}
                name="concerns"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          const value = field.value || [];
                          if (checked) {
                            field.onChange([...value, item.id]);
                          } else {
                            field.onChange(value.filter((val) => val !== item.id));
                          }
                        }}
                      />
                    </FormControl>
                    <FormLabel className="font-normal">{item.label}</FormLabel>
                  </FormItem>
                )}
              />
            ))}
          </div>
        </FormItem>

        <FormField
          control={form.control}
          name="followUp"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Questions / Follow-up</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                  placeholder="Any additional questions or follow-up details"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="w-full bg-[#14181F] text-white py-3 rounded-md hover:bg-[#14181F]/90 transition-colors"
        >
          Submit Publishing Inquiry
        </button>
      </form>
    </Form>
  );
}