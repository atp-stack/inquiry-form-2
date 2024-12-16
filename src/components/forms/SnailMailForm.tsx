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

const formSchema = z.object({
  authorName: z.string().min(2, 'Author name is required'),
  address: z.string().min(5, 'Address is required'),
  phoneNumber: z.string().min(10, 'Valid phone number is required'),
  email: z.string().email('Valid email is required'),
  preferredCommunicationMethod: z.enum(['email', 'phone', 'mail']),
  preferredContactTime: z.string().min(1, 'Preferred contact time is required'),
});

type FormValues = z.infer<typeof formSchema>;

export function SnailMailForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      authorName: '',
      address: '',
      phoneNumber: '',
      email: '',
      preferredCommunicationMethod: 'email',
      preferredContactTime: '',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="authorName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Similar fields as AdvanceContractForm plus additional fields */}
        <FormField
          control={form.control}
          name="preferredContactTime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Preferred Contact Time</FormLabel>
              <FormControl>
                <Input {...field} type="time" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}