import React from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import { Badge } from "./ui/badge";

interface Contribution {
  repo: string;
  prCount: number;
  mergedCount: number;
  value: number; // e.g. impact score or stars
}

interface ContributorProfileProps {
  name: string;
  avatarUrl?: string;
  bio?: string;
  contributions: Contribution[];
}

export const ContributorProfile: React.FC<ContributorProfileProps> = ({
  name,
  avatarUrl,
  bio,
  contributions,
}) => {
  const totalPRs = contributions.reduce((sum, c) => sum + c.prCount, 0);
  const totalMerges = contributions.reduce((sum, c) => sum + c.mergedCount, 0);
  const totalValue = contributions.reduce((sum, c) => sum + c.value, 0);

  return (
    <Card className="max-w-xl mx-auto p-8 rounded-2xl shadow-lg bg-background border">
      <div className="flex flex-col items-center mb-8">
        <Avatar className="size-24 mb-4 border-2 border-primary">
          {avatarUrl ? (
            <AvatarImage src={avatarUrl} alt={name} />
          ) : (
            <AvatarFallback className="text-2xl font-bold">{name[0]}</AvatarFallback>
          )}
        </Avatar>
        <h2 className="text-2xl font-bold text-foreground mb-1">{name}</h2>
        {bio && <p className="text-muted-foreground text-center mb-2">{bio}</p>}
        <div className="flex gap-4 mt-2">
          <Badge variant="outline">Total PRs: {totalPRs}</Badge>
          <Badge variant="outline">Merges: {totalMerges}</Badge>
          <Badge variant="outline">Impact: {totalValue}</Badge>
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-3 text-foreground">Open Source History</h3>
        <div className="space-y-3">
          {contributions.map((c) => (
            <div key={c.repo} className="flex items-center justify-between bg-muted/40 rounded-lg px-4 py-2">
              <span className="font-medium text-foreground">{c.repo}</span>
              <div className="flex gap-3">
                <Badge variant="secondary">PRs: {c.prCount}</Badge>
                <Badge variant="secondary">Merges: {c.mergedCount}</Badge>
                <Badge variant="outline">Value: {c.value}</Badge>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};
