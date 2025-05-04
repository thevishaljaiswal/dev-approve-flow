
import React from "react";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import DeviationFormBase from "./DeviationFormBase";
import DateField from "./DateField";

const cashbackSchema = z.object({
  eligibleCashbackAmount: z.coerce.number().min(0, "Eligible cashback amount is required"),
  requestedCashbackAmount: z.coerce.number().min(0, "Requested cashback amount is required"),
  proposedDate: z.date({
    required_error: "Proposed date is required",
  }).refine((date) => date > new Date(), "Proposed date must be in the future"),
  description: z.string().optional(),
});

const defaultValues = {
  eligibleCashbackAmount: 0,
  requestedCashbackAmount: 0,
  proposedDate: undefined,
  description: "",
};

const CashbackDeviationForm = () => {
  return (
    <DeviationFormBase
      schema={cashbackSchema}
      defaultValues={defaultValues}
      deviationType="cashback"
    >
      <div className="space-y-6">
        <div className="p-4 bg-amber-50 rounded-md mb-6">
          <h3 className="font-medium text-amber-800 mb-2">Cashback Deviation</h3>
          <p className="text-sm text-amber-700">
            Use this form to request additional cashback beyond the eligible amount.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            name="eligibleCashbackAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Eligible Cashback Amount (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="requestedCashbackAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requested Cashback Amount (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <DateField name="proposedDate" label="Proposed Cashback Date" />
        </div>
        
        <FormField
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Additional Notes</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Provide any additional details about this request"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </DeviationFormBase>
  );
};

export default CashbackDeviationForm;
