
import React from "react";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import DeviationFormBase from "./DeviationFormBase";
import CommonDeviationFields from "./CommonDeviationFields";

const interestWaiverSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  unitNumber: z.string().min(1, "Unit number is required"),
  overdueAmount: z.coerce.number().min(1, "Overdue amount is required"),
  interestCharged: z.coerce.number().min(0, "Interest charged is required"),
  interestWaiverRequested: z.coerce.number().min(0, "Interest waiver amount is required"),
  reasonForDelay: z.string().min(1, "Reason for delay is required"),
  previousWaiverHistory: z.string().optional(),
  description: z.string().optional(),
}).refine((data) => data.interestWaiverRequested <= data.interestCharged, {
  message: "Waiver requested cannot exceed the interest charged",
  path: ["interestWaiverRequested"],
});

const defaultValues = {
  customerName: "",
  unitNumber: "",
  overdueAmount: 0,
  interestCharged: 0,
  interestWaiverRequested: 0,
  reasonForDelay: "",
  previousWaiverHistory: "None",
  description: "",
};

const InterestWaiverDeviationForm = () => {
  return (
    <DeviationFormBase
      schema={interestWaiverSchema}
      defaultValues={defaultValues}
      deviationType="interest_waiver"
    >
      <div className="space-y-6">
        <div className="p-4 bg-purple-50 rounded-md mb-6">
          <h3 className="font-medium text-purple-800 mb-2">Interest Waiver Deviation</h3>
          <p className="text-sm text-purple-700">
            Use this form to request a waiver on interest charges.
          </p>
        </div>

        <CommonDeviationFields />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            name="overdueAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Overdue Amount (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="interestCharged"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Charged (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="interestWaiverRequested"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Interest Waiver Requested (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="reasonForDelay"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Reason for Delay</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select reason" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Payment stuck due to technical error">Payment stuck due to technical error</SelectItem>
                    <SelectItem value="Delay from bank disbursement">Delay from bank disbursement</SelectItem>
                    <SelectItem value="COVID/medical emergency">COVID/medical emergency</SelectItem>
                    <SelectItem value="Financial hardship">Financial hardship</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="previousWaiverHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Previous Waiver History</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select history" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="None">None</SelectItem>
                    <SelectItem value="One time waiver granted last year">One time waiver granted last year</SelectItem>
                    <SelectItem value="Multiple waivers">Multiple waivers</SelectItem>
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

export default InterestWaiverDeviationForm;
