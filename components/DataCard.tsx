"use client";
import React from "react";
import {
  CardContent,
  CardDescription,
  CardFooter,
  Card,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { useRouter } from "next/navigation";

const DataCard = ({
  title,
  description,
  content,
  footer,
  href,
}: {
  title: string;
  description: string;
  content?: React.ReactNode;
  footer?: React.ReactNode;
  href: string;
}) => {
    const router = useRouter();
  return (
    <Card onClick={() => router.push(href)}>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      {content && <CardContent>{content}</CardContent>}
      {footer && <CardFooter>{footer}</CardFooter>}
    </Card>
  );
};

export default DataCard;
