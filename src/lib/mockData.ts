
import { DeviationRequest, DeviationType, RequestStatus } from "@/types";

const deviationTypes: DeviationType[] = [
  "registration",
  "possession",
  "interest_waiver",
  "cashback",
  "pre_emi",
  "cancellation",
];

const statuses = ["pending", "in_review", "approved", "rejected"];

const generateApprovers = (type: DeviationType) => {
  const approvers = [
    {
      id: "a1",
      name: "Rahul Mehta",
      role: "CRM Manager",
      status: "approved" as const,
      comments: "Approved based on customer's good payment history",
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ];

  // Add different approvers based on deviation type
  switch (type) {
    case "registration":
      approvers.push(
        {
          id: "a2",
          name: "Neha Sharma",
          role: "Legal Head",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a3",
          name: "Vikram Singh",
          role: "Director",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    case "possession":
      approvers.push(
        {
          id: "a4",
          name: "Amit Patel",
          role: "Projects Head",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a5",
          name: "Priya Gupta",
          role: "Finance",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    case "interest_waiver":
      approvers.push(
        {
          id: "a6",
          name: "Deepak Joshi",
          role: "Finance Head",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a7",
          name: "Vijay Kumar",
          role: "COO",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    case "cashback":
      approvers.push(
        {
          id: "a8",
          name: "Ankur Verma",
          role: "Sales Head",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a9",
          name: "Meera Iyer",
          role: "Finance",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    case "pre_emi":
      approvers.push(
        {
          id: "a10",
          name: "Sanjay Kapoor",
          role: "Finance",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a11",
          name: "Ritika Singhania",
          role: "Legal",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    case "cancellation":
      approvers.push(
        {
          id: "a12",
          name: "Anil Kumar",
          role: "CRM Head",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a13",
          name: "Gautam Reddy",
          role: "Finance",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        },
        {
          id: "a14",
          name: "Kavita Singh",
          role: "CEO",
          status: "pending" as const,
          comments: "",
          timestamp: "",
        }
      );
      break;
    default:
      break;
  }

  return approvers;
};

const customerNames = [
  "Rajesh Kumar",
  "Preeti Shah",
  "Abdul Karim",
  "Lakshmi Nair",
  "John Smith",
  "Ananya Malhotra",
  "Vivek Chauhan",
  "Leela Krishnan",
  "Suresh Patel",
  "Fatima Ahmed",
];

const getRandomDate = (startDate: Date, endDate: Date) => {
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return new Date(timestamp).toISOString().split("T")[0];
};

const getTypeSpecificData = (type: DeviationType, index: number) => {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 6);
  
  const threeMonthsFromNow = new Date(now);
  threeMonthsFromNow.setMonth(now.getMonth() + 3);
  
  switch (type) {
    case "registration":
      return {
        bookingDate: getRandomDate(sixMonthsAgo, new Date(sixMonthsAgo.getTime() + 30 * 24 * 60 * 60 * 1000)),
        originalRegistrationDate: getRandomDate(now, new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000)),
        proposedRegistrationDate: getRandomDate(threeMonthsFromNow, new Date(threeMonthsFromNow.getTime() + 30 * 24 * 60 * 60 * 1000)),
      };
    case "possession":
      return {
        originalPossessionDate: getRandomDate(now, new Date(now.getTime() + 60 * 24 * 60 * 60 * 1000)),
        requestedPossessionDate: getRandomDate(threeMonthsFromNow, new Date(threeMonthsFromNow.getTime() + 60 * 24 * 60 * 60 * 1000)),
        paymentDuesStatus: ["Fully Paid", "90% Paid", "75% Paid"][index % 3],
      };
    case "interest_waiver":
      return {
        overdueAmount: Math.floor(Math.random() * 100000) + 50000,
        interestCharged: Math.floor(Math.random() * 10000) + 5000,
        interestWaiverRequested: Math.floor(Math.random() * 5000) + 2000,
        reasonForDelay: [
          "Payment stuck due to technical error",
          "Delay from bank disbursement",
          "COVID/medical emergency"
        ][index % 3],
        previousWaiverHistory: ["None", "One time waiver granted last year", "Multiple waivers"][index % 3],
      };
    case "cashback":
      return {
        eligibleCashbackAmount: Math.floor(Math.random() * 20000) + 10000,
        requestedCashbackAmount: Math.floor(Math.random() * 25000) + 15000,
        proposedDate: getRandomDate(now, threeMonthsFromNow),
      };
    case "pre_emi":
      return {
        loanDisbursedDate: getRandomDate(sixMonthsAgo, now),
        emiStartDate: getRandomDate(sixMonthsAgo, now),
        paymentHistory: ["Regular", "Irregular", "First missed payment"][index % 3],
        issueInRepayment: [
          "Delay in project handover",
          "Missed documentation",
          "Bank disbursement mismatch"
        ][index % 3],
        requestedSupport: ["EMI holiday for 3 months", "Reduce EMI amount", "Restructure loan"][index % 3],
      };
    case "cancellation":
      return {
        reasonForCancellation: [
          "Medical emergency",
          "Financial constraints",
          "Relocation to another city"
        ][index % 3],
        refundAmountAsPerPolicy: Math.floor(Math.random() * 500000) + 500000,
        refundAmountRequested: Math.floor(Math.random() * 800000) + 700000,
        supportingDocuments: ["medical_certificate.pdf", "bank_statement.pdf"],
      };
    default:
      return {};
  }
};

const getDeviationDescription = (type: DeviationType, data: any) => {
  switch (type) {
    case "registration":
      return `Request to change registration date from ${data.originalRegistrationDate} to ${data.proposedRegistrationDate}`;
    case "possession":
      return `Request to change possession date from ${data.originalPossessionDate} to ${data.requestedPossessionDate}`;
    case "interest_waiver":
      return `Request for interest waiver of ₹${data.interestWaiverRequested} against charged amount of ₹${data.interestCharged}`;
    case "cashback":
      return `Request for additional cashback of ₹${data.requestedCashbackAmount - data.eligibleCashbackAmount} over eligible amount`;
    case "pre_emi":
      return `Request for ${data.requestedSupport} due to ${data.issueInRepayment}`;
    case "cancellation":
      return `Requesting full refund of ₹${data.refundAmountRequested} against policy amount of ₹${data.refundAmountAsPerPolicy}`;
    default:
      return "";
  }
};

export const generateMockData = (): DeviationRequest[] => {
  const mockRequests: DeviationRequest[] = [];

  for (let i = 0; i < 15; i++) {
    const type = deviationTypes[i % deviationTypes.length];
    const status = statuses[Math.floor(Math.random() * statuses.length)] as RequestStatus;
    const createdAt = new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString();
    const updatedAt = new Date(Date.now() - i * 12 * 60 * 60 * 1000).toISOString();
    
    const approvers = generateApprovers(type);
    const currentLevel = status === "approved" ? approvers.length : status === "rejected" ? approvers.findIndex(a => a.status === "rejected") + 1 : 1;
    
    const customerName = customerNames[i % customerNames.length];
    const unitNumber = `A-${100 + i}`;
    
    const typeSpecificData = getTypeSpecificData(type, i);
    
    mockRequests.push({
      id: `REQ-${1000 + i}`,
      type,
      status,
      createdAt,
      createdBy: {
        id: "user1",
        name: "Rahul Mehta",
        role: "CRM Manager",
      },
      updatedAt,
      approvers,
      customerName,
      unitNumber,
      currentLevel,
      description: getDeviationDescription(type, typeSpecificData),
      ...typeSpecificData,
    });
  }

  return mockRequests;
};

const customerNames = [
  "Rajesh Kumar",
  "Preeti Shah",
  "Abdul Karim",
  "Lakshmi Nair",
  "John Smith",
  "Ananya Malhotra",
  "Vivek Chauhan",
  "Leela Krishnan",
  "Suresh Patel",
  "Fatima Ahmed",
];

const getRandomDate = (startDate: Date, endDate: Date) => {
  const minValue = startDate.getTime();
  const maxValue = endDate.getTime();
  const timestamp = Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  return new Date(timestamp).toISOString().split("T")[0];
};

const getDeviationDescription = (type: DeviationType, data: any) => {
  switch (type) {
    case "registration":
      return `Request to change registration date from ${data.originalRegistrationDate} to ${data.proposedRegistrationDate}`;
    case "possession":
      return `Request to change possession date from ${data.originalPossessionDate} to ${data.requestedPossessionDate}`;
    case "interest_waiver":
      return `Request for interest waiver of ₹${data.interestWaiverRequested} against charged amount of ₹${data.interestCharged}`;
    case "cashback":
      return `Request for additional cashback of ₹${data.requestedCashbackAmount - data.eligibleCashbackAmount} over eligible amount`;
    case "pre_emi":
      return `Request for ${data.requestedSupport} due to ${data.issueInRepayment}`;
    case "cancellation":
      return `Requesting full refund of ₹${data.refundAmountRequested} against policy amount of ₹${data.refundAmountAsPerPolicy}`;
    default:
      return "";
  }
};
