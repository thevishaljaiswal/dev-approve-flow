
export type RequestStatus = "draft" | "pending" | "in_review" | "approved" | "rejected";

export type DeviationType = 
  | "registration" 
  | "possession" 
  | "interest_waiver" 
  | "cashback" 
  | "pre_emi" 
  | "cancellation";

export interface Approver {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  status?: "pending" | "approved" | "rejected";
  comments?: string;
  timestamp?: string;
}

export interface DeviationRequest {
  id: string;
  type: DeviationType;
  status: RequestStatus;
  createdAt: string;
  createdBy: {
    id: string;
    name: string;
    role: string;
    avatarUrl?: string;
  };
  updatedAt: string;
  approvers: Approver[];
  customerName: string;
  unitNumber: string;
  currentLevel: number;
  description?: string;
  
  // Registration specific fields
  bookingDate?: string;
  originalRegistrationDate?: string;
  proposedRegistrationDate?: string;
  
  // Possession specific fields
  originalPossessionDate?: string;
  requestedPossessionDate?: string;
  paymentDuesStatus?: string;
  
  // Interest Waiver specific fields
  overdueAmount?: number;
  interestCharged?: number;
  interestWaiverRequested?: number;
  reasonForDelay?: string;
  previousWaiverHistory?: string;
  
  // Cashback specific fields
  eligibleCashbackAmount?: number;
  requestedCashbackAmount?: number;
  proposedDate?: string;
  
  // Pre-EMI / Rental specific fields
  loanDisbursedDate?: string;
  emiStartDate?: string;
  paymentHistory?: string;
  issueInRepayment?: string;
  requestedSupport?: string;
  
  // Cancellation specific fields
  reasonForCancellation?: string;
  refundAmountAsPerPolicy?: number;
  refundAmountRequested?: number;
  supportingDocuments?: string[];
}
