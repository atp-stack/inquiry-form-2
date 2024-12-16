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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formSchema = z.object({
  leadSource: z.string().min(2, 'Lead source is required'),
  leadDetails: z.string().min(10, 'Lead details are required'),
  assignedTo: z.string().min(2, 'Please select an agent'),
  priorityLevel: z.enum(['high', 'medium', 'low']),
  reassignment: z.object({
    newAssignee: z.string().optional(),
    reason: z.enum(['performance', 'workload', 'expertise', 'other']).optional(),
    explanation: z.string().optional(),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;

const agents = [
  { value: 'agent1', label: 'John Doe' },
  { value: 'agent2', label: 'Jane Smith' },
  { value: 'agent3', label: 'Mike Johnson' },
];

const reassignmentReasons = [
  { value: 'performance', label: 'Performance Concerns' },
  { value: 'workload', label: 'Workload Distribution' },
  { value: 'expertise', label: 'Specialized Expertise Required' },
  { value: 'other', label: 'Other' },
];

export function AdminInquiryForm() {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      leadSource: '',
      leadDetails: '',
      assignedTo: '',
      priorityLevel: 'medium',
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    if (data.reassignment) {
      // Generate email template for reassignment
      const emailSubject = `Lead Re-assignment Request - ${data.leadSource}`;
      const emailBody = `
Dear ${data.assignedTo},

Lead Re-assignment Notification

Current Lead Details:
* Lead Source: ${data.leadSource}
* Original Assigned Date: ${new Date().toLocaleDateString()}
* Current Assignee: ${data.assignedTo}

Re-assignment Information:
* Proposed New Assignee: ${data.reassignment.newAssignee}
* Reason for Re-assignment: ${data.reassignment.reason}

Detailed Explanation:
${data.reassignment.explanation}

Next Steps:
1. Review the re-assignment request
2. Provide any additional context about the lead
3. Confirm receipt of this re-assignment notification

Best regards,
[Your Name]
[Your Department]
[Contact Information]
      `;

      // Open default email client
      window.location.href = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="leadSource"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Source</FormLabel>
              <FormControl>
                <Input {...field} className="border-gray-300" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="leadDetails"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Lead Details</FormLabel>
              <FormControl>
                <textarea
                  {...field}
                  className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="assignedTo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Assigned To</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="border-gray-300">
                    <SelectValue placeholder="Select an agent" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {agents.map((agent) => (
                    <SelectItem key={agent.value} value={agent.value}>
                      {agent.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="priorityLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Priority Level</FormLabel>
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

        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Lead Re-assignment</h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="reassignment.newAssignee"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>New Assignee</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select new assignee" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {agents.map((agent) => (
                        <SelectItem key={agent.value} value={agent.value}>
                          {agent.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reassignment.reason"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Reason for Re-assignment</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="border-gray-300">
                        <SelectValue placeholder="Select reason" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {reassignmentReasons.map((reason) => (
                        <SelectItem key={reason.value} value={reason.value}>
                          {reason.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="reassignment.explanation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detailed Explanation</FormLabel>
                  <FormControl>
                    <textarea
                      {...field}
                      className="w-full p-2 border border-gray-300 rounded-md min-h-[100px]"
                      placeholder="Provide detailed explanation for the re-assignment"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#14181F] text-white py-3 rounded-md hover:bg-[#14181F]/90 transition-colors"
        >
          Submit Admin Inquiry
        </button>
      </form>
    </Form>
  );
}