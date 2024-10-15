"use client";

import CountDown from "@/components/CountDown";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@radix-ui/react-toast";
import { useCallback } from "react";

const googleCalendarInfo = {
  eventTitle: "Luigi e Gabrieli 🍾",
  eventDescription: "Estamos felizes em convidar você para o nosso casamento",
  eventStartDate: "20251121T210000Z",
  eventEndDate: "20251122T070000Z",
  eventLocation:
    "Indaiá Eventos - Blumenau | Salão de Eventos, Festas & Casamentos, R. Espanha, 67 - Velha, Blumenau - SC, 89036-310",
};

const googleCalendarUrl = `https://calendar.google.com/calendar/event?action=TEMPLATE&text=${encodeURIComponent(
  googleCalendarInfo.eventTitle,
)}&dates=${googleCalendarInfo.eventStartDate}/${googleCalendarInfo.eventEndDate}&details=${encodeURIComponent(
  googleCalendarInfo.eventDescription,
)}&location=${encodeURIComponent(
  googleCalendarInfo.eventLocation,
)}&sf=true&output=xml`;

export default function Home() {
  const { toast } = useToast();

  const handleAddToCalendar = useCallback(() => {
    toast({
      title: "Adicionar no Google Calendar",
      description: "Sexta feira, 21 de Novembro 2025 às 18:00",
      action: (
        <ToastAction
          altText="Adicionar no Google Calendar"
          onClick={() => window.open(googleCalendarUrl, "_blank")}
        >
          Abrir Google Calendar
        </ToastAction>
      ),
    });
  }, [toast]);

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-blue-50 dark:bg-muted transition-colors">
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>
      <Card className="w-full max-w-lg text-center p-6 md:p-10 border border-gold dark:border-gray-200 shadow-lg rounded-lg transition-all mx-4 sm:mx-8">
        <CardContent>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-pink-600 dark:text-foreground mb-4">
            Luigi & Gabrieli 🍾
          </h1>
          <p className="text-base sm:text-lg text-blue-500 dark:text-muted-foreground mb-6">
            Estamos felizes em convidar você para o nosso casamento
          </p>
          <p className="text-lg sm:text-xl font-medium mb-4">
            Sexta feira, 21 de Novembro 2025
          </p>
          <p className="text-md sm:text-lg mb-4">Castelo Suiço, Blumenau</p>
          <Button
            onClick={handleAddToCalendar}
            className="bg-pink-500 text-white hover:bg-pink-600 dark:bg-primary dark:text-primary-foreground px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base"
          >
            Responder até 30 de março de 2025
          </Button>
        </CardContent>
        <CountDown />
      </Card>
      <Toaster />
    </div>
  );
}
