// ─── ARMA Academy Shared Types ──────────────────────────────────────────────
// These interfaces define the platform-wide data contracts.
// All services must import types from here — never redefine locally.

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  organizationId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole =
  | 'super_admin'
  | 'institutional_admin'
  | 'trainer'
  | 'learner'
  | 'advisor'
  | 'compliance_officer';

export interface Learner {
  id: string;
  userId: string;
  enrollments: string[];         // Course IDs
  completedCourses: string[];
  certificates: string[];
  creditScore?: number;          // Used by robo-advisor
  riskProfile?: RiskProfile;
  createdAt: Date;
}

export type RiskProfile = 'conservative' | 'moderate' | 'aggressive';

export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: CourseCategory;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  durationMinutes: number;
  modules: CourseModule[];
  certifiable: boolean;
  price?: number;
  currency?: string;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export type CourseCategory =
  | 'risk_management'
  | 'trade_finance'
  | 'supply_chain_finance'
  | 'fintech'
  | 'strategy'
  | 'governance'
  | 'credit'
  | 'compliance';

export interface CourseModule {
  id: string;
  title: string;
  order: number;
  contentType: 'video' | 'scorm' | 'pdf' | 'quiz' | 'case_study';
  contentUrl: string;
  durationMinutes: number;
}

export interface Certificate {
  id: string;
  learnerId: string;
  courseId: string;
  issuedAt: Date;
  expiresAt?: Date;
  blockchainTxHash?: string;     // On-chain issuance reference
  verificationUrl: string;
  metadata: CertificateMetadata;
}

export interface CertificateMetadata {
  learnerName: string;
  courseName: string;
  issuerName: string;
  grade?: number;
  cpd_hours?: number;
}

export interface AdvisoryReport {
  id: string;
  learnerId: string;
  advisorId?: string;            // Human advisor, if applicable
  type: 'ai_generated' | 'human_reviewed';
  riskProfile: RiskProfile;
  recommendations: Recommendation[];
  generatedAt: Date;
  reviewedAt?: Date;
  status: 'draft' | 'published' | 'archived';
}

export interface Recommendation {
  id: string;
  category: string;
  title: string;
  rationale: string;
  priority: 'high' | 'medium' | 'low';
  courseIds?: string[];           // Related learning resources
}

export interface Subscription {
  id: string;
  organizationId?: string;
  userId?: string;
  plan: SubscriptionPlan;
  status: 'active' | 'cancelled' | 'past_due' | 'trialing';
  billingCycle: 'monthly' | 'annual';
  currentPeriodStart: Date;
  currentPeriodEnd: Date;
  seats?: number;
  priceUSD: number;
}

export type SubscriptionPlan =
  | 'individual'
  | 'team'
  | 'institutional'
  | 'enterprise';

// ─── API Response Wrappers ───────────────────────────────────────────────────
export interface ApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
  timestamp: string;
}

export interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  statusCode: number;
  code: string;
  message: string;
  details?: Record<string, unknown>;
  timestamp: string;
}
