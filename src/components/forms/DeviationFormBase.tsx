
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { useDeviations } from "@/context/DeviationContext";
import { DeviationType } from "@/types";

export interface DeviationFormProps {
  children: React.ReactNode;
  schema: z.ZodType<any, any>;
  defaultValues: any;
  deviationType: DeviationType;
  onSuccess?: () => void;
}

const DeviationFormBase = ({ 
  children, 
  schema, 
  defaultValues, 
  deviationType,
  onSuccess 
}: DeviationFormProps) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { addRequest } = useDeviations();

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = (data: any) => {
    try {
      // Add common fields
      const commonData = {
        type: deviationType,
        customerName: data.customerName,
        unitNumber: data.unitNumber,
        createdBy: {
          id: "user1",
          name: "Rahul Mehta",
          role: "CRM Manager",
        },
        approvers: [],
      };

      // Add request with type-specific data
      const requestId = addRequest({
        ...commonData,
        ...data,
      });

      toast({
        title: "Request Created",
        description: `Your ${deviationType.replace('_', ' ')} deviation request has been submitted.`,
      });

      if (onSuccess) {
        onSuccess();
      } else {
        navigate("/requests");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error",
        description: "There was an error creating your request. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {children}
        
        <div className="flex justify-end space-x-4 pt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => navigate("/requests")}
          >
            Cancel
          </Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </Form>
  );
};

export default DeviationFormBase;
