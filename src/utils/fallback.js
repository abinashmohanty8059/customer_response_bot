/**
 * Offline fallback classifier and response generator for Customer Support AI.
 * Triggers when Gemini API is unavailable.
 */

export function classifyMessageOffline(message) {
  if (!message || typeof message !== 'string') {
    return {
      category: 'General Inquiry',
      priority: 'Low',
      sentiment: 'Neutral',
      reply: 'Hi there! Thank you for reaching out. How can we assist you today?'
    };
  }

  const text = message.toLowerCase();

  // 1. Category Classification
  let category = 'General Inquiry';
  if (text.includes('refund')) {
    category = 'Refund';
  } else if (text.includes('cancel')) {
    category = 'Cancellation';
  } else if (text.includes('delivery') || text.includes('late')) {
    category = 'Delivery';
  } else if (text.includes('order')) {
    category = 'Order Issue';
  } else if (text.includes('payment') || text.includes('invoice') || text.includes('billing')) {
    category = 'Billing';
  } else if (text.includes('broken')) {
    category = 'Complaint';
  } else if (text.includes('technical') || text.includes('support') || text.includes('bug') || text.includes('error')) {
    category = 'Technical Support';
  }

  // 2. Priority Classification
  let priority = 'Medium';
  const urgentKeywords = ['urgent', 'immediately', 'asap', 'angry', 'frustrated', 'help', 'emergency'];
  if (urgentKeywords.some(keyword => text.includes(keyword))) {
    priority = 'High';
  } else if (text.length < 50) {
    priority = 'Low';
  }

  // 3. Sentiment Classification
  let sentiment = 'Neutral';
  const positiveKeywords = ['happy', 'thanks', 'great', 'good', 'awesome', 'appreciate'];
  const negativeKeywords = ['bad', 'terrible', 'worst', 'angry', 'disappointed', 'fail', 'hate', 'frustrated', 'delay'];
  
  if (positiveKeywords.some(kw => text.includes(kw))) {
    sentiment = 'Positive';
  } else if (negativeKeywords.some(kw => text.includes(kw))) {
    sentiment = 'Negative';
  }

  // 4. Generate Template Reply
  const reply = generateTemplateReply(category, priority, sentiment);

  return {
    category,
    priority,
    sentiment,
    reply
  };
}

function generateTemplateReply(category, priority, sentiment) {
  let greeting = 'Hi there,';
  if (sentiment === 'Negative') {
    greeting = 'Hello, I sincerely apologize for the frustration and details you shared.';
  } else if (sentiment === 'Positive') {
    greeting = 'Hello! Thank you for the positive feedback.';
  }

  const urgentPrefix = priority === 'High' ? ' I see this is an urgent matter, and I am prioritizing this request immediately.' : '';

  switch (category) {
    case 'Refund':
      return `${greeting}${urgentPrefix} I would be happy to assist you with your refund inquiry. Could you please provide your order ID and the email address associated with the purchase so we can look up the transaction details?`;
    case 'Cancellation':
      return `${greeting}${urgentPrefix} I understand you would like to cancel your subscription or order. Please share your account username or order number, and we will process this cancellation right away.`;
    case 'Delivery':
      return `${greeting}${urgentPrefix} Thank you for reaching out regarding your package delivery. Let me pull up the shipment tracking records. Could you please verify your delivery postal code and order number?`;
    case 'Order Issue':
      return `${greeting}${urgentPrefix} I understand there's an issue with your order. We want to make this right. Could you please describe the issue in detail, or specify if items are missing or damaged?`;
    case 'Billing':
      return `${greeting}${urgentPrefix} Let me help you with your billing or invoice questions. To ensure your account security, could you please confirm the last 4 digits of your payment card or the invoice reference number?`;
    case 'Technical Support':
      return `${greeting}${urgentPrefix} Thank you for reporting this technical issue. To help our engineering team troubleshoot and solve this quickly, could you please specify your operating system, browser, or any error messages you received?`;
    case 'Complaint':
      return `${greeting}${urgentPrefix} I am very sorry to hear about your experience. Your feedback is extremely important to us, and we are escalating this issue directly to our Support Lead to ensure it is resolved immediately.`;
    case 'General Inquiry':
    default:
      return `${greeting} Thank you for contacting customer support. How can we help you today? Please share any details or questions you have so we can best support you.`;
  }
}
