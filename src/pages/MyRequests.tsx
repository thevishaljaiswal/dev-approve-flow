
import { useState } from "react";
import { useDeviations } from "@/context/DeviationContext";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { DeviationRequest, DeviationType } from "@/types";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const DeviationTypeMap: Record<DeviationType, string> = {
  "registration": "Registration",
  "possession": "Possession",
  "interest_waiver": "Interest Waive-Off",
  "cashback": "Cashback",
  "pre_emi": "Pre-EMI / Rental",
  "cancellation": "Cancellation",
};

const MyRequests = () => {
  const { requests } = useDeviations();
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredRequests = requests.filter((request) => {
    // Filter by type
    if (typeFilter !== "all" && request.type !== typeFilter) {
      return false;
    }
    
    // Filter by status
    if (statusFilter !== "all" && request.status !== statusFilter) {
      return false;
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        request.id.toLowerCase().includes(query) ||
        request.customerName.toLowerCase().includes(query) ||
        request.unitNumber.toLowerCase().includes(query) ||
        (request.description && request.description.toLowerCase().includes(query))
      );
    }
    
    return true;
  });

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-300";
      case "rejected":
        return "bg-red-100 text-red-800 border-red-300";
      case "in_review":
        return "bg-blue-100 text-blue-800 border-blue-300";
      default:
        return "bg-amber-100 text-amber-800 border-amber-300";
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">My Requests</h1>
      
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by ID, customer, or unit..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select
          value={typeFilter}
          onValueChange={setTypeFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Types</SelectItem>
            {Object.entries(DeviationTypeMap).map(([value, label]) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="in_review">In Review</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="rejected">Rejected</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="overflow-hidden rounded-md border">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-muted/50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Request ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer / Unit
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell">
                Approvers
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredRequests.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-sm text-gray-500">
                  No requests match your current filters
                </td>
              </tr>
            ) : (
              filteredRequests.map((request: DeviationRequest) => (
                <tr key={request.id} className="hover:bg-muted/30">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {request.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <Badge variant="outline" className="font-normal">
                      {DeviationTypeMap[request.type]}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <div className="font-medium">{request.customerName}</div>
                    <div className="text-xs text-muted-foreground">{request.unitNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden md:table-cell">
                    {formatDate(request.createdAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusBadgeClass(request.status)}`}>
                      {request.status === "in_review" ? "In Review" : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm hidden lg:table-cell">
                    <div className="flex -space-x-2 avatar-group overflow-hidden">
                      {request.approvers.map((approver, index) => (
                        <Avatar key={approver.id} className={`border-2 border-white ${
                          approver.status === "approved" ? "bg-green-100" : 
                          approver.status === "rejected" ? "bg-red-100" : 
                          "bg-gray-100"
                        }`}>
                          <AvatarFallback className="text-xs">
                            {getInitials(approver.name)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyRequests;
