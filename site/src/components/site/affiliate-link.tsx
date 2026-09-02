import React from "react";
import { ExternalLink } from "lucide-react";

interface AffiliateLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  partnerName?: string;
  showIcon?: boolean;
  children: React.ReactNode;
}

/**
 * Standardized Affiliate Link Component
 * Strictly enforces Google Search & FTC compliance:
 * - target="_blank"
 * - rel="noopener noreferrer sponsored"
 */
export function AffiliateLink({
  href,
  partnerName,
  showIcon = true,
  className = "",
  children,
  ...props
}: AffiliateLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      data-partner={partnerName}
      className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
      {...props}
    >
      {children}
      {showIcon && <ExternalLink className="w-3.5 h-3.5 opacity-70" />}
    </a>
  );
}
