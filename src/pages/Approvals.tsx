
import { useState } from "react";
import { useDeviations } from "@/context/DeviationContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye } from "lucide-react";
import { DeviationRequest } from "@/types";
import { useToast } from "@/hooks/use-toast";
import DeviationDetails from "@/components/DeviationDetails";

const Approvals = () => {
  const { getPendingApprovals, approveRequest, rejectRequest } = useDeviations();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<DeviationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  
  // For demo purposes, we'll use a fixed approver ID
  // In a real application, this would come from authentication
  const currentApproverId = "a1"; 
  const currentApproverName = "Rahul Mehta";
  
  const pendingApprovals = getPendingApprovals().filter(req => {
    const currentApprover = req.approvers[req.currentLevel - 1];
    return currentApprover && currentApprover.id === currentApproverId && currentApprover.status === "pending";
  });

  const handleApprove = () => {
    if (!selectedRequest) return;
    
    const approverId = currentApproverId;
    approveRequest(selectedRequest.id, approverId, "Approved after review");
    
    toast({
      title: "Request Approved",
      description: `You have approved the ${selectedRequest.type.replace('_', ' ')} request for ${selectedRequest.customerName}`,
    });
    
    setSelectedRequest(null);
  };

  const handleReject = () => {
    if (!selectedRequest || !rejectionReason.trim()) return;
    
    const approverId = currentApproverId;
    rejectRequest(selectedRequest.id, approverId, rejectionReason);
    
    toast({
      title: "Request Rejected",
      description: `You have rejected the ${selectedRequest.type.replace('_', ' ')} request for ${selectedRequest.customerName}`,
      variant: "destructive",
    });
    
    setRejectionReason("");
    setIsRejectDialogOpen(false);
    setSelectedRequest(null);
  };

  const openDetails = (request: DeviationRequest) => {
    setSelectedRequest(request);
    setIsDetailsOpen(true);
  };

  const openRejectDialog = (request: DeviationRequest) => {
    setSelectedRequest(request);
    setIsRejectDialogOpen(true);
  };

  const getDeviationTypeDisplayName = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
      
      {pendingApprovals.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-muted-foreground">You have no requests pending for approval.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {pendingApprovals.map(request => (
            <Card key={request.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <Badge variant="outline">{getDeviationTypeDisplayName(request.type)}</Badge>
                  <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                    Level {request.currentLevel}
                  </Badge>
                </div>
                <CardTitle className="text-lg mt-2">{request.customerName}</CardTitle>
                <CardDescription>{request.unitNumber}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm mb-4 text-muted-foreground line-clamp-2">
                  {request.description}
                </p>
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    className="w-full flex justify-center items-center gap-2"
                    onClick={() => openDetails(request)}
                  >
                    <Eye size={16} />
                    View Details
                  </Button>
                  <div className="flex gap-2">
                    <Button 
                      variant="default" 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => {
                        setSelectedRequest(request);
                        handleApprove();
                      }}
                    >
                      <Check size={16} className="mr-2" />
                      Approve
                    </Button>
                    <Button 
                      variant="destructive" 
                      className="flex-1"
                      onClick={() => openRejectDialog(request)}
                    >
                      <X size={16} className="mr-2" />
                      Reject
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Request Details</DialogTitle>
            <DialogDescription>
              Review the details of this deviation request
            </DialogDescription>
          </DialogHeader>
          
          {selectedRequest && <DeviationDetails request={selectedRequest} />}
          
          <DialogFooter>
            <div className="flex flex-col sm:flex-row gap-2 w-full">
              <Button 
                variant="outline" 
                onClick={() => setIsDetailsOpen(false)}
                className="sm:flex-1"
              >
                Close
              </Button>
              <div className="flex gap-2 sm:flex-1">
                <Button 
                  variant="default" 
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => {
                    handleApprove();
                    setIsDetailsOpen(false);
                  }}
                >
                  <Check size={16} className="mr-2" />
                  Approve
                </Button>
                <Button 
                  variant="destructive"
                  className="flex-1"
                  onClick={() => {
                    setIsDetailsOpen(false);
                    setIsRejectDialogOpen(true);
                  }}
                >
                  <X size={16} className="mr-2" />
                  Reject
                </Button>
              </div>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rejection Dialog */}
      <Dialog open={isRejectDialogOpen} onOpenChange={setIsRejectDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Reject Request</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this request
            </DialogDescription>
          </DialogHeader>
          
          <Textarea
            placeholder="Enter rejection reason"
            className="min-h-[100px]"
            value={rejectionReason}
            onChange={(e) => setRejectionReason(e.target.value)}
          />
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRejectDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleReject}
              disabled={!rejectionReason.trim()}
            >
              Confirm Rejection
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Approvals;
