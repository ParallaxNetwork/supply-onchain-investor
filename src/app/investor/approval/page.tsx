"use client";

import React from "react";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    CardContent,
} from "@/components/ui/card";
import { api } from "@/trpc/react";
import type { RouterOutputs } from "@/trpc/react";
import type { SignatureRequestType } from "../../../../generated/prisma/client";

type ApprovalRequest = RouterOutputs["approval"]["getInbox"][number];

export default function ApprovalPage() {
    const [showModal, setShowModal] = React.useState(false);
    const [selectedRequestType, setSelectedRequestType] = React.useState<string>("All Request Types");
    const [selectedVault, setSelectedVault] = React.useState<string>("All Vaults");
    const [selectedStatus, setSelectedStatus] = React.useState<string>("Pending");

    const getApiType = (type: string) => {
        switch (type) {
            case "Add Tradeable Asset": return "ADD_ASSET";
            case "Close Vault": return "CLOSE_VAULT";
            case "Cash Out": return "CASH_OUT";
            case "All Request Types": return undefined;
            default: return undefined;
        }
    };

    const formatRequestType = (type: string) => {
        switch (type) {
            case "ADD_ASSET": return "Add Tradeable Asset";
            case "CLOSE_VAULT": return "Close Vault";
            case "CASH_OUT": return "Cash Out";
            case "FUND_RELEASE": return "Fund Release";
            default: return type;
        }
    };

    const { data: inboxRequests, isLoading: isLoadingInbox } = api.approval.getInbox.useQuery({
        type: getApiType(selectedRequestType) as SignatureRequestType | undefined,
        vaultId: selectedVault,
        status: selectedStatus.toUpperCase() as "PENDING" | "SIGNED" | "REJECTED",
    });
    const { data: initiatedRequests, isLoading: isLoadingInitiated } = api.approval.getInitiated.useQuery();

    const [selectedRequest, setSelectedRequest] = React.useState<ApprovalRequest | null>(null);

    const handleRequestClick = (request: ApprovalRequest) => {
        setSelectedRequest(request);
        setShowModal(true);
    };

    return (
        <main className="flex-1 w-full px-4 md:px-8 py-8 flex flex-col gap-8 overflow-hidden">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-neutral-900">
                    Transparent Approval Hub
                </h1>
                <div className="lg:hidden flex items-center gap-2">
                    <button className="flex items-center gap-2 text-sm font-bold text-neutral-600 hover:text-primary">
                        <Icon name="menu" />
                        Menu
                    </button>
                </div>
            </div>

            <div className="flex flex-col gap-8">
                {/* Multisig Sign Requests (Inbox) */}
                <Card className="shadow-soft border-neutral-200">
                    <CardHeader className="flex flex-col gap-6 pb-0">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Icon name="inbox" className="text-primary text-[24px]" />
                                Multisig Sign Requests{" "}
                                <span className="text-neutral-500 font-medium text-sm">
                                    (Inbox)
                                </span>
                            </CardTitle>
                            <CardDescription className="mt-1 text-neutral-600">
                                Requests waiting for your action. Review and sign to proceed.
                            </CardDescription>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <div className="relative flex-1">
                                <Icon
                                    name="filter_alt"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
                                />
                                <select
                                    className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary focus:outline-none"
                                    value={selectedRequestType}
                                    onChange={(e) => setSelectedRequestType(e.target.value)}
                                >
                                    <option>All Request Types</option>
                                    <option>Add Tradeable Asset</option>
                                    <option>Close Vault</option>
                                    <option>Cash Out</option>
                                </select>
                            </div>
                            <div className="relative flex-1">
                                <Icon
                                    name="lock"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
                                />
                                <select
                                    className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary focus:outline-none"
                                    value={selectedVault}
                                    onChange={(e) => setSelectedVault(e.target.value)}
                                >
                                    <option>All Vaults</option>
                                    <option>Vault Alpha</option>
                                    <option>Vault Beta</option>
                                </select>
                            </div>
                            <div className="relative flex-1">
                                <Icon
                                    name="visibility"
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400 text-[18px]"
                                />
                                <select
                                    className="block w-full rounded-lg border-neutral-200 bg-neutral-50 py-2 pl-9 pr-4 text-xs font-medium text-neutral-900 focus:border-primary focus:ring-primary focus:outline-none"
                                    value={selectedStatus}
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                >
                                    <option>Pending</option>
                                    <option>Signed</option>
                                    <option>Rejected</option>
                                </select>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 mt-6">
                        {isLoadingInbox ? (
                            <div className="p-4 text-center text-neutral-500">Loading requests...</div>
                        ) : inboxRequests?.length === 0 ? (
                            <div className="p-4 text-center text-neutral-500">No requests found matching filters.</div>
                        ) : (
                            inboxRequests?.map((request) => (
                                <div
                                    key={request.id}
                                    onClick={() => handleRequestClick(request)}
                                    className={`bg-neutral-50 border border-neutral-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${request.status !== "PENDING" ? "opacity-70" : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold text-neutral-900">
                                            {formatRequestType(request.type)}
                                        </h3>
                                        <span
                                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${request.status === "APPROVED"
                                                ? "bg-success/10 text-success"
                                                : request.status === "PENDING"
                                                    ? "bg-info/10 text-info"
                                                    : "bg-primary/10 text-primary"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-neutral-600 mb-3">
                                        <div>
                                            <span className="font-medium">Initiated By:</span>{" "}
                                            {request.initiatedBy}{" "}
                                            <span className="text-neutral-400 font-mono text-[10px] ml-1">
                                                ({request.initiatedByAddress.slice(0, 6)}...)
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-medium">Vault:</span>{" "}
                                            <a className="text-primary hover:underline font-bold" href="#">
                                                {request.vault}
                                            </a>
                                        </div>
                                        <div>
                                            <span className="font-medium">Created:</span>{" "}
                                            {request.created}
                                        </div>
                                        <div>
                                            <span className="font-medium">Progress:</span>{" "}
                                            {request.currentSignatures}/{request.requiredSignatures} (
                                            {request.requiredSignatures} required)
                                        </div>
                                    </div>
                                    <div className="h-1 bg-neutral-200 rounded-full overflow-hidden mb-4">
                                        <div
                                            className={`h-full ${request.progressColor === "info"
                                                ? "bg-info"
                                                : request.progressColor === "success"
                                                    ? "bg-success"
                                                    : "bg-primary"
                                                }`}
                                            style={{
                                                width: `${(request.currentSignatures / request.requiredSignatures) *
                                                    100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                    <div className="text-right">
                                        {request.status === "PENDING" && !request.hasSigned ? (
                                            <Button size="sm" className="px-4 py-2 h-auto rounded-lg">
                                                Review & Sign
                                            </Button>
                                        ) : (
                                            <Button
                                                size="sm"
                                                className="px-4 py-2 h-auto rounded-lg bg-neutral-200 text-neutral-600 cursor-not-allowed hover:bg-neutral-200 hover:text-neutral-600"
                                                disabled
                                            >
                                                {request.hasSigned ? "Signed" : request.status === "APPROVED" ? "Approved" : "Rejected"}
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            )))}
                    </CardContent>
                </Card>

                {/* Multisig Sign Initiated (Monitoring) */}
                <Card className="shadow-soft border-neutral-200">
                    <CardHeader className="flex flex-col gap-6 pb-0">
                        <div>
                            <CardTitle className="flex items-center gap-2 text-xl">
                                <Icon
                                    name="track_changes"
                                    className="text-accent text-[24px]"
                                />
                                Multisig Sign Initiated{" "}
                                <span className="text-neutral-500 font-medium text-sm">
                                    (Monitoring)
                                </span>
                            </CardTitle>
                            <CardDescription className="mt-1 text-neutral-600">
                                Requests you initiated, tracking progress and accountability.
                            </CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4 mt-6">
                        {isLoadingInitiated ? (
                            <div className="p-4 text-center text-neutral-500">Loading requests...</div>
                        ) : initiatedRequests?.length === 0 ? (
                            <div className="p-4 text-center text-neutral-500">No initiated requests found.</div>
                        ) : (
                            initiatedRequests?.map((request) => (
                                <div
                                    key={request.id}
                                    className={`bg-neutral-50 border border-neutral-100 rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer ${request.status === "APPROVED" ? "opacity-70" : ""
                                        }`}
                                >
                                    <div className="flex items-center justify-between mb-3">
                                        <h3 className="text-sm font-bold text-neutral-900">
                                            {formatRequestType(request.type)}
                                        </h3>
                                        <span
                                            className={`text-xs font-bold px-2 py-0.5 rounded-full ${request.status === "APPROVED"
                                                ? "bg-success/10 text-success"
                                                : request.status === "PENDING"
                                                    ? "bg-info/10 text-info"
                                                    : "bg-primary/10 text-primary"
                                                }`}
                                        >
                                            {request.status}
                                        </span>
                                    </div>
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 text-xs text-neutral-600 mb-3">
                                        <div>
                                            <span className="font-medium">Target Vault:</span>{" "}
                                            {request.targetVault}
                                        </div>
                                        <div>
                                            <span className="font-medium">Amount:</span>{" "}
                                            {request.amount}
                                        </div>
                                        <div>
                                            <span className="font-medium">Last Updated:</span>{" "}
                                            {request.lastUpdated}
                                        </div>
                                        <div>
                                            <span className="font-medium">Progress:</span>{" "}
                                            {request.currentSignatures}/{request.requiredSignatures} (
                                            {request.requiredSignatures} required)
                                        </div>
                                    </div>
                                    <div className="h-1 bg-neutral-200 rounded-full overflow-hidden mb-4">
                                        <div
                                            className={`h-full ${request.progressColor === "success"
                                                ? "bg-success"
                                                : request.progressColor === "info"
                                                    ? "bg-info"
                                                    : "bg-primary"
                                                }`}
                                            style={{
                                                width: `${(request.currentSignatures / request.requiredSignatures) *
                                                    100
                                                    }%`,
                                            }}
                                        ></div>
                                    </div>
                                    {request.note && (
                                        <div
                                            className={`text-xs font-bold ${request.status === "APPROVED"
                                                ? "text-success"
                                                : "text-neutral-500"
                                                }`}
                                        >
                                            <span>{request.note}</span>
                                        </div>
                                    )}
                                </div>
                            )))}
                    </CardContent>
                </Card>
            </div>

            {/* Modal */}
            {showModal && selectedRequest && (
                <div className="fixed inset-0 bg-neutral-900/50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto p-8 flex flex-col gap-6">
                        <div className="flex justify-between items-center pb-4 border-b border-neutral-100">
                            <h2 className="text-2xl font-bold text-neutral-900">
                                Multisig Request Detail
                            </h2>
                            <button
                                className="text-neutral-400 hover:text-neutral-600"
                                onClick={() => setShowModal(false)}
                            >
                                <Icon name="close" />
                            </button>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg font-bold text-neutral-900">Summary</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm">
                                <div>
                                    <span className="font-semibold text-neutral-600">
                                        Request Type:
                                    </span>{" "}
                                    <span className="text-neutral-900">{selectedRequest.type}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-neutral-600">
                                        Initiator:
                                    </span>{" "}
                                    <span className="text-neutral-900">{selectedRequest.initiatedBy}</span>
                                </div>
                                <div>
                                    <span className="font-semibold text-neutral-600">Vault:</span>{" "}
                                    <span className="text-neutral-900">
                                        {selectedRequest.vault}
                                    </span>
                                </div>
                                <div>
                                    <span className="font-semibold text-neutral-600">
                                        Status:
                                    </span>{" "}
                                    <span className="text-info font-bold">{selectedRequest.status}</span>
                                </div>
                            </div>
                        </div>
                        <div className="border border-neutral-200 rounded-xl p-5 flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-neutral-900">
                                Action Details
                            </h3>
                            <div className="text-neutral-700 text-sm">
                                {selectedRequest.type === "FUND_RELEASE" && selectedRequest.fundRelease ? (
                                    <>
                                        <p className="mb-2">
                                            {selectedRequest.initiatedBy} has initiated a fund release request.
                                        </p>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2 text-sm mt-4">
                                            <div>
                                                <span className="font-semibold text-neutral-600">Amount:</span>{" "}
                                                <span className="text-neutral-900">IDRP {Number(selectedRequest.fundRelease.amount).toLocaleString()}</span>
                                            </div>
                                            <div>
                                                <span className="font-semibold text-neutral-600">Vendor Address:</span>{" "}
                                                <span className="text-neutral-900 font-mono text-xs">{selectedRequest.fundRelease.vendorAddress}</span>
                                            </div>
                                            <div className="col-span-1 md:col-span-2">
                                                <span className="font-semibold text-neutral-600">Description:</span>{" "}
                                                <span className="text-neutral-900">{selectedRequest.fundRelease.description}</span>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <p className="mb-2">
                                            {selectedRequest.initiatedBy} has initiated a request: {selectedRequest.type}
                                        </p>
                                        <p className="mb-2">
                                            Please review the details below before signing.
                                        </p>
                                        {selectedRequest.payload && (
                                            <div className="text-sm text-neutral-600 font-mono bg-neutral-50 p-3 rounded-lg overflow-x-auto mt-2">
                                                {JSON.stringify(selectedRequest.payload, null, 2)}
                                            </div>
                                        )}
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="flex flex-col gap-3">
                            <h3 className="text-lg font-bold text-neutral-900">
                                Approval Progress
                            </h3>
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-neutral-600 text-sm">
                                    Required Signatures:
                                </span>
                                <span className="font-bold text-neutral-900">2 of 3</span>
                            </div>
                            <ul className="flex flex-col gap-3">
                                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            name="check_circle"
                                            className="text-success text-[20px]"
                                        />
                                        <div className="font-semibold text-neutral-900 text-sm">
                                            Investor A{" "}
                                            <span className="text-xs font-medium text-neutral-500">
                                                (You)
                                            </span>
                                        </div>
                                    </div>
                                    <span className="text-xs text-neutral-600">
                                        Jan 20, 10:45 AM
                                    </span>
                                </li>
                                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            name="schedule"
                                            className="text-info text-[20px]"
                                        />
                                        <div className="font-semibold text-neutral-900 text-sm">
                                            Investor B
                                        </div>
                                    </div>
                                    <span className="text-xs text-neutral-600">Pending</span>
                                </li>
                                <li className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg">
                                    <div className="flex items-center gap-3">
                                        <Icon
                                            name="schedule"
                                            className="text-info text-[20px]"
                                        />
                                        <div className="font-semibold text-neutral-900 text-sm">
                                            Investor C
                                        </div>
                                    </div>
                                    <span className="text-xs text-neutral-600">Pending</span>
                                </li>
                            </ul>
                        </div>
                        <div className="border border-red-200 bg-red-50 rounded-xl p-5 flex flex-col gap-4">
                            <h3 className="text-lg font-bold text-danger flex items-center gap-2">
                                <Icon name="warning" className="text-[24px]" />
                                Risk & Context
                            </h3>
                            <div className="text-neutral-700 text-sm">
                                <p className="mb-2">
                                    <span className="font-semibold">Asset Risk Note:</span> Cocoa
                                    Beans are subject to commodity market volatility, geopolitical
                                    risks, and climate-related supply disruptions. This asset
                                    class can experience significant price swings.
                                </p>
                                <p className="mb-2">
                                    <span className="font-semibold">Vault Impact Summary:</span>{" "}
                                    Adding this asset will increase the overall diversification of
                                    Vault Alpha but also introduce exposure to agricultural
                                    commodity specific risks. Initial allocation will be
                                    conservative.
                                </p>
                                <p>
                                    <span className="font-semibold">Liquidity Warning:</span>{" "}
                                    Futures contracts for agricultural commodities may have lower
                                    liquidity compared to major financial instruments, potentially
                                    affecting execution prices during large trades.
                                </p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 pt-4 border-t border-neutral-100">
                            <Button
                                className="bg-danger/10 text-danger hover:bg-danger/20 hover:text-danger transition-colors text-sm font-bold px-5 py-2.5 rounded-lg shadow-none border-none"
                            >
                                Reject
                            </Button>
                            <Button className="px-5 py-2.5 rounded-lg">
                                Sign & Approve
                            </Button>
                        </div>
                    </div>
                </div>
            )}
        </main>
    );
}
