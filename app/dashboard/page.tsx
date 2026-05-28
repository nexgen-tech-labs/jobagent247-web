import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { Progress } from '@/components/ui/progress'
import { mockUserProfile, mockJobs, mockApplications, mockSuggestedActions } from '@/lib/mock-data'
import { FileText, MessageSquare, Bell, User, ArrowRight } from 'lucide-react'

const actionIcons: Record<string, React.ElementType> = {
  FileText, MessageSquare, Bell, Linkedin: User,
}

function Linkedin(props: React.SVGProps<SVGSVGElement>) {
  return <User {...props} />
}

export default function DashboardPage() {
  const profile = mockUserProfile
  const topJobs = mockJobs.slice(0, 3)
  const activeApps = mockApplications.filter((a) => a.status === 'interviewing' || a.status === 'applied').slice(0, 3)

  return (
    <DashboardLayout title="Overview">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="font-heading font-bold text-2xl text-white mb-1">
          Welcome back, {profile.name.split(' ')[0]}.
        </h2>
        <p style={{ color: '#94A3B8' }}>
          Your job-search agents have{' '}
          <span style={{ color: '#8B5CF6' }}>4 suggested actions</span> today.
        </p>
      </div>

      {/* Metric widgets */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 mb-8">
        {[
          { label: 'Profile Strength', value: profile.profileStrength + '%', color: '#8B5CF6', progress: profile.profileStrength },
          { label: 'CV Readiness', value: profile.cvReadiness + '%', color: '#22C55E', progress: profile.cvReadiness },
          { label: 'Job Match Avg', value: profile.jobMatchAverage + '%', color: '#06B6D4', progress: profile.jobMatchAverage },
          { label: 'Applied This Week', value: String(profile.applicationsThisWeek), color: '#F59E0B', progress: null },
          { label: 'Interviews', value: String(profile.interviewsScheduled), color: '#22C55E', progress: null },
          { label: 'Follow-ups Due', value: String(profile.followUpsDue), color: '#EF4444', progress: null },
        ].map((w) => (
          <GlassCard key={w.label} className="p-4 text-center">
            <div className="font-heading font-bold text-2xl mb-1" style={{ color: w.color }}>{w.value}</div>
            <div className="text-xs mb-2" style={{ color: '#64748B' }}>{w.label}</div>
            {w.progress !== null && <Progress value={w.progress} className="h-1" />}
          </GlassCard>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Suggested actions */}
        <div className="lg:col-span-2">
          <h3 className="font-heading font-semibold text-white mb-4">Suggested Actions</h3>
          <div className="space-y-3">
            {mockSuggestedActions.map((action) => {
              const Icon = actionIcons[action.icon] ?? FileText
              return (
                <GlassCard key={action.id} hover className="p-4 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                    style={{ background: action.priority === 'high' ? 'rgba(139,92,246,0.15)' : 'rgba(255,255,255,0.05)', border: '1px solid rgba(139,92,246,0.2)' }}>
                    <Icon className="w-4 h-4" style={{ color: '#8B5CF6' }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{action.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{action.subtitle}</p>
                  </div>
                  <ArrowRight className="w-4 h-4 shrink-0" style={{ color: '#64748B' }} />
                </GlassCard>
              )
            })}
          </div>
        </div>

        {/* Top matches */}
        <div>
          <h3 className="font-heading font-semibold text-white mb-4">Top Job Matches</h3>
          <div className="space-y-3">
            {topJobs.map((job) => (
              <GlassCard key={job.id} hover className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1 min-w-0 mr-2">
                    <p className="text-sm font-medium text-white leading-tight">{job.title}</p>
                    <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{job.company}</p>
                  </div>
                  <span className="text-sm font-bold shrink-0" style={{ color: job.matchScore >= 80 ? '#22C55E' : job.matchScore >= 60 ? '#F59E0B' : '#EF4444' }}>
                    {job.matchScore}%
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusBadge status={job.type.toLowerCase() as 'contract' | 'permanent'} />
                  <span className="text-xs" style={{ color: '#64748B' }}>{job.location}</span>
                </div>
              </GlassCard>
            ))}
            <GradientButton href="/job-matches" className="w-full justify-center" size="sm">
              View all matches <ArrowRight className="w-3 h-3" />
            </GradientButton>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
