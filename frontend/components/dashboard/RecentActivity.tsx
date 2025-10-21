import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { activities } from "@/constants";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

const RecentActivity = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-4">
            <Avatar className="h-9 w-9">
              <AvatarImage
                src={activity.user.avatar.imageUrl}
                alt={activity.user.name}
              />
              <AvatarFallback>{activity.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="grid gap-1 text-sm">
              <p className="font-medium">
                <span className="font-semibold">{activity.user.name}</span>{" "}
                {activity.action}{" "}
                <span className="font-semibold">{activity.target}</span>
              </p>
              <p className="text-muted-foreground">{activity.timestamp}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default RecentActivity;
