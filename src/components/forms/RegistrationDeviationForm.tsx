
import React from "react";
import { z } from "zod";
import DeviationFormBase from "./DeviationFormBase";
import DateField from "./DateField";
import SelectField from "./SelectField";

const registrationSchema = z.object({
  originalRegistrationDate: z.date({
    required_error: "Original registration date is required",
  }),
  proposedRegistrationDate: z.date({
    required_error: "Proposed registration date is required",
  }).refine(
    (date) => date > new Date(),
    "Proposed registration date must be in the future"
  ),
  reason: z.string({
    required_error: "Reason is required",
  }),
  description: z.string().optional(),
});

const defaultValues = {
  originalRegistrationDate: undefined,
  proposedRegistrationDate: undefined,
  reason: "",
  description: "",
};

const reasonOptions = [
  { value: "document_delay", label: "Document Delay" },
  { value: "bank_process_delay", label: "Bank Processing Delay" },
  { value: "customer_request", label: "Customer Request" },
  { value: "legal_issue", label: "Legal Issue" },
  { value: "technical_error", label: "Technical Error" },
  { value: "other", label: "Other" }
];

const RegistrationDeviationForm = () => {
  return (
    <DeviationFormBase
      schema={registrationSchema}
      defaultValues={defaultValues}
      deviationType="registration"
    >
      <div className="space-y-6">
        <div className="p-4 bg-blue-50 rounded-md mb-6">
          <h3 className="font-medium text-blue-800 mb-2">Registration Deviation</h3>
          <p className="text-sm text-blue-700">
            Use this form to request changes to the scheduled registration date.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateField name="originalRegistrationDate" label="Original Registration Date" />
          <DateField name="proposedRegistrationDate" label="Proposed Registration Date" />
        </div>
        
        <SelectField 
          name="reason" 
          label="Reason for Deviation" 
          options={reasonOptions}
          placeholder="Select reason"
        />
        
        <div className="space-y-2">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Additional Notes
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            placeholder="Provide any additional details about this request"
          />
        </div>
      </div>
    </DeviationFormBase>
  );
};

export default RegistrationDeviationForm;
