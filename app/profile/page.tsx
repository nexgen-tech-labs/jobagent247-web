'use client'

import { useState } from 'react'
import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { GlassCard } from '@/components/ui/GlassCard'
import { GradientButton } from '@/components/ui/GradientButton'
import { Progress } from '@/components/ui/progress'
import { CVUpload } from '@/components/profile/CVUpload'
import { mockUserProfile } from '@/lib/mock-data'
import { Check, X, Plus, Zap } from 'lucide-react'
import type { CV } from '@/lib/types/database'

export default function ProfilePage() {
  const profile = mockUserProfile
  const [skills, setSkills] = useState(profile.skills)
  const [targetRoles, setTargetRoles] = useState(profile.targetRoles)
  const [visaRequired, setVisaRequired] = useState(profile.visaRequired)
  const [uploadedCVs, setUploadedCVs] = useState<CV[]>([])

  return (
    <DashboardLayout title="My Profile">
      <div className="max-w-3xl space-y-6">
        {/* Profile completeness */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-heading font-semibold text-white">Profile Strength</h3>
              <p className="text-sm mt-0.5" style={{ color: '#94A3B8' }}>Complete your profile so agents can give better recommendations</p>
            </div>
            <span className="font-heading font-bold text-2xl" style={{ color: '#8B5CF6' }}>{profile.profileStrength}%</span>
          </div>
          <Progress value={profile.profileStrength} className="h-2" />
          <div className="flex flex-wrap gap-2 mt-4">
            {[{ label: 'Basic info', done: true }, { label: 'CV uploaded', done: true }, { label: 'Target roles', done: true }, { label: 'Skills added', done: true }, { label: 'LinkedIn URL', done: false }, { label: 'Portfolio link', done: false }].map((item) => (
              <span key={item.label} className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full"
                style={item.done ? { background: 'rgba(34,197,94,0.12)', color: '#22C55E' } : { background: 'rgba(255,255,255,0.05)', color: '#64748B' }}>
                {item.done ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />} {item.label}
              </span>
            ))}
          </div>
        </GlassCard>

        {/* Basic info */}
        <GlassCard className="p-6">
          <h3 className="font-heading font-semibold text-white mb-6">Basic Information</h3>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { label: 'Full name', value: profile.name, type: 'text' },
              { label: 'Current role', value: profile.role, type: 'text' },
              { label: 'Location', value: profile.location, type: 'text' },
              { label: 'Years of experience', value: String(profile.experience), type: 'number' },
            ].map((field) => (
              <div key={field.label}>
                <label className="block text-xs font-medium mb-2" style={{ color: '#94A3B8' }}>{field.label}</label>
                <input
                  type={field.type}
                  defaultValue={field.value}
                  className="w-full px-4 py-2.5 rounded-xl text-sm text-white outline-none transition-colors"
                  style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.10)' }}
                />
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Target roles */}
        <GlassCard className="p-6">
          <h3 className="font-heading font-semibold text-white mb-4">Target Roles</h3>
          <div className="flex flex-wrap gap-2 mb-3">
            {targetRoles.map((role) => (
              <span key={role} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(139,92,246,0.12)', color: '#8B5CF6', border: '1px solid rgba(139,92,246,0.25)' }}>
                {role}
                <button onClick={() => setTargetRoles(targetRoles.filter(r => r !== role))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px dashed rgba(255,255,255,0.15)' }}>
              <Plus className="w-3 h-3" /> Add role
            </button>
          </div>
        </GlassCard>

        {/* Skills */}
        <GlassCard className="p-6">
          <h3 className="font-heading font-semibold text-white mb-4">Skills</h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span key={skill} className="flex items-center gap-1.5 text-sm px-3 py-1.5 rounded-full"
                style={{ background: 'rgba(6,182,212,0.12)', color: '#06B6D4', border: '1px solid rgba(6,182,212,0.25)' }}>
                {skill}
                <button onClick={() => setSkills(skills.filter(s => s !== skill))}><X className="w-3 h-3" /></button>
              </span>
            ))}
            <button className="flex items-center gap-1 text-sm px-3 py-1.5 rounded-full"
              style={{ background: 'rgba(255,255,255,0.05)', color: '#64748B', border: '1px dashed rgba(255,255,255,0.15)' }}>
              <Plus className="w-3 h-3" /> Add skill
            </button>
          </div>
        </GlassCard>

        {/* CV Upload */}
        <GlassCard className="p-6">
          <h3 className="font-heading font-semibold text-white mb-4">CV Upload</h3>
          <CVUpload
            userId="demo-user"
            existingCVs={uploadedCVs}
            onUploadComplete={(cv) => setUploadedCVs((prev) => [...prev, cv])}
          />
        </GlassCard>

        {/* Visa toggle */}
        <GlassCard className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-semibold text-white">Visa Sponsorship Required</h3>
              <p className="text-sm mt-1" style={{ color: '#94A3B8' }}>Only show jobs that offer visa sponsorship</p>
            </div>
            <button
              onClick={() => setVisaRequired(!visaRequired)}
              className="w-12 h-6 rounded-full transition-colors relative"
              style={{ background: visaRequired ? '#8B5CF6' : 'rgba(255,255,255,0.1)' }}
            >
              <span className="absolute top-1 w-4 h-4 rounded-full bg-white transition-transform"
                style={{ left: visaRequired ? '26px' : '4px' }} />
            </button>
          </div>
        </GlassCard>

        <GradientButton size="lg" className="w-full justify-center">
          <Zap className="w-4 h-4" /> Run Profile Agent
        </GradientButton>
      </div>
    </DashboardLayout>
  )
}
