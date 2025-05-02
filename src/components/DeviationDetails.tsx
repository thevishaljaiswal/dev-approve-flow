
import { DeviationRequest } from "@/types";
import { Badge } from "@/components/ui/badge";

interface DeviationDetailsProps {
  request: DeviationRequest;
}

const DeviationDetails = ({ request }: DeviationDetailsProps) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (value: number | undefined) => {
    if (value === undefined) return "N/A";
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Customer</h3>
          <p className="font-medium">{request.customerName}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Unit Number</h3>
          <p className="font-medium">{request.unitNumber}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Request ID</h3>
          <p className="font-medium">{request.id}</p>
        </div>
        <div>
          <h3 className="text-sm font-medium text-muted-foreground">Created At</h3>
          <p className="font-medium">{formatDate(request.createdAt)}</p>
        </div>
      </div>

      <div>
        <h3 className="text-sm font-medium text-muted-foreground">Description</h3>
        <p className="font-medium">{request.description}</p>
      </div>
      
      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Deviation Specific Details</h3>
        <div className="grid grid-cols-2 gap-4">
          {request.type === "registration" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Booking Date</h4>
                <p className="font-medium">{formatDate(request.bookingDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Original Registration Date</h4>
                <p className="font-medium">{formatDate(request.originalRegistrationDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Proposed Registration Date</h4>
                <p className="font-medium">{formatDate(request.proposedRegistrationDate || "")}</p>
              </div>
            </>
          )}

          {request.type === "possession" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Original Possession Date</h4>
                <p className="font-medium">{formatDate(request.originalPossessionDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Requested Possession Date</h4>
                <p className="font-medium">{formatDate(request.requestedPossessionDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Payment Dues Status</h4>
                <p className="font-medium">{request.paymentDuesStatus || "N/A"}</p>
              </div>
            </>
          )}

          {request.type === "interest_waiver" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Overdue Amount</h4>
                <p className="font-medium">{formatCurrency(request.overdueAmount)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Interest Charged</h4>
                <p className="font-medium">{formatCurrency(request.interestCharged)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Interest Waiver Requested</h4>
                <p className="font-medium">{formatCurrency(request.interestWaiverRequested)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Reason For Delay</h4>
                <p className="font-medium">{request.reasonForDelay || "N/A"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Previous Waiver History</h4>
                <p className="font-medium">{request.previousWaiverHistory || "N/A"}</p>
              </div>
            </>
          )}

          {request.type === "cashback" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Eligible Cashback</h4>
                <p className="font-medium">{formatCurrency(request.eligibleCashbackAmount)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Requested Cashback</h4>
                <p className="font-medium">{formatCurrency(request.requestedCashbackAmount)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Proposed Date</h4>
                <p className="font-medium">{formatDate(request.proposedDate || "")}</p>
              </div>
            </>
          )}

          {request.type === "pre_emi" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Loan Disbursed Date</h4>
                <p className="font-medium">{formatDate(request.loanDisbursedDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">EMI Start Date</h4>
                <p className="font-medium">{formatDate(request.emiStartDate || "")}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Payment History</h4>
                <p className="font-medium">{request.paymentHistory || "N/A"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Issue In Repayment</h4>
                <p className="font-medium">{request.issueInRepayment || "N/A"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Requested Support</h4>
                <p className="font-medium">{request.requestedSupport || "N/A"}</p>
              </div>
            </>
          )}

          {request.type === "cancellation" && (
            <>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Reason For Cancellation</h4>
                <p className="font-medium">{request.reasonForCancellation || "N/A"}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Refund As Per Policy</h4>
                <p className="font-medium">{formatCurrency(request.refundAmountAsPerPolicy)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Requested Refund</h4>
                <p className="font-medium">{formatCurrency(request.refundAmountRequested)}</p>
              </div>
            </>
          )}
        </div>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-medium mb-3">Approval Status</h3>
        <div className="space-y-3">
          {request.approvers.map((approver, index) => (
            <div key={approver.id} className="flex items-center justify-between">
              <div>
                <p className="font-medium">{approver.name}</p>
                <p className="text-sm text-muted-foreground">{approver.role}</p>
              </div>
              <div>
                <Badge className={
                  approver.status === "approved" ? "bg-green-100 text-green-800 border-green-300" :
                  approver.status === "rejected" ? "bg-red-100 text-red-800 border-red-300" :
                  "bg-amber-100 text-amber-800 border-amber-300"
                }>
                  {approver.status === "approved" ? "Approved" : 
                   approver.status === "rejected" ? "Rejected" : 
                   "Pending"}
                </Badge>
                {approver.comments && (
                  <p className="text-xs text-muted-foreground mt-1">"{approver.comments}"</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DeviationDetails;
