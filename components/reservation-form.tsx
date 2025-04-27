"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useReservations } from "./reservation-provider";
import { formatDisplayDate, formatDisplayTime } from "@/lib/utils";

const formSchema = z.object({
  guestName: z.string().min(2, "Full name is required"),
  guestEmail: z.string().email("A valid email is required"),
  guestPhone: z.string().min(10, "A valid phone number is required"),
  partySize: z.coerce.number().min(1).max(20, "Maximum party size is 20"),
  specialRequests: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

interface ReservationFormProps {
  selectedDate: string;
  selectedTime: string;
}

export default function ReservationForm({
  selectedDate,
  selectedTime,
}: ReservationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const router = useRouter();
  const { toast } = useToast();
  const { addReservation } = useReservations();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      guestName: "",
      guestEmail: "",
      guestPhone: "",
      partySize: 2,
      specialRequests: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      // Submit reservation to our mock database
      await addReservation({
        ...data,
        date: selectedDate,
        time: selectedTime,
      });

      // Show success state
      setIsSuccess(true);

      toast({
        title: "Reservation Submitted!",
        description:
          "We have received your reservation request and will confirm it shortly.",
      });

      // Reset form
      form.reset();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong",
        description:
          "There was an error submitting your reservation. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center py-10 space-y-4">
        <h3 className="text-2xl font-bold text-primary">Thank You!</h3>
        <p className="text-lg">Your reservation request has been submitted.</p>
        <p className="text-muted-foreground">
          We will review your request and send a confirmation to your email
          shortly.
        </p>
        <div className="bg-muted p-4 rounded-lg inline-block mx-auto mt-4">
          <p>
            <strong>Date:</strong> {formatDisplayDate(selectedDate)}
          </p>
          <p>
            <strong>Time:</strong> {formatDisplayTime(selectedTime)}
          </p>
          <p>
            <strong>Party Size:</strong> {form.getValues().partySize}
          </p>
        </div>
        <div className="pt-6">
          <Button onClick={() => router.push("/")}>Return to Home</Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Your Reservation Details</h3>
        <p className="text-muted-foreground">
          {formatDisplayDate(selectedDate)} at {formatDisplayTime(selectedTime)}
        </p>
      </div>

      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="guestName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input placeholder="John Smith" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid gap-6 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="guestEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="you@example.com"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="guestPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="(555) 123-4567" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="partySize"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Party Size</FormLabel>
                <FormControl>
                  <Input type="number" min="1" max="20" {...field} />
                </FormControl>
                <FormDescription>
                  For parties larger than 8, please call us directly.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="specialRequests"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Special Requests</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Any dietary restrictions, celebrations, or seating preferences?"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  We'll do our best to accommodate your requests.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Complete Reservation"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
