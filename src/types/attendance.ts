export type AttendanceRecord = {
  id: number;
  student_id: number;
  student_name: string;
  status: string;
  parent_notified: string | null;
  failed_reason?: string | null;
  message_sent_timestamp?: string | null;
  message_read_timestamp?: string | null;
  message_failed_timestamp?: string | null;
  checkin_time: string | null;
  checkout_time: string | null;
  time_spent: string | number | null;
  date: string | null;
};

export type AttendanceDate = {
  id: number;
  date: string;
  created_at: string;
};
