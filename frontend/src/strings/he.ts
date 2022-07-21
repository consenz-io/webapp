import { StringBank } from './bank';

export const he: Partial<Record<StringBank, string>> = {
  AGREEMENT_PARTICIPANTS: '{{count}} משתתפים',
  AGREEMENT_UPDATED_AT: 'עדכון אחרון: {{date}}',
  GROUP_AGREEMENTS: 'ההסכמים של {{group}}',
  WELCOME_HEADER: 'ברוכים הבאים לקונסנז!',
  WELCOME_PARAGRAPH: `אתן עוד לא חלק מקבוצה.
  בקשו ממנהל הקבוצה שלכן הזמנה על מנת להשתתף
  
  ותהנו!`,
  NEW_AGREEMENT: 'הסכם חדש',
  LOGOUT: 'יציאה',
  AGREEMENT_NAME_FIELD: 'כותרת ההסכם',
  NEW_AGREEMENT_NAME_DEFAULT: 'ההסכם החדש שלי',
  CATEGORY_SELECT: 'קטגוריה',
  ADD_RATIONALE_HEADER: 'להוסיף היגיון',
  ADD_RATIONALE_PARAGRAPH: `למה זקוקים להסכם הזה? מה הרקע ליצירתו? מה אלה הצרכים והבעיות שהוא נועד להשיב? ...`,
  CONTINUE: 'להמשיך',
};
