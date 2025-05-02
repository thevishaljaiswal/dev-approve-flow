
import React, { createContext, useContext, useState } from "react";
import { DeviationRequest, DeviationType, RequestStatus, Approver } from "@/types";
import { generateMockData } from "@/lib/mockData";

interface DeviationContextType {
  requests: DeviationRequest[];
  addRequest: (request: Omit<DeviationRequest, "id" | "createdAt" | "updatedAt" | "status" | "currentLevel">) => void;
  updateRequest: (id: string, request: Partial<DeviationRequest>) => void;
  getRequestsByStatus: (status: RequestStatus) => DeviationRequest[];
  getRequestsByType: (type: DeviationType) => DeviationRequest[];
  getPendingApprovals: () => DeviationRequest[];
  approveRequest: (requestId: string, approverId: string, comments?: string) => void;
  rejectRequest: (requestId: string, approverId: string, comments: string) => void;
}

export const DeviationContext = createContext<DeviationContextType | undefined>(undefined);

export const DeviationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [requests, setRequests] = useState<DeviationRequest[]>(generateMockData());

  const addRequest = (newRequest: Omit<DeviationRequest, "id" | "createdAt" | "updatedAt" | "status" | "currentLevel">) => {
    const id = `REQ-${Math.floor(Math.random() * 10000)}`;
    const now = new Date().toISOString();
    
    const fullRequest: DeviationRequest = {
      ...newRequest,
      id,
      createdAt: now,
      updatedAt: now,
      status: "pending",
      currentLevel: 1,
    };
    
    setRequests((prev) => [fullRequest, ...prev]);
    return id;
  };

  const updateRequest = (id: string, updates: Partial<DeviationRequest>) => {
    setRequests((prev) =>
      prev.map((request) =>
        request.id === id
          ? { ...request, ...updates, updatedAt: new Date().toISOString() }
          : request
      )
    );
  };

  const getRequestsByStatus = (status: RequestStatus) => {
    return requests.filter((req) => req.status === status);
  };

  const getRequestsByType = (type: DeviationType) => {
    return requests.filter((req) => req.type === type);
  };

  const getPendingApprovals = () => {
    return requests.filter((req) => {
      if (req.status !== "in_review" && req.status !== "pending") return false;
      const currentApprover = req.approvers[req.currentLevel - 1];
      return currentApprover && currentApprover.status === "pending";
    });
  };

  const approveRequest = (requestId: string, approverId: string, comments?: string) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;

        const updatedApprovers = request.approvers.map((approver) => {
          if (approver.id === approverId) {
            return {
              ...approver,
              status: "approved" as const,
              comments: comments || "",
              timestamp: new Date().toISOString(),
            };
          }
          return approver;
        });

        // Check if all approvers have approved
        const allApproved = updatedApprovers.every((a) => a.status === "approved");
        
        // Move to next level if not all approved
        let newLevel = request.currentLevel;
        let newStatus = request.status;
        
        if (allApproved) {
          newStatus = "approved";
        } else if (request.currentLevel < updatedApprovers.length) {
          newLevel = request.currentLevel + 1;
          newStatus = "in_review";
        }

        return {
          ...request,
          approvers: updatedApprovers,
          status: newStatus,
          currentLevel: newLevel,
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  const rejectRequest = (requestId: string, approverId: string, comments: string) => {
    setRequests((prev) =>
      prev.map((request) => {
        if (request.id !== requestId) return request;

        const updatedApprovers = request.approvers.map((approver) => {
          if (approver.id === approverId) {
            return {
              ...approver,
              status: "rejected" as const,
              comments,
              timestamp: new Date().toISOString(),
            };
          }
          return approver;
        });

        return {
          ...request,
          approvers: updatedApprovers,
          status: "rejected",
          updatedAt: new Date().toISOString(),
        };
      })
    );
  };

  return (
    <DeviationContext.Provider
      value={{
        requests,
        addRequest,
        updateRequest,
        getRequestsByStatus,
        getRequestsByType,
        getPendingApprovals,
        approveRequest,
        rejectRequest,
      }}
    >
      {children}
    </DeviationContext.Provider>
  );
};

export const useDeviations = () => {
  const context = useContext(DeviationContext);
  if (context === undefined) {
    throw new Error("useDeviations must be used within a DeviationProvider");
  }
  return context;
};
