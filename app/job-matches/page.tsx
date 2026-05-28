'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { StatusBadge } from '@/components/ui/StatusBadge'
import { mockJobs } from '@/lib/mock-data'
import { MapPin, Building2, Banknote, FileText, ExternalLink, Search } from 'lucide-react'

function MatchScorePill({ score }: { score: number }) {
  const color = score >= 80 ? '#22C55E' : score >= 60 ? '#F59E0B' : '#EF4444'
  const bg = score >= 80 ? 'rgba(34,197,94,0.12)' : score >= 60 ? 'rgba(245,158,11,0.12)' : 'rgba(239,68,68,0.12)'
  return (
    <span className="font-heading font-bold text-sm px-3 py-1 rounded-full" style={{ color, background: bg }}>
      {score}% match
    </span>
  )
}

export default function JobMatchesPage() {
  const [keyword, setKeyword] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  const filtered = mockJobs.filter((j) => {
    const matchesKeyword = !keyword || j.title.toLowerCase().includes(keyword.toLowerCase()) || j.company.toLowerCase().includes(keyword.toLowerCase())
    const matchesType = typeFilter === 'All' || j.type === typeFilter
    return matchesKeyword && matchesType
  })

  return (
    <DashboardLayout title="Job Matches">
      {/* Filters */}
      <GlassCard className="p-4 mb-6">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4" style={{ color: '#64748B' }} />
            <input
              className="w-full pl-10 pr-4 py-2.5 rounded-xl text-sm text-white outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
              placeholder="Search by title or company..."
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>
          {(['All', 'Permanent', 'Contract'] as const).map((t) => (
            <button key={t} onClick={() => setTypeFilter(t)}
              className="px-4 py-2 rounded-xl text-sm font-medium transition-colors"
              style={typeFilter === t ? { background: 'rgba(139,92,246,0.2)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.4)' } : { background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px solid rgba(255,255,255,0.08)' }}>
              {t}
            </button>
          ))}
        </div>
      </GlassCard>

      {/* Job cards */}
      <div className="space-y-4">
        {filtered.map((job) => (
          <GlassCard key={job.id} hover className="p-6">
            <div className="flex flex-col md:flex-row md:items-start gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <h3 className="font-heading font-semibold text-white text-lg">{job.title}</h3>
                  <MatchScorePill score={job.matchScore} />
                </div>
                <div className="flex flex-wrap gap-4 mb-3" style={{ color: '#94A3B8' }}>
                  <span className="flex items-center gap-1.5 text-sm">
                    <Building2 className="w-3.5 h-3.5" /> {job.company}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <MapPin className="w-3.5 h-3.5" /> {job.location}
                  </span>
                  <span className="flex items-center gap-1.5 text-sm">
                    <Banknote className="w-3.5 h-3.5" />
                    {job.currency === 'GBP/day'
                      ? `£${job.salaryMin}–£${job.salaryMax}/day`
                      : `£${job.salaryMin.toLocaleString()}–£${job.salaryMax.toLocaleString()}/yr`}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  <StatusBadge status={job.type.toLowerCase() as 'contract' | 'permanent'} />
                  {job.visaSponsorship && <StatusBadge status="ready" />}
                  <span className="text-xs px-2.5 py-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)', color: '#94A3B8' }}>{job.sourceSite}</span>
                </div>
                <p className="text-sm leading-relaxed line-clamp-2" style={{ color: '#94A3B8' }}>{job.description}</p>
              </div>
              <div className="flex md:flex-col gap-2 shrink-0">
                <GradientButton size="sm" className="justify-center">
                  <FileText className="w-3.5 h-3.5" /> Tailor CV
                </GradientButton>
                <SecondaryButton size="sm" className="justify-center">
                  <ExternalLink className="w-3.5 h-3.5" /> View Job
                </SecondaryButton>
              </div>
            </div>
          </GlassCard>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-16" style={{ color: '#64748B' }}>
            <Search className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm">No jobs match your filters</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
