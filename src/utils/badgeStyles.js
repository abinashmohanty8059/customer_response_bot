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
    'Order Issue': {
      color: 'bg-orange-50 text-orange-700 border-orange-200',
      icon: ShoppingBag
    },
    'Refund': {
      color: 'bg-blue-50 text-blue-700 border-blue-200',
      icon: RotateCcw
    },
    'Delivery': {
      color: 'bg-purple-50 text-purple-700 border-purple-200',
      icon: Truck
    },
    'General Inquiry': {
      color: 'bg-slate-50 text-slate-700 border-slate-200',
      icon: HelpCircle
    },
    'Technical Support': {
      color: 'bg-teal-50 text-teal-700 border-teal-200',
      icon: Wrench
    },
    'Billing': {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: CreditCard
    },
    'Cancellation': {
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: UserMinus
    },
    'Complaint': {
      color: 'bg-red-50 text-red-700 border-red-200',
      icon: AlertTriangle
    }
  };
  return mapping[category] || { color: 'bg-slate-50 text-slate-700 border-slate-200', icon: HelpCircle };
};

export const getPriorityStyles = (priority) => {
  const mapping = {
    'High': {
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Flame
    },
    'Medium': {
      color: 'bg-amber-50 text-amber-700 border-amber-200',
      icon: Activity
    },
    'Low': {
      color: 'bg-slate-100 text-slate-700 border-slate-200',
      icon: ArrowDown
    }
  };
  return mapping[priority] || { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: ArrowDown };
};

export const getSentimentStyles = (sentiment) => {
  const mapping = {
    'Positive': {
      color: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      icon: Smile
    },
    'Neutral': {
      color: 'bg-slate-50 text-slate-600 border-slate-200',
      icon: Meh
    },
    'Negative': {
      color: 'bg-rose-50 text-rose-700 border-rose-200',
      icon: Frown
    }
  };
  return mapping[sentiment] || { color: 'bg-slate-50 text-slate-600 border-slate-200', icon: Meh };
};
