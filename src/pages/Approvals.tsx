
import { useState } from "react";
import { useDeviations } from "@/context/DeviationContext";
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Check, X, Eye, ListFilter } from "lucide-react";
import { DeviationRequest, DeviationType } from "@/types";
import { useToast } from "@/hooks/use-toast";
import DeviationDetails from "@/components/DeviationDetails";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Approvals = () => {
  const { getPendingApprovals, approveRequest, rejectRequest } = useDeviations();
  const { toast } = useToast();
  const [selectedRequest, setSelectedRequest] = useState<DeviationRequest | null>(null);
  const [rejectionReason, setRejectionReason] = useState<string>("");
  const [isDetailsOpen, setIsDetailsOpen] = useState<boolean>(false);
  const [isRejectDialogOpen, setIsRejectDialogOpen] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<string>("all");
  
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

  const filteredApprovals = activeTab === "all" 
    ? pendingApprovals 
    : pendingApprovals.filter(req => req.type === activeTab);

  const countByType = (type: DeviationType | 'all') => {
    return type === 'all' 
      ? pendingApprovals.length 
      : pendingApprovals.filter(req => req.type === type).length;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Pending Approvals</h1>
        <Badge variant="outline" className="px-3 py-1">
          {currentApproverName} ({pendingApprovals.length} pending)
        </Badge>
      </div>
      
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="all">All ({countByType('all')})</TabsTrigger>
          <TabsTrigger value="registration">Registration ({countByType('registration')})</TabsTrigger>
          <TabsTrigger value="possession">Possession ({countByType('possession')})</TabsTrigger>
          <TabsTrigger value="interest_waiver">Interest Waiver ({countByType('interest_waiver')})</TabsTrigger>
          <TabsTrigger value="cashback">Cashback ({countByType('cashback')})</TabsTrigger>
          <TabsTrigger value="pre_emi">Pre-EMI ({countByType('pre_emi')})</TabsTrigger>
          <TabsTrigger value="cancellation">Cancellation ({countByType('cancellation')})</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab}>
          {filteredApprovals.length === 0 ? (
            <Card>
              <CardContent className="pt-6">
                <p className="text-center text-muted-foreground">
                  You have no {activeTab !== 'all' ? getDeviationTypeDisplayName(activeTab) : ''} requests pending for approval.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Customer Name</TableHead>
                    <TableHead>Unit Number</TableHead>
                    <TableHead>Level</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredApprovals.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="font-medium">{request.id}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{getDeviationTypeDisplayName(request.type)}</Badge>
                      </TableCell>
                      <TableCell>{request.customerName}</TableCell>
                      <TableCell>{request.unitNumber}</TableCell>
                      <TableCell>
                        <Badge className="bg-amber-100 text-amber-800 border-amber-300">
                          Level {request.currentLevel}
                        </Badge>
                      </TableCell>
                      <TableCell>{new Date(request.createdAt).toLocaleDateString()}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => openDetails(request)}
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="default"
                            className="bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              setSelectedRequest(request);
                              handleApprove();
                            }}
                          >
                            <Check className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => openRejectDialog(request)}
                          >
                            <X className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

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
