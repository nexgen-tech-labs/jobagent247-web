'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'
import { SecondaryButton } from '@/components/ui/SecondaryButton'
import { Upload, Zap, Download, ArrowRight, CheckCircle, XCircle } from 'lucide-react'

const missingKeywords = ['terraform', 'helm', 'prometheus', 'grafana', 'argocd']

const improvedBullets = [
  {
    before: 'Managed cloud infrastructure for the team',
    after: 'Architected and maintained AWS/Azure cloud infrastructure serving 2M+ users, reducing infrastructure costs by 34% through right-sizing and Spot instance adoption',
  },
  {
    before: 'Set up CI/CD pipelines',
    after: 'Designed and implemented GitOps-based CI/CD pipelines using GitHub Actions and ArgoCD, reducing deployment lead time from 3 days to 45 minutes',
  },
  {
    before: 'Helped with Kubernetes deployments',
    after: 'Led migration of 40+ microservices to Kubernetes (EKS), implementing Helm charts, RBAC policies, and horizontal pod autoscaling to support 10× traffic growth',
  },
]

export default function CVAgentPage() {
  const [jobDescription, setJobDescription] = useState('')
  const [ran, setRan] = useState(false)

  return (
    <DashboardLayout title="CV Agent">
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-4">
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-white mb-4">1. Select your CV</h3>
            <div className="flex items-center gap-3 p-4 rounded-xl mb-3" style={{ background: 'rgba(34,197,94,0.08)', border: '1px solid rgba(34,197,94,0.2)' }}>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(34,197,94,0.12)' }}>
                <Upload className="w-4 h-4" style={{ color: '#22C55E' }} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-white">HitendraKotamraju_CV.docx</p>
                <p className="text-xs" style={{ color: '#64748B' }}>Current CV · ATS Score: 91%</p>
              </div>
              <CheckCircle className="w-4 h-4" style={{ color: '#22C55E' }} />
            </div>
            <SecondaryButton size="sm" className="w-full justify-center">
              <Upload className="w-3 h-3" /> Upload different CV
            </SecondaryButton>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-white mb-2">2. Target role</h3>
            <select className="w-full px-4 py-2.5 rounded-xl text-sm text-white mb-0 outline-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}>
              <option value="devops">Senior DevOps Engineer</option>
              <option value="cloud">Azure Cloud Architect</option>
              <option value="sre">Site Reliability Engineer</option>
            </select>
          </GlassCard>

          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-white mb-2">3. Paste job description</h3>
            <textarea
              className="w-full h-48 px-4 py-3 rounded-xl text-sm text-white outline-none resize-none"
              style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)', color: '#CBD5E1' }}
              placeholder="Paste the full job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </GlassCard>

          <GradientButton size="lg" className="w-full justify-center" onClick={() => setRan(true)}>
            <Zap className="w-4 h-4" /> Run CV Agent
          </GradientButton>
        </div>

        {/* Output panel */}
        <div className="space-y-4">
          {/* Score */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-white mb-4">ATS Score</h3>
            <div className="flex items-center gap-6">
              <div className="relative w-28 h-28">
                <svg className="w-28 h-28 -rotate-90" viewBox="0 0 36 36">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="2.5" />
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="url(#grad)" strokeWidth="2.5"
                    strokeDasharray={`${ran ? 91 : 0} 100`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }} />
                  <defs>
                    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#8B5CF6" />
                      <stop offset="100%" stopColor="#22C55E" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="font-heading font-bold text-2xl" style={{ color: '#22C55E' }}>{ran ? '91' : '--'}</span>
                  <span className="text-xs" style={{ color: '#64748B' }}>/ 100</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium text-white mb-1">{ran ? 'Strong match' : 'Run agent to score'}</p>
                <p className="text-xs" style={{ color: '#94A3B8' }}>{ran ? 'CV is well-optimised for this role. 5 keywords missing.' : 'Paste a job description and click Run CV Agent'}</p>
              </div>
            </div>
          </GlassCard>

          {/* Missing keywords */}
          {ran && (
            <GlassCard className="p-6">
              <h3 className="font-heading font-semibold text-white mb-3">Missing Keywords</h3>
              <p className="text-xs mb-3" style={{ color: '#94A3B8' }}>Add these to improve your ATS score for this role</p>
              <div className="flex flex-wrap gap-2">
                {missingKeywords.map((kw) => (
                  <span key={kw} className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-full"
                    style={{ background: 'rgba(239,68,68,0.12)', color: '#EF4444', border: '1px solid rgba(239,68,68,0.25)' }}>
                    <XCircle className="w-3 h-3" /> {kw}
                  </span>
                ))}
              </div>
            </GlassCard>
          )}

          {/* Improved bullets */}
          {ran && (
            <GlassCard className="p-6">
              <h3 className="font-heading font-semibold text-white mb-4">Improved Bullets</h3>
              <div className="space-y-5">
                {improvedBullets.map((b, i) => (
                  <div key={i}>
                    <div className="flex items-start gap-2 mb-2">
                      <XCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#EF4444' }} />
                      <p className="text-xs line-through" style={{ color: '#64748B' }}>{b.before}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: '#22C55E' }} />
                      <p className="text-xs" style={{ color: '#CBD5E1' }}>{b.after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          )}

          {ran && (
            <div className="flex gap-3">
              <GradientButton size="sm" className="flex-1 justify-center">
                <Download className="w-3.5 h-3.5" /> Export CV
              </GradientButton>
              <SecondaryButton size="sm" className="flex-1 justify-center">
                Generate Cover Letter <ArrowRight className="w-3.5 h-3.5" />
              </SecondaryButton>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}
