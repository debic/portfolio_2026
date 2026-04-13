import { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from 'react'
import './Button.css'

type Variant = 'outline' | 'outline-light' | 'solid' | 'ghost'
type Size    = 'sm' | 'md' | 'lg'

interface BaseProps {
  variant?:   Variant
  size?:      Size
  children:   ReactNode
  className?: string
}

type ButtonAsButton = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined
  }

type ButtonAsAnchor = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string
  }

type ButtonProps = ButtonAsButton | ButtonAsAnchor

function Button({ variant = 'outline', size = 'md', children, className = '', ...rest }: ButtonProps): JSX.Element {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim()

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as ButtonAsAnchor
    return <a href={href} className={classes} {...anchorRest}>{children}</a>
  }

  const { ...buttonRest } = rest as ButtonAsButton
  return <button className={classes} {...buttonRest}>{children}</button>
}

export default Button
