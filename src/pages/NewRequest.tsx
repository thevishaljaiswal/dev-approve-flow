
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { DeviationType } from "@/types";
import RegistrationDeviationForm from "@/components/forms/RegistrationDeviationForm";
import PossessionDeviationForm from "@/components/forms/PossessionDeviationForm";
import InterestWaiverDeviationForm from "@/components/forms/InterestWaiverDeviationForm";
import CashbackDeviationForm from "@/components/forms/CashbackDeviationForm";
import PreEmiDeviationForm from "@/components/forms/PreEmiDeviationForm";
import CancellationDeviationForm from "@/components/forms/CancellationDeviationForm";

const NewRequest = () => {
  const [activeTab, setActiveTab] = useState<DeviationType>("registration");
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTabChange = (value: string) => {
    setActiveTab(value as DeviationType);
  };

  return (
    <div className="container max-w-4xl mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Create New Deviation Request</h1>
      
      <Card>
        <CardHeader>
          <CardTitle>Select Deviation Type</CardTitle>
          <CardDescription>
            Choose the type of deviation request you want to create
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-4">
            <TabsList className="flex flex-wrap gap-2 w-full">
              <TabsTrigger value="registration">Registration</TabsTrigger>
              <TabsTrigger value="possession">Possession</TabsTrigger>
              <TabsTrigger value="interest_waiver">Interest Waiver</TabsTrigger>
              <TabsTrigger value="cashback">Cashback</TabsTrigger>
              <TabsTrigger value="pre_emi">Pre-EMI/Rental</TabsTrigger>
              <TabsTrigger value="cancellation">Cancellation</TabsTrigger>
            </TabsList>
            
            <TabsContent value="registration">
              <RegistrationDeviationForm />
            </TabsContent>
            
            <TabsContent value="possession">
              <PossessionDeviationForm />
            </TabsContent>
            
            <TabsContent value="interest_waiver">
              <InterestWaiverDeviationForm />
            </TabsContent>
            
            <TabsContent value="cashback">
              <CashbackDeviationForm />
            </TabsContent>
            
            <TabsContent value="pre_emi">
              <PreEmiDeviationForm />
            </TabsContent>
            
            <TabsContent value="cancellation">
              <CancellationDeviationForm />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewRequest;
