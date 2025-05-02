
import { useDeviations } from "@/context/DeviationContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DeviationRequest, DeviationType } from "@/types";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { CalendarCheck, Clock, FileCheck, ThumbsDown, ThumbsUp } from "lucide-react";

const DeviationTypeMap: Record<DeviationType, string> = {
  "registration": "Registration",
  "possession": "Possession",
  "interest_waiver": "Interest Waive-Off",
  "cashback": "Cashback",
  "pre_emi": "Pre-EMI / Rental",
  "cancellation": "Cancellation",
};

const Dashboard = () => {
  const { requests, getRequestsByStatus, getPendingApprovals } = useDeviations();
  
  const pendingRequests = getRequestsByStatus("pending").length;
  const inReviewRequests = getRequestsByStatus("in_review").length;
  const approvedRequests = getRequestsByStatus("approved").length;
  const rejectedRequests = getRequestsByStatus("rejected").length;
  const pendingApprovals = getPendingApprovals().length;

  const getChartData = () => {
    const typeCount: Record<string, { name: string, pending: number, approved: number, rejected: number }> = {};
    
    // Initialize with all deviation types
    Object.entries(DeviationTypeMap).forEach(([key, value]) => {
      typeCount[key] = { 
        name: value, 
        pending: 0, 
        approved: 0, 
        rejected: 0 
      };
    });
    
    // Count by type and status
    requests.forEach(request => {
      if (request.status === "pending" || request.status === "in_review") {
        typeCount[request.type].pending += 1;
      } else if (request.status === "approved") {
        typeCount[request.type].approved += 1;
      } else if (request.status === "rejected") {
        typeCount[request.type].rejected += 1;
      }
    });
    
    return Object.values(typeCount);
  };

  const getRecentRequests = (): DeviationRequest[] => {
    return [...requests]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 5);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingRequests + inReviewRequests}</div>
            <p className="text-xs text-muted-foreground">
              {inReviewRequests} in review, {pendingRequests} awaiting review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Approved</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{approvedRequests}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((approvedRequests / (approvedRequests + rejectedRequests)) * 100) || 0}% approval rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rejected</CardTitle>
            <ThumbsDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rejectedRequests}</div>
            <p className="text-xs text-muted-foreground">
              {Math.round((rejectedRequests / (approvedRequests + rejectedRequests)) * 100) || 0}% rejection rate
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Your Approval</CardTitle>
            <CalendarCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingApprovals}</div>
            <p className="text-xs text-muted-foreground">
              Requiring your action
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Deviation Requests by Type and Status</CardTitle>
          </CardHeader>
          <CardContent className="pl-0">
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={getChartData()} margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-25} textAnchor="end" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Legend />
                <Bar dataKey="pending" fill="#fbbf24" name="Pending" />
                <Bar dataKey="approved" fill="#10b981" name="Approved" />
                <Bar dataKey="rejected" fill="#ef4444" name="Rejected" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Deviation Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="table-container">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="py-3 px-4 text-left font-medium">ID</th>
                    <th className="py-3 px-4 text-left font-medium">Type</th>
                    <th className="py-3 px-4 text-left font-medium">Customer</th>
                    <th className="py-3 px-4 text-left font-medium hidden md:table-cell">Unit</th>
                    <th className="py-3 px-4 text-left font-medium">Status</th>
                    <th className="py-3 px-4 text-left font-medium">Created</th>
                  </tr>
                </thead>
                <tbody>
                  {getRecentRequests().map((request) => {
                    const createdDate = new Date(request.createdAt).toLocaleDateString();
                    const statusClass = 
                      request.status === "approved" ? "status-approved" :
                      request.status === "rejected" ? "status-rejected" :
                      request.status === "in_review" ? "status-in-review" : "status-pending";
                    
                    return (
                      <tr key={request.id} className="hover:bg-muted/50">
                        <td className="py-3 px-4 font-medium">{request.id}</td>
                        <td className="py-3 px-4">{DeviationTypeMap[request.type]}</td>
                        <td className="py-3 px-4">{request.customerName}</td>
                        <td className="py-3 px-4 hidden md:table-cell">{request.unitNumber}</td>
                        <td className="py-3 px-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${statusClass}`}>
                            {request.status === "in_review" ? "In Review" : request.status.charAt(0).toUpperCase() + request.status.slice(1)}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{createdDate}</td>
                      </tr>
                    );
                  })}
                  {getRecentRequests().length === 0 && (
                    <tr>
                      <td colSpan={6} className="py-6 text-center text-muted-foreground">
                        No recent deviation requests
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
