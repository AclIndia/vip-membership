/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { memberSchema, MemberFormValues } from "@/schemas"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { addMember } from "@/action/addMember"
import { toast } from "react-toastify"

export function AddMemberForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      companyName: "",
      gstin: "",
      totalOrders: 0,
      totalSavings: 0,
      email: "",
      membershipExpiry: "",
    },
  })

  async function onSubmit(values: MemberFormValues) {
    setIsSubmitting(true)
    try {
      const result = await addMember(values)
      if (result.success) {
        toast.success('Member added successfully!')
        form.reset()
      } else {
        toast.error('Failed to add Member')
      }
    } catch (error) {
      toast.error('An unexpected error occurred. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="companyName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Company Name</FormLabel>
              <FormControl>
                <Input placeholder="Acme Inc." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="gstin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GSTIN</FormLabel>
              <FormControl>
                <Input placeholder="22AAAAA0000A1Z5" {...field} />
              </FormControl>
              <FormDescription>
                Enter the 15-digit Goods and Services Tax Identification Number
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalOrders"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Orders</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseInt(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="totalSavings"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Total Savings</FormLabel>
              <FormControl>
                <Input type="number" {...field} onChange={e => field.onChange(parseFloat(e.target.value))} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="membershipExpiry"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Membership Expiry</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormDescription>
                Enter the membership expiry date
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Member"}
        </Button>
      </form>
    </Form>
  )
}

