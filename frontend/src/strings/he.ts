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
  CATEGORY_SELECT: 'קטגוריה',
  ADD_RATIONALE_HEADER: 'להוסיף היגיון',
  ADD_RATIONALE_PARAGRAPH: `למה זקוקים להסכם הזה? מה הרקע ליצירתו? מה אלה הצרכים והבעיות שהוא נועד להשיב? ...`,
  CONTINUE: 'להמשיך',
  ARCHIVE: 'ארכיון',
  UNARCHIVE: 'העברה מארכיון',
  ALL_AGREEMENTS: 'כל ההסכמים',
  GOTO_HOMEPAGE_TITLE: 'לעבור לדף הבית',
  MY_NEW_CATEGORY: 'הקטגוריה החדשה שלי',
  ADD_NEW_CATEGORY: 'הוספת קטגוריה',
};
