import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Crown, ArrowUp, ArrowDown, Minus, Trophy } from "lucide-react";
import { motion } from "framer-motion";

interface LeaderboardUser {
  rank: number;
  name: string;
  avatar: string;
  xp: number;
  change: number | null;
  lastSubmission: string;
  initials: string;
}

const leaderboardData: LeaderboardUser[] = [
  {
    rank: 1,
    name: "Abhishek Verma",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    xp: 1600,
    change: null,
    lastSubmission: "1 day ago",
    initials: "AV"
  },
  {
    rank: 2,
    name: "DHRUV KUMAR",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    xp: 1550,
    change: 33,
    lastSubmission: "7 hrs 52 min ago",
    initials: "DK"
  },
  {
    rank: 3,
    name: "Adityaraj Pal",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    xp: 1150,
    change: null,
    lastSubmission: "2 hrs 25 min ago",
    initials: "AP"
  },
  {
    rank: 4,
    name: "Ansh Tomar",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    xp: 960,
    change: 66,
    lastSubmission: "7 hrs 43 min ago",
    initials: "AT"
  },
  {
    rank: 5,
    name: "Priya Sharma",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    xp: 875,
    change: 12,
    lastSubmission: "3 hrs 15 min ago",
    initials: "PS"
  },
  {
    rank: 6,
    name: "Rahul Singh",
    avatar: "https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=100&h=100&fit=crop",
    xp: 820,
    change: -3,
    lastSubmission: "5 hrs 30 min ago",
    initials: "RS"
  },
  {
    rank: 28,
    name: "Malhar Mahanwar",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&h=100&fit=crop",
    xp: 465,
    change: -6,
    lastSubmission: "1 day ago",
    initials: "MM"
  }
];

const getRankBadgeColor = (rank: number) => {
  if (rank === 1) return "bg-gradient-to-br from-yellow-300 to-yellow-500";
  if (rank === 2) return "bg-gradient-to-br from-slate-300 to-slate-400";
  if (rank === 3) return "bg-gradient-to-br from-orange-300 to-orange-400";
  return "bg-slate-100";
};

const getRankBadgeTextColor = (rank: number) => {
  if (rank <= 3) return "text-slate-800";
  return "text-slate-600";
};

