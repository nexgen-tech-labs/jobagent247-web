import Link from 'next/link'
import { cn } from '@/lib/utils'

interface GradientButtonProps {
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'button' | 'submit'
}

const sizeClasses = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export function GradientButton({ children, onClick, href, className, size = 'md', type = 'button' }: GradientButtonProps) {
  const classes = cn('btn-gradient', sizeClasses[size], className)

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  )
}
