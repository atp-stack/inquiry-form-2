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
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  agentName: z.string().min(2, 'Agent name is required'),
  authorName: z.string().min(2, 'Author name is required'),
  bookTitle: z.string().min(2, 'Book title is required'),
  service: z.string().min(2, 'Service is required'),
  requestType: z.enum(['book-launch', 'social-media', 'press-release', 'book-signing', 'media-outreach', 'others']),
  priority: z.enum(['high', 'medium', 'low']),
  priorityReason: z.string().min(10, 'Please provide a reason for the priority'),
});

type FormValues = z.infer<typeof formSchema>;

const requestTypes = [
  { value: 'book-launch', label: 'Book Launch' },
  { value: 'social-media', label: 'Social Media Campaign' },
  { value: 'press-release', label: 'Press Release' },
  { value: 'book-signing', label: 'Book Signing' },
  { value: 'media-outreach', label: 'Media Outreach' },
  { value: 'others', label: 'Others' },
];

export function MarketingInquiryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      agentName: '',
      authorName: '',
      bookTitle: '',
      service: '',
      requestType: 'book-launch',
      priority: 'medium',
      priorityReason: '',
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
          name="service"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Service</FormLabel>
              <FormControl>
                <Input {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="requestType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Request Type</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-2 gap-4"
                >
                  {requestTypes.map((type) => (
                    <FormItem key={type.value} className="flex items-center space-x-3 space-y-0">
                      <FormControl>
                        <RadioGroupItem value={type.value} />
                      </FormControl>
                      <FormLabel className="font-normal">{type.label}</FormLabel>
                    </FormItem>
                  ))}
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priority"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex space-x-4"
                >
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="high" />
                    </FormControl>
                    <FormLabel className="font-normal">High</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="medium" />
                    </FormControl>
                    <FormLabel className="font-normal">Medium</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2">
                    <FormControl>
                      <RadioGroupItem value="low" />
                    </FormControl>
                    <FormLabel className="font-normal">Low</FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priorityReason"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Priority</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                  placeholder="Please explain the reason for the selected priority level"
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
          Submit Marketing Inquiry
        </button>
      </form>
    </Form>
  );
}