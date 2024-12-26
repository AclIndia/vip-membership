/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Mail } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-transparent text-white relative overflow-hidden flex items-center justify-center">
      <div className="absolute inset-0 bg-cover blur-xl"></div>
      <div className="absolute inset-0 bg-cover mix-blend-multiply"></div>
      <Card className="w-full max-w-2xl border-0 mx-auto  rounded-none bg-cover backdrop-blur-sm relative z-10 overflow-hidden">
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
        </CardHeader>
        <CardContent className="space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-golden mb-4">Thank You!</h1>
            <p className="text-xl md:text-2xl mb-8">Your VIP Membership has been successfully renewed.</p>
            {/* <Link href="/">
              <Button className="bg-gradient-to-r from-golden via-yellow-500 to-golden text-black text-lg font-bold py-6 px-8 hover:from-golden hover:via-yellow-400 hover:to-golden transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-golden/50">
                Back to Home
              </Button>
            </Link> */}
          </motion.div>
        </CardContent>
        <CardFooter className="relative z-10 bg-black/30 mt-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-center w-full"
          >
            <div className="flex items-center justify-center space-x-2 text-golden mb-2">
              <Mail className="h-5 w-5" />
              <span className="font-semibold">Email Confirmation</span>
            </div>
            <p className="text-sm md:text-base text-white/80">
              You will receive an email confirmation of your VIP Membership renewal shortly.
            </p>
            <p className="text-sm md:text-base text-white/80 mt-1">
              If you don't see it in your inbox, please check your spam folder.
            </p>
          </motion.div>
        </CardFooter>
      </Card>
    </div>
  );
}

