
import React, { useState } from "react";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import DeviationFormBase from "./DeviationFormBase";
import CommonDeviationFields from "./CommonDeviationFields";

const cancellationSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  unitNumber: z.string().min(1, "Unit number is required"),
  reasonForCancellation: z.string().min(1, "Reason for cancellation is required"),
  refundAmountAsPerPolicy: z.coerce.number().min(0, "Refund amount as per policy is required"),
  refundAmountRequested: z.coerce.number().min(0, "Refund amount requested is required"),
  supportingDocuments: z.array(z.string()).optional(),
  description: z.string().optional(),
});

const defaultValues = {
  customerName: "",
  unitNumber: "",
  reasonForCancellation: "",
  refundAmountAsPerPolicy: 0,
  refundAmountRequested: 0,
  supportingDocuments: [],
  description: "",
};

const CancellationDeviationForm = () => {
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([
    "medical_certificate.pdf",
    "bank_statement.pdf",
    "application_letter.pdf",
    "proof_of_address_change.pdf",
  ]);

  return (
    <DeviationFormBase
      schema={cancellationSchema}
      defaultValues={defaultValues}
      deviationType="cancellation"
    >
      <div className="space-y-6">
        <div className="p-4 bg-rose-50 rounded-md mb-6">
          <h3 className="font-medium text-rose-800 mb-2">Cancellation Deviation</h3>
          <p className="text-sm text-rose-700">
            Use this form to request booking cancellation and refund adjustment.
          </p>
        </div>

        <CommonDeviationFields />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            name="refundAmountAsPerPolicy"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refund Amount as Per Policy (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            name="refundAmountRequested"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Refund Amount Requested (₹)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" step="1" placeholder="0" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          name="reasonForCancellation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Reason for Cancellation</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select reason" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Medical emergency">Medical emergency</SelectItem>
                  <SelectItem value="Financial constraints">Financial constraints</SelectItem>
                  <SelectItem value="Relocation to another city">Relocation to another city</SelectItem>
                  <SelectItem value="Change in family plans">Change in family plans</SelectItem>
                  <SelectItem value="Dissatisfaction with property">Dissatisfaction with property</SelectItem>
                  <SelectItem value="Legal issues">Legal issues</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="supportingDocuments"
          render={({ field }) => (
            <FormItem>
              <div className="mb-4">
                <FormLabel>Supporting Documents</FormLabel>
                <p className="text-sm text-gray-500 mt-1">Select all applicable documents</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {selectedDocuments.map((document) => (
                  <div key={document} className="flex items-center space-x-2">
                    <Checkbox
                      id={document}
                      checked={field.value?.includes(document)}
                      onCheckedChange={(checked) => {
                        const updatedDocuments = checked
                          ? [...(field.value || []), document]
                          : (field.value || []).filter(
                              (doc: string) => doc !== document
                            );
                        field.onChange(updatedDocuments);
                      }}
                    />
                    <label
                      htmlFor={document}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {document}
                    </label>
                  </div>
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </DeviationFormBase>
  );
};

export default CancellationDeviationForm;
