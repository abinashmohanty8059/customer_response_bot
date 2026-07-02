import { 
  ShoppingBag, 
  RotateCcw, 
  Truck, 
  HelpCircle, 
  Wrench, 
  CreditCard, 
  UserMinus, 
  AlertTriangle,
  Flame,
  Activity,
  ArrowDown,
  Smile,
  Meh,
  Frown
} from 'lucide-react';

export const getCategoryStyles = (category) => {
  const mapping = {
    'Delivery': {
      color: 'bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-950/20 dark:text-blue-400 dark:border-blue-900/30',
      icon: Truck
    },
    'Refund': {
      color: 'bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-950/20 dark:text-orange-400 dark:border-orange-900/30',
      icon: RotateCcw
    },
    'Order Issue': {
      color: 'bg-purple-50 text-purple-700 border-purple-100 dark:bg-purple-950/20 dark:text-purple-400 dark:border-purple-900/30',
      icon: ShoppingBag
    },
    'Billing': {
      color: 'bg-indigo-50 text-indigo-700 border-indigo-100 dark:bg-indigo-950/20 dark:text-indigo-400 dark:border-indigo-900/30',
      icon: CreditCard
    },
    'Technical Support': {
      color: 'bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-950/20 dark:text-cyan-400 dark:border-cyan-900/30',
      icon: Wrench
    },
    'Complaint': {
      color: 'bg-red-50 text-red-700 border-red-100 dark:bg-red-950/20 dark:text-red-400 dark:border-red-900/30',
      icon: AlertTriangle
    },
    'Cancellation': {
      color: 'bg-gray-50 text-gray-700 border-gray-100 dark:bg-gray-800/40 dark:text-gray-400 dark:border-gray-700/30',
      icon: UserMinus
    },
    'General Inquiry': {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-950/20 dark:text-emerald-400 dark:border-emerald-900/30',
      icon: HelpCircle
    }
  };
  return mapping[category] || { color: 'bg-slate-50 text-slate-700 border-slate-100', icon: HelpCircle };
};

export const getPriorityStyles = (priority) => {
  const mapping = {
    'High': {
      color: 'bg-[#FEE2E2] text-[#DC2626] border-[#FEE2E2]/60 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/20',
      stripColor: '#DC2626',
      icon: Flame
    },
    'Medium': {
      color: 'bg-[#FEF3C7] text-[#D97706] border-[#FEF3C7]/60 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900/20',
      stripColor: '#D97706',
      icon: Activity
    },
    'Low': {
      color: 'bg-[#DCFCE7] text-[#15803D] border-[#DCFCE7]/60 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/20',
      stripColor: '#15803D',
      icon: ArrowDown
    }
  };
  return mapping[priority] || { color: 'bg-slate-100 text-slate-700 border-slate-200', stripColor: '#6B7280', icon: ArrowDown };
};

export const getSentimentStyles = (sentiment) => {
  const mapping = {
    'Positive': {
      color: 'bg-[#DCFCE7] text-[#15803D] border-[#DCFCE7]/60 dark:bg-green-950/30 dark:text-green-400 dark:border-green-900/20',
      icon: Smile
    },
    'Neutral': {
      color: 'bg-[#EFF6FF] text-[#2563EB] border-[#EFF6FF]/60 dark:bg-blue-950/30 dark:text-blue-400 dark:border-blue-900/20',
      icon: Meh
    },
    'Negative': {
      color: 'bg-[#FEE2E2] text-[#DC2626] border-[#FEE2E2]/60 dark:bg-red-950/30 dark:text-red-400 dark:border-red-900/20',
      icon: Frown
    }
  };
  return mapping[sentiment] || { color: 'bg-slate-50 text-slate-600 border-slate-200', icon: Meh };
};