export default function Leaderboard() {
  const [timeFilter, setTimeFilter] = useState("all-time");
  const [dateFilter, setDateFilter] = useState("oct-25");

  const topThree = leaderboardData.slice(0, 3).sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-700 via-green-700 to-green-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4"
        >
          <div className="flex gap-2">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="All Time" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateFilter} onValueChange={setDateFilter}>
              <SelectTrigger className="w-32 bg-white">
                <SelectValue placeholder="Oct 25" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oct-25">Oct 25</SelectItem>
                <SelectItem value="oct-24">Oct 24</SelectItem>
                <SelectItem value="oct-23">Oct 23</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="h-px w-12 bg-white/30" />
              <div className="bg-white px-4 py-1 rounded text-xs font-semibold text-purple-900">
                OCTOBER 2025 CONTEST
              </div>
              <div className="h-px w-12 bg-white/30" />
            </div>
            <div className="flex items-center justify-center gap-2">
              <Crown className="w-6 h-6 text-yellow-300" />
              <h1 className="text-4xl md:text-5xl font-bold text-white">Leaderboard</h1>
            </div>
          </div>

          <Button className="bg-white text-purple-900 hover:bg-white/90 font-semibold">
            How it Works
          </Button>
        </motion.div>

        {/* Top 3 Podium */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-end justify-center gap-4 md:gap-8 mb-8"
        >
          {/* 2nd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-3">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-slate-300 ring-4 ring-white/20">
                <AvatarImage src={topThree[1]?.avatar} />
                <AvatarFallback className="bg-teal-500 text-white text-xl font-bold">
                  {topThree[1]?.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-slate-300 to-slate-400 text-slate-800 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                <Crown className="w-4 h-4 mr-0.5" />
                2
              </div>
            </div>
            <p className="text-white font-semibold text-sm md:text-base truncate max-w-[120px]">
              {topThree[1]?.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-bold">{topThree[1]?.xp}</span>
            </div>
          </motion.div>

          {/* 1st Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-3">
              <Avatar className="w-28 h-28 md:w-32 md:h-32 border-4 border-yellow-400 ring-4 ring-white/20 shadow-2xl">
                <AvatarImage src={topThree[0]?.avatar} />
                <AvatarFallback className="bg-purple-500 text-white text-2xl font-bold">
                  {topThree[0]?.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-yellow-300 to-yellow-500 text-slate-800 rounded-full w-12 h-12 flex items-center justify-center font-bold shadow-lg">
                <Crown className="w-5 h-5 mr-0.5" />
                1
              </div>
            </div>
            <p className="text-white font-semibold text-base md:text-lg truncate max-w-[140px]">
              {topThree[0]?.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Trophy className="w-5 h-5 text-yellow-400" />
              <span className="text-white font-bold text-lg">{topThree[0]?.xp}</span>
            </div>
          </motion.div>

          {/* 3rd Place */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col items-center"
          >
            <div className="relative mb-3">
              <Avatar className="w-20 h-20 md:w-24 md:h-24 border-4 border-orange-400 ring-4 ring-white/20">
                <AvatarImage src={topThree[2]?.avatar} />
                <AvatarFallback className="bg-blue-500 text-white text-xl font-bold">
                  {topThree[2]?.initials}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-br from-orange-300 to-orange-400 text-slate-800 rounded-full w-10 h-10 flex items-center justify-center font-bold shadow-lg">
                <Crown className="w-4 h-4 mr-0.5" />
                3
              </div>
            </div>
            <p className="text-white font-semibold text-sm md:text-base truncate max-w-[120px]">
              {topThree[2]?.name}
            </p>
            <div className="flex items-center gap-1 mt-1">
              <Trophy className="w-4 h-4 text-yellow-400" />
              <span className="text-white font-bold">{topThree[2]?.xp}</span>
            </div>
          </motion.div>
        </motion.div>


        {/* Leaderboard Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white rounded-2xl overflow-hidden shadow-2xl"
        >
          {/* Table Header */}
          <div className="bg-slate-50 px-6 py-4 grid grid-cols-12 gap-4 text-sm font-semibold text-slate-600 border-b">
            <div className="col-span-1 flex items-center gap-1">
              <Crown className="w-4 h-4 text-yellow-500" />
              RANK
            </div>
            <div className="col-span-1">CHANGE</div>
            <div className="col-span-4">NAME</div>
            <div className="col-span-3">XP THIS MONTH</div>
            <div className="col-span-3 text-right">LATEST SUBMISSION</div>
          </div>

          {/* Table Rows */}
          <div className="divide-y">
            {leaderboardData.map((user, index) => (
              <motion.div
                key={user.rank}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.05 }}
                className={`px-6 py-4 grid grid-cols-12 gap-4 items-center hover:bg-slate-50 transition-colors ${user.rank === 28 ? 'bg-yellow-50/50' : ''
                  }`}
              >
                {/* Rank */}
                <div className="col-span-1">
                  <Badge className={`${getRankBadgeColor(user.rank)} ${getRankBadgeTextColor(user.rank)} hover:${getRankBadgeColor(user.rank)} px-3 py-1 font-bold flex items-center gap-1 w-fit`}>
                    {user.rank <= 3 && <Crown className="w-3 h-3" />}
                    {user.rank}
                  </Badge>
                </div>

                {/* Change */}
                <div className="col-span-1">
                  {user.change === null ? (
                    <Minus className="w-4 h-4 text-slate-300" />
                  ) : user.change > 0 ? (
                    <div className="flex items-center gap-1 text-green-600 font-semibold text-sm">
                      <ArrowUp className="w-4 h-4" />
                      {user.change}
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-red-600 font-semibold text-sm">
                      <ArrowDown className="w-4 h-4" />
                      {Math.abs(user.change)}
                    </div>
                  )}
                </div>

                {/* Name */}
                <div className="col-span-4 flex items-center gap-3">
                  <Avatar className="w-10 h-10 border-2 border-slate-200">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback className={`${user.rank === 2 ? 'bg-teal-500' : 'bg-slate-400'
                      } text-white font-semibold`}>
                      {user.initials}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium text-slate-900">{user.name}</span>
                </div>

                {/* XP */}
                <div className="col-span-3 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  <span className="font-bold text-slate-900">{user.xp}</span>
                </div>

                {/* Last Submission */}
                <div className="col-span-3 text-right text-slate-600 text-sm">
                  {user.lastSubmission}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}