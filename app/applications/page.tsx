import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { GradientButton } from '@/components/ui/GradientButton'
import { mockApplications } from '@/lib/mock-data'
import { Plus, Calendar, Building2 } from 'lucide-react'

type AppStatus = 'saved' | 'applied' | 'interviewing' | 'offered' | 'rejected'

const columns: { status: AppStatus; label: string; color: string }[] = [
  { status: 'saved', label: 'Saved', color: '#64748B' },
  { status: 'applied', label: 'Applied', color: '#3B82F6' },
  { status: 'interviewing', label: 'Interviewing', color: '#8B5CF6' },
  { status: 'offered', label: 'Offered', color: '#22C55E' },
  { status: 'rejected', label: 'Rejected', color: '#EF4444' },
]

export default function ApplicationsPage() {
  return (
    <DashboardLayout title="Applications">
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm" style={{ color: '#94A3B8' }}>{mockApplications.length} total applications</p>
        <GradientButton size="sm">
          <Plus className="w-3.5 h-3.5" /> Add Application
        </GradientButton>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
        {columns.map((col) => {
          const apps = mockApplications.filter((a) => a.status === col.status)
          return (
            <div key={col.status}>
              {/* Column header */}
              <div className="flex items-center justify-between mb-3 px-1">
                <h3 className="font-heading font-semibold text-sm text-white">{col.label}</h3>
                <span className="text-xs font-bold px-2 py-0.5 rounded-full"
                  style={{ background: `${col.color}22`, color: col.color }}>
                  {apps.length}
                </span>
              </div>

              {/* Cards */}
              <div className="space-y-3">
                {apps.map((app) => (
                  <GlassCard key={app.id} hover className="p-4">
                    <h4 className="text-sm font-semibold text-white mb-1 leading-tight">{app.jobTitle}</h4>
                    <div className="flex items-center gap-1.5 mb-3 text-xs" style={{ color: '#64748B' }}>
                      <Building2 className="w-3 h-3" /> {app.company}
                    </div>
                    <StatusBadge status={app.status} />
                    {app.appliedDate && (
                      <div className="flex items-center gap-1 mt-2 text-xs" style={{ color: '#64748B' }}>
                        <Calendar className="w-3 h-3" />
                        Applied {new Date(app.appliedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    )}
                    {app.followUpDate && (
                      <div className="mt-2 text-xs px-2 py-1 rounded-lg" style={{ background: 'rgba(245,158,11,0.1)', color: '#F59E0B' }}>
                        Follow up {new Date(app.followUpDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                      </div>
                    )}
                    {app.notes && (
                      <p className="text-xs mt-2 leading-relaxed line-clamp-2" style={{ color: '#64748B' }}>{app.notes}</p>
                    )}
                  </GlassCard>
                ))}
                {apps.length === 0 && (
                  <div className="rounded-xl p-4 text-center text-xs" style={{ border: '1px dashed rgba(255,255,255,0.1)', color: '#3F4A5A' }}>
                    No applications
                  </div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </DashboardLayout>
  )
}
