
import React from "react";
import { z } from "zod";
import DeviationFormBase from "./DeviationFormBase";
import CommonDeviationFields from "./CommonDeviationFields";
import DateField from "./DateField";

const registrationSchema = z.object({
  customerName: z.string().min(1, "Customer name is required"),
  unitNumber: z.string().min(1, "Unit number is required"),
  bookingDate: z.date({
    required_error: "Booking date is required",
  }),
  originalRegistrationDate: z.date({
    required_error: "Original registration date is required",
  }),
  proposedRegistrationDate: z.date({
    required_error: "Proposed registration date is required",
  }).refine(
    (date) => date > new Date(),
    "Proposed registration date must be in the future"
  ),
  description: z.string().optional(),
});

const defaultValues = {
  customerName: "",
  unitNumber: "",
  bookingDate: undefined,
  originalRegistrationDate: undefined,
  proposedRegistrationDate: undefined,
  description: "",
};

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

        <CommonDeviationFields />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <DateField name="bookingDate" label="Booking Date" />
          <DateField name="originalRegistrationDate" label="Original Registration Date" />
          <DateField name="proposedRegistrationDate" label="Proposed Registration Date" />
        </div>
      </div>
    </DeviationFormBase>
  );
};

export default RegistrationDeviationForm;
