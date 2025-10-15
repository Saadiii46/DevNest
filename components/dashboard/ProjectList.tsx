import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Progress } from "../ui/progress";
import { projects } from "@/constants";
import { Badge } from "../ui/badge";

const statusVariant = {
  "In Progress": "secondary",
  Completed: "default",
  "On Hold": "destructive",
} as const;

export const ProjectList = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline">My Projects</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead className="hidden sm:table-cell">Client</TableHead>
              <TableHead className="hidden md:table-cell">Status</TableHead>
              <TableHead className="hidden lg:table-cell">Progress</TableHead>
              <TableHead>Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {projects.map((project) => (
              <TableRow key={project.id}>
                <TableCell className="font-medium">{project.name}</TableCell>
                <TableCell className="hidden sm:table-cell">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage
                        src={project.client.avatar.imageUrl}
                        alt={project.client.name}
                      />
                      <AvatarFallback>
                        {project.client.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{project.client.name}</span>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge variant={statusVariant[project.status]}>
                    {project.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
                  <div className="flex items-center gap-2">
                    <Progress value={project.progress} className="h-2 w-24" />
                    <span>{project.progress}%</span>
                  </div>
                </TableCell>
                <TableCell>{project.dueDate}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
