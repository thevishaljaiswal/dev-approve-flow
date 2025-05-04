
import React from "react";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import DeviationFormBase from "./DeviationFormBase";
import DateField from "./DateField";

const preEmiSchema = z.object({
  loanDisbursedDate: z.date({
    required_error: "Loan disbursed date is required",
  }),
  emiStartDate: z.date({
    required_error: "EMI start date is required",
  }),
  paymentHistory: z.string({
    required_error: "Payment history is required",
  }),
  issueInRepayment: z.string().min(1, "Issue in repayment is required"),
  requestedSupport: z.string().min(1, "Requested support is required"),
  description: z.string().optional(),
});

const defaultValues = {
  loanDisbursedDate: undefined,
  emiStartDate: undefined,
  paymentHistory: "",
  issueInRepayment: "",
  requestedSupport: "",
  description: "",
};

const PreEmiDeviationForm = () => {
  return (
    <DeviationFormBase
      schema={preEmiSchema}
      defaultValues={defaultValues}
      deviationType="pre_emi"
    >
      <div className="space-y-6">
        <div className="p-4 bg-cyan-50 rounded-md mb-6">
          <h3 className="font-medium text-cyan-800 mb-2">Pre-EMI/Rental Deviation</h3>
          <p className="text-sm text-cyan-700">
            Use this form to request changes or support related to EMI or rental payments.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateField name="loanDisbursedDate" label="Loan Disbursed Date" />
          <DateField name="emiStartDate" label="EMI Start Date" />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <FormField
            name="paymentHistory"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Payment History</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment history" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Regular">Regular</SelectItem>
                    <SelectItem value="Irregular">Irregular</SelectItem>
                    <SelectItem value="First missed payment">First missed payment</SelectItem>
                    <SelectItem value="Multiple missed payments">Multiple missed payments</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="issueInRepayment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue in Repayment</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select issue" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Delay in project handover">Delay in project handover</SelectItem>
                    <SelectItem value="Missed documentation">Missed documentation</SelectItem>
                    <SelectItem value="Bank disbursement mismatch">Bank disbursement mismatch</SelectItem>
                    <SelectItem value="Financial hardship">Financial hardship</SelectItem>
                    <SelectItem value="Medical emergency">Medical emergency</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            name="requestedSupport"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Requested Support</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select requested support" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="EMI holiday for 3 months">EMI holiday for 3 months</SelectItem>
                    <SelectItem value="Reduce EMI amount">Reduce EMI amount</SelectItem>
                    <SelectItem value="Restructure loan">Restructure loan</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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

export default PreEmiDeviationForm;
