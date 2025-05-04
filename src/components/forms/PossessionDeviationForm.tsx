
import React from "react";
import { z } from "zod";
import DeviationFormBase from "./DeviationFormBase";
import DateField from "./DateField";
import SelectField from "./SelectField";

const possessionSchema = z.object({
  originalPossessionDate: z.date({
    required_error: "Original possession date is required",
  }),
  requestedPossessionDate: z.date({
    required_error: "Requested possession date is required",
  }),
  reason: z.string({
    required_error: "Reason is required",
  }),
  description: z.string().optional(),
});

const defaultValues = {
  originalPossessionDate: undefined,
  requestedPossessionDate: undefined,
  reason: "",
  description: "",
};

const reasonOptions = [
  { value: "construction_delay", label: "Construction Delay" },
  { value: "force_majeure", label: "Force Majeure" },
  { value: "regulatory_issues", label: "Regulatory Issues" },
  { value: "material_shortage", label: "Material Shortage" },
  { value: "weather_conditions", label: "Adverse Weather Conditions" },
  { value: "other", label: "Other" }
];

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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <DateField name="originalPossessionDate" label="Original Possession Date" />
          <DateField name="requestedPossessionDate" label="Requested Possession Date" />
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

export default PossessionDeviationForm;
