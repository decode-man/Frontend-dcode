import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '../components/ui/card'
import { Avatar, AvatarFallback } from '../components/ui/avatar'
import { Badge } from '../components/ui/badge'
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '../components/ui/table'
import { Button } from '../components/ui/button'
import { GitBranch, GitPullRequest, CheckCircle } from 'lucide-react'

// Mock data types
interface RepoContribution { repo: string; prCount: number; merged: number; lastContribution: string; }
interface Issue { id: number; title: string; repo: string; state: 'open' | 'closed'; assignedAt: string }
interface Activity { time: string; text: string }

const mockRepos: RepoContribution[] = [
  { repo: 'decode-man/Frontend-dcode', prCount: 12, merged: 10, lastContribution: '2025-09-28' },
  { repo: 'decode-man/Backend-dcode', prCount: 7, merged: 5, lastContribution: '2025-08-14' },
  { repo: 'oss/awesome-list', prCount: 3, merged: 2, lastContribution: '2025-07-02' },
]

const mockIssues: Issue[] = [
  { id: 341, title: 'Fix navbar responsiveness', repo: 'decode-man/Frontend-dcode', state: 'open', assignedAt: '2025-09-30' },
  { id: 298, title: 'Improve auth flow error handling', repo: 'decode-man/Backend-dcode', state: 'open', assignedAt: '2025-09-12' },
  { id: 215, title: 'Add tests for utils', repo: 'oss/awesome-list', state: 'closed', assignedAt: '2025-07-10' },
]

const mockActivity: Activity[] = [
  { time: '2 days ago', text: 'Merged PR #128 in decode-man/Frontend-dcode' },
  { time: '6 days ago', text: 'Opened PR #45 in oss/awesome-list' },
  { time: '3 weeks ago', text: 'Commented on issue #210 in decode-man/Backend-dcode' },
]

const ContributorProfilePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-background py-10 px-4">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: profile card */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="size-24 mb-4">
                <AvatarFallback className="text-2xl font-bold">P</AvatarFallback>
              </Avatar>
              <h2 className="text-xl font-semibold">Pranay Vishwakarma</h2>
              <p className="text-sm text-muted-foreground">Open source contributor • React, Node.js</p>

              <div className="flex gap-2 mt-4">
                <Badge variant="default">Total PRs: 22</Badge>
                <Badge variant="secondary">Merges: 17</Badge>
              </div>

              <div className="mt-4 w-full">
                <Button asChild>
                  <Link to="/contributor/onboarding">Edit profile</Link>
                </Button>
              </div>
            </div>
          </Card>

          <Card className="mt-6 p-4">
            <CardHeader>
              <CardTitle className="text-lg">Assigned Issues</CardTitle>
              <CardDescription className="text-sm">Issues currently assigned to this contributor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockIssues.map((issue) => (
                  <div key={issue.id} className="flex items-start justify-between bg-muted/30 p-3 rounded-md">
                    <div>
                      <div className="text-sm font-medium">{issue.title}</div>
                      <div className="text-xs text-muted-foreground">{issue.repo} • assigned {issue.assignedAt}</div>
                    </div>
                    <div className="text-xs">
                      {issue.state === 'open' ? <Badge variant="destructive">Open</Badge> : <Badge variant="default">Closed</Badge>}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: contributions and activity */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><GitPullRequest /> Contributions</CardTitle>
              <CardDescription className="text-sm">Repositories contributed to and PR stats</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="bg-muted/50">
                    <TableHead>Repository</TableHead>
                    <TableHead>PRs</TableHead>
                    <TableHead>Merged</TableHead>
                    <TableHead>Last contribution</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {mockRepos.map((r) => (
                    <TableRow key={r.repo} className="hover:bg-muted/30">
                      <TableCell className="font-medium">{r.repo}</TableCell>
                      <TableCell>{r.prCount}</TableCell>
                      <TableCell>{r.merged}</TableCell>
                      <TableCell className="text-xs text-muted-foreground">{r.lastContribution}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card className="p-4">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2"><GitBranch /> Activity</CardTitle>
              <CardDescription className="text-sm">Recent actions and timeline</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockActivity.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-muted rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm">{a.text}</div>
                      <div className="text-xs text-muted-foreground">{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default ContributorProfilePage
