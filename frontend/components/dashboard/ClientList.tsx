"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { clients } from "@/constants";
import { Client } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const ClientList = () => {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const handleClientSelect = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Clients</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {clients.map((client) => (
          <button
            key={client.id}
            onClick={() => handleClientSelect(client)}
            className="flex items-center justify-between w-full text-left p-2 -m-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="flex items-center gap-4">
              <Avatar className="h-10 w-10">
                <AvatarImage src={client.avatar.imageUrl} alt={client.name} />
                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">
                  {client.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {client.online ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            {client.online && (
              <div className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
        ))}
      </CardContent>
    </Card>
  );
};

export default ClientList;
