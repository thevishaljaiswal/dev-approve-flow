
import React from "react";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeviationFormBase from "./DeviationFormBase";
import CommonDeviationFields from "./CommonDeviationFields";
import DateField from "./DateField";

const possessionSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  unitNumber: z.string().min(1, "Unit number is required"),
  originalPossessionDate: z.date({
    required_error: "Original possession date is required",
  }),
  requestedPossessionDate: z.date({
    required_error: "Requested possession date is required",
  }),
  paymentDuesStatus: z.string({
    required_error: "Payment dues status is required",
  }),
  description: z.string().optional(),
});

const defaultValues = {
  customerName: "",
  unitNumber: "",
  originalPossessionDate: undefined,
  requestedPossessionDate: undefined,
  paymentDuesStatus: "",
  description: "",
};

const PossessionDeviationForm = () => {
  return (
    <DeviationFormBase
      schema={possessionSchema}
      defaultValues={defaultValues}
      deviationType="possession"
    >
      <div className="space-y-6">
        <div className="p-4 bg-green-50 rounded-md mb-6">
          <h3 className="font-medium text-green-800 mb-2">Possession Deviation</h3>
          <p className="text-sm text-green-700">
            Use this form to request changes to the agreed possession date.
          </p>
        </div>

        <CommonDeviationFields />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DateField name="originalPossessionDate" label="Original Possession Date" />
          <DateField name="requestedPossessionDate" label="Requested Possession Date" />
          
          <FormField
            name="paymentDuesStatus"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment Dues Status</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Fully Paid">Fully Paid</SelectItem>
                    <SelectItem value="90% Paid">90% Paid</SelectItem>
                    <SelectItem value="75% Paid">75% Paid</SelectItem>
                    <SelectItem value="50% Paid">50% Paid</SelectItem>
                    <SelectItem value="Less than 50% Paid">Less than 50% Paid</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </DeviationFormBase>
  );
};

export default PossessionDeviationForm;
