import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { PublishingInquiryForm } from './components/forms/PublishingInquiryForm';
import { MarketingInquiryForm } from './components/forms/MarketingInquiryForm';
import { AdminInquiryForm } from './components/forms/AdminInquiryForm';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-8">Comprehensive Inquiry System</h1>
        
        <Tabs defaultValue="publishing" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="publishing" className="data-[state=active]:bg-[#14181F] data-[state=active]:text-white">
              Publishing Inquiry
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-[#14181F] data-[state=active]:text-white">
              Marketing Inquiry
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-[#14181F] data-[state=active]:text-white">
              Admin
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="publishing">
            <PublishingInquiryForm />
          </TabsContent>
          
          <TabsContent value="marketing">
            <MarketingInquiryForm />
          </TabsContent>

          <TabsContent value="admin">
            <AdminInquiryForm />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default App;