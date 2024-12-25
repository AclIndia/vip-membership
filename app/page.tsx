/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import confetti from "canvas-confetti";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Diamond, Star, Crown, Gift, Shield, Zap, ShoppingCart, TrendingUp, Loader2, Newspaper, BadgeIndianRupee, IndianRupee, ShieldCheck, Blocks } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { members } from "@/data";
import { useRouter } from "next/navigation";

const renewalOptions = [
  { period: "Monthly", price: 5000 },
  { period: "Yearly", price: 30000 },
  { period: "5 Years", price: 122000 },
];

const benefits = [
  { icon: ShieldCheck, text: "ACL Price Protection Plan for all your eligible forward booking orders." },
  { icon: BadgeIndianRupee, text: "Special Access to Discounted VIP Member's Price." },
  { icon: Blocks, text: "Priority Allocation of Stock before it is published to the Open Market." },
  { icon: Newspaper, text: "Get Insider News/Reports & Polymer Trends to support timely Purchase." },
  { icon: IndianRupee, text: "Payment Flexibility For Imported Raw Material." },
];

function ClientContent() {
  const searchParams = useSearchParams();
  const [member, setMember] = useState<any>(null);
  const [selectedRenewal, setSelectedRenewal] = useState<string>("Monthly")
  const [showConfetti, setShowConfetti] = useState(false)
  const [showPrices, setShowPrices] = useState(false)
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const memberId = searchParams.get("member");
    if (memberId) {
      const foundMember = members.find((m) => m.gstin === memberId);
      setMember(foundMember || null);
    }
  }, [searchParams]);

  if (!member) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Member not found
      </div>
    );
  }

  const handleRenew = async () => {
    try {
      const selectedOption = renewalOptions.find(option => option.period === selectedRenewal);
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: 'shailesh.gehlot.sg@gmail.com',
          subject: 'VIP Membership Renewal Confirmation',
          text: `Membership Renewal for ${member.name}`,
          html: `
            <h1>VIP Membership Renewal Confirmation</h1>
            <p><strong>Member Name:</strong> ${member.name}</p>
            <p><strong>GSTIN:</strong> ${member.gstin}</p>
            <p><strong>Selected Plan:</strong> ${selectedRenewal}</p>
            <p><strong>Plan Price:</strong> ₹${selectedOption?.price.toLocaleString()}</p>
            <p><strong>Total Orders:</strong> ${member.totalOrders}</p>
            <p><strong>Total Savings:</strong> ₹${member.totalSaving.toLocaleString()}</p>
          `,
        }),
      });

      if (response.ok) {
        setShowConfetti(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#FFD700", "#000000", "#FFFFFF", "#B8860B"],
        });
        setTimeout(() => setShowConfetti(false), 5000);
      } else {
        console.error("Failed to send email");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden">
    <div className="absolute inset-0 bg-[url('/bg1.jpg')] bg-cover blur-xl"></div>
    <div className="absolute inset-0 bg-[url('/bg2.jpg')] bg-cover mix-blend-multiply"></div>
    <Card className="w-full border-0 mx-auto bg-[url('/bg3.jpg')] rounded-none bg-cover backdrop-blur-sm relative z-10 overflow-hidden">
      <CardHeader className="relative z-10">
      <div className="flex justify-center items-center mb-3">
            <Image
              src="/logo.png"
              alt="Ambica Corporation Limited"
              width={500}
              height={300}
              className="h-8 w-32 md:h-16 md:w-40"
            />
            </div>
      <CardTitle className="text-2xl md:text-3xl font-bold text-black bg-clip-text bg-gradient-to-r from-golden via-yellow-500 to-golden animate-shimmer flex items-center justify-center space-x-4 py-4 px-2">
              <Crown className="h-6 w-6 md:h-10 md:w-10 text-black" />
              <span>VIP Membership</span>
            </CardTitle>
        <CardTitle className="text-2xl md:text-5xl font-bold text-golden">
          Welcome {member.name}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-medium text-golden">Membership GSTIN:</p>
            <p className="text-xl font-bold">{member.gstIn}</p>
          </div>
          <div>
            <p className="text-lg font-medium text-golden">Membership Status:</p>
            <p className="text-xl font-bold">Active</p>
          </div>
        </div>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <motion.div
                className="bg-gradient-to-br from-golden/20 to-golden/5 p-4 rounded-lg border border-golden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <TrendingUp className="text-golden h-8 w-8" />
                  <span className="text-sm text-golden/80">Total Saving</span>
                </div>
                <motion.div
                  className="text-3xl sm:text-4xl font-bold text-golden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  ₹{member.totalSaving.toLocaleString()}
                </motion.div>
              </motion.div>
              <motion.div
                className="bg-gradient-to-br from-golden/20 to-golden/5 p-4 rounded-lg border border-golden"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center justify-between mb-2">
                  <ShoppingCart className="text-golden h-8 w-8" />
                  <span className="text-sm text-golden/80">Total Order</span>
                </div>
                <motion.div
                  className="text-3xl sm:text-4xl font-bold text-golden"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {member.totalOrders}
                </motion.div>
              </motion.div>
            </div>
        <div>
          <p>Your Membership Expires on 31st March 2025</p>
        </div>

        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-transparent p-6 rounded-lg "
        >
          <h3 className="text-xl md:text-2xl font-semibold text-golden mb-4 text-center">
            Membership Renewal
          </h3>
          {showPrices ? (
            <>
              <RadioGroup
                onValueChange={setSelectedRenewal}
                defaultValue={selectedRenewal}
                className="space-y-4"
              >
                {renewalOptions.map((option) => (
                  <div key={option.period} className="flex items-center justify-center">
                  <div
                    className="flex items-center space-x-1 bg-transparent justify-center rounded-md"
                  >
                    <RadioGroupItem
                      value={option.period}
                      id={option.period}
                      className="text-golden border-golden"
                    />
                    <Label htmlFor={option.period} className="text-white text-sm md:text-lg">
                      {option.period} - ₹{option.price.toLocaleString()}
                    </Label>
                  </div>
                </div>
                
                ))}
              </RadioGroup>
              <Dialog>
              <DialogTrigger asChild>
                <Button className="w-full mt-4 bg-gradient-to-r from-golden via-yellow-500 to-golden text-black text-lg font-bold py-6 hover:from-golden hover:via-yellow-400 hover:to-golden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-golden/50">
                  Continue
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-black border-golden rounded-lg">
                <DialogHeader>
                  <DialogTitle className="text-golden text-2xl">
                    Confirm VIP Membership Renewal
                  </DialogTitle>
                </DialogHeader>
                <p className="text-white text-lg">
                  Are you sure you want to renew your VIP membership for{" "}
                  {selectedRenewal}?
                </p>
                <Button
                  onClick={handleRenew}
                  disabled={isLoading}
                  className="w-full mt-4 bg-gradient-to-r from-golden via-yellow-500 to-golden text-black text-lg font-bold py-6 hover:from-golden hover:via-yellow-400 hover:to-golden"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    "Confirm Renewal"
                  )}
                </Button>
              </DialogContent>
            </Dialog>
            </>
          ) : (
            <Button
              onClick={() => setShowPrices(true)}
              className="w-full mt-4 bg-gradient-to-r from-golden via-yellow-500 to-golden text-black text-lg font-bold py-6 hover:from-golden hover:via-yellow-400 hover:to-golden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-golden/50"
            >
              Renew VIP Membership
            </Button>
          )}
        </motion.div>

        <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-black/40 p-6 rounded-lg border border-golden/30"
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

        <Separator className="bg-yellow-500"/>

        <div className="text-yellow-500 text-center">
          <p>Priority Desk</p>
          <p>+91 999-999-9999</p>
        </div>
      </CardContent>
    </Card>
    <AnimatePresence>
      {showConfetti && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="text-3xl font-bold text-black bg-clip-text bg-gradient-to-r from-golden via-yellow-500 to-golden animate-shimmer py-3 px-3"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.5, opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              VIP Membership Renewed!
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen text-white">
        Loading...
      </div>
    }>
      <ClientContent />
    </Suspense>
  );
}

