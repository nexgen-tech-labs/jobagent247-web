'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { mockApplications, mockInterviewQuestions } from '@/lib/mock-data'
import { ChevronDown, ChevronUp, Zap, Brain } from 'lucide-react'

const difficultyColor: Record<string, string> = {
  easy: '#22C55E',
  medium: '#F59E0B',
  hard: '#EF4444',
}

export default function InterviewPrepPage() {
  const [selectedApp, setSelectedApp] = useState(mockApplications[0].id)
  const [expanded, setExpanded] = useState<string | null>(null)
  const [practiceMode, setPracticeMode] = useState(false)

  const app = mockApplications.find((a) => a.id === selectedApp)

  return (
    <DashboardLayout title="Interview Prep">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: Job selector */}
        <div className="space-y-4">
          <GlassCard className="p-5">
            <h3 className="font-heading font-semibold text-white mb-4">Prepare for</h3>
            <select
              className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none mb-4"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
              value={selectedApp}
              onChange={(e) => setSelectedApp(e.target.value)}
            >
              {mockApplications.filter((a) => a.status !== 'rejected').map((a) => (
                <option key={a.id} value={a.id}>{a.jobTitle} — {a.company}</option>
              ))}
            </select>

            {app && (
              <div className="rounded-xl p-3" style={{ background: 'rgba(139,92,246,0.08)', border: '1px solid rgba(139,92,246,0.2)' }}>
                <p className="text-sm font-medium text-white">{app.jobTitle}</p>
                <p className="text-xs mt-0.5" style={{ color: '#64748B' }}>{app.company}</p>
                {app.followUpDate && (
                  <p className="text-xs mt-2" style={{ color: '#F59E0B' }}>
                    Interview: {new Date(app.followUpDate).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                )}
              </div>
            )}
          </GlassCard>

          <GlassCard className="p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-heading font-semibold text-white">Practice Mode</h3>
              <button
                onClick={() => setPracticeMode(!practiceMode)}
                className="w-12 h-6 rounded-full transition-colors relative"
                style={{ background: practiceMode ? '#8B5CF6' : 'rgba(255,255,255,0.1)' }}>
                <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                  style={{ left: practiceMode ? '26px' : '4px' }} />
              </button>
            </div>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Hide STAR answers until you've thought through your own response first</p>
          </GlassCard>

          <GradientButton className="w-full justify-center" size="sm">
            <Zap className="w-3.5 h-3.5" /> Generate More Questions
          </GradientButton>
        </div>

        {/* Right: Questions */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-semibold text-white">{mockInterviewQuestions.length} Interview Questions</h3>
            <div className="flex gap-2">
              {['All', 'Technical', 'SRE', 'Leadership'].map((cat) => (
                <button key={cat} className="text-xs px-3 py-1 rounded-full"
                  style={cat === 'All' ? { background: 'rgba(139,92,246,0.2)', color: '#8B5CF6' } : { background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {mockInterviewQuestions.map((q) => (
            <GlassCard key={q.id} className="overflow-hidden">
              <button className="w-full p-5 text-left flex items-start justify-between gap-4" onClick={() => setExpanded(expanded === q.id ? null : q.id)}>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6' }}>{q.category}</span>
                    <span className="text-xs font-medium" style={{ color: difficultyColor[q.difficulty] }}>{q.difficulty}</span>
                  </div>
                  <p className="text-sm text-white leading-relaxed">{q.question}</p>
                </div>
                {expanded === q.id ? <ChevronUp className="w-4 h-4 mt-1 shrink-0" style={{ color: '#64748B' }} /> : <ChevronDown className="w-4 h-4 mt-1 shrink-0" style={{ color: '#64748B' }} />}
              </button>

              {expanded === q.id && !practiceMode && (
                <div className="px-5 pb-5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center gap-2 mb-3">
                    <Brain className="w-4 h-4" style={{ color: '#06B6D4' }} />
                    <span className="text-xs font-semibold uppercase tracking-wide" style={{ color: '#06B6D4' }}>STAR Framework</span>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: 'S — Situation', value: q.starFramework.situation },
                      { label: 'T — Task', value: q.starFramework.task },
                      { label: 'A — Action', value: q.starFramework.action },
                      { label: 'R — Result', value: q.starFramework.result },
                    ].map(({ label, value }) => (
                      <div key={label} className="rounded-lg p-3" style={{ background: 'rgba(255,255,255,0.04)' }}>
                        <p className="text-xs font-semibold mb-1" style={{ color: '#8B5CF6' }}>{label}</p>
                        <p className="text-sm" style={{ color: '#CBD5E1' }}>{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {expanded === q.id && practiceMode && (
                <div className="px-5 pb-5 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
                  <p className="text-sm mb-3" style={{ color: '#94A3B8' }}>Write your answer before revealing the framework:</p>
                  <textarea className="w-full h-28 px-4 py-3 rounded-xl text-sm text-white outline-none resize-none mb-3"
                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                    placeholder="Your STAR answer..." />
                  <SecondaryButton size="sm" onClick={() => setPracticeMode(false)}>Reveal framework</SecondaryButton>
                </div>
              )}
            </GlassCard>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}
