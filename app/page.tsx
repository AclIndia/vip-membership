/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, Suspense, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Loader2, Check, Coins, ShieldCheck, BadgeIndianRupee, Blocks, Newspaper, IndianRupee } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";
import { members } from "@/data";
import dynamic from "next/dynamic";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { checkExistingRenewal } from "@/action/checkExistingRenewal";

const Confetti = dynamic(() => import("react-confetti"), { ssr: false });

const plans = [
  { name: "5 Years", price: 220000, duration: "5 years", months: 60 },
  { name: "Yearly", price: 30000, duration: "year", months: 12 },
  { name: "Monthly", price: 5000, duration: "month", months: 1 },
];

const benefits = [
  {
    icon: ShieldCheck,
    text: "ACL Price Protection Plan for all your eligible forward booking orders.",
  },
  {
    icon: BadgeIndianRupee,
    text: "Special Access to Discounted VIP Member's Price.",
  },
  {
    icon: Blocks,
    text: "Priority Allocation of Stock before it is published to the Open Market.",
  },
  {
    icon: Newspaper,
    text: "Get Insider News/Reports & Polymer Trends to support timely Purchase.",
  },
  { icon: IndianRupee, text: "Payment Flexibility For Imported Raw Material." },
];

function ClientContent() {
  const searchParams = useSearchParams();
  const memberId = searchParams.get("id");
  const member = members.find((m) => m.id === Number(memberId));

  const [selectedPlan, setSelectedPlan] = useState<(typeof plans)[0] | null>(
    null
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [newExpiryDate, setNewExpiryDate] = useState<string | null>(null);

  const handleRenew = (plan: (typeof plans)[0]) => {
    setSelectedPlan(plan);
    setIsDialogOpen(true);
  };


  useEffect(() => {
    if (member) {
        checkExistingRenewal(member.gstin)
            .then((response) => {
                if (response.data) {
                    console.log(response.data);
                    
                    setSelectedPlan(plans.find(p => p.price === response.data?.price) || null);
                    setNewExpiryDate(calculateNewExpiryDate(
                        member.membershipExpiry,
                        plans.find(p => p.price === response.data?.price)?.months || 0
                    ));
                    setShowThankYou(true);
                    setShowConfetti(true);
                    confetti({
                        particleCount: 150,
                        spread: 70,
                        origin: { y: 0.6 },
                        colors: ["#FFD700", "#000000", "#FFFFFF", "#B8860B"],
                    });
                    setTimeout(() => {
                        setShowConfetti(false);
                    }, 5000);
                } else if (response.error) {
                    console.error('Error:', response.error);
                }
            })
            .catch((error) => {
                console.error('Failed to check renewal:', error);
            });
    }
}, [member]);

  const calculateNewExpiryDate = (currentExpiry: string, monthsToAdd: number) => {
    // Parse the date string (e.g., "31st March 2025")
    const dateRegex = /(\d+)(?:st|nd|rd|th)\s+(\w+)\s+(\d{4})/;
    const matches = currentExpiry.match(dateRegex);
    
    if (!matches) {
      throw new Error("Invalid date format");
    }
  
    const [_, day, monthStr, year] = matches;
    
    // Convert month name to month number (0-11)
    const months = {
      January: 0, February: 1, March: 2, April: 3, May: 4, June: 5,
      July: 6, August: 7, September: 8, October: 9, November: 10, December: 11
    };
    
    // Create date object
    const date = new Date(
      parseInt(year),
      months[monthStr as keyof typeof months],
      parseInt(day)
    );
    
    // Add months
    date.setMonth(date.getMonth() + monthsToAdd);
    
    // Handle month/year rollover
    if (date.getDate() !== parseInt(day)) {
      // If the day doesn't match, we've hit the end of the month
      // Go back to the last day of the previous month
      date.setDate(0);
    }
    
    // Format the date with ordinal suffix
    const getOrdinalSuffix = (d: number) => {
      if (d > 3 && d < 21) return 'th';
      switch (d % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    };
    
    const formattedDay = `${date.getDate()}${getOrdinalSuffix(date.getDate())}`;
    const formattedMonth = date.toLocaleString('default', { month: 'long' });
    const formattedYear = date.getFullYear();
    
    return `${formattedDay} ${formattedMonth} ${formattedYear}`;
  };

  if (!member) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Member not found
      </div>
    );
  }

  const confirmRenewal = async () => {
    if (!selectedPlan || !member) return;
    const newExpiry = calculateNewExpiryDate(
      member.membershipExpiry,
      selectedPlan.months
    );
    setIsLoading(true);
    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: member.email,
          memberName: member.name,
          gstin: member.gstin,
          plan: selectedPlan.name,
          price: selectedPlan?.price,
        }),
      });

      if (response.ok) {
        setNewExpiryDate(newExpiry);
        setShowConfetti(true);
        setShowThankYou(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#000000", "#FFFFFF", "#B8860B"],
        });
        setTimeout(() => {
          setShowConfetti(false);
        }, 5000);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
    setIsLoading(false);
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen  bg-[url('/4016.png')] bg-cover text-white">
      <header className="from-yellow-600 to-yellow-500 p-6 shadow-lg text-2xl md:text-3xl font-bold text-black bg-clip-text bg-gradient-to-r from-golden via-yellow-500 to-golden animate-shimmer space-x-4 py-4 px-2">
        <div className="flex justify-center items-center mb-3">
          <Image
            src="/logo.png"
            alt="Ambica Corporation Limited"
            width={500}
            height={300}
            className="h-8 w-32 md:h-16 md:w-48"
          />
        </div>
        <h1 className="text-3xl font-bold text-center">Membership Renewal</h1>
      </header>
      <main className="container mx-auto px-4 py-8">
        <p className="text-2xl mb-5">
          Welcome{" "}
          <span className="text-yellow-500 font-bold">{member.name}</span>
        </p>
        <p>Choose required plan.</p>
        <div className="grid gap-8 md:grid-cols-3 mb-8">
          {plans.map((plan) => (
            <Card key={plan.name} className="bg-transparent border-yellow-500">
              <CardHeader>
                <CardTitle className="text-2xl text-yellow-500">
                  {plan.name}
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Renew for {plan.duration}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-3xl font-bold text-yellow-500">
                  ₹{plan.price.toLocaleString()}
                </p>
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  onClick={() => handleRenew(plan)}
                >
                  Renew Now
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        <Card className="bg-transparent border-0 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-yellow-500">
              Member Information
            </CardTitle>
            <CardDescription>
              Your ACL VIP Membership Saved you As of 30th December 2024
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <Card className="bg-transparent border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-yellow-500">
                    Total Orders
                  </CardTitle>
                  <ShoppingCart className="h-6 w-6 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{member.totalOrders}</div>
                  <p className="text-xs text-gray-400">Lifetime orders</p>
                </CardContent>
              </Card>
              <Card className="bg-transparent border-yellow-500">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium text-yellow-500">
                    Total Savings
                  </CardTitle>
                  <Coins className="h-6 w-6 text-yellow-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ₹{member.totalSaving.toLocaleString()}
                  </div>
                  <p className="text-xs text-gray-400">Amount saved</p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className=" p-6 rounded-lg border border-golden/30"
          >
            <h3 className="text-2xl font-semibold text-golden mb-4">
              Exclusive VIP Benefits
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 md:gap-6 gap-2">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  className="flex items-center p-1 rounded-md gap-2"
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.3, delay: 0.1 * index }}
                >
                  <benefit.icon className="md:h-8 md:w-8 w-5 h-5 text-golden" />
                  <span className="md:text-lg text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        <div className="w-full rounded-md flex items-center justify-center">
            <iframe
              src="https://www.youtube.com/embed/p-PzYHNKaQI?si=diDEZJrjEZeUDTQi"
              title="ACL VIP Priority Membership"
              className="h-56 w-56 md:w-[450px] md:h-80 border-0 rounded-md"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              referrerPolicy="strict-origin-when-cross-origin"
            />
          </div>
      <Separator className="bg-yellow-500" />

          <div className="text-yellow-500 text-center">
            <p>Priority Desk</p>
            <p>+91 999-999-9999</p>
          </div>
      </main>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-gray-900 text-white border-yellow-500">
          <DialogHeader>
            <DialogTitle className="text-yellow-500">
              Confirm Renewal
            </DialogTitle>
            <DialogDescription className="text-gray-400">
              You are renewing your membership for the {selectedPlan?.name}{" "}
              plan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-5 md:gap-2">
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button
              onClick={confirmRenewal}
              disabled={isLoading}
              className="bg-yellow-500 hover:bg-yellow-600 text-black"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </>
              ) : (
                "Confirm"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {showThankYou && (
        <>
          {showConfetti && <Confetti className="fixed inset-0 z-50" />}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-50" />
          <Dialog open={showThankYou} onOpenChange={() => {}}>
            <DialogContent
              className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-900 text-white border-yellow-500 z-50"
              onPointerDownOutside={(e) => e.preventDefault()}
            >
              <DialogHeader>
                <DialogTitle className="text-3xl font-bold text-yellow-500">
                  Thank You!
                </DialogTitle>
                <DialogDescription className="text-xl text-gray-200">
                  Your membership has been successfully renewed.
                </DialogDescription>
              </DialogHeader>
              <div className="text-center text-gray-300 space-y-2">
                <p>Renewed successfully for {selectedPlan?.name} plan.</p>
                <p>
                  Valid until:{" "}
                  <span className="font-bold text-yellow-500">
                    {newExpiryDate}
                  </span>
                </p>
                <p>
                  A payment invoice will be sent to your email:{" "}
                  <span className="font-bold">{member.email}</span>
                </p>
              </div>
            </DialogContent>
          </Dialog>
          {showConfetti && <Confetti className="fixed inset-0 z-50" />}
        </>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center h-screen text-white">
          Loading...
        </div>
      }
    >
      <ClientContent />
      
      <div className="bg-yellow-500 py-5">
        <p className="text-center text-black">
        © 2024 Ambica Corporation Limited. All Rights Reserved.
        </p>
      </div>
    </Suspense>
  );
}
