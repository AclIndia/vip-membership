"use server"
import prismadb from "@/lib/prismadb";

type RenewalData = {
    id: string;
    memberName: string;
    gstin: string;
    plan: string;
    price: number;
    createdAt: Date;
}

type RenewalResponse = {
    data: RenewalData | null;
    error?: string;
}

export async function checkExistingRenewal(gstin: string): Promise<RenewalResponse> {
    try {
        const member = await prismadb.renwalOption.findUnique({
            where: {
                gstin
            }
        });

        return {
            data: member as RenewalData
        };
    } catch (error) {
        console.log("[CHECK EXISTING]", error);
        return {
            data: null,
            error: "Not Found"
        };
    }
}