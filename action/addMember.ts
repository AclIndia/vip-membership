"use server";

import prismadb from "@/lib/prismadb";
import { MemberFormValues, memberSchema } from "@/schemas";

export async function addMember(values: MemberFormValues) {
  try {
    const validatedFields = memberSchema.safeParse(values);

    if (!validatedFields.success) {
      return { error: "Invalid Fields" };
    }

    const {
      companyName,
      email,
      gstin,
      membershipExpiry,
      name,
      totalOrders,
      totalSavings,
    } = validatedFields.data;

    const existingMember = await prismadb.member.findFirst({
        where: {
          OR: [
            { gstin: gstin },
            { email: email },
          ],
        },
      });

    if (existingMember) {
      return { error: "Member Already Exist" };
    }

    const member = await prismadb.member.create({
      data: {
        companyName,
        email,
        gstin,
        membershipExpiry,
        name,
        totalOrders,
        totalSavings,
      },
    });

    return { success: true, member };
  } catch (error) {
    console.log("[Add Member]", error);
    return { error: "Failed to Add" };
  }
}
